module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.31"

  cluster_name    = var.cluster_name
  cluster_version = var.kubernetes_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.public_subnets

  cluster_endpoint_public_access = true

  # Whoever runs `terraform apply` becomes cluster admin (so kubectl works for you)
  enable_cluster_creator_admin_permissions = true

  # Extra admins, e.g. the IAM user whose keys Jenkins uses to deploy
  access_entries = {
    for arn in var.admin_principal_arns :
    replace(arn, "/[^a-zA-Z0-9]/", "-") => {
      principal_arn = arn
      policy_associations = {
        admin = {
          policy_arn   = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
          access_scope = { type = "cluster" }
        }
      }
    }
  }

  # Control-plane logs and their CloudWatch log group cost money; off for learning
  cluster_enabled_log_types   = []
  create_cloudwatch_log_group = false

  cluster_addons = {
    coredns    = { most_recent = true }
    kube-proxy = { most_recent = true }
    vpc-cni    = { most_recent = true }
  }

  eks_managed_node_groups = {
    default = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = var.node_instance_types
      capacity_type  = var.capacity_type

      min_size     = 1
      max_size     = 3
      desired_size = var.node_desired_size
    }
  }
}
