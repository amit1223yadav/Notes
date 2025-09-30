Project Structure
NoteFlow/
│
├─ backend/        # Node.js + Express backend
├─ frontend/       # React frontend
└─ .gitignore

Installation and Setup
1. Clone the repository
git clone https://github.com/yourusername/NoteFlow.git
cd NoteFlow

2. Backend setup
cd backend
npm install        # install backend dependencies

3. Frontend setup
cd ../frontend
npm install        # install frontend dependencies

4. Environment Variables

Create a .env file in backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
SESSION_SECRET=your_session_secret
FRONTEND_URL=http://localhost:3000


⚠️ Do not commit your .env file.

5. Run the Backend
cd backend
npm run dev        # start backend server with nodemon


Backend will run on http://localhost:5000

6. Run the Frontend
cd frontend
npm start          # start React frontend


Frontend will run on http://localhost:3000
