# React 19 + TypeScript + Vite Template

This is a production-ready starter template for building modern web applications using React 19, TypeScript, Vite, and Tailwind CSS. It includes pre-configured settings for testing, linting, path aliases, and Docker development/deployment, aiming for simplicity, scalability, and best practices.

## ✨ Features

*   🚀 **Modern Stack:** React 19, Vite 6+, TypeScript 5+, Tailwind CSS 4+
*   📦 **UI Components:** Includes a basic reusable `Button` component setup (using `cva` and `tailwind-merge` in `src/components/ui`)
*   🧪 **Testing:** Pre-configured with Jest, React Testing Library (`@testing-library/react`), `ts-jest`, and `@testing-library/jest-dom`.
*   💅 **Linting & Formatting:** ESlint (with React Hooks, JSX A11y rules) and Prettier configured.
*   🐳 **Docker Ready:** Includes `Dockerfile` and `docker-compose.yml` for consistent development and production environments.
*   ⚡️ **Vite Power:** Fast HMR, optimized builds, and easy configuration.
*   📁 **Path Aliases:** `@` alias configured for `src/` for cleaner imports.
*   🎨 **Theming:** Basic theme setup using CSS variables in `src/index.css` (inspired by Shadcn UI).
*   ✅ **Strict Mode & TS Checks:** Enforces best practices with React Strict Mode and strict TypeScript settings.

## 🏁 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended - check `.node-version` or `package.json` engines if specified)
*   [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (for containerized development/deployment)
*   [npm](https://www.npmjs.com/) (or `yarn`, `pnpm`)

### Installation

1.  Clone the repository or use it as a template.
2.  Navigate into the project directory:
    ```bash
    cd react-template
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

##  P Available Scripts

In the project directory, you can run:

*   `npm run dev`
    Runs the app in development mode using Vite.
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
    The page will reload if you make edits.

*   `npm run build`
    Builds the app for production to the `dist` folder using TypeScript and Vite.
    It correctly bundles React in production mode and optimizes the build for the best performance.

*   `npm test`
    Launches the test runner (Jest) in interactive watch mode.

*   `npm run lint`
    Runs ESLint to analyze the code for potential errors and style issues.

*   `npm run preview`
    Starts a local static web server that serves the built application from the `dist` folder. Useful for checking the production build locally.

## 🐳 Docker Usage

This template is configured for Docker development and deployment.

### Development

1.  Ensure Docker Desktop is running.
2.  Build the development image (if not already built or if dependencies changed):
    ```bash
    docker compose build
    ```
3.  Start the development container:
    ```bash
    docker compose up
    ```
    This will start the Vite dev server inside the container, accessible at [http://localhost:5173](http://localhost:5173). The `command` in `docker-compose.yml` handles installing dependencies first.

### Production

The provided `Dockerfile` can be adapted for production. It copies code, installs dependencies (you would uncomment the `RUN npm install` for a prod build image), builds the application (`RUN npm run build`), and can use a static server like `serve` (you might uncomment the `RUN npm i -g serve` and `CMD`) or be used in a multi-stage build with a web server like Nginx.

## 📁 Project Structure

```
react-template/
├── public/             # Static assets (copied to dist)
├── src/
│   ├── assets/         # Static assets used by components
│   ├── components/
│   │   └── ui/         # Reusable UI components (e.g., button.tsx)
│   ├── lib/            # Utility functions (e.g., utils.ts for cn)
│   ├── App.css         # Styles specific to App.tsx
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global styles, Tailwind directives, theme variables
│   ├── main.tsx        # Application entry point
│   └── setupTests.ts   # Jest setup file
├── .env                # Local environment variables (gitignored)
├── .env.example        # Example environment variables
├── .eslintrc.js        # ESLint configuration
├── .gitignore          # Git ignore rules
├── .prettierrc         # Prettier configuration
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration for dev
├── jest.config.ts      # Jest configuration
├── index.html          # Main HTML template for Vite
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Lockfile for dependencies
├── README.md           # This file
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.app.json   # TypeScript config for application code
├── tsconfig.json       # Base TypeScript config (solution-style)
├── tsconfig.node.json  # TypeScript config for Node environment (Vite config, etc.)
└── vite.config.ts      # Vite configuration
```

## 💻 Technology Stack

*   **Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Primitives (Optional):** [Radix UI](https://www.radix-ui.com/) (via `@radix-ui/react-slot`)
*   **Class Merging:** [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
*   **Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [jest-dom](https://github.com/testing-library/jest-dom)
*   **Linting:** [ESLint](https://eslint.org/)
*   **Formatting:** [Prettier](https://prettier.io/)
*   **Containerization:** [Docker](https://www.docker.com/)

## 🤝 Contributing & Customization

Feel free to fork this repository, customize it, and contribute back if you have improvements!

Possible next steps for customization:

*   Add state management (Zustand, Jotai, Redux Toolkit)
*   Integrate a router (React Router)
*   Add internationalization (i18next)
*   Set up CI/CD pipelines.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or choose your preferred license).
