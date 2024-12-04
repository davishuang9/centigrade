# Full Stack Application

A dockerized full-stack application with FastAPI backend and React frontend.

## Project Structure
```
.
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Getting Started

### Running with Docker Compose

The easiest way to run both services is using Docker Compose:

```bash
docker-compose up --build
```

This will start both the backend and frontend services:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Running Services Individually

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the Docker image:
```bash
docker build -t backend .
```

3. Run the container:
```bash
docker run -p 8000:8000 backend
```

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /`: Welcome message
- `GET /health`: Health check endpoint
