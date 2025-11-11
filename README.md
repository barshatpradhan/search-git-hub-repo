Here’s a **shorter, GitHub-friendly README** for your repo. It keeps all key info but trims the detailed configs and code snippets:

```markdown
# 🚀 GitHub Repo Explorer

A full-stack web app to search GitHub repositories, save favorites, and manage user accounts.  
**Frontend:** React (Vite + TypeScript) | **Backend:** Node.js + Express | **Database:** MongoDB

---

## 🧩 Features

- 🔍 Search GitHub repositories by username  
- ⭐ Save and manage favorite repositories  
- 🔐 JWT-based authentication  
- 🌈 Responsive UI with TailwindCSS  
- ⚙️ Full-stack TypeScript implementation  

---

## 🏗️ Architecture

```

github-repo-explorer/
├── backend/    # Node.js + Express API
├── frontend/   # React + Vite
├── shared/     # Shared types/utilities
├── deployment/ # Docker/K8s configs
└── docs/       # Documentation

````

---

## 🌐 Live Demo

| Layer     | Platform | URL |
|----------|----------|-----|
| Frontend | Vercel   | [https://search-git-hub-repo.vercel.app](https://search-git-hub-repo.vercel.app) |
| Backend  | Render   | [https://search-git-hub-repo.onrender.com](https://search-git-hub-repo.onrender.com) |

---

## 🛠️ Local Setup

```bash
# Clone
git clone https://github.com/barshatpradhan/search-git-hub-repo.git
cd search-git-hub-repo

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
````

Backend runs on `http://localhost:5000`, frontend on `http://localhost:5173`.

---

## ⚙️ Environment Variables

**Backend (`/backend/.env`)**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

**Frontend (`/frontend/.env`)**

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧩 API Endpoints

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login
* `GET /api/favorites` – Get user favorites
* `POST /api/favorites` – Add favorite
* `DELETE /api/favorites/:id` – Remove favorite
* `GET /api/github/:username` – Fetch GitHub repos

---

## 🧾 License

MIT License — free to use and modify.

---

## ✨ Author

**Barshat Pradhan**
Frontend Developer | React & Node.js
🌐 [GitHub](https://github.com/barshatpradhan)

```

This version is **compact, readable on GitHub**, and still provides setup instructions, features, and links.  

If you want, I can also create a **1–2 paragraph “About this project” blurb** for the top to make it extra friendly for first-time visitors. Do you want me to do that?
```
