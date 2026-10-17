variable "region" {
  description = "AWS region for everything in this project"
  type        = string
  default     = "ap-south-1"
}

variable "ecr_repositories" {
  description = "ECR repositories to create (one per image)"
  type        = list(string)
  default     = ["jobtracker-server", "jobtracker-client"]
}

variable "keep_last_images" {
  description = "How many images to keep per repository (older ones are deleted)"
  type        = number
  default     = 10
}

variable "alert_email" {
  description = "Email that receives budget alerts"
  type        = string
}

variable "budget_usd" {
  description = "Monthly budget in USD. Alerts fire at 20%, 60% and 100% of this."
  type        = number
  default     = 50
}
