# JobTracker: end-to-end DevOps project

A MERN app (React + Express + MongoDB) taken from `git push` all the way to a running
site on AWS EKS, with security scanning on every build and a one-command teardown so the
AWS bill stays near zero.

```
 git push ─► Jenkins ─►  SonarQube ─► Trivy (files)
                │
                ├─► docker build ─► Trivy (images) ─► Amazon ECR
                │
                └─► kubectl apply ─► EKS (2 Spot nodes) ─► ALB ─┬─ /api ─► Express
                                                                 └─ /    ─► React (nginx)
                                        MongoDB Atlas (free M0) ◄──────── Express
        Everything on AWS is created and destroyed with Terraform
```

| Part           | Tool                         | Where it runs        | Cost                      |
| -------------- | ---------------------------- | -------------------- | ------------------------- |
| Code           | GitHub                       | cloud                | free                      |
| CI/CD          | Jenkins                      | your laptop (Docker) | free                      |
| Code quality   | SonarQube Community          | your laptop (Docker) | free                      |
| Security scans |  Trivy, ECR scan-on-push    | Jenkins / ECR        | free                      |
| Images         | Amazon ECR                   | AWS                  | pennies                   |
| Cluster        | EKS + 2 Spot t3.medium + ALB | AWS                  | about $0.25/hour while up |
| Database       | MongoDB Atlas M0             | cloud                | free                      |
| Infra as code  | Terraform                    | your laptop          | free                      |

## Repo map

| Path                                           | What it is                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| `server/`, `client/`                       | the app, each with its own Dockerfile                                  |
| `docker-compose.yml`                         | run the whole app locally (with MongoDB)                               |
| `Jenkinsfile`                                | the pipeline                                                           |
| `jenkins/`                                   | Jenkins + SonarQube for your laptop, and the IAM policy for Jenkins    |
| `k8s/`                                       | Kubernetes manifests (deployments, services, ALB ingress)              |
| `terraform/base/`                            | ECR repos + budget alert. Cheap, leave it running.                     |
| `terraform/eks/`                             | VPC + EKS + ALB controller. Expensive, create and destroy per session. |
| `scripts/eks-up.sh`, `scripts/eks-down.sh` | create / safely destroy the cluster                                    |

## Cost rules (read once)

- The EKS control plane costs about $0.10/hour **whenever it exists**, even if idle. Destroy it when you stop.
- There is **no NAT gateway** (saves about $32/month). Nodes sit in public subnets.
- `scripts/eks-down.sh` deletes the load balancer *before* the VPC. Plain `terraform destroy` can leave an ALB behind.
- Keep `kubernetes_version` inside EKS standard support. Older versions are billed extra. Check [https://endoflife.date/amazon-eks](https://endoflife.date/amazon-eks).
- A typical 4-hour session costs about $1. Ten sessions is roughly $10 to $15 of your $100 credit.

---

## One-time setup

### 0. Install on your laptop

Docker Desktop, Git, AWS CLI v2, Terraform (1.6+), kubectl.

### 1. Rotate the leaked key

An OpenAI key was committed in `client/.env` earlier. **Revoke it** at platform.openai.com → API keys. Removing the file from git does not remove it from history.

### 2. Run the app locally

```bash
cp .env.example .env            # set JWT_SECRET  (openssl rand -hex 32)
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000). API health: [http://localhost:5000/health](http://localhost:5000/health).

### 3. AWS account safety

1. Billing → turn on "Receive Billing Alerts" and look at Free Tier usage.
2. IAM → create user **`devops-admin`** with `AdministratorAccess` and an access key. This is for Terraform on your laptop. Never use the root account for daily work.
3. `aws configure` with that key (region `ap-south-1`).
4. IAM → create a second user **`jenkins-deployer`** with the policy in `jenkins/iam-policy.json` and an access key. Jenkins uses this one.

### 4. Create ECR repos and the budget alert

```bash
cd terraform/base
cp terraform.tfvars.example terraform.tfvars    # put your email in it
terraform init && terraform apply
```

Confirm the budget email AWS sends you.

### 5. MongoDB Atlas (free)

Create an M0 cluster, a database user, and under Network Access allow `0.0.0.0/0` (fine for learning; nodes have changing IPs). Copy the connection string and add a database name, for example `...mongodb.net/jobtracker?retryWrites=true&w=majority`.

### 6. Start Jenkins and SonarQube

```bash
# Linux only, once per boot (SonarQube needs it)
sudo sysctl -w vm.max_map_count=262144

cd jenkins
docker compose up -d --build        # first build takes several minutes
```

- SonarQube: [http://localhost:9000](http://localhost:9000), login `admin` / `admin`, set a new password.
  Then My Account → Security → generate a token (type: User token). Copy it.
- Jenkins: [http://localhost:8080](http://localhost:8080). Get the first password with
  `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`, then "Install suggested plugins".

### 7. Add Jenkins credentials

Manage Jenkins → Credentials → System → Global → Add:

| ID                  | Kind                   | Value                                           |
| ------------------- | ---------------------- | ----------------------------------------------- |
| `aws-credentials` | Username with password | `jenkins-deployer` access key id / secret key |
| `sonar-token`     | Secret text            | the SonarQube token                             |
| `mongo-uri`       | Secret text            | Atlas connection string                         |
| `jwt-secret`      | Secret text            | `openssl rand -hex 32`                        |

### 8. Create the pipeline job

New Item → **Pipeline** → name `jobtracker` → Pipeline definition: *Pipeline script from SCM* → Git →
repo URL `https://github.com/SunilNagar27/JobTracker.git`, branch to build = the branch holding the `Jenkinsfile`, script path `Jenkinsfile`.
Save, then click **Build Now** once. The first run only registers the build parameters and may fail. That is normal. After that, use **Build with Parameters**.

### 9. First pipeline run (no cluster, costs nothing)

Build with Parameters, leave `DEPLOY_TO_EKS` unticked. Expect: scans pass, images land in ECR.
Check SonarQube ([http://localhost:9000](http://localhost:9000)) for the report.

---

## Every session: deploy, demo, destroy

```bash
# 1. Create the cluster (about 15 minutes, billing starts)
./scripts/eks-up.sh

# 2. Let Jenkins deploy. Build with Parameters, tick DEPLOY_TO_EKS.
#    (If Jenkins uses a different IAM user than your laptop, put its ARN in
#     terraform/eks/terraform.tfvars as admin_principal_arns and re-run eks-up.sh.)

# 3. Get the URL (ALB takes 2 to 3 minutes)
kubectl -n jobtracker get ingress jobtracker      # copy the ADDRESS, open it in a browser

# 4. Demo, screenshots, Grafana, whatever you need.

# 5. ALWAYS finish with:
./scripts/eks-down.sh
```

Afterwards, confirm nothing is left billing. The script prints these commands:
EKS clusters, load balancers, EBS volumes.

## Troubleshooting

| Symptom                         | Likely cause / fix                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| Build parameters missing        | Run one build first so Jenkins reads the `Jenkinsfile`.                            |
| Gitleaks fails                  | It found a secret in the files. Remove it and rotate it. Never allowlist a real key. |
| SonarQube stage can't connect   | `docker compose ps` in `jenkins/`; on Linux set `vm.max_map_count`.            |
| Quality Gate fails              | Open the project in SonarQube and fix or review the issues, or adjust the gate.      |
| `ImagePullBackOff`            | Images not in ECR (run a build first), or the cluster is in a different region.      |
| Pods `Pending`                | Not enough node capacity. Raise `node_desired_size` or use a bigger instance type. |
| ALB never appears               | `kubectl -n kube-system logs deploy/aws-load-balancer-controller`                  |
| Spot node disappeared           | Normal for Spot. Set `capacity_type = "ON_DEMAND"` for a steadier demo.            |
| Login or API errors on the site | Check the `jobtracker-secrets` secret and that Atlas allows the node IPs.          |

## Next phases

Prometheus and Grafana on the cluster (Helm), a remote Terraform state in S3, and Argo CD for GitOps.
