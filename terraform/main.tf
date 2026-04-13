provider "aws" {
  region = "ap-south-1" 
}

# 1. Backend Repository
resource "aws_ecr_repository" "voting_backend" {
  name                 = "voting-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true 
  }
}

# 2. Frontend Repository
resource "aws_ecr_repository" "voting_frontend" {
  name                 = "voting-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Outputs 
output "backend_repo_url" {
  value = aws_ecr_repository.voting_backend.repository_url
}

output "frontend_repo_url" {
  value = aws_ecr_repository.voting_frontend.repository_url
}