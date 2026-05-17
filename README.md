# OctoCV - AI-Powered CV Builder and Career Platform

OctoCV is a frontend application for building ATS-friendly CVs, planning career development, and matching users with opportunities.

## Highlights

- AI CV builder workflow
- Career path planning with skill-gap focus
- Skills assessment flows and questionnaires
- JWT-based authentication and persisted sessions
- Admin dashboard and role-based routes
- Cookie consent banner and accessibility-conscious UI
- Responsive interface built with React and Tailwind

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Redux Toolkit + redux-persist
- Tailwind CSS 3
- Framer Motion
- React Hook Form
- Axios

## Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm 9+

## Project Structure

```text
src/
	api/
		axiosInstance.js
	components/
		Admin/
		Questionnaire/
		routes/
		user/
		...
	context/
	slices/
		authSlice.js
		cvSlice.js
		questionnaireSlice.js
	utils/
		mockApi.js
	App.jsx
	index.jsx
	store.js
```
