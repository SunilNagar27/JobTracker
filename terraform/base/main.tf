# ---------------------------------------------------------------
# Base stack: things that are cheap and should survive between
# EKS sessions (image registry + cost alarms).
# ---------------------------------------------------------------

resource "aws_ecr_repository" "this" {
  for_each = toset(var.ecr_repositories)

  name                 = each.key
  image_tag_mutability = "MUTABLE"
  force_delete         = true # lets `terraform destroy` remove repos that still hold images

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

resource "aws_ecr_lifecycle_policy" "this" {
  for_each   = aws_ecr_repository.this
  repository = each.value.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep only the last ${var.keep_last_images} images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = var.keep_last_images
      }
      action = { type = "expire" }
    }]
  })
}

# Budget that tracks real usage, ignoring promotional credits, so you get
# warned even while the $100 credit is hiding the bill.
resource "aws_budgets_budget" "monthly" {
  name         = "jobtracker-monthly"
  budget_type  = "COST"
  limit_amount = tostring(var.budget_usd)
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  cost_types {
    include_credit   = false
    include_discount = false
    include_refund   = false
    include_support  = false
  }

  dynamic "notification" {
    for_each = [20, 60, 100]
    content {
      comparison_operator        = "GREATER_THAN"
      threshold                  = notification.value
      threshold_type             = "PERCENTAGE"
      notification_type          = "ACTUAL"
      subscriber_email_addresses = [var.alert_email]
    }
  }
}
