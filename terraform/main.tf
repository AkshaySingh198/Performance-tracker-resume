terraform {
  required_version = ">= 1.5.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.13.0"
    }
  }
}

# 1. Kubernetes Provider (Interacts directly with K8s API)
provider "kubernetes" {
  config_path = var.kube_config_path
}

# 2. Helm Provider (Deploys Helm charts via K8s API)
provider "helm" {
  kubernetes {
    config_path = var.kube_config_path
  }
}

# 3. Instantiate the K8s Application Module
module "k8s_app" {
  source = "./modules/k8s_app"

  namespace       = var.namespace
  helm_chart_path = var.helm_chart_path
  backend_image   = var.backend_image
  frontend_image  = var.frontend_image
}