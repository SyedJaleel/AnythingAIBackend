# API Testing Examples

This guide shows how to test the AnythingAI backend API using curl, Postman, or the Swagger UI.

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### Register User

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}
```

### Login User

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User

**Request:**
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 2. Task Endpoints

### Create Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending"
  }'
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "createdBy": 1
  }
}
```

### Get All Tasks

**Request:**
```bash
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Tasks fetched successfully",
  "tasks": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "createdBy": 1,
      "status": "pending",
      "email": "john@example.com",
      "createdAt": "2024-01-15 10:30:00",
      "updatedAt": "2024-01-15 10:30:00"
    },
    {
      "id": 2,
      "title": "Review code",
      "description": "Review all pull requests",
      "createdBy": 1,
      "status": "in-progress",
      "email": "john@example.com",
      "createdAt": "2024-01-15 11:00:00",
      "updatedAt": "2024-01-15 11:00:00"
    }
  ]
}
```

### Get Task by ID

**Request:**
```bash
curl -X GET http://localhost:5000/api/v1/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Task fetched successfully",
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "createdBy": 1,
    "status": "pending",
    "createdAt": "2024-01-15 10:30:00",
    "updatedAt": "2024-01-15 10:30:00"
  }
}
```

### Update Task

**Request:**
```bash
curl -X PUT http://localhost:5000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README, API docs, and guides",
    "status": "in-progress"
  }'
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README, API docs, and guides",
    "status": "in-progress"
  }
}
```

### Delete Task

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/v1/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 3. Error Responses

### Unauthorized (No Token)
```json
{
  "message": "No token provided"
}
```

### Invalid Token
```json
{
  "message": "Invalid or expired token"
}
```

### Access Denied (Insufficient Permissions)
```json
{
  "message": "Access Denied: Insufficient Permissions"
}
```

### Validation Error
```json
{
  "message": "\"title\" length must be at least 3 characters long"
}
```

### Not Found
```json
{
  "message": "Task not found"
}
```

### Email Already Registered
```json
{
  "message": "Email already registered"
}
```

### Invalid Credentials
```json
{
  "message": "Invalid email or password"
}
```

---

## 4. Testing in Postman

### Setup Collection

1. Create new collection "AnythingAI API"
2. Create new environment variable:
   - Key: `token`
   - Value: (leave empty, will be filled after login)
   - Key: `base_url`
   - Value: `http://localhost:5000/api/v1`

### Register Request
- Method: POST
- URL: `{{base_url}}/auth/register`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- After response: Copy token and set in environment

### Login Request
- Method: POST
- URL: `{{base_url}}/auth/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- Tests (Add to Tests tab):
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
```

### Protected Requests
- Add header: `Authorization: Bearer {{token}}`
- All task endpoints will now work

---

## 5. Testing Scenarios

### Scenario 1: User Registration and Login
1. Register new user
2. Save token
3. Use token to call /auth/me
4. Verify user info returned

### Scenario 2: RBAC Testing
1. Create two users (user1, user2)
2. User1 creates task
3. Login as user2
4. Try to delete user1's task → Should get 403 error
5. User2 creates own task
6. User2 deletes own task → Should succeed

### Scenario 3: Task Lifecycle
1. Create task with status "pending"
2. Update status to "in-progress"
3. Update description
4. Update status to "completed"
5. Delete task

### Scenario 4: Input Validation
1. Try to register with invalid email → Should fail
2. Try to register with password < 6 chars → Should fail
3. Try to create task with title < 3 chars → Should fail
4. Try with valid data → Should succeed

### Scenario 5: Token Expiry
1. Login and get token
2. Manually modify token in header (add/remove character)
3. Try to access protected route → Should get 401 error

---

## 6. Health Check

**Endpoint:**
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "message": "Server is running"
}
```

---

## 7. Swagger UI Testing

1. Open `http://localhost:5000/api-docs`
2. Find endpoint
3. Click "Try it out"
4. For protected endpoints:
   - Click Authorize button
   - Paste token: `Bearer <your_token>`
   - Click Authorize
5. Fill request body
6. Click Execute
7. View response

---

## 8. Common Issues and Solutions

### Issue: 401 Unauthorized
- **Cause**: Missing or invalid token
- **Solution**: Include valid token in Authorization header

### Issue: 403 Forbidden
- **Cause**: User trying to access another user's task
- **Solution**: Only users with matching ID or admins can access

### Issue: Validation Error
- **Cause**: Invalid request data
- **Solution**: Check field lengths and formats match schema

### Issue: 500 Server Error
- **Cause**: Server-side error
- **Solution**: Check server logs, ensure database is accessible

---

## 9. Performance Testing

### Load Testing with Apache Bench
```bash
# Create task (10 requests, concurrency 5)
ab -n 10 -c 5 -p data.json -T application/json http://localhost:5000/api/v1/tasks

# Get tasks (100 requests)
ab -n 100 -c 10 http://localhost:5000/api/v1/tasks
```

### Using K6
```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let response = http.get('http://localhost:5000/api/v1/tasks', {
    headers: { 'Authorization': 'Bearer TOKEN' }
  });
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}
```

---

## 10. Useful Headers

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <token>
```

### Response Headers
```
Content-Type: application/json; charset=utf-8
X-Powered-By: Express
```

---

**For more details, visit:**
- Swagger UI: http://localhost:5000/api-docs
- README.md: Project documentation
- SCALABILITY.md: Architecture and scaling
