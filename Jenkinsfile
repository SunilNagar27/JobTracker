// JobTracker CI/CD pipeline
// Checkout -> secret scan -> dependency audit -> SonarQube -> Trivy (files)
//   -> build images -> Trivy (images) -> push to ECR -> (optional) deploy to EKS
//
// Jenkins credentials needed (Manage Jenkins -> Credentials):
//   aws-credentials  Username with password   AWS access key id / secret access key
//   sonar-token      Secret text              token generated in SonarQube
//   mongo-uri        Secret text              MongoDB Atlas connection string  (deploy only)
//   jwt-secret       Secret text              long random string               (deploy only)

pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 45, unit: 'MINUTES')
  }

  // Jenkins runs locally, so GitHub cannot call it. Poll GitHub instead.
  triggers { pollSCM('H/5 * * * *') }

  parameters {
    booleanParam(name: 'DEPLOY_TO_EKS', defaultValue: false,
                 description: 'Deploy to EKS after pushing. Only tick this when the cluster is up (scripts/eks-up.sh).')
    booleanParam(name: 'FAIL_ON_VULN', defaultValue: false,
                 description: 'Fail the build when Trivy finds HIGH/CRITICAL vulnerabilities.')
    string(name: 'AWS_REGION', defaultValue: 'ap-south-1', description: 'AWS region')
    string(name: 'EKS_CLUSTER', defaultValue: 'jobtracker-eks', description: 'EKS cluster name')
    string(name: 'EMAILJS_SERVICE_ID', defaultValue: '', description: 'Contact form (public value, optional)')
    string(name: 'EMAILJS_TEMPLATE_ID', defaultValue: '', description: 'Contact form (public value, optional)')
    string(name: 'EMAILJS_PUBLIC_KEY', defaultValue: '', description: 'Contact form (public value, optional)')
  }

  environment {
    AWS_DEFAULT_REGION = "${params.AWS_REGION}"
    SERVER_REPO        = 'jobtracker-server'
    CLIENT_REPO        = 'jobtracker-client'
    TRIVY_EXIT_CODE    = "${params.FAIL_ON_VULN ? '1' : '0'}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.GIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          env.IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_SHORT}"
          echo "Image tag: ${env.IMAGE_TAG}"
        }
      }
    }

   // Checkout -> SonarQube -> Trivy (files) -> build images -> Trivy (images) -> push to ECR -> (optional) deploy to EKS

    stage('SonarQube analysis') {
      steps {
        // SONAR_HOST_URL is set on the Jenkins container; SONAR_TOKEN comes from credentials.
        withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
          // Waits for the Quality Gate result and fails the build if it does not pass.
          sh 'sonar-scanner -Dsonar.projectVersion="$IMAGE_TAG" -Dsonar.qualitygate.wait=true'
        }
      }
    }

    stage('Trivy file scan') {
      steps {
        sh '''
          trivy fs --severity HIGH,CRITICAL --exit-code "$TRIVY_EXIT_CODE" \
            --skip-dirs node_modules --skip-dirs client/dist .
        '''
      }
    }

    stage('Build images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'aws-credentials',
                                          usernameVariable: 'AWS_ACCESS_KEY_ID',
                                          passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
          script {
            def account = sh(returnStdout: true,
                             script: 'aws sts get-caller-identity --query Account --output text').trim()
            env.REGISTRY = "${account}.dkr.ecr.${params.AWS_REGION}.amazonaws.com"
          }
        }
        sh '''
          docker build -t "$REGISTRY/$SERVER_REPO:$IMAGE_TAG" server

          # Empty VITE_API_URL = the browser calls /api on the same host (the ALB routes it).
          docker build \
            --build-arg VITE_API_URL= \
            --build-arg VITE_APP_EMAILJS_SERVICE_ID="$EMAILJS_SERVICE_ID" \
            --build-arg VITE_APP_EMAILJS_TEMPLATE_ID="$EMAILJS_TEMPLATE_ID" \
            --build-arg VITE_APP_EMAILJS_PUBLIC_KEY="$EMAILJS_PUBLIC_KEY" \
            -t "$REGISTRY/$CLIENT_REPO:$IMAGE_TAG" client
        '''
      }
    }

    stage('Trivy image scan') {
      steps {
        sh '''
          trivy image --severity HIGH,CRITICAL --ignore-unfixed --exit-code "$TRIVY_EXIT_CODE" "$REGISTRY/$SERVER_REPO:$IMAGE_TAG"
          trivy image --severity HIGH,CRITICAL --ignore-unfixed --exit-code "$TRIVY_EXIT_CODE" "$REGISTRY/$CLIENT_REPO:$IMAGE_TAG"
        '''
      }
    }

    stage('Push to ECR') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'aws-credentials',
                                          usernameVariable: 'AWS_ACCESS_KEY_ID',
                                          passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
          sh '''
            aws ecr get-login-password | docker login --username AWS --password-stdin "$REGISTRY"
            for repo in "$SERVER_REPO" "$CLIENT_REPO"; do
              docker push "$REGISTRY/$repo:$IMAGE_TAG"
              docker tag  "$REGISTRY/$repo:$IMAGE_TAG" "$REGISTRY/$repo:latest"
              docker push "$REGISTRY/$repo:latest"
            done
          '''
        }
      }
    }

    stage('Deploy to EKS') {
      when { expression { params.DEPLOY_TO_EKS } }
      steps {
        withCredentials([
          usernamePassword(credentialsId: 'aws-credentials',
                           usernameVariable: 'AWS_ACCESS_KEY_ID',
                           passwordVariable: 'AWS_SECRET_ACCESS_KEY'),
          string(credentialsId: 'mongo-uri',  variable: 'MONGO_URI'),
          string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET')
        ]) {
          sh '''
            aws eks update-kubeconfig --region "$AWS_DEFAULT_REGION" --name "$EKS_CLUSTER"

            kubectl apply -f k8s/namespace.yaml

            # Secrets live only in the cluster, never in git
            kubectl -n jobtracker create secret generic jobtracker-secrets \
              --from-literal=MONGO_URI="$MONGO_URI" \
              --from-literal=JWT_SECRET="$JWT_SECRET" \
              --dry-run=client -o yaml | kubectl apply -f -

            export SERVER_IMAGE="$REGISTRY/$SERVER_REPO:$IMAGE_TAG"
            export CLIENT_IMAGE="$REGISTRY/$CLIENT_REPO:$IMAGE_TAG"
            envsubst '${SERVER_IMAGE}' < k8s/server.yaml | kubectl apply -f -
            envsubst '${CLIENT_IMAGE}' < k8s/client.yaml | kubectl apply -f -
            kubectl apply -f k8s/ingress.yaml

            kubectl -n jobtracker rollout status deployment/jobtracker-server --timeout=300s
            kubectl -n jobtracker rollout status deployment/jobtracker-client --timeout=300s

            echo "---- App URL (the ALB takes 2-3 minutes to appear) ----"
            kubectl -n jobtracker get ingress jobtracker
          '''
        }
      }
    }
  }

  post {
    always {
      sh 'docker image prune -f || true'
      cleanWs()
    }
    success { echo "Pushed ${env.IMAGE_TAG}${params.DEPLOY_TO_EKS ? ' and deployed to EKS' : ''}." }
    failure { echo 'Build failed. Open the failed stage above for the reason.' }
  }
}
