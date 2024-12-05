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

## Some thoughts

Pretty straightforward fullstack project with FastAPI backend and React frontend. Made an early design decision to not try and replicate an in-memory database in the backend given we're operating without a DB. Instead, just slapped on a 3rd party cache library that hopefully meets the criteria of "add some disk cache for storage."

Also, I didn't realize a requirement was _all entities_ rather than just products. Hopefully the products endpoint is representative of what the other endpoints would look like for carts and users.

Please let me know if you have any questions!

