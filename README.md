# RightPath – AI Coding Companion

## Problem Statement
While learning to code, developers often get stuck and turn to AI tools that directly provide complete solutions. This leads to reduced learning, dependency on AI, and weak problem-solving skills. There is a need for a system that assists developers by guiding their thinking process instead of simply generating answers.

RightPath addresses this problem by acting as a learning-focused AI companion that explains concepts, highlights mistakes, and provides directional guidance without encouraging blind copying.

## Domain Relevance
This project is aligned with the **EdTech** domain, with strong relevance to **Developer Productivity** and **AI-assisted Learning**. It supports learners by improving conceptual understanding, logical reasoning, and confidence while solving coding problems.

## Project Overview
RightPath is a web-based AI coding companion that allows users to ask coding-related questions and receive structured explanations and guidance. The system focuses on *why* an approach may be incorrect or inefficient and suggests better ways to think about the problem rather than providing direct solutions.

The application is designed to support ethical learning and reduce over-reliance on answer-generating AI tools.

## High-Level Architecture
- **Frontend**: React + Vite  
- **Backend**: Node.js with Express  
- **AI Integration**: OpenRouter API  
- **Deployment**: Docker & Docker Compose  

### System Flow
1. The user enters a coding-related question in the web interface  
2. The frontend sends the request to the backend API  
3. The backend forwards the prompt to the OpenRouter AI model  
4. The AI response is processed and returned  
5. The frontend displays structured guidance to the user  

## Setup and Execution Instructions

### Prerequisites
- Docker  
- Docker Compose  

### Steps to Run the Application
```bash
git clone https://github.com/harininr/RightPath.git
cd RightPath
docker compose up --build
