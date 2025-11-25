# PMIO Frontend 🚀

This is the React-based Progressive Web App (PWA) for the PMIO project. It features a voice-first, multilingual interface for users to register and receive personalized internship recommendations.



## Prerequisites

- Node.js (v18 or later)
- npm (comes with Node.js)

## 1. Installation

Clone the repository and navigate into the frontend directory. Then, install the required dependencies.

```bash
npm install
2. Environment Setup
The application connects to the FastAPI backend. You need to tell the frontend where the backend is running by creating an environment file.

Create a new file in the root of the pmio-frontend folder named .env.

Add the following line to the file. This assumes your backend runs on port 8000.

VITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
3. Running the Application
To start the frontend development server, run:

Bash

npm run dev

The application will now be available at http://localhost:5173 (or the next available port).