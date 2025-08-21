# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: FastAPI app in `main.py`, env template `.env.example`, Python deps `requirements.txt`. Runs on `http://localhost:8000`.
- `frontend/`: React + TypeScript + Vite. Entry in `src/`, static assets in `public/`, config in `vite.config.ts`. Dev server on `http://localhost:5173`.
- Docs: Root `README.md` (overview), `frontend/README.md` (template notes).

## Build, Test, and Development Commands
- Frontend:
  - `cd frontend && npm install`
  - `npm run dev`: Start Vite dev server.
  - `npm run build`: Type-check and build to `dist/`.
  - `npm run preview`: Preview the production build.
  - `npm run lint`: Run ESLint over the project.
- Backend:
  - `cd backend && python -m venv venv && source venv/bin/activate`
  - `pip install -r requirements.txt`
  - `python main.py`: Start the API (uses Uvicorn).

## Coding Style & Naming Conventions
- Frontend (TS/React):
  - 2-space indentation; prefer functional components and hooks.
  - Components: PascalCase filenames (e.g., `LoginPage.tsx`) under `src/components/`.
  - Hooks: `useXyz` naming; keep types/interfaces near usage.
  - Linting: ESLint configured via `eslint.config.js`.
- Backend (Python):
  - Follow PEP 8; 4-space indentation; snake_case for functions/vars.
  - Use Pydantic models for request/response schemas; keep routes cohesive in `main.py` (factor to modules when growing).

## Testing Guidelines
- No formal test suites are included yet.
- If adding tests:
  - Frontend: Vitest + React Testing Library in `frontend/src/__tests__/`, filenames `*.test.tsx`.
  - Backend: pytest in `backend/tests/`, filenames `test_*.py`.
  - Aim for critical-path coverage (auth flows, form validation, API calls).

## Commit & Pull Request Guidelines
- Commits: Imperative mood, concise subject (<=72 chars). Prefix scope when helpful (e.g., `frontend:`, `backend:`).
- PRs: Include a clear description, linked issues, screenshots/GIFs for UI, reproduction steps, and risk/rollback notes. Ensure `npm run lint` passes and both apps start locally.

## Security & Configuration Tips
- Copy `backend/.env.example` to `.env`; set `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `FROM_EMAIL`. Never commit secrets.
- Update CORS origins in `backend/main.py` for production domains.
- Prefer real OTP/email providers in prod; avoid logging codes or tokens.
