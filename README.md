# truittjanney.com – Personal Portfolio Website

## Overview

This is my personal portfolio website designed to showcase my work as a software developer and DevOps/cloud-focused engineer. The site highlights my technical skillsets, projects, and includes a contact form for professional outreach.

Beyond being a portfolio, this project demonstrates my ability to design, secure, deploy, and monitor a production-ready static website using modern cloud infrastructure and CI/CD practices.

---

## Architecture

```
User → Route 53 → CloudFront → S3 (Private Origin)
```

* **Amazon Route 53** handles DNS resolution for the domain
* **Amazon CloudFront** acts as a global CDN to cache and deliver content with low latency
* **Amazon S3** stores static website assets and is configured as a private origin
* **AWS Certificate Manager (ACM)** provides HTTPS encryption

CloudFront uses Origin Access Control (OAC) to securely access the S3 bucket, preventing direct public access.

---

## CI/CD Pipeline

This project uses GitHub Actions to automate deployments.

### Deployment Flow

* Push to `dev` branch → deploys to development environment
* Push to `main` branch → deploys to production environment

### Pipeline Responsibilities

* Authenticate securely with AWS using **OIDC (no stored credentials)**
* Sync static files to S3
* Invalidate CloudFront cache after deployment

---

## Security

Security is a key focus of this project:

* Uses **OIDC (OpenID Connect)** for secure authentication between GitHub Actions and AWS
* No AWS access keys or secrets are stored
* IAM roles follow the **principle of least privilege**
* S3 buckets are **private** and only accessible via CloudFront (OAC)
* HTTPS is enforced using ACM

---

## Monitoring & Logging

To improve observability and reliability:

* **CloudWatch alarms** monitor CloudFront 4xx and 5xx error rates
* **Amazon SNS** sends email alerts when thresholds are exceeded
* **CloudFront access logs** are stored in S3 for debugging and traffic analysis

This enables proactive detection and troubleshooting of issues.

---

## Tech Stack

* HTML, CSS, JavaScript

**Amazon Web Services:**

* Amazon S3
* Amazon CloudFront
* Amazon Route 53
* AWS Certificate Manager (ACM)
* AWS IAM
* Amazon CloudWatch
* Amazon SNS

**DevOps / CI-CD:**

* Terraform
* GitHub Actions (OIDC authentication)

---

## Deployment Details

Static files are stored in the `/dist` directory and deployed using:

```bash
aws s3 sync ./dist s3://<bucket> --delete
```

CloudFront cache is invalidated after each deployment to ensure users receive the latest version.

---

## Key Learnings

Through this project, I gained hands-on experience with:

* Designing and deploying cloud architecture for static websites
* Implementing infrastructure as code using Terraform
* Building CI/CD pipelines using GitHub Actions
* Securing authentication with OIDC and IAM roles
* Managing Terraform state with S3 backend, versioning, and locking
* Understanding CDN caching behavior and invalidation strategies
* Implementing monitoring and alerting using CloudWatch and SNS

---

## Future Improvements

* Optional WAF integration for enhanced security

---

## Author

Truitt Janney
