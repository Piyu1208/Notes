# 📝 Notes Management System

A full-stack Notes Management System built with **React**, **Node.js**, **Express**, and **PostgreSQL**, featuring secure authentication, role-based access control, and scalable data handling.

This project demonstrates a production-ready architecture with strong security practices, clean separation of concerns, and real-world deployment considerations.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication using **HTTP-only cookies**
- Secure login and logout flows
- Role-Based Access Control (RBAC)
  - **User** and **Admin** roles
  - Protected routes and middleware-based authorization

### 🗒️ Notes Management
- Full CRUD operations for notes
- Soft delete (archive) and restore functionality
- Permanent deletion of archived notes (admin-only)
- Pagination for efficient and scalable data loading

### 🛠️ Admin Dashboard
- Manage users and update roles
- View notes created by users
- Permanently delete archived data
- Secure admin-only access

### 🎨 Frontend
- Responsive React UI
- React Hooks and Context API for state management
- Context-based authentication handling
- Conditional rendering based on user roles
- Clean and intuitive user experience

### ⚙️ Backend
- RESTful API design with Express
- Protected routes with middleware
- Minimal data exposure for enhanced security
- PostgreSQL triggers for automatic `updated_at` timestamp handling
- Separation of concerns between controllers, services, and routes

### 🐳 DevOps & Deployment
- Dockerized backend for consistent builds and environment parity
- React frontend deployed on **Vercel**
- Backend API deployed on **Render**
- Cross-origin authentication support
- Secure HTTPS cookie handling

---

## 🧱 Tech Stack

### Frontend
- React
- Context API
- JavaScript (ES6+)
- CSS / Responsive Design

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Docker

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```text
root
├── client/            # React frontend
├── server/            # Express backend API
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── database/
├── docker-compose.yml
└── README.md



Got it. You’re right — sorry about that.
Here is **plain Markdown content**, **no wrappers, no IDs, no explanations**.
You can **paste this directly into your README.md** and you’re done.

```

### ⚙️ Setup & Installation

### Prerequisites

* Node.js
* PostgreSQL
* Docker (optional)

### Clone the Repository

```bash
git clone https://github.com/Piyu1208/Notes
cd Notes
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend/my_app
npm install
npm start
```

---

## 🔐 Environment Variables

Create `.env` files in both frontend and backend directories.

### Backend `.env`

```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

## 📌 API Highlights

* RESTful API design
* Middleware-protected routes
* Role-based access control (RBAC)
* Pagination for scalable data loading
* Secure HTTP-only cookie authentication
* Minimal data exposure

---

## 📈 Future Improvements

* Search and filtering for notes
* Tagging and categorization
* Activity logs for admin actions
* Refresh token rotation
* Unit and integration testing

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

This project was built to demonstrate:

* Secure authentication practices
* Scalable backend architecture
* Clean frontend state management
* Real-world deployment workflows

---

## App URL
https://notes-red-beta-36.vercel.app/

---

