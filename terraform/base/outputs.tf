output "ecr_repository_urls" {
  description = "Push images here"
  value       = { for name, repo in aws_ecr_repository.this : name => repo.repository_url }
}

output "region" {
  value = var.region
}
