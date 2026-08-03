<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6d5ef9,25:8b7bfa,50:10b981,75:f7df1e,100:f43f5e&height=240&section=header&text=💰%20Ledgerly&fontSize=72&fontColor=ffffff&fontAlignY=42&desc=Multi-User%20Expense%20Tracker%20%7C%20Node.js%20•%20Express%20•%20React%20•%20Tailwind&descAlignY=62&descSize=16&animation=fadeIn&stroke=ffffff&strokeWidth=1" width="100%" />
  
<br/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/Status-Complete-10b981?style=for-the-badge&logo=checkmarx&logoColor=white" />
<br/><br/>
<p align="center">
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" height="24"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" height="24"/>
  <img src="https://img.shields.io/badge/jsPDF-6D5EF9?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" height="24"/>
  <img src="https://img.shields.io/badge/Lucide_Icons-F43F5E?style=for-the-badge&logo=lucide&logoColor=white" height="24"/>
  <img src="https://img.shields.io/badge/Dark_Mode-131A26?style=for-the-badge&logo=darkreader&logoColor=white" height="24"/>
</p>
<br/>

> **A premium, multi-user personal finance dashboard** built with Node.js, Express, React, and Tailwind CSS — no database required.  
> Features a full analytics dashboard, budget & income tracking, inline-editable transactions, PDF/CSV exports, notifications, and dark mode — all running on a lightweight `fs`-based backend.

<br/>

![Users](https://img.shields.io/badge/Demo_Users-3-6d5ef9?style=flat&logo=buffer)
![Charts](https://img.shields.io/badge/Charts-Recharts-ff6384?style=flat&logo=chartdotjs)
![Storage](https://img.shields.io/badge/Storage-fs%20%2F%20JSON-10b981?style=flat&logo=json)
![AI Tool](https://img.shields.io/badge/AI_Tool-Claude_by_Anthropic-a855f7?style=flat)
![License](https://img.shields.io/badge/License-MIT-3d9cd2?style=flat)

<br/>
</div>

---

<img width="1401" height="717" alt="image" src="https://github.com/user-attachments/assets/7fb37117-09e2-4479-8090-3c29160dd457" />




## 📑 Table of Contents

| # | Section | Description |
|---|---|---|
| 01 | [📖 Overview](#-overview) | What Ledgerly is, and why it's built without a database |
| 02 | [✨ Key Features](#-key-features) | Multi-user workspace, dashboard, expenses, reports, notifications, UI/UX |
| 03 | [🛠️ Tech Stack](#️-tech-stack) | Every technology used and why |
| 04 | [🏗️ Architecture](#️-architecture) | How the frontend, API, and storage layers connect |
| 05 | [📁 Project Structure](#-project-structure) | Full backend + frontend folder breakdown |
| 06 | [🚀 Getting Started](#-getting-started) | Install and run the project locally, step by step |
| 07 | [🔌 API Reference](#-api-reference) | Every backend endpoint, grouped by resource |
| 08 | [🎨 Design System](#-design-system) | Fonts, colors, spacing tokens used across the UI |
| 09 | [🗺️ Roadmap](#️-roadmap) | Planned future improvements |
| 10 | [📄 License](#-license) | Usage terms |

---
<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/595792fa-acc0-4442-8c25-ba9194379265" />

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/eee69df0-984b-4858-ad32-87fe6ca04dc9" />

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/cdb477f7-da02-4449-b8d3-884aee772fe5" />


---

## 📖 Overview

>**Ledgerly** is a full-stack personal expense tracker designed to look and feel like a
real commercial SaaS product rather than a basic CRUD demo. It supports **multiple
independent user profiles**, a data-rich **analytics dashboard**, **budget & income
tracking**, **notifications**, **dark mode**, and **PDF/CSV report exports** — all
running on a lightweight, dependency-free storage layer (plain JSON files via Node's
`fs` module, no database required).

<img width="1393" height="707" alt="image" src="https://github.com/user-attachments/assets/e33e5ffb-c52b-4ce0-92f4-84b4d202f509" />


>The goal of this project was to demonstrate that solid **software architecture**,
**clean API design**, and **intentional UI/UX decisions** matter more than the size of
the tech stack. Every feature you see is fully wired end-to-end — nothing is a static
mockup.

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/f7bc6eb0-8d42-4f6b-85aa-b04da9779545" />


> 💡 **Why no database?** To keep the project self-contained, dependency-light, and
> easy to run anywhere in seconds — `npm install` and you're live. The file-storage
> layer is fully abstracted behind a small set of helper modules, so swapping in
> MongoDB or PostgreSQL later would only mean rewriting `utils/*Helper.js` — nothing
> else in the app would need to change.

---

<img width="1393" height="677" alt="image" src="https://github.com/user-attachments/assets/6ba40fe0-38e5-4a3b-b23c-dec04d2b9592" />

 
 <img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/f8d50967-39be-45f8-9927-b7fdc0b40cf7" />

---

## ✨ Key Features

### 🔐 Multi-User Workspace
>- Three independent demo profiles (Ayesha, Bilal, Sana), each with their own income,
  budget, transactions, and notifications
>- Instant profile switching from the top navigation — no login flow needed for the demo
>- Every API call is scoped to the active `userId`, so data never leaks between profiles

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/a8807eae-5502-4c8c-9970-33010e9e6828" />


### 📊 Analytics Dashboard
>- **Stat cards** — monthly income, amount spent, savings, and remaining budget
>- **Spending trend chart** — 6-month area chart of total spend per month (Recharts)
>- **Category breakdown** — interactive donut chart with a color-coded legend
>- **Budget progress bar** — visual indicator that shifts color (green → amber → red)
  as spending approaches the monthly limit
>- **Recent transactions widget** — live feed of the latest activity

### 🧾 Expense Management
>- Full **CRUD** — create, read, update, delete expenses
>- **Inline editing** — click directly on a transaction's title or amount in the table
  to edit it in place, no separate form or page reload
>- **Filtering** — by category, minimum amount, maximum amount
>- **Live search** — instant client-side search by title
>- Modal-based "Add Expense" flow with validation and inline error messaging

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/6c31b24f-8b23-47a5-8b45-bafe623532f4" />


### 📤 Reports & Export
>- **PDF export** — generates a formatted, downloadable statement (via `jsPDF`) with
  the user's name, totals, and a full transaction table
>- **CSV export** — raw transaction data streamed directly from the backend for
  spreadsheet import

### 🔔 Notifications
>- Per-user notification feed (budget alerts, savings milestones, weekly summaries)
>- Unread indicator badge on the bell icon

### 🎨 Premium UI/UX
>- Custom design system: **Sora** for display type, **Inter** for body text, a
  deliberate indigo/emerald/rose color palette (not default Tailwind grays)
>- **Dark mode** — full app-wide theme toggle, persisted across sessions
>- Loading skeletons, empty states, and toast notifications for every async action
>- Smooth micro-transitions (fade-ins, hover states, animated progress bars)
>- **Fully responsive** — collapsible sidebar drawer on mobile, adaptive grid layouts
  on tablet and desktop

---

<img width="1394" height="717" alt="image" src="https://github.com/user-attachments/assets/400cdf82-ad36-458b-916b-7f8e74dc25ee" />


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
<img width="1399" height="716" alt="image" src="https://github.com/user-attachments/assets/9db88826-2c38-40d7-bfc1-564b48f2e07d" />

## 🏗️ Architecture

>Ledgerly follows a clean **MVC** pattern on the backend and a **component + context**
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



<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/e8837a9c-95bb-4207-bab3-8757d7b479b8" />



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
<img width="1401" height="718" alt="image" src="https://github.com/user-attachments/assets/21964dc7-4d28-48bb-bbd7-3db55f478fd1" />

---

## 🚀 Getting Started

### Prerequisites
>- [Node.js](https://nodejs.org/) v18 or higher
>- npm (comes bundled with Node.js)

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

>Open a second terminal:

```bash
cd expensetracker-pro-frontend
npm install
npm run dev         # runs on http://localhost:5174
```

### 4. Open the app

>Visit **[http://localhost:5174](http://localhost:5174)** and switch between the three
seeded demo profiles from the user menu in the top-right corner.

> Re-run `npm run seed` at any time to reset all demo data back to a fresh state.

---


<img width="1398" height="717" alt="image" src="https://github.com/user-attachments/assets/40986538-2745-4eda-871c-916ef40c0942" />

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

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/021d78c6-2e75-4298-aafc-ec41278f7932" />


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

>Dark mode is implemented with Tailwind's `class` strategy and toggled globally through
`AppContext`, with the preference persisted in `localStorage`.

---

## ☁️ Deployment

>The backend and frontend are deployed **separately**, since the backend needs a
long-running server with a writable filesystem (for its `fs`-based JSON storage),
which serverless platforms like Vercel don't provide.

| Part | Platform | Why |
|---|---|---|
| Frontend (React/Vite) | [Vercel](https://vercel.com) | Static build, perfect fit |
| Backend (Express + `fs`) | [Render](https://render.com) | Long-running Node process with a persistent filesystem |

**Live URLs:**
>- Frontend: `https://ayesha-abid-expense-tracker.vercel.app`
>- Backend API: `https://ayesha-abid-expense-tracker-api.onrender.com/api`

### Backend (Render)
>1. New **Web Service** → connect the `Ayesha-Abid-Expense-tracker` repo
>2. Root Directory: `expensetracker-pro-backend`
>3. Build Command: `npm install && npm run seed`
>4. Start Command: `npm start`
>5. Environment Variable: `FRONTEND_URL` = the deployed Vercel URL (set after the frontend is live)

### Frontend (Vercel)
>1. Import the `Ayesha-Abid-Expense-tracker` repo
>2. Root Directory: `expensetracker-pro-frontend`
>3. Framework: Vite (auto-detected) · Build Command: `npm run build` · Output: `dist`
>4. Environment Variable: `VITE_API_BASE_URL` = the deployed Render URL + `/api`

---

<img width="270" height="500" alt="image" src="https://github.com/user-attachments/assets/99b2c2f6-61cf-4941-bd28-cfbae8b90d45" />


## 🗺️ Roadmap

>- [ ] Real authentication (JWT-based) to replace the demo profile switcher
>- [ ] Migrate storage layer to MongoDB/PostgreSQL (only `utils/*Helper.js` would change)
>- [ ] Recurring transactions & scheduled bills
>- [ ] Multi-currency support
>- [ ] Shareable/exportable public report links

---

## 📄 License

>This project is available for educational and portfolio purposes.

---

<div align="center">

**✦ Author ✦**

**Your Name**
🐙 GitHub: [@your-username]((https://github.com/AyeshaAbid892))
💼 LinkedIn: [your-profile](https://www.linkedin.com/in/ayesha-abid33/)
📧 Email: ayeshaa.abid33@gmail.com

---

<div align="center">


>Built with ❤️ using Node.js, Express, React, and Tailwind CSS
<br>


<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6d5ef9,25:8b7bfa,50:10b981,75:f7df1e,100:f43f5e&height=180&section=footer&text=Thanks%20for%20visiting%20Ledgerly!%20💜&fontSize=32&fontColor=ffffff&fontAlignY=75&desc=Multi-User%20Expense%20Tracker%20•%20Built%20with%20React%20+%20Node.js%20+%20Express%20•%20Status%3A%20Complete%20✅&descAlignY=90&descSize=14&animation=fadeIn&stroke=ffffff&strokeWidth=1" width="100%" />

<div align="center">



</div>
