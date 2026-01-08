# RightPath – AI Coding Companion

## Problem Statement
Developers often get stuck while coding and rely on AI tools that directly give answers without explaining the reasoning. This reduces learning and problem-solving ability. There is a need for an intelligent assistant that guides developers by explaining mistakes and suggesting improvements rather than simply providing solutions.

## Domain Relevance
This project falls under the **EdTech / Developer Productivity / AI Assistance** domain. It focuses on improving learning outcomes for developers by encouraging understanding instead of answer copying.

## Project Description
RightPath is an AI-powered coding companion that helps users while coding by analyzing their queries and providing structured explanations, hints, and guidance. Instead of directly solving problems, the system aims to help users understand *why* something is wrong and how to approach the solution correctly.

## High-Level Architecture
- **Frontend**: React + Vite  
- **Backend**: Node.js with Express  
- **AI Integration**: OpenRouter API  
- **Deployment**: Docker & Docker Compose  

**Flow:**
1. User enters a coding-related query in the frontend  
2. Frontend sends the request to the backend API  
3. Backend forwards the prompt to the AI model via OpenRouter  
4. AI-generated response is returned and displayed to the user  

## Setup and Execution Instructions

### Prerequisites
- Docker
- Docker Compose

### Steps to Run the Application
```bash
git clone https://github.com/harininr/RightPath.git
cd RightPath
docker compose up --build
