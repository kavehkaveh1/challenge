# FirstChallenge

## Description

This is a fully responsive CRUD dashboard built with React and TypeScript, featuring dynamic forms, modal-based navigation, and a mock backend. The project initially used Redux for state management but later evolved to handle data directly with JSON Server and local state, improving simplicity and maintainability. During development, country-city linkage was added to make forms smarter, and Toastify notifications enhanced user feedback. The final version removed React Router, using a modal-based UI for create, view, and edit operations while keeping full TypeScript type safety, responsive design, and validation.

## Features

- Create, view, update, and delete (CRUD) operations
- Responsive UI layout for desktop and mobile
- Form validation with react-hook-form
- Toast notifications for action feedback
- Dynamic country-city select dropdowns
- Modal-based navigation for all forms
- Clean, modular, and maintainable code
- Evolved project structure: removed router, added base and modal-driven UI

## Technologies

- React (Functional Components, Hooks)
- TypeScript for type safety
- react-hook-form for form handling and validation
- Toastify for notifications
- Material-UI (MUI) for responsive components
- JSON Server as a mock backend
- Modal-based UI for page-less navigation
- RESTful API
- Git
- Technologies previously used (still in project history/branches):
- Redux (removed in final version)
- React Router DOM (removed in final version)

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

## Available Scripts

### `npm run dev`

Runs the application and JSON Server simultaneously.

- frontend runs on : http://localhost:5173
- JSON Server runs on : http://localhost:3000

## Project Structure

- components: Reusable UI components
- Hooks: Custom React hooks
- Pages: Application pages (routes)
- dataServer: JSON Server related files
