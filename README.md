# truittjanney.com – Personal Portfolio Website

## Links

**Live Website:** [truittjanney.com](https://truittjanney.com)  
**Infrastructure Repository:** [truittjanney.com-infrastructure](https://github.com/truittjanney/truittjanney.com-infrastructure)

---

## Overview

This repository contains the frontend and deployment pipeline for [truittjanney.com](https://truittjanney.com), my personal portfolio showcasing my work across full-stack development, DevOps, and cloud engineering.

The portfolio is also a production cloud infrastructure project. It is delivered through a private Amazon S3 origin behind CloudFront, deployed through GitHub Actions using OIDC authentication, and monitored with CloudWatch and SNS. The AWS infrastructure is managed with Terraform in the [infrastructure repository](https://github.com/truittjanney/truittjanney.com-infrastructure).

---

## Architecture

```
User → Route 53 → CloudFront → S3 (Private Origin)
```

- **Amazon Route 53** handles DNS resolution for the domain
- **Amazon CloudFront** acts as a global CDN to cache and deliver content with low latency
- **Amazon S3** stores static website assets and is configured as a private origin
- **AWS Certificate Manager (ACM)** provides HTTPS encryption

CloudFront uses Origin Access Control (OAC) to securely access the S3 bucket, preventing direct public access.

---

## Engineering Highlights

- Provisioned separate development and production AWS environments with Terraform
- Configured private S3 origins accessible exclusively through CloudFront OAC
- Built branch-based deployment pipelines for development and production
- Implemented keyless AWS authentication using GitHub Actions and OIDC
- Managed remote Terraform state with S3 versioning and state locking
- Configured CloudWatch alarms and SNS notifications for error monitoring
- Implemented CloudFront cache invalidation after every deployment

---

## Tech Stack

- HTML, CSS, JavaScript

**Amazon Web Services:**

- Amazon S3
- Amazon CloudFront
- Amazon Route 53
- AWS Certificate Manager (ACM)
- AWS IAM
- Amazon CloudWatch
- Amazon SNS

**DevOps / CI/CD:**

- Terraform
- GitHub Actions (OIDC authentication)

---

## CI/CD Pipeline

This project uses GitHub Actions to automate deployments.

### Deployment Flow

- Push to `dev` branch → deploys to development environment
- Push to `main` branch → deploys to production environment

### Deployment Details

Static files are stored in the `dist/` directory and deployed using:

```bash
aws s3 sync ./dist s3://<bucket> --delete
```

CloudFront cache is invalidated after each deployment to ensure users receive the latest version.

### Pipeline Responsibilities

- Authenticate securely with AWS using **OIDC (no stored credentials)**
- Sync static files to S3
- Invalidate CloudFront cache after deployment

---

## Security

Security is a key focus of this project:

- Uses **OIDC (OpenID Connect)** for secure authentication between GitHub Actions and AWS
- No long-lived AWS credentials are stored in GitHub
- IAM roles follow the **principle of least privilege**
- S3 buckets are **private** and only accessible via CloudFront (OAC)
- HTTPS is enforced using ACM

---

## Monitoring & Logging

To improve observability and reliability:

- **CloudWatch alarms** monitor CloudFront 4xx and 5xx error rates
- **Amazon SNS** sends email alerts when thresholds are exceeded
- **CloudFront access logs** are stored in S3 for debugging and traffic analysis

This enables proactive detection and troubleshooting of issues.

---

## Local Development

No build step is required. From the repository root directory, serve the contents of `dist` locally:

```bash
python3 -m http.server 4173 --directory dist
```

Install the development dependency:

```bash
npm ci
```

Check formatting:

```bash
npm run format:check
```

---

## Author

Truitt Janney
