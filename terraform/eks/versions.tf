terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.17" # 2.x uses the `kubernetes { }` block syntax below
    }
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      project    = "jobtracker-devops"
      managed_by = "terraform"
      stack      = "eks"
    }
  }
}

# Talks to the cluster using your AWS CLI credentials, so the `aws` CLI
# must be installed on the machine running terraform.
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name, "--region", var.region]
    }
  }
}
