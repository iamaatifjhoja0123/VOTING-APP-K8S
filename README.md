# ☁️ The Cloud War: Enterprise DevOps & GitOps Pipeline

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)

A production-grade, full-stack voting application (AWS vs Azure) built to demonstrate a complete **Cloud-Native DevSecOps, GitOps, and Observability lifecycle**. This project goes beyond application code to showcase robust cloud infrastructure automation.

![Top10News Architecture Diagram](diagram.png)

---

## 🏗️ Architecture & Implementation Phases

### Phase 1: Application Development (Local Code)
The foundation of the architecture consists of a highly responsive frontend and a decoupled backend architecture.
- **Backend API:** Built with Node.js & Express, utilizing a fast in-memory **Redis** datastore for vote counting.
- **Frontend:** Built with React.js + Vite, styled with a modern Glassmorphism UI.

### Phase 2: Containerization (Docker)
Ensuring immutable infrastructure and consistent environments across local and cloud setups.
- **Node.js Dockerfile:** Optimized image for the backend API.
- **React.js Dockerfile:** Utilized **Multi-stage builds** (Node builder -> Nginx server) to drastically reduce image size and serve static assets securely.
- **Registry:** Successfully authenticated and pushed tagged images to **Amazon ECR (Elastic Container Registry)**.

### Phase 3: Kubernetes Manifests (The YAMLs)
Orchestrating the containers for High Availability, Auto-healing, and secure networking.
- **Redis:** Deployed securely behind a `ClusterIP` service (Internal traffic only).
- **Backend (Node.js):** Configured with `Deployment` and exposed internally via `ClusterIP`.
- **Frontend (React):** Exposed to the public internet using a K8s `LoadBalancer` service.

---

## 🚀 Phase 4: The DevOps Master Plan
This section highlights the advanced integrations that elevate this project from a simple app to an enterprise cloud architecture.

### 🛡️ DevSecOps (Shift-Left Security)
*Automated CI/CD Pipeline via GitHub Actions.*
- Configured workflows triggered on code pushes.
- **Trivy Vulnerability Scanner** integrated directly into the pipeline to scan Docker images for `CRITICAL` and `HIGH` vulnerabilities.
- Pipeline pushes images to **AWS ECR** *only* if the security scan passes with an exit code of `0`.

### 🔄 GitOps (Continuous Delivery)
*Infrastructure as Code (IaC) and drift reconciliation via ArgoCD.*
- Deployed **ArgoCD** into the Kubernetes cluster.
- Pointed the ArgoCD application directly to the `k8s-manifests/` folder in this GitHub repository.
- **Auto-Sync enabled:** Any changes pushed to the YAML files (e.g., scaling replicas) are automatically detected and applied to the **AWS EKS** cluster without manual `kubectl` intervention.

### 📈 Observability & Alerting
*Monitoring system health and ensuring reliability.*
- Deployed the **Kube-Prometheus-Stack** via Helm charts.
- **Prometheus** actively scrapes metrics from the Kubernetes nodes and pods.
- Built live visualization dashboards in **Grafana** to track CPU and Memory usage across all namespaces.
- **Chaos Testing & Alerts:** Created a `/stress` API endpoint to artificially spike CPU usage. Configured Grafana to detect spikes >80% and automatically trigger real-time **Slack Notifications**.

---

## ⚙️ Tech Stack Summary
- **Cloud Provider:** Amazon Web Services (EKS, ECR)
- **Containerization & Orchestration:** Docker, Kubernetes (K8s)
- **GitOps & CI/CD:** ArgoCD, GitHub Actions
- **Security:** Aqua Security Trivy
- **Observability:** Prometheus, Grafana, Slack Webhooks
- **Application:** React.js, Node.js, Express, Redis, Nginx

---
*Developed as a comprehensive showcase of modern DevOps engineering principles.*