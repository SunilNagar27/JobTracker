#!/usr/bin/env bash
# Destroy the whole EKS stack safely so billing stops.
#
# Why not just `terraform destroy`? The ALB is created by the in-cluster controller,
# not by Terraform. If the VPC is destroyed while the ALB still exists, destroy hangs
# or leaves an ALB (~$16/month) behind. So we delete the Ingress first.
set -uo pipefail
cd "$(dirname "$0")/../terraform/eks"

REGION="${AWS_REGION:-ap-south-1}"
NAME="${CLUSTER_NAME:-jobtracker-eks}"

read -r -p "Destroy cluster '$NAME' in $REGION and everything in it? (yes/no) " ANSWER
[ "$ANSWER" = "yes" ] || { echo "Cancelled."; exit 1; }

if aws eks describe-cluster --region "$REGION" --name "$NAME" >/dev/null 2>&1; then
  aws eks update-kubeconfig --region "$REGION" --name "$NAME" >/dev/null
  echo "Deleting Ingress so the controller removes the ALB..."
  kubectl delete ingress --all --all-namespaces --wait=true --timeout=300s || true
  kubectl delete namespace jobtracker --wait=true --timeout=300s || true
  echo "Waiting 60s for AWS to finish deleting the load balancer..."
  sleep 60
fi

terraform destroy -auto-approve

echo
echo "Destroyed. Double-check nothing is left over:"
echo "  aws eks list-clusters --region $REGION"
echo "  aws elbv2 describe-load-balancers --region $REGION --query 'LoadBalancers[].LoadBalancerName'"
echo "  aws ec2 describe-volumes --region $REGION --query 'Volumes[].VolumeId'"
