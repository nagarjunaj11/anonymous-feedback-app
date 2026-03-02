#!/bin/bash

echo "========================================"
echo " Anonymous Feedback App - Quick Start"
echo "========================================"
echo ""

echo "Checking prerequisites..."
echo ""

# Check Java
if ! command -v java &> /dev/null; then
    echo "[ERROR] Java is not installed"
    echo "Please install Java 17 from https://adoptium.net/"
    exit 1
fi
echo "[OK] Java found"

# Check Node
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "[OK] Node.js found"

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo "[ERROR] Maven is not installed"
    echo "Please install Maven from https://maven.apache.org/"
    exit 1
fi
echo "[OK] Maven found"

echo ""
echo "========================================"
echo " Installing Frontend Dependencies"
echo "========================================"
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

echo ""
echo "========================================"
echo " Starting Application"
echo "========================================"
echo ""
echo "Backend will start at: http://localhost:8080"
echo "Frontend will start at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

cd ..

# Start backend in background
echo "Starting backend..."
mvn spring-boot:run &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 10

# Start frontend
echo "Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo " Application Started!"
echo "========================================"
echo ""
echo "Backend: http://localhost:8080 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""
echo "Visit: http://localhost:3000"
echo ""
echo "To stop: Press Ctrl+C or run:"
echo "kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "========================================"

# Wait for user interrupt
wait
