<div align="center">

# 🚀 RepoLens AI
### AI-Powered GitHub Repository Intelligence Platform

<p align="center">
Analyze any public GitHub repository with AI-powered insights, repository health scoring, code quality metrics, security checks, developer productivity analysis, and actionable recommendations.
</p>

<p align="center">

![GitHub stars](https://img.shields.io/github/stars/Mausam-Kumari9534/RepoLens-AI?style=for-the-badge)

![GitHub forks](https://img.shields.io/github/forks/Mausam-Kumari9534/RepoLens-AI?style=for-the-badge)

![GitHub issues](https://img.shields.io/github/issues/Mausam-Kumari9534/RepoLens-AI?style=for-the-badge)

![GitHub License](https://img.shields.io/github/license/Mausam-Kumari9534/RepoLens-AI?style=for-the-badge)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge)

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?style=for-the-badge)

![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge)

![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge)

![AI Powered](https://img.shields.io/badge/AI-Powered-success?style=for-the-badge)

</p>

</div>

---

# 🌟 Overview

RepoLens AI is an intelligent GitHub repository analytics platform that provides deep insights into software projects by analyzing repository structure, commit history, programming languages, contributors, documentation quality, security posture, and overall maintainability.

Unlike basic repository viewers, RepoLens AI evaluates engineering quality, project maturity, developer productivity, and repository health using an advanced scoring engine.

Whether you're a recruiter, software engineer, open-source contributor, or engineering manager, RepoLens AI helps you make data-driven decisions with beautiful dashboards and actionable recommendations.

---

# ✨ Why RepoLens AI?

Traditional GitHub repository viewers only display repository metadata.

RepoLens AI goes much further by analyzing:

- Repository Health
- Code Quality
- Contributor Activity
- Documentation
- Repository Structure
- Project Maturity
- Security Best Practices
- Technology Stack
- Performance Indicators
- Development Trends

---

# 🎯 Key Features

## 📊 Repository Intelligence

- Repository Health Score
- Code Quality Analysis
- Activity Monitoring
- Commit Insights
- Branch Analytics
- Release Tracking
- Issue Monitoring
- Pull Request Metrics
- Contributor Statistics

---

## ⚡ Performance Analytics

- Repository Growth
- Weekly Commits
- Monthly Activity
- Development Velocity
- Project Stability
- Maintenance Score

---

## 🔒 Security Analysis

- License Detection

- Secret Detection

- Git Ignore Validation

- Repository Visibility

- Dependency Health

- Security Recommendations

---

## 🤖 AI Insights

- Project Summary

- Repository Strengths

- Weaknesses

- Improvement Suggestions

- Career Readiness Score

- Open Source Readiness

---

# 📷 Screenshots

## 🏠 Home

```text
screenshots/home.png
```

---

## 📈 Repository Dashboard

```text
screenshots/dashboard.png
```

---

## 📊 Analytics

```text
screenshots/analytics.png
```

---

## 🧠 AI Recommendations

```text
screenshots/recommendations.png
```

---

## 🏆 Final Score

```text
screenshots/final-score.png
```

---

# 🚀 Live Demo

```
https://your-demo-link.vercel.app
```

---

# 🎥 Demo Video

```
https://youtube.com/your-demo
```

---

# 📑 Table of Contents

- Overview
- Features
- Technology Stack
- Architecture
- Installation
- Environment Variables
- Workflow
- Folder Structure
- APIs
- Security
- Roadmap
- Contribution
- License

---

# 🛠 Technology Stack

## Frontend

- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Router
- Lucide Icons
- Recharts

---

## Backend

- Supabase
- PostgreSQL
- Edge Functions

---

## APIs

- GitHub REST API
- GitHub GraphQL API

---

## Build Tools

- Vite
- ESLint
- PostCSS

---

# 📂 Project Structure

RepoLens-AI

├── public/

├── src/

│ ├── assets/

│ ├── components/

│ ├── pages/

│ ├── hooks/

│ ├── services/

│ ├── lib/

│ ├── utils/

│ ├── types/

│ ├── styles/

│ └── App.tsx

├── supabase/

├── package.json

├── vite.config.ts

├── tsconfig.json

└── README.md

---

# ⚙️ Installation

Clone repository

```bash
git clone https://github.com/Mausam-Kumari9534/RepoLens-AI.git
```

Move inside project

```bash
cd RepoLens-AI
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build Production

```bash
npm run build
```

Preview

```bash
npm run preview
```

---

# 🌍 Environment Variables

Create a `.env` file

```env
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=

VITE_GITHUB_API=https://api.github.com
```

---

# 🧩 Core Modules

- Dashboard
- Repository Scanner
- GitHub API Client
- Score Engine
- AI Recommendation Engine
- Analytics Engine
- Charts Engine
- Authentication
- Settings
- Export Reports

---
---

# 🏗️ System Architecture

```mermaid
flowchart LR

    USER([👨 User])

    USER --> UI[React + TypeScript Frontend]

    UI --> Router

    Router --> Dashboard
    Router --> RepositoryScanner
    Router --> Analytics
    Router --> AIEngine

    RepositoryScanner --> GitHubAPI

    Analytics --> ScoreEngine

    GitHubAPI --> RepoData

    RepoData --> ScoreEngine

    ScoreEngine --> Charts

    ScoreEngine --> Recommendation

    Recommendation --> Dashboard

    Dashboard --> USER
```

---

# ⚙️ Complete Audit Workflow

```mermaid
flowchart TD

A([Start])

A --> B[Enter Repository URL]

B --> C{Validate URL}

C -->|Invalid| D[Show Error]

C -->|Valid| E[Call GitHub API]

E --> F[Repository Information]

F --> G[Analyze Repository]

G --> H[Repository Health]

G --> I[Commit History]

G --> J[Languages]

G --> K[Contributors]

G --> L[License]

H --> M[Score Engine]

I --> M

J --> M

K --> M

L --> M

M --> N[Generate AI Suggestions]

N --> O[Dashboard]

O --> P([Completed])
```

---

# 🔥 GitHub Analysis Engine

```mermaid
graph TD

Repo

Repo --> Files

Repo --> Branches

Repo --> Commits

Repo --> Contributors

Repo --> Releases

Repo --> Issues

Repo --> PullRequests

Files --> RepositoryScore

Branches --> RepositoryScore

Commits --> RepositoryScore

Contributors --> RepositoryScore

Releases --> RepositoryScore

Issues --> RepositoryScore

PullRequests --> RepositoryScore

RepositoryScore --> FinalReport
```

---

# 📈 Score Calculation

```mermaid
flowchart LR

Repository --> CodeQuality

Repository --> Documentation

Repository --> Activity

Repository --> Security

Repository --> Contributors

CodeQuality --> Score

Documentation --> Score

Activity --> Score

Security --> Score

Contributors --> Score

Score --> OverallHealth
```

---

# 🌐 GitHub API Workflow

```mermaid
sequenceDiagram

User->>Frontend: Enter Repository URL

Frontend->>GitHubAPI: Request Repository

GitHubAPI-->>Frontend: Repository Metadata

Frontend->>GitHubAPI: Contributors

GitHubAPI-->>Frontend: Contributor Data

Frontend->>GitHubAPI: Languages

GitHubAPI-->>Frontend: Language Statistics

Frontend->>GitHubAPI: Commits

GitHubAPI-->>Frontend: Commit History

Frontend->>Analysis Engine: Analyze Repository

Analysis Engine-->>Frontend: Repository Score

Frontend-->>User: Display Dashboard
```

---

# 🧠 AI Recommendation Pipeline

```mermaid
flowchart LR

Repository

Repository --> Analyzer

Analyzer --> AIEngine

AIEngine --> Strengths

AIEngine --> Weaknesses

AIEngine --> Suggestions

AIEngine --> BestPractices

Strengths --> Dashboard

Weaknesses --> Dashboard

Suggestions --> Dashboard

BestPractices --> Dashboard
```

---

# 📊 Dashboard Flow

```mermaid
flowchart TD

Repository

Repository --> Metrics

Metrics --> Charts

Metrics --> Graphs

Metrics --> Tables

Charts --> Dashboard

Graphs --> Dashboard

Tables --> Dashboard
```

---

# ⚡ Repository Lifecycle

```mermaid
stateDiagram-v2

[*] --> RepositoryCreated

RepositoryCreated --> Development

Development --> Testing

Testing --> Production

Production --> Maintenance

Maintenance --> Archived

Archived --> [*]
```

---

# 🧩 Component Architecture

```mermaid
classDiagram

class Dashboard

class RepositoryScanner

class GitHubAPI

class ScoreEngine

class AIRecommendation

class Charts

Dashboard --> RepositoryScanner

RepositoryScanner --> GitHubAPI

GitHubAPI --> ScoreEngine

ScoreEngine --> AIRecommendation

AIRecommendation --> Charts

Charts --> Dashboard
```

---

# 🔄 Data Flow

```mermaid
flowchart LR

User

User --> Frontend

Frontend --> API

API --> Repository

Repository --> Analysis

Analysis --> Dashboard

Dashboard --> User
```

---

# 🖥 ASCII Architecture

```text

                    ┌──────────────────────────┐
                    │          USER            │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                 ┌────────────────────────────────┐
                 │ React + TypeScript Frontend    │
                 └───────────────┬────────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
 Repository Scanner         Dashboard             Analytics
          │                      │                      │
          └──────────────┬───────┴──────────────┬───────┘
                         ▼                      ▼
                  GitHub REST API        Score Engine
                         │                      │
                         ▼                      ▼
                Repository Metadata     AI Recommendation
                         │                      │
                         └──────────────┬───────┘
                                        ▼
                               Charts & Reports
                                        │
                                        ▼
                                     Dashboard
                                        │
                                        ▼
                                       USER
```

---

# 📁 Internal Folder Workflow

```mermaid
graph TD

src

src --> components

src --> hooks

src --> lib

src --> pages

src --> services

src --> utils

src --> assets

src --> types

services --> github.ts

services --> analysis.ts

services --> recommendation.ts

pages --> Dashboard

pages --> Home

pages --> Settings
```

---

# 🎯 Repository Audit Parameters

| Category | Description |
|-----------|-------------|
| ⭐ Stars | Popularity Score |
| 🍴 Forks | Community Adoption |
| 📝 README | Documentation Quality |
| 🔒 License | Open Source Readiness |
| 📦 Releases | Version Stability |
| 👨‍💻 Contributors | Team Collaboration |
| 🔥 Activity | Development Velocity |
| 🐞 Issues | Maintenance |
| 🔀 Pull Requests | Code Review Process |
| 📈 Commits | Development Consistency |

---

---

# 🚀 Deployment Architecture

```mermaid
flowchart LR

Developer

Developer --> GitHub

GitHub --> GitHubActions

GitHubActions --> Build

Build --> Testing

Testing --> Vercel

Testing --> Supabase

Supabase --> PostgreSQL

Vercel --> LiveWebsite

LiveWebsite --> Users
```

---

# 🔐 Security Architecture

```mermaid
flowchart TD

User

User --> Authentication

Authentication --> Authorization

Authorization --> API

API --> Validation

Validation --> Database

Database --> Encryption

Encryption --> SecureStorage

SecureStorage --> Response
```

---

# ⚙️ CI/CD Pipeline

```mermaid
flowchart LR

Code

Code --> Git

Git --> GitHub

GitHub --> GitHubActions

GitHubActions --> InstallDependencies

InstallDependencies --> Lint

Lint --> Test

Test --> Build

Build --> Deploy

Deploy --> Production
```

---

# 📡 Request Lifecycle

```mermaid
sequenceDiagram

participant User
participant UI
participant API
participant GitHub
participant AI
participant Dashboard

User->>UI: Submit Repository

UI->>API: Validate

API->>GitHub: Fetch Repository

GitHub-->>API: Repository Data

API->>AI: Analyze

AI-->>API: Score

API-->>Dashboard: Charts

Dashboard-->>User: Results
```

---

# 📊 Repository Analysis Pipeline

```mermaid
graph TD

Repository

Repository --> SourceCode

Repository --> README

Repository --> Contributors

Repository --> Branches

Repository --> Releases

Repository --> Activity

SourceCode --> Analyzer

README --> Analyzer

Contributors --> Analyzer

Branches --> Analyzer

Releases --> Analyzer

Activity --> Analyzer

Analyzer --> RepositoryHealth

RepositoryHealth --> Dashboard
```

---

# 🧠 AI Analysis Engine

```mermaid
graph LR

Repository

Repository --> Parser

Parser --> Metrics

Metrics --> AI

AI --> Score

AI --> Recommendations

AI --> Improvements

Recommendations --> Dashboard

Improvements --> Dashboard
```

---

# ☁ Cloud Infrastructure

```mermaid
flowchart TD

Internet

Internet --> DNS

DNS --> Vercel

Vercel --> ReactApp

ReactApp --> GitHubAPI

ReactApp --> Supabase

Supabase --> PostgreSQL
```

---

# 📈 Project Timeline

```mermaid
gantt

title RepoLens AI Development Timeline

dateFormat YYYY-MM-DD

section Planning

Research :done, p1,2026-01-01,7d

UI Design :done,p2,2026-01-08,10d

section Development

Frontend :active,p3,2026-01-20,20d

GitHub API:p4,2026-02-05,12d

AI Engine:p5,2026-02-15,15d

Dashboard:p6,2026-03-01,12d

section Deployment

Testing:p7,2026-03-18,7d

Production:p8,2026-03-26,4d
```

---

# 📊 Project Distribution

```mermaid
pie title Project Modules

"Frontend" : 35

"GitHub API" : 20

"AI Engine" : 20

"Dashboard" : 10

"Supabase" : 10

"Deployment" : 5
```

---

# 🚀 User Journey

```mermaid
journey

title RepoLens AI User Journey

section Repository Audit

Open Website :5:User

Paste Repository URL :5:User

Start Analysis :5:User

section Processing

Fetch GitHub Data :5:System

Analyze Repository :5:System

Generate Insights :5:System

section Dashboard

Repository Score :5:User

Charts :5:User

Recommendations :5:User

Export Report :5:User
```

---

# 📊 Repository Health Score

| Category | Weight |
|-----------|-------:|
| Code Quality | 25% |
| Documentation | 15% |
| Repository Activity | 15% |
| Contributors | 10% |
| Issues | 10% |
| Pull Requests | 10% |
| Releases | 10% |
| Security | 5% |
| Community | 5% |
| Overall Score | 100% |

---

# 💻 Supported Technologies

| Category | Technologies |
|------------|----------------------------|
| Frontend | React, TypeScript, Vite |
| UI | Tailwind CSS, shadcn/ui |
| Backend | Supabase |
| Database | PostgreSQL |
| APIs | GitHub REST API |
| Charts | Recharts |
| Icons | Lucide React |
| Authentication | Supabase Auth |
| Deployment | Vercel |
| Package Manager | npm |

---

# 📈 Repository Metrics

✔ Repository Score

✔ Code Quality

✔ Open Source Readiness

✔ Community Score

✔ Contributor Activity

✔ Weekly Commits

✔ Monthly Activity

✔ Branch Analysis

✔ Release History

✔ Repository Size

✔ Technology Detection

✔ Documentation Score

✔ Security Analysis

✔ Repository Popularity

✔ Commit Frequency

✔ Issue Tracking

✔ Pull Request Statistics

✔ License Detection

✔ Maintenance Score

✔ AI Recommendations

---

# 🧩 Major Modules

```

📦 RepoLens AI

┣ 📂 Dashboard

┣ 📂 Repository Scanner

┣ 📂 GitHub API

┣ 📂 AI Engine

┣ 📂 Analytics

┣ 📂 Charts

┣ 📂 Recommendation System

┣ 📂 Authentication

┣ 📂 Settings

┣ 📂 Reports

┗ 📂 Export Engine

```

---

# ⭐ Core Features

- Intelligent GitHub Repository Analysis
- Repository Health Score
- AI Recommendations
- Code Quality Detection
- Documentation Quality
- Commit History Analysis
- Contributor Insights
- Language Statistics
- Branch Analytics
- Release Monitoring
- Open Source Readiness
- Security Best Practices
- Dashboard Analytics
- Export Reports
- Interactive Charts
- Responsive UI
- Dark / Light Theme
- Fast Performance
- Modern Design

---

---

# 🔌 API Documentation

RepoLens AI integrates multiple APIs to generate accurate repository analytics and AI-powered insights.

---

# 🌍 GitHub REST API

## Repository Information

```http
GET /repos/{owner}/{repo}
```

Response

```json
{
  "name":"RepoLens-AI",
  "language":"TypeScript",
  "stars":120,
  "forks":24,
  "watchers":18,
  "issues":12,
  "license":"MIT"
}
```

---

## Contributors

```http
GET /repos/{owner}/{repo}/contributors
```

---

## Languages

```http
GET /repos/{owner}/{repo}/languages
```

---

## Commits

```http
GET /repos/{owner}/{repo}/commits
```

---

## Branches

```http
GET /repos/{owner}/{repo}/branches
```

---

## Pull Requests

```http
GET /repos/{owner}/{repo}/pulls
```

---

## Releases

```http
GET /repos/{owner}/{repo}/releases
```

---

## Issues

```http
GET /repos/{owner}/{repo}/issues
```

---

# 🛢 Supabase Architecture

```mermaid
flowchart LR

Frontend

Frontend --> Auth

Frontend --> Database

Frontend --> Storage

Auth --> PostgreSQL

Database --> PostgreSQL

Storage --> PostgreSQL
```

---

# 🗄 Database Design

```mermaid
erDiagram

USERS ||--o{ REPORTS : creates

USERS ||--o{ ANALYTICS : owns

REPORTS ||--o{ SCORES : contains

REPORTS ||--o{ RECOMMENDATIONS : generates

ANALYTICS ||--o{ CHARTS : displays
```

---

# 📂 Database Tables

## Users

| Column | Type |
|---------|------|
| id | UUID |
| name | TEXT |
| email | TEXT |
| avatar | TEXT |
| created_at | TIMESTAMP |

---

## Reports

| Column | Type |
|---------|------|
| id | UUID |
| repo_name | TEXT |
| owner | TEXT |
| score | INTEGER |
| report | JSON |
| created_at | TIMESTAMP |

---

## Analytics

| Column | Type |
|---------|------|
| id | UUID |
| report_id | UUID |
| commits | INTEGER |
| contributors | INTEGER |
| issues | INTEGER |
| releases | INTEGER |

---

# 🔄 Complete Data Flow

```mermaid
flowchart TD

RepositoryURL

RepositoryURL --> Validator

Validator --> GitHubAPI

GitHubAPI --> Parser

Parser --> Analyzer

Analyzer --> AIEngine

AIEngine --> ReportGenerator

ReportGenerator --> Dashboard

Dashboard --> User
```

---

# 🧠 AI Scoring Engine

```mermaid
graph TD

Repository

Repository --> CodeQuality

Repository --> Documentation

Repository --> Community

Repository --> Security

Repository --> Activity

Repository --> Releases

CodeQuality --> FinalScore

Documentation --> FinalScore

Community --> FinalScore

Security --> FinalScore

Activity --> FinalScore

Releases --> FinalScore
```

---

# 🏆 Repository Score Formula

```text

Repository Score

=

(Code Quality × 25%)

+

(Documentation × 15%)

+

(Activity × 15%)

+

(Security × 15%)

+

(Community × 10%)

+

(Contributors × 10%)

+

(Releases × 10%)

```

---

# ⚡ Performance Optimizations

✔ Lazy Loading

✔ Code Splitting

✔ Dynamic Imports

✔ React Memo

✔ Suspense

✔ Optimized Rendering

✔ API Caching

✔ Error Boundary

✔ Skeleton Loading

✔ Responsive Images

✔ Vite Optimizations

✔ Tree Shaking

✔ Bundle Optimization

✔ TypeScript Strict Mode

---

# 🧩 Folder Explanation

```

src/

├── assets/

Images

Icons

Logos

Fonts

---

components/

Cards

Charts

Navbar

Sidebar

Footer

Buttons

Forms

Loader

---

hooks/

Custom Hooks

GitHub Hooks

Theme Hooks

---

pages/

Home

Dashboard

Analytics

Settings

About

---

services/

GitHub API

AI Engine

Repository Scanner

Recommendation Engine

---

utils/

Formatter

Validator

Helpers

Score Calculator

---

types/

Repository

User

Analytics

API Response

```

---

# 🌐 Environment Variables

```env

VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=

VITE_GITHUB_TOKEN=

VITE_GITHUB_API=https://api.github.com

VITE_APP_NAME=RepoLens AI

VITE_APP_VERSION=1.0.0

```

---

# 🚀 Running Locally

```bash

git clone https://github.com/Mausam-Kumari9534/RepoLens-AI.git

cd RepoLens-AI

npm install

npm run dev

```

---

# 📦 Production Build

```bash

npm run build

```

---

# 👀 Preview

```bash

npm run preview

```

---

# 🧪 Lint

```bash

npm run lint

```

---

# 📊 Performance Metrics

| Metric | Target |
|---------|---------|
| Lighthouse | 95+ |
| Accessibility | 100 |
| SEO | 100 |
| Best Practices | 100 |
| Performance | 95+ |

---

# 🔐 Security Features

- Environment Variable Protection
- GitHub Token Isolation
- Secure API Calls
- HTTPS Only
- Input Validation
- URL Sanitization
- XSS Protection
- CORS Handling
- Rate Limiting Ready
- Secure Authentication
- Protected Database Access

---
---

# 👩‍💻 Author

<div align="center">

## **Mausam Kumari**

🚀 **Full Stack Developer | DevOps Enthusiast | Open Source Contributor**

Passionate about building scalable full-stack applications, modern DevOps workflows, cloud-native solutions, and AI-powered developer tools. I enjoy creating production-ready software with clean architecture, automation, and exceptional user experience.

<p align="center">
  <a href="https://github.com/Mausam-Kumari9534">
    <img src="https://img.shields.io/badge/GitHub-Mausam--Kumari9534-181717?style=for-the-badge&logo=github" />
  </a>
</p>

⭐ If you found this project useful, consider giving it a **Star** on GitHub!

</div>

---

# ❤️ Acknowledgements

Special thanks to the open-source community and everyone who contributes to making software development better every day.

Built with ❤️ by **Mausam Kumari**

---

<div align="center">

## 🌟 RepoLens AI

**Designed • Developed • Maintained by Mausam Kumari**

© 2026 **Mausam Kumari**. All Rights Reserved.

Made with ❤️ using React, TypeScript, Tailwind CSS, Vite & Supabase.

</div>
