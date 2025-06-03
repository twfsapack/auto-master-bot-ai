# Auto Master Bot AI

## Description

Auto Master Bot AI is a comprehensive vehicle management application designed to help users track maintenance, diagnose issues via OBD-II scanners, and get AI-powered assistance for vehicle care. It aims to provide a user-friendly interface for managing all aspects of vehicle ownership, from routine servicing to complex problem diagnosis.

## Features

*   **Vehicle Dashboard:** At-a-glance overview of your vehicle's status.
*   **Multi-Vehicle Management:** Support for managing multiple vehicles (Premium feature).
*   **Maintenance Scheduling:** Keep track of past and upcoming maintenance tasks with a calendar view.
*   **OBD-II Scanning & Diagnostics:** Connect to OBD-II scanners via Web Bluetooth to read diagnostic trouble codes (DTCs) and view real-time sensor data.
*   **AI Chat Assistant:** Get AI-powered advice and diagnostic help based on your vehicle's information and OBD-II data. Powered by OpenAI.
*   **Problem Database:** Access a database of common vehicle problems and potential solutions.
*   **User Authentication:** Secure user registration and login.
*   **Premium Features:** Unlock advanced capabilities like unlimited vehicles, unlimited AI chat questions, and access to premium diagnostic information.
*   **Internationalization:** Support for multiple languages (English, Spanish, French, German, Portuguese).
*   **Dark Mode:** Switch between light and dark themes for user comfort.

## Tech Stack

*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Core Framework:** [React](https://reactjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Data Fetching/State Management:** [TanStack Query (React Query)](https://tanstack.com/query/latest) (implicitly used via Shadcn UI and custom hooks)
*   **Linting:** [ESLint](https://eslint.org/)

## Project Structure Overview

The project follows a standard feature-oriented structure:

*   `public/`: Static assets, including images and `robots.txt`.
*   `src/`: Main application source code.
    *   `components/`: Reusable UI components.
        *   `auth/`: Authentication related components.
        *   `chat/`: Components for the AI chat interface.
        *   `common/`: Layouts, selectors, and other shared components.
        *   `dashboard/`: Components for the main vehicle dashboard.
        *   `database/`: Components for the problems/solutions database.
        *   `maintenance/`: Components for maintenance scheduling and calendar views.
        *   `onboarding/`: Components for user and vehicle onboarding.
        *   `premium/`: Components related to premium features.
        *   `scanner/`: Components for OBD-II and VIN scanning.
        *   `settings/`: Components for user and application settings.
        *   `ui/`: Generic UI elements from Shadcn UI (buttons, cards, dialogs, etc.).
        *   `vehicle/`: Components for managing vehicle information.
    *   `contexts/`: Global state management using React Context API (e.g., Auth, Theme, Language, Vehicle).
    *   `data/`: Static data like recommended maintenance tasks.
    *   `hooks/`: Custom React hooks for shared logic (e.g., `useAuthOperations`, `useBluetooth`, `useOpenAIChat`).
    *   `lib/`: Utility functions (e.g., `cn` from Shadcn UI).
    *   `pages/`: Top-level page components representing different routes/views of the application.
    *   `services/`: Modules for interacting with external APIs (e.g., `openai.ts`).
    *   `types/`: TypeScript type definitions and interfaces.
*   `index.html`: Main HTML entry point.
*   Configuration files for ESLint, PostCSS, Tailwind CSS, TypeScript, Vite.

## Getting Started / Setup Instructions

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```
    (Replace `<YOUR_GIT_URL>` and `<YOUR_PROJECT_NAME>` accordingly. If you cloned from Lovable, the project name will likely be `app` or similar.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173`. The application will auto-reload when you make changes.

## Available Scripts

The `package.json` file contains the following scripts:

*   `npm run dev`: Starts the development server using Vite with Hot Module Replacement (HMR).
*   `npm run build`: Builds the application for production. Output is in the `dist/` directory.
*   `npm run lint`: Runs ESLint to analyze the code for potential errors and style issues.
*   `npm run preview`: Serves the production build locally to preview it before deployment.

## Linting and Code Style

This project uses ESLint for static code analysis and to enforce coding standards. You can run the linter with:

```bash
npm run lint
```
Please ensure linting passes before committing changes.

## Testing (Placeholder)

Automated tests are planned for this project using Vitest. Instructions for running tests will be added here once implemented.

## Contribution Guidelines

Contributions are welcome! Please follow standard coding practices:
*   Ensure your code is well-formatted and readable.
*   Make sure `npm run lint` passes without errors.
*   Write clear and concise commit messages.
*   Submit pull requests for review.

More detailed contribution guidelines may be added in the future.

## Deployment

*   **Lovable Platform:**
    This project can be deployed via the [Lovable platform](https://lovable.dev/). Navigate to your project on Lovable and use the "Share -> Publish" option.
    You can also connect a custom domain via Project > Settings > Domains on Lovable. See [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).

*   **Manual Deployment:**
    To deploy manually, first build the project:
    ```bash
    npm run build
    ```
    Then, deploy the contents of the generated `dist/` directory to your preferred hosting provider (e.g., Netlify, Vercel, GitHub Pages, or a custom server).
```
