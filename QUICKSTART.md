# Quick Start Guide

## Backend Quick Start

1. Navigate to project directory:
   ```bash
   cd Anythingaibackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   Server will start at: `http://localhost:5000`
   Swagger docs: `http://localhost:5000/api-docs`

## Frontend Quick Start

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start React development server:
   ```bash
   npm start
   ```

   Frontend will open at: `http://localhost:3000`

## Testing the Application

### Method 1: Using Swagger UI (Backend Testing)
1. Open `http://localhost:5000/api-docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in the request body
5. Click "Execute"

### Method 2: Using Frontend UI (Full Application Testing)
1. Open `http://localhost:3000`
2. Click "Register" tab
3. Enter email and password
4. Click "Register"
5. You'll be redirected to the Dashboard
6. Create, edit, and delete tasks

### Sample Test Data

**Register User 1**:
- Email: `user1@example.com`
- Password: `password123`

**Register User 2**:
- Email: `user2@example.com`
- Password: `password456`

**Test Scenarios**:
1. Register two users
2. Login as User 1 and create tasks
3. Login as User 2 and verify you can only see your tasks
4. Go back to User 1 and update/delete your tasks

## Available Features

✅ User Registration & Login
✅ JWT Token-based Authentication
✅ Task Creation, Reading, Updating, Deleting
✅ Role-Based Access Control (User & Admin)
✅ Password Hashing with bcryptjs
✅ Input Validation with Joi
✅ Swagger API Documentation
✅ Responsive UI with React
✅ Error Handling and Validation

## Project Documentation

- **README.md** - Complete project documentation
- **SCALABILITY.md** - Scalability and architecture planning

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Make sure all dependencies are installed: `npm install`
- Check .env file is properly configured

### Frontend won't connect to backend
- Make sure backend is running on port 5000
- Check CORS is enabled (should be by default)
- Look for errors in browser console (F12)

### Database issues
- Delete `database.db` file to reset database
- Tables will be created automatically on next server start

### Authentication issues
- Token is stored in localStorage
- Open Developer Tools → Application → Local Storage to inspect
- Log out and login again if issues persist

## Performance Notes

- First load creates database tables automatically
- Bcryptjs hashing takes ~100ms per registration
- JWT tokens are valid for 24 hours
- Admin users can see all tasks, regular users see only their own

## Next Steps

After testing, refer to **SCALABILITY.md** for information on:
- Caching with Redis
- Database optimization
- Load balancing
- Containerization
- Microservices architecture
- Monitoring and logging
