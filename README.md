# 🚀 AI‑Powered ATS Resume Analyzer

A full‑stack web application that analyzes resumes against job descriptions using AI, providing keyword matching, skill gap detection, and actionable improvement suggestions.

This project helps job seekers understand how well their resume aligns with a specific role — and gives clear, AI‑generated recommendations to improve their chances of passing Applicant Tracking Systems (ATS).

## ✨ Features

- 📄 Upload Resume (PDF/Docx)
- 📝 Paste Job Description
- 🤖 AI‑Powered Resume Scoring
- 🔍 Keyword & Skills Match Analysis
- ⚠️ Missing Skills & Gaps Detection
- 📊 ATS‑Style Scoring Breakdown
- ⚡ Fast, responsive UI built with React + Tailwind
- 🔐 Secure file handling & backend processing

## 🧠 How It Works
- User uploads a resume
- User pastes a job description
- Backend extracts text + sends structured prompts to the AI model
- AI analyzes:

    Keyword match
  
    Skill relevance
  
    Experience alignment
  
    Formatting clarity
  
- App returns a detailed score + improvement suggestions

## 🛠️ Tech Stack
### Frontend
- React
-TypeScript
- Tailwind CSS
- React Router
- Custom hooks + modular components

### Backend
- Node.js
- Express
- File upload handling
- AI prompt engineering
- Modular API routes

### AI
-OpenAI API integration
- Structured prompts for consistent output

### Storage
- Puter.js  (cloud storage for uploaded files)

### Deployment
- Vercel (frontend)
- Backend deployed via Node server or Docker

## 🚀 Getting Started

### Installation

2. 1. Clone the repo:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

Built with ❤️ using React Router.
