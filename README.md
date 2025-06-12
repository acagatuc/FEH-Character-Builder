# 🔥 Fire Emblem Heroes: Character Builder

A full-stack web application that allows fans of **Fire Emblem Heroes** to create, customize, and save builds for their favorite characters. Whether you're optimizing your arena team or experimenting with creative skill combinations, this tool helps you plan and organize your strategies easily.

Built with the **MERN stack** (MongoDB, Express, React, Node.js).

---

## 🚀 Features

- 🔍 **Character Search**: Look up any unit from the Fire Emblem Heroes roster.
- 🧠 **Custom Builds**: Equip skills, weapons, seals, and blessings for any hero.
- 💾 **Save & Edit**: Store multiple builds to revisit or update later.
- 📊 **Stat Calculations**: View how different merges, IVs, and skills affect stats.
- 🖼️ **Visual Preview**: Get a clean visual of your hero's complete build.

---

## 🛠 Tech Stack

**Frontend:**
- React
- CSS

**Backend:**
- Node.js
- Express

**Database:**
- MongoDB (Mongoose ODM)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/feh-character-builder.git
cd feh-character-builder
```

### Backend Setup

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will run locally at `http://localhost:3000`.

---

## 🗃 Example `.env` for Backend

```
MONGO_URI=mongodb://localhost:27017/feh-builder
PORT=5000
```

---

## 📸 Screenshots

*Include screenshots or a demo GIF here if available*

---

## ✨ Future Improvements

- User authentication and profile management
- Community build sharing and upvoting
- Skill database auto-sync with real game data
- Mobile-friendly responsive design

---

## 🙌 Contributing

PRs and suggestions are welcome!