output "namespace_name" {
     value = kubernetes_namespace.resume_app.metadata[0].name
  
}
output "helm_release_status" {
  value = helm_release.genai_resume.status
}