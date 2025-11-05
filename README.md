# 🩺 Lime Technical Assessment — AI Scribe Notes Management Tool

## 🧭 Summary

This project is a **lightweight AI Scribe Notes Management Tool** built to manage clinical notes associated with patients.  
It allows users to create, upload, and view AI-generated or transcribed notes, simulating a real-world healthcare documentation workflow.

The architecture is designed for scalability and developer experience — powered by a **Turborepo monorepo**, with a **NestJS backend**, **Next.js (App Router)** frontend, and automated **CI/CD pipelines** deploying seamlessly across **AWS EC2** and **Vercel**.

## Deployed Applications

### Frontend: https://lime-web-blond.vercel.app/

### Backend: http://18.220.163.52:3000/api

### Test mp3 file: You can find it at the root of this project

## Walkthrough

<div>
  <a href="https://www.loom.com/share/2cbcc172a9b94678ba4ddb294174171c">
    <p>Software Engineering Project Overview - Watch Video</p>
  </a>
  <a href="https://www.loom.com/share/2cbcc172a9b94678ba4ddb294174171c">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/2cbcc172a9b94678ba4ddb294174171c-55f11d19a771ce37-full-play.gif">
  </a>
</div>

### Application Overview

https://github.com/user-attachments/assets/17691788-9eb3-4ea5-9080-d357fdaa4e40

### Notes index and Note page

https://github.com/user-attachments/assets/b461110d-4751-4f1c-9f26-67b6d9f064c2

### Upload notes (audio or text)

https://github.com/user-attachments/assets/95e00ff7-8233-4a09-a648-067ae8896f7f

## ⚙️ Key Features of This Application

- 🧱 **Monorepo with Turborepo**
  - Centralized management of frontend, backend, and shared packages.
  - Caching and task pipelines for faster builds (`turbo run build`, `turbo run dev`).
  - Shared ESLint, TypeScript, and UI configurations for consistency.

- 🦋 **NestJS Backend (API)**
  - Structured, modular, and strongly typed backend using **TypeScript**.
  - **PostgreSQL** database integration with **TypeORM**.
  - **S3 file uploads** for handling audio recordings.
  - **Seed script** to prepopulate mock patients on first run.
  - **AI integrations** for transcription and summarization (OpenAI / Whisper compatible).

- ⚡ **Next.js Frontend (App Router)**
  - Modern React 19 setup with **Next.js 15 (App Router)**.
  - **Tailwind CSS 4** for utility-first responsive design.
  - Seamless integration with backend APIs and S3 uploads.
  - Deployed on **Vercel**, with automatic preview links for each PR.

- 🧩 **Husky + Git Hooks**
  - Pre-commit hooks ensure linting and formatting checks before code submission.
  - Reduces CI build failures by enforcing standards early.

- 🚀 **GitHub Actions CI/CD**
  - Automated pipelines for linting, formatting, building, and deploying.
  - Dockerized backend deployment to **AWS EC2**.
  - Frontend preview and production deployments via **Vercel**.

- ☁️ **AWS Infrastructure**
  - **EC2** instance running the **Dockerized NestJS + PostgreSQL** stack.
  - **S3** bucket for secure and scalable audio file storage.
  - HTTPS communication between frontend (Vercel) and backend (EC2).

- 🌱 **Seed Script**
  - Seeds the database with initial mock patients and records.
  - Automatically runs during development or production start.
