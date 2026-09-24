resource "kubernetes_namespace" "resume_app" {
    metadata {
      name = var.namespace
    labels = {
      name        = var.namespace
      managed-by  = "terraform"
    }

  
}
}
resource "helm_release" "genai_resume" {
  name            = "genai-resume-app"
  namespace       = kubernetes_namespace.resume_app.metadata[0].name
  chart           = var.helm_chart_path
  force_update    = true
  replace         = true
  cleanup_on_fail = true
  values          = [file("${var.helm_chart_path}/values.yaml")]

  
    set{
      name  = "global.namespace"
      value = var.namespace
    }
    set{
      name  = "backend.image.repository"
      value = var.backend_image
    }
    set{
      name  = "frontend.image.repository"
      value = var.frontend_image
    }
  
}
