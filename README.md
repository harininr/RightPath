# RightPath – AI Coding Companion

## Problem Statement
Developers often get stuck while coding and rely on AI tools that directly provide answers without explaining the reasoning behind them. This reduces learning, critical thinking, and long-term problem-solving skills. There is a need for an intelligent assistant that guides developers by explaining mistakes and suggesting improvements rather than simply giving final solutions.

## Domain Relevance
This project falls under the **EdTech**, **Developer Productivity**, and **AI Assistance** domains. It aims to enhance learning outcomes for developers by encouraging understanding and logical thinking instead of answer copying.

## Project Description
RightPath is an AI-powered coding companion designed to assist developers during the coding process. Users can ask coding-related questions, and the system provides structured explanations, hints, and guidance. Instead of directly solving problems, RightPath focuses on helping users understand *why* an error occurs and how to approach a correct solution effectively.

## High-Level Architecture
- **Frontend**: React + Vite  
- **Backend**: Node.js with Express  
- **AI Integration**: OpenRouter API  
- **Deployment**: Docker & Docker Compose  

### Application Flow
1. The user enters a coding-related query in the frontend  
2. The frontend sends the request to the backend API  
3. The backend forwards the prompt to the AI model via OpenRouter  
4. The AI-generated response is returned to the backend  
5. The response is displayed to the user in the frontend  

## Setup and Execution Instructions

### Prerequisites
- Docker  
- Docker Compose  

### Steps to Run the Application
```bash
git clone https://github.com/harininr/RightPath.git
cd RightPath
docker compose up --build
