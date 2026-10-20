#!/usr/bin/env bash
# Create the EKS cluster (billing starts: ~$0.10/hour for the control plane + nodes).
set -euo pipefail
cd "$(dirname "$0")/../terraform/eks"

terraform init -input=false
terraform apply

REGION=$(terraform output -raw region)
NAME=$(terraform output -raw cluster_name)
aws eks update-kubeconfig --region "$REGION" --name "$NAME"

echo
echo "Cluster is up. Billing is running. When you are done:  ./scripts/eks-down.sh"
kubectl get nodes
