# 🌐 Shortlink App — Frontend Client

A modern, responsive, and intuitive web application client for the Shortlink platform, built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Redux Toolkit**.

---

## 📑 Table of Contents

- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Key Features](#-key-features)
- [Project Directory Structure](#-project-directory-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Development](#installation--local-development)
  - [Running the Full Stack with Docker Compose](#running-the-full-stack-with-docker-compose)
- [State Management & Routing Architecture](#-state-management--routing-architecture)
- [CI/CD & Deployment](#-cicd--deployment)

---

## 🏛️ Architecture & Tech Stack

- **Core Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) with Fast Refresh
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [`redux-persist`](https://github.com/rt2zz/redux-persist)
- **Routing**: [React Router v8](https://reactrouter.com/) (Declarative client routing with route guards)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Server Deployment**: Multi-stage Docker image served via Nginx with SPA fallback routing

---

## ✨ Key Features

1. **Landing Page**
   - Hero banner with dynamic Call-To-Action based on authentication state.
   - Quick-shorten feature: guests are guided to sign up/login, authenticated users can immediately generate links.
   - Feature highlight cards and stats preview.
2. **Authentication Flow**
   - Dedicated Registration and Login pages with real-time field validation.
   - Global Redux state integration with automatic session persistence.
   - Clean logout with token revocation and redirect.
3. **Link Management & Dashboard**
   - Comprehensive link dashboard displaying:
     - Original destination URL.
     - Formatted short link with direct open action.
     - One-click copy-to-clipboard with instant visual confirmation ("Copied!").
     - Total click analytics counter.
     - Creation date formatting.
   - **Pagination**: Smooth multi-page navigation for high link volumes.
   - **Search / Filter**: Instant real-time title/URL filtering.
   - **Soft Delete Modal**: Safe deletion with explicit modal confirmation.
4. **Create Link Page**
   - URL validation and protocol checking (`http://` or `https://`).
   - Optional custom slug input with real-time availability check (`/api/links/check`).
   - Dynamic live URL preview (`http://domain/:slug`).
   - Constraints feedback (3–50 chars, alphanumeric + hyphens, reserved words blocking).
5. **Profile Page**
   - Account overview displaying email and dynamically formatted registration date ("Member since: ...").
   - Summary link statistics.

---

## 📁 Project Directory Structure

```
shortlink-fe/
├── public/                      # Static web assets
├── src/
│   ├── assets/                  # Hero illustrations and logo SVGs
│   ├── components/
│   │   ├── footer/              # Global footer component
│   │   ├── layouts/             # MainLayout and AuthLayout containers
│   │   ├── navbar/              # Responsive navbar with auth state awareness
│   │   └── routes/              # Route guards (PrivateRoute, PublicRoute)
│   ├── pages/
│   │   ├── auth/                # Login and Register pages
│   │   ├── createLink/          # Link generation form & slug validator
│   │   ├── dashboard/           # Link management dashboard with pagination
│   │   ├── landingPage/         # Public marketing & quick-shorten page
│   │   ├── notFound/            # 404 Error page
│   │   ├── profile/             # User profile and account details
│   │   └── router/              # Main router switch & hierarchy
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── auth/            # Auth state (token, user, login, logout)
│   │   │   └── link/            # Links collection state & caching
│   │   └── store.js             # Redux store with redux-persist configuration
│   ├── App.jsx                  # App root
│   ├── index.css                # Global styles & Tailwind v4 theme directives
│   └── main.jsx                 # React root renderer
├── Dockerfile                   # Multi-stage Docker build (Node -> Nginx)
├── nginx.conf                   # Production Nginx reverse proxy configuration
└── package.json                 # Project dependencies & scripts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```ini
# Base URL pointing to the Shortlink backend API
VITE_API_BASE_URL=http://localhost:2901/api
```

For local Vite development, the frontend calls the backend at `http://localhost:2901/api`. In the production Docker image, the workflow builds with `/api`; Nginx proxies API requests to the backend container.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [npm 10+](https://www.npmjs.com/)
- The [Shortlink backend](https://github.com/habibmrizki/shortlink-be) running at `http://localhost:2901` for API features.

---

### Installation & Local Development

1. **Clone this repository and install dependencies**:

   ```bash
   git clone https://github.com/habibmrizki/shortlink-fe.git
   cd shortlink-fe
   npm ci
   ```

2. **Configure environment**:

   ```bash
   cp .env.example .env
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

   The app will run locally at `http://localhost:5173`.

4. **Lint and Type/Syntax checks**:

   ```bash
   make lint
   # or: npm run lint
   ```

5. **Lint and build**:

   ```bash
   npm run lint
   npm run build
   ```

### Running the Full Stack with Docker Compose

The production frontend image expects the `shortlink-be` service on the Compose network for API requests and short-link redirects. Start the full stack from the backend repository instead of running this image by itself:

```bash
git clone https://github.com/habibmrizki/shortlink-be.git
cd shortlink-be
cp .env.example .env
# Edit .env and set secure database/JWT credentials
docker compose up -d
docker compose ps
```

Open the app at `http://localhost:5174`. For another device on the same network, use `http://<host-lan-ip>:5174`. The frontend and backend GHCR images must be available to Docker; authenticate with `docker login ghcr.io` first if either package is private.

---

## 🧠 State Management & Routing Architecture

### 1. Redux Toolkit + Redux Persist

- **`authSlice`**: Stores the JWT access token and user profile (`id`, `email`, `created_at`). Persisted via `localStorage` so users stay logged in across page refreshes.
- **`linkSlice`**: Manages fetched link items, active filters, pagination state, and optimistic updates.
- **No Legacy Context API**: Fully centralized state architecture adhering to scalable Redux best practices.

### 2. Route Protection (`React Router v8`)

- **`PrivateRoute`**: Guards routes requiring authentication (`/dashboard`, `/create-link`, `/profile`). Unauthenticated users (no token) are automatically redirected to `/login`.
- **`NotFound` (`*`)**: Handles arbitrary invalid URLs with a dedicated 404 UI.

---

## 🚢 CI/CD & Deployment

- **Pipeline**: Automated build and push via GitHub Actions in `.github/workflows/build-image-and-push-to-ghcr.yml`.
- **Production Web Server**: Production builds run on Alpine Nginx. It serves frontend routes and static assets, proxies `/api/` to the backend, and forwards unknown paths to the backend short-link redirect handler.
