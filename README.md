# AnythingAI Backend Assignment

A secure, scalable backend system with JWT-based authentication, Role-Based Access Control (RBAC), and CRUD operations for task management.

## Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Admin and User roles with different permissions
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for tasks
- **Password Hashing**: Bcryptjs for secure password storage
- **Input Validation**: Joi for schema validation
- **API Documentation**: Swagger UI for easy API testing
- **Error Handling**: Comprehensive error handling and logging
- **CORS & Security**: Helmet for security headers, CORS for cross-origin requests

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite
- **Authentication**: jsonwebtoken (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Security**: helmet, cors, dotenv

### Frontend
- **Framework**: React.js
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Axios
- **Styling**: CSS3

## Project Structure

```
/Anythingaibackend
├── /src
│   ├── /config          # Database connection & Environment setup
│   ├── /controllers     # Business logic for Auth and CRUD
│   ├── /middleware      # Authentication and RBAC middleware
│   ├── /models          # Database schemas (User, Task)
│   ├── /routes          # API route definitions (v1)
│   ├── /utils           # Validation and helper functions
│   └── app.js           # Express app entry point
├── /frontend
│   ├── /src
│   │   ├── /components  # React components
│   │   ├── /services    # API service layer
│   │   ├── /styles      # CSS styling
│   │   ├── App.js       # Main App component
│   │   └── index.js     # React entry point
│   ├── /public          # Static files
│   └── package.json     # Frontend dependencies
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Backend dependencies
└── README.md            # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd Anythingaibackend
   npm install
   ```

2. **Create .env file** (already created):
   ```
   PORT=5000
   DB_PATH=./database.db
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

3. **Start the backend server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

4. **Access Swagger Documentation**:
   Open `http://localhost:5000/api-docs` in your browser

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the React development server**:
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT token
- `GET /api/v1/auth/me` - Get current user info (requires auth)

### Tasks

- `POST /api/v1/tasks` - Create a new task (requires auth)
- `GET /api/v1/tasks` - Get all tasks (admins see all, users see their own)
- `GET /api/v1/tasks/:id` - Get a specific task
- `PUT /api/v1/tasks/:id` - Update a task (users can update their own, admins can update any)
- `DELETE /api/v1/tasks/:id` - Delete a task (users can delete their own, admins can delete any)

## Authentication Flow

1. **Register**: User provides email and password
   - Password is hashed using bcryptjs
   - User is created with default role 'user'
   - JWT token is returned

2. **Login**: User provides email and password
   - Credentials are verified
   - JWT token is generated and returned
   - Token contains user ID and role

3. **Protected Routes**: Token must be included in Authorization header
   - Format: `Authorization: Bearer <token>`
   - Middleware verifies and decodes token
   - User info is attached to request object

## Role-Based Access Control

### User Role
- Can create their own tasks
- Can view only their own tasks
- Can update only their own tasks
- Can delete only their own tasks

### Admin Role
- Can view all tasks
- Can update any task
- Can delete any task
- Can manage users (future feature)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  createdBy INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'in-progress', 'completed')),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
)
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `DB_PATH`: SQLite database file path (default: ./database.db)
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment mode (development/production)

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "error": {} // Only in development mode
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## Testing the API

### Using Swagger UI
1. Go to `http://localhost:5000/api-docs`
2. Click "Try it out" on any endpoint
3. Fill in required fields
4. Click "Execute"

### Using Frontend
1. Register a new user
2. Login with your credentials
3. Create, read, update, and delete tasks from the dashboard

## Validation Rules

### User Registration
- Email: Valid email format
- Password: Minimum 6 characters

### Task Creation
- Title: 3-100 characters (required)
- Description: Maximum 500 characters
- Status: 'pending', 'in-progress', or 'completed'

## Security Considerations

- Passwords are hashed using bcryptjs with salt rounds of 10
- JWTs expire after 24 hours
- CORS is configured to allow frontend requests
- Helmet.js provides security headers
- Input validation prevents malicious data
- Role-based authorization prevents unauthorized access

## Future Enhancements

See [SCALABILITY.md](SCALABILITY.md) for information on scaling this application.

## License

ISC
