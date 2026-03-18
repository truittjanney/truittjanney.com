# truittjanney.com – Personal Portfolio Website

## Overview

This is my personal portfolio website designed to showcase my work as a software developer and devops/cloud focused engineer. The site highlights my projects, technical skillset, and includes a contact form for professional outreach.

Beyond being a portfolio, this project demonstrates my ability to design, secure, and deploy a production-ready static website using modern cloud infrastructure and CI/CD practices.

## Architecture

```
User → CloudFront → S3 (Static Website Hosting)
```

- Amazon CloudFront is used as a global CDN to cache and deliver content with low latency
- Amazon S3 stores and serves static website assets
- Amazon Route 53 handles DNS routing for the domain

## CI/CD Pipeline

This project uses GitHub Actions to automate deployments.

**Deployment Flow:**
- Push to `dev` branch → deploys to development environment
- Push to `main` branch → deploys to production environment

**Pipeline Responsibilities:**
- Authenticate securely with AWS using OIDC (no stored credentials)
- Sync static files to S3
- Invalidate CloudFront cache after deployment

## Security

A key focus of this project is secure deployment:

- Uses OIDC (OpenID Connect) to authenticate GitHub Actions with AWS
- No AWS access keys or secrets stored in the repository
- IAM role follows least privilege principle
- Short-lived credentials are automatically generated and rotated

## Tech Stack

- HTML, CSS, JavaScript
- **Amazon Web Services:**
  - Amazon S3
  - Amazon CloudFront
  - Amazon Route 53
  - IAM (OIDC Authentication)
- **GitHub:**
  - GitHub Actions

## Deployment Details

Static files are stored in the `/dist` directory for S3 uploads.

**Deployed using:**
```bash
aws s3 sync ./dist s3://<bucket> --delete
```

CloudFront cache is invalidated after each deployment to ensure users receive the latest version.

## Key Learnings

Through this project, I gained hands-on experience with:

- Designing cloud architecture for static websites
- Building CI/CD pipelines using GitHub Actions
- Implementing secure authentication using OIDC
- Managing AWS IAM roles and permissions
- Understanding CDN caching and invalidation strategies

## Future Improvements

- Advanced cache control strategies for improved performance
- Custom domain enhancements and monitoring
- Logging and observability (CloudWatch)

## Author

Truitt Janney
