terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }

  # Local state is fine for learning. To keep state safely in S3 later,
  # create a bucket and replace this with a backend "s3" block.
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      project    = "jobtracker-devops"
      managed_by = "terraform"
      stack      = "base"
    }
  }
}
