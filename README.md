<div align="center">

# 💰 Ledgerly

### A premium, multi-user personal finance dashboard

Built with the **MERN-adjacent** stack — **Node.js, Express, React, and Tailwind CSS** —
without a database, proving that a thoughtfully engineered file-based backend can power
a real, production-feeling financial product.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

</div>

---

## 📖 Overview

**Ledgerly** is a full-stack personal expense tracker designed to look and feel like a
real commercial SaaS product rather than a basic CRUD demo. It supports **multiple
independent user profiles**, a data-rich **analytics dashboard**, **budget & income
tracking**, **notifications**, **dark mode**, and **PDF/CSV report exports** — all
running on a lightweight, dependency-free storage layer (plain JSON files via Node's
`fs` module, no database required).

The goal of this project was to demonstrate that solid **software architecture**,
**clean API design**, and **intentional UI/UX decisions** matter more than the size of
the tech stack. Every feature you see is fully wired end-to-end — nothing is a static
mockup.

> 💡 **Why no database?** To keep the project self-contained, dependency-light, and
> easy to run anywhere in seconds — `npm install` and you're live. The file-storage
> layer is fully abstracted behind a small set of helper modules, so swapping in
> MongoDB or PostgreSQL later would only mean rewriting `utils/*Helper.js` — nothing
> else in the app would need to change.

---

## ✨ Key Features

### 🔐 Multi-User Workspace
- Three independent demo profiles (Ayesha, Bilal, Sana), each with their own income,
  budget, transactions, and notifications
- Instant profile switching from the top navigation — no login flow needed for the demo
- Every API call is scoped to the active `userId`, so data never leaks between profiles

### 📊 Analytics Dashboard
- **Stat cards** — monthly income, amount spent, savings, and remaining budget
- **Spending trend chart** — 6-month area chart of total spend per month (Recharts)
- **Category breakdown** — interactive donut chart with a color-coded legend
- **Budget progress bar** — visual indicator that shifts color (green → amber → red)
  as spending approaches the monthly limit
- **Recent transactions widget** — live feed of the latest activity

### 🧾 Expense Management
- Full **CRUD** — create, read, update, delete expenses
- **Inline editing** — click directly on a transaction's title or amount in the table
  to edit it in place, no separate form or page reload
- **Filtering** — by category, minimum amount, maximum amount
- **Live search** — instant client-side search by title
- Modal-based "Add Expense" flow with validation and inline error messaging

### 📤 Reports & Export
- **PDF export** — generates a formatted, downloadable statement (via `jsPDF`) with
  the user's name, totals, and a full transaction table
- **CSV export** — raw transaction data streamed directly from the backend for
  spreadsheet import

### 🔔 Notifications
- Per-user notification feed (budget alerts, savings milestones, weekly summaries)
- Unread indicator badge on the bell icon

### 🎨 Premium UI/UX
- Custom design system: **Sora** for display type, **Inter** for body text, a
  deliberate indigo/emerald/rose color palette (not default Tailwind grays)
- **Dark mode** — full app-wide theme toggle, persisted across sessions
- Loading skeletons, empty states, and toast notifications for every async action
- Smooth micro-transitions (fade-ins, hover states, animated progress bars)
- **Fully responsive** — collapsible sidebar drawer on mobile, adaptive grid layouts
  on tablet and desktop

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend runtime** | Node.js | JavaScript runtime |
| **Web framework** | Express.js | REST API server |
| **Data storage** | `fs` / `path` (Node core modules) | JSON file-based persistence — no external database |
| **Middleware** | Custom logger, validator, error handler | Request logging, input validation, centralized error handling |
| **Frontend framework** | React 18 (Vite) | Component-based UI |
| **Routing** | React Router v7 | Client-side page navigation |
| **Styling** | Tailwind CSS v3 | Utility-first styling, dark mode support |
| **Charts** | Recharts | Area chart & donut chart visualizations |
| **Icons** | Lucide React | Consistent, lightweight icon set |
| **PDF generation** | jsPDF | Client-side PDF report export |
| **State management** | React Context API | Global user/theme/toast state — no external state library needed |
| **Dev tooling** | Nodemon, Vite dev server | Hot-reloading during development |

---

## 🏗️ Architecture

Ledgerly follows a clean **MVC** pattern on the backend and a **component + context**
pattern on the frontend — no business logic lives inside route handlers, and no `fetch`
calls live inside UI components.

```
Browser (React)
   │
   ├── AppContext (current user, theme, toasts)
   ├── Pages (Dashboard, Expenses, Reports, Settings)
   ├── Components (Sidebar, Topbar, Charts, Tables, Modal…)
   │
   ▼  fetch() via dedicated API layer
Express REST API
   │
   ├── routes/        →  defines endpoints
   ├── controllers/    →  business logic
   ├── middleware/      →  logging, validation, error handling
   ├── utils/            →  the ONLY layer that touches the filesystem
   ▼
data/*.json  (users, expenses, notifications)
```

---

## 📁 Project Structure

```
ledgerly/
├── expensetracker-pro-backend/
│   ├── server.js                     # Entry point — wires middleware & routes
│   ├── .env                          # PORT config
│   │
│   ├── data/                         # Auto-generated JSON "database"
│   │   ├── users.json
│   │   ├── expenses.json
│   │   └── notifications.json
│   │
│   ├── routes/
│   │   ├── expenseRoutes.js          # /api/expenses/*
│   │   ├── userRoutes.js             # /api/users/*
│   │   └── notificationRoutes.js     # /api/notifications/*
│   │
│   ├── controllers/
│   │   ├── expenseController.js      # CRUD + stats + CSV export logic
│   │   ├── userController.js         # user list + per-user financial summary
│   │   └── notificationController.js
│   │
│   ├── middleware/
│   │   ├── logger.js                 # Logs every request
│   │   ├── validate.js               # Field-validation middleware factory
│   │   └── errorHandler.js           # Centralized 4-param error handler
│   │
│   └── utils/
│       ├── fileHelper.js             # All expense fs read/write logic
│       ├── userHelper.js             # All user fs read/write logic
│       ├── notificationHelper.js     # All notification fs read/write logic
│       └── seed.js                   # Generates realistic demo data
│
└── expensetracker-pro-frontend/
    ├── index.html
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx                   # Route definitions
    │   │
    │   ├── context/
    │   │   └── AppContext.jsx        # Global state: user, theme, toasts
    │   │
    │   ├── layouts/
    │   │   └── AppShell.jsx          # Sidebar + Topbar + page outlet
    │   │
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Expenses.jsx
    │   │   ├── Reports.jsx
    │   │   └── Settings.jsx
    │   │
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── Topbar.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── CategoryDonutChart.jsx
    │   │   ├── TrendLineChart.jsx
    │   │   ├── BudgetProgress.jsx
    │   │   ├── RecentTransactions.jsx
    │   │   ├── ExpenseTable.jsx      # Includes inline-edit cells
    │   │   ├── ExpenseModal.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── EmptyState.jsx
    │   │   └── ToastStack.jsx
    │   │
    │   ├── api/
    │   │   ├── expenseApi.js         # All expense-related fetch calls
    │   │   ├── userApi.js            # All user-related fetch calls
    │   │   └── notificationApi.js
    │   │
    │   └── utils/
    │       └── format.js             # Currency, date, category-color helpers
    │
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes bundled with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ledgerly.git
cd ledgerly
```

### 2. Start the backend

```bash
cd expensetracker-pro-backend
npm install
npm run seed      # generates 3 demo users + ~200 realistic transactions
npm run dev        # runs on http://localhost:4000
```

### 3. Start the frontend

Open a second terminal:

```bash
cd expensetracker-pro-frontend
npm install
npm run dev         # runs on http://localhost:5174
```

### 4. Open the app

Visit **[http://localhost:5174](http://localhost:5174)** and switch between the three
seeded demo profiles from the user menu in the top-right corner.

> Re-run `npm run seed` at any time to reset all demo data back to a fresh state.

---

## 🔌 API Reference

**Base URL:** `http://localhost:4000/api`

### Expenses

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/expenses` | List expenses — supports `userId`, `category`, `search`, `minAmount`, `maxAmount` query filters |
| `GET` | `/expenses/stats` | Aggregated stats — total spend, per-category totals, monthly trend, highest/lowest expense |
| `GET` | `/expenses/export` | Downloads a CSV of the user's expenses |
| `GET` | `/expenses/:id` | Get a single expense by ID |
| `POST` | `/expenses` | Create a new expense |
| `PUT` | `/expenses/:id` | Partially update an expense |
| `DELETE` | `/expenses/:id` | Delete an expense |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users` | List all demo user profiles |
| `GET` | `/users/:id` | Get a single user's profile |
| `GET` | `/users/:id/summary` | Financial summary — spend this month, budget remaining, savings rate |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/notifications/:userId` | Get a user's notification feed |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Basic server health check |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Display font | `Sora` | Headings, stat values |
| Body font | `Inter` | Paragraphs, labels, form inputs |
| Primary accent | `#6D5EF9` (Indigo/Violet) | Buttons, active states, chart highlights |
| Positive | `#10B981` (Emerald) | Income, savings, healthy budget status |
| Negative | `#F43F5E` (Rose) | Expenses, over-budget warnings |
| Radius | `1rem` – `1.5rem` (`rounded-2xl`) | Cards, modals, inputs |
| Shadow | Custom `shadow-soft` | Subtle elevation instead of harsh drop shadows |

Dark mode is implemented with Tailwind's `class` strategy and toggled globally through
`AppContext`, with the preference persisted in `localStorage`.

---

## ☁️ Deployment

The backend and frontend are deployed **separately**, since the backend needs a
long-running server with a writable filesystem (for its `fs`-based JSON storage),
which serverless platforms like Vercel don't provide.

| Part | Platform | Why |
|---|---|---|
| Frontend (React/Vite) | [Vercel](https://vercel.com) | Static build, perfect fit |
| Backend (Express + `fs`) | [Render](https://render.com) | Long-running Node process with a persistent filesystem |

**Live URLs:**
- Frontend: `https://ayesha-abid-expense-tracker.vercel.app`
- Backend API: `https://ayesha-abid-expense-tracker-api.onrender.com/api`

### Backend (Render)
1. New **Web Service** → connect the `Ayesha-Abid-Expense-tracker` repo
2. Root Directory: `expensetracker-pro-backend`
3. Build Command: `npm install && npm run seed`
4. Start Command: `npm start`
5. Environment Variable: `FRONTEND_URL` = the deployed Vercel URL (set after the frontend is live)

### Frontend (Vercel)
1. Import the `Ayesha-Abid-Expense-tracker` repo
2. Root Directory: `expensetracker-pro-frontend`
3. Framework: Vite (auto-detected) · Build Command: `npm run build` · Output: `dist`
4. Environment Variable: `VITE_API_BASE_URL` = the deployed Render URL + `/api`

---

## 🗺️ Roadmap

- [ ] Real authentication (JWT-based) to replace the demo profile switcher
- [ ] Migrate storage layer to MongoDB/PostgreSQL (only `utils/*Helper.js` would change)
- [ ] Recurring transactions & scheduled bills
- [ ] Multi-currency support
- [ ] Shareable/exportable public report links

---

## 📄 License

This project is available for educational and portfolio purposes.

---

<div align="center">

Built with ❤️ using Node.js, Express, React, and Tailwind CSS

</div>
