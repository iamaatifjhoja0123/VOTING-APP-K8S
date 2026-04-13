# ☁️ The Cloud War: AWS vs Azure

A real-time voting application demonstrating a complete, production-ready **Cloud-Native DevSecOps Pipeline**.

### ⚡ Tech Stack
**Frontend:** React, Vite, Nginx  |  **Backend:** Node.js, Express  |  **Database:** Redis  
**DevOps:** Docker, Kubernetes (K8s), AWS ECR, Terraform  
**Security (DevSecOps):** GitHub Actions, Trivy (Image Scanning)

---

## 🎯 What this project does?
It’s not just a voting app; it’s a full DevOps journey:
1. **Develop:** Sleek Glassmorphism UI (React) with a fast backend API (Node + Redis).
2. **Containerize:** Multi-stage Docker builds for minimal image size.
3. **Automate & Secure (CI/CD):** Every push triggers a GitHub Action that uses **Trivy** to scan for vulnerabilities before pushing to **AWS ECR**.
4. **Orchestrate:** Deployed locally via Kubernetes with High Availability, ClusterIP for database security, and LoadBalancer for web access.

---

## 🚀 Run it Locally in 3 Steps

**Prerequisites:** Docker Desktop (K8s enabled) and `kubectl`.

**1. Clone & Apply**
```bash
git clone [https://github.com/iamaatifjhoja0123/VOTING-APP-K8S.git](https://github.com/iamaatifjhoja0123/VOTING-APP-K8S.git)
cd VOTING-APP-K8S
kubectl apply -f k8s-manifests/

# Built with by Aatif Jhoja