# Mediclick

Modern web application for scheduling doctor appointments with real-time slot updates via WebSockets.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mediclick.git
cd mediclick
```

### 2. Environment Setup

Create `.env` files in both `client/` and `server/` directories.

#### `server/.env`

```
PORT=5000
MONGO_URI=mongodb+srv://mediclick:8n3stFL9okWhCpd7@mediclick-dev.zjjql8n.mongodb.net/?retryWrites=true&w=majority&appName=mediclick-dev
MONGO_DB_NAME=prod
CLIENT_URL=http://localhost:5173
JWT_SECRET=superSecretSauce
REDIS_URL=redis://default:9knwvWGnIS5l3dIj6IBJmiwr9iXgJpQA@redis-15677.c300.eu-central-1-1.ec2.redns.redis-cloud.com:15677

```

#### `client/.env`

```
VITE_API_URL=http://localhost:5000/api
VITE_URL=http://localhost:5000
```

### 3. Install Dependencies

```bash
# In root/client:
cd client
npm install

# In root/server:
cd ../server
npm install
```

### 4. Run the App

```bash
# Start server
cd server
npm run dev

# In another terminal: start client
cd ../client
npm run dev
```

## 🏗 Architecture Decisions

### Tech Stack

- **Frontend:** React 19 + TypeScript + Redux Toolkit + React Query + Vite
- **Backend:** Node.js + Express + MongoDB (Mongoose) + Redis
- **Real-time:** WebSocket (native) via `ws` package
- **Authentication:** OTP-based login using JWT tokens
- **Web Worker:** Used for background socket listening (Chrome-safe)

### Folder Structure

- `/client`: Vite-based React client
- `/server`: Node/Express API server
- `/workers`: Chrome Web Worker for WebSocket management

### Database Models

- `User`: \_id, phone, firstActionCompleted, name
- `Doctor`: \_id, name, specialty, profile pic, availableSlots
- `Appointment`: doctor (ref), user (ref), time, note

---

## ✅ Features Implemented

### 📱 Authentication

- OTP-based phone login
- JWT issued on verification

### 📅 Booking Flow

- Specialty > Doctor > Time > Confirmation
- Each step beautifully styled and stateful

### 🔁 Rescheduling / Cancel

- View appointments and reschedule or cancel them
- Cancelled slots go back to the doctor

### 🔔 Waitlist with Real-time Updates

- If a doctor is fully booked, users can join a waitlist
- WebSockets notify users instantly when new slots are available
- Worker handles reconnecting and caching subscribed doctors

### ⚡ Caching & Search

- Doctor search (fuzzy, name/specialty)
- Redis caching for queries

### 🔬 Testing

- Jest tests for Doctor and Appointment APIs

### 🌍 Deployment-ready

- .env separation for test/prod
- Redis-based persistence for sockets

---

## 📦 Deployment (Optional)

### Docker (WIP)

Coming soon for Redis + Mongo + App in Docker Compose.

### Vercel / Render

Client can be hosted on Vercel
Server can run on Render/Fly.io with Redis Cloud & Mongo Atlas

---

## 👑 Credits

Built with ❤️ by the Mediclick Dev 🔥 Squad

---
