# Goal-App Backend API Reference

## Base URL
All endpoints are served from the Express server running on **http://localhost:5000** (configured via the proxy in `goal-app/package.json`).

---

## Health Check
- **Endpoint**: `/api/health`
- **Method**: `GET`
- **Description**: Simple health check that returns a JSON confirming the server is up.
- **Response**:
  ```json
  { "status": "ok" }
  ```

---

## Authentication
### 1. Sign‑Up
- **Endpoint**: `/api/auth/signup`
- **Method**: `POST`
- **Request Body** (JSON):
  ```json
  {
    "name": "Full Name",
    "username": "uniqueUser",
    "email": "user@example.com",
    "phone": "+233 24 000 0000",
    "password": "plain‑text‑or‑hashed‑pwd",
    "memberSince": "May 2024"
  }
  ```
- **Response** (JSON – on success):
  ```json
  {
    "_id": "<mongo‑id>",
    "name": "Full Name",
    "username": "uniqueUser",
    "email": "user@example.com",
    "phone": "+233 24 000 0000",
    "memberSince": "May 2024"
  }
  ```
- **Errors**: `400` for validation problems, `500` for server errors.

### 2. Sign‑In
- **Endpoint**: `/api/auth/signin`
- **Method**: `POST`
- **Request Body** (JSON):
  ```json
  {
    "identifier": "email@or.username",
    "password": "plain‑text‑or‑hashed‑pwd"
  }
  ```
- **Response** (JSON – on success):
  ```json
  {
    "user": {
      "_id": "<mongo‑id>",
      "name": "Full Name",
      "username": "uniqueUser",
      "email": "user@example.com",
      "phone": "+233 24 000 0000",
      "memberSince": "May 2024"
    }
  }
  ```
- **Errors**: `401` for invalid credentials, `500` for server errors.

---

## Transactions
### 1. Get All Transactions for a User
- **Endpoint**: `/api/transactions/:userId`
- **Method**: `GET`
- **Path Parameter**: `userId` – MongoDB ObjectId of the user.
- **Response** (JSON):
  ```json
  {
    "transactions": [
      {
        "_id": "<txn‑id>",
        "userId": "<user‑id>",
        "type": "expense",
        "category": "Food",
        "amount": 12.5,
        "icon": "🍔",
        "color": "#ff6600",
        "time": "Just now",
        "createdAt": "2026‑05‑13T09:00:00.000Z",
        "updatedAt": "2026‑05‑13T09:00:00.000Z"
      }
    ]
  }
  ```
- **Errors**: `500` on server failure.

### 2. Add a New Transaction
- **Endpoint**: `/api/transactions`
- **Method**: `POST`
- **Request Body** (JSON):
  ```json
  {
    "userId": "<user‑id>",
    "type": "expense" | "income",
    "category": "Food",
    "amount": 12.5,
    "icon": "🍔",
    "color": "#ff6600",
    "time": "Just now"
  }
  ```
- **Response** (JSON – created transaction):
  ```json
  {
    "_id": "<new‑txn‑id>",
    "userId": "<user‑id>",
    "type": "expense",
    "category": "Food",
    "amount": 12.5,
    "icon": "🍔",
    "color": "#ff6600",
    "time": "Just now",
    "createdAt": "2026‑05‑13T09:05:00.000Z",
    "updatedAt": "2026‑05‑13T09:05:00.000Z"
  }
  ```
- **Errors**: `400` for missing fields, `500` for server errors.

### 3. Delete a Transaction
- **Endpoint**: `/api/transactions/:id`
- **Method**: `DELETE`
- **Path Parameter**: `id` – MongoDB ObjectId of the transaction to delete.
- **Response** (JSON):
  ```json
  { "message": "Transaction deleted" }
  ```
- **Errors**: `404` if the transaction does not exist, `500` on server error.

---

## How the Front‑End Consumes These APIs
- The React app’s `proxy` entry (`"proxy": "http://localhost:5000"`) allows calls such as `fetch('/api/auth/signup')` to be automatically forwarded to the backend.
- `handleSignUp` and `handleSignIn` in **`GoalsApp.js`** POST to the auth endpoints and store the returned user object in state.
- `addTransaction` now POSTs to `/api/transactions` and, on success, prepends the created transaction to the local list.
- `useEffect` watches `userInfo` and fetches the user’s transactions via `GET /api/transactions/:userId`.

---

## Environment
- **`.env` (backend)** – defines `PORT=5000` and `MONGO_URI=mongodb://localhost:27017/goalapp`.
- Ensure MongoDB is running (or connect via MongoDB Atlas) before starting the server.

---

*This file lives at `goal-app/backend/README.md` and can be used as a quick reference for developers or API clients.*
