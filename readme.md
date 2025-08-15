# Interactive Data Dashboard Platform

An end-to-end full-stack application where users can upload datasets (CSV) and view them as **interactive visualizations** powered by **D3.js** on a **Next.js** frontend.  
Supports **role-based access** for regular users and admins, with secure JWT authentication and a PostgreSQL backend.

---

## 🚀 Features

### User Capabilities
- Register / Login with JWT authentication.
- Upload CSV datasets and generate interactive charts (bar, line, pie, etc.).
- Configure chart types and select columns for visualization.
- View public visualizations.
- Edit/Delete own uploads.

### Admin Capabilities
- All user features.
- View/edit/delete any dataset.
- Manage users (promote/demote/suspend).
- Access an **Admin Dashboard** with analytics and moderation tools.

---

## 🛠 Tech Stack

| Layer       | Technology                                   |
|-------------|----------------------------------------------|
| Frontend    | Next.js (React), D3.js, Tailwind CSS (opt)   |
| Backend     | Express.js (Node.js)                         |
| Database    | PostgreSQL                                   |
| Auth        | JWT (JSON Web Tokens)                        |
| ORM         | Prisma or Sequelize (optional)               |
| File Upload | Multer (Express middleware)                  |

---

## 📂 Project Structure

