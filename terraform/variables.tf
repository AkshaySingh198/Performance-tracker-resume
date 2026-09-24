variable "kube_config_path" {
  description = "Path to the local kubeconfig file"
  type        = string
  default     = "~/.kube/config"
}

variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "namespace" {
  description = "Kubernetes namespace for the resume application"
  type        = string
  default     = "resume"
}

variable "helm_chart_path" {
  description = "Relative path to local Helm chart"
  type        = string
  default     = "../helm/genai-resume-chart"
}

variable "backend_image" {
  description = "Docker image repository for the backend service"
  type        = string
  default     = "akshaydocker198/genai-resume-backend"
}

variable "frontend_image" {
  description = "Docker image repository for the frontend service"
  type        = string
  default     = "akshaydocker198/genai-resume-frontend"
}