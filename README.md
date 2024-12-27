# Gmail Clone Application

## Overview
This is a Gmail Clone application designed to replicate core functionalities of email management. The application is built with a React + Tailwind CSS frontend and a Node.js + Express backend with MongoDB for data storage. The project uses Redux for state management and JSON Web Tokens (JWT) for authentication.

---

## Features
### **Frontend (React + Tailwind CSS)**
- User-friendly and responsive email interface.
- Functionality to create, delete, and view emails.
- Display of sent emails.
- Integration with Redux for efficient state management.
- Search emails.

### **Backend (Node.js + Express)**
- **Authentication**:
  - `register`: Allows users to register a new account.
  - `login`: Authenticates users and issues JWT.
  - `logout`: Invalidates the user session.
  
- **Email Management**:
  - `createEmail`: Allows users to create and send emails.
  - `deleteEmail`: Enables users to delete emails by ID.
  - `getAllEmail`: Retrieves inbox emails for a user.
  - `getSentEmail`: Fetches emails sent by a user.

- **Middleware**:
  - `isAuthenticated`: Validates JWT tokens to secure endpoints.

---

## Tech Stack
### **Frontend**
- React.js
- Tailwind CSS
- Redux (State Management)

### **Backend**
- Node.js
- Express.js
- MongoDB (Database)
- JSON Web Token (JWT) for authentication

---

## Installation

### **Prerequisites**
- Node.js installed (v14+)
- MongoDB instance running
- Package manager (npm or yarn)

### **Steps**

#### 1. Clone the Repository
```bash
git clone https://github.com/Rahul65911/Gmail-Clone.git
cd Gmail-Clone
```

#### 2. Install Dependencies
##### Frontend:
```bash
cd frontend
npm install
```

##### Backend:
```bash
cd backend
npm install
```

#### 3. Set Environment Variables
Create a `.env` file in the `backend` directory with the following:
```env
PORT=8080
MONGO_URI=your-mongodb-connection-string
SECRET_KEY=your-jwt-secret-key
```

#### 4. Start the Application
##### Frontend:
```bash
cd frontend
npm run dev
```

##### Backend:
```bash
cd backend
npm start
```

---

## API Endpoints

### **Authentication**
- **POST** `/api/v1/auth/register`: Register a new user.
- **POST** `/api/v1/auth/login`: Login and receive a JWT token.
- **GET** `/api/v1/auth/logout`: Logout the user.

### **Emails**
- **POST** `/api/v1/email/create`: Create a new email.
- **DELETE** `/api/v1/email/:id`: Delete an email by ID.
- **GET** `/api/v1/email/getallemails`: Retrieve inbox emails for the logged-in user.
- **GET** `/api/v1/email/getsentemails`: Retrieve sent emails for the logged-in user.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.