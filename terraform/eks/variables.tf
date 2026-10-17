variable "region" {
  type    = string
  default = "ap-south-1"
}

variable "cluster_name" {
  type    = string
  default = "jobtracker-eks"
}

variable "kubernetes_version" {
  description = "Keep this inside EKS *standard* support; older versions are billed extra per hour. Check https://endoflife.date/amazon-eks"
  type        = string
  default     = "1.35"
}

variable "node_instance_types" {
  description = "Several types make Spot capacity easier to get"
  type        = list(string)
  default     = ["t3.medium", "t3a.medium"]
}

variable "capacity_type" {
  description = "SPOT is ~70% cheaper but nodes can be reclaimed. Use ON_DEMAND for a calmer demo."
  type        = string
  default     = "SPOT"
}

variable "node_desired_size" {
  type    = number
  default = 2
}

variable "admin_principal_arns" {
  description = "Extra IAM users/roles that get cluster admin (the identity running terraform always does). Put the IAM user Jenkins uses here if it differs."
  type        = list(string)
  default     = []
}
