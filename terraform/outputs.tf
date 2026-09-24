output "deployed_namespace" {
  description = "The Kubernetes namespace created by Terraform"
  value       = module.k8s_app.namespace_name
}

output "helm_release_status" {
  description = "Status of the deployed Helm release"
  value       = module.k8s_app.helm_release_status
}