# Portfolio Application

## Overview

This is a full-stack portfolio application built with React and Express, featuring GitHub integration to showcase projects and a contact form. The application serves as a personal portfolio website with a modern, responsive design.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Structure**: RESTful API endpoints under `/api` prefix

### Data Storage
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with TypeScript support
- **Schema**: Shared schema definition for type safety
- **Migrations**: Drizzle migrations in `./migrations` directory

### Authentication & Authorization
- **Sessions**: Server-side sessions using `connect-pg-simple`
- **Storage**: Session data stored in PostgreSQL
- **User Management**: Basic user authentication system

## Key Components

### Database Schema
- **users**: User authentication and profile data
- **projects**: GitHub project information with metadata
- **contacts**: Contact form submissions

### API Endpoints
- `GET /api/projects`: Fetches and caches GitHub repositories
- `POST /api/contact`: Handles contact form submissions
- User authentication endpoints (implementation in progress)

### Frontend Pages
- **Home**: Single-page application with sections for hero, about, projects, and contact
- **Navigation**: Smooth scrolling navigation with active section highlighting
- **Projects**: Dynamic project showcase with GitHub integration
- **Contact**: Contact form with server-side validation

### External Integrations
- **GitHub API**: Fetches user repositories with caching
- **Neon Database**: Serverless PostgreSQL database
- **Environment Variables**: GitHub username and token configuration

## Data Flow

1. **Project Data**: GitHub API → Server cache → Database → Frontend display
2. **Contact Forms**: Frontend form → Server validation → Database storage → Email notification
3. **User Sessions**: Login → Server session → Database storage → Authentication state

## External Dependencies

### Backend Dependencies
- `@neondatabase/serverless`: Serverless PostgreSQL driver
- `drizzle-orm`: Database ORM with TypeScript support
- `express`: Web framework
- `connect-pg-simple`: PostgreSQL session store

### Frontend Dependencies
- `@tanstack/react-query`: Server state management
- `@radix-ui/*`: Headless UI components
- `tailwindcss`: Utility-first CSS framework
- `wouter`: Lightweight routing library

### Development Tools
- `tsx`: TypeScript execution for development
- `esbuild`: JavaScript bundler for production
- `vite`: Frontend build tool and dev server

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` directory
2. Backend builds to `dist/index.js` using esbuild
3. Static assets served from built frontend

### Production Configuration
- **Port**: 5000 (configurable via environment)
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **Environment**: `NODE_ENV=production` for optimizations
- **Static Files**: Served from `dist/public`

### Development Workflow
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Builds both frontend and backend for production
- `npm run start`: Runs production build
- `npm run db:push`: Pushes database schema changes

## Changelog

- June 26, 2025. Initial setup
- June 26, 2025. Customized portfolio with placeholders for personalization, fixed GitHub integration, improved black and white design

## Recent Changes

- Updated hero section with personalized greeting template
- Modified about section with photo placeholder and custom bio
- Enhanced skills section with frontend-focused technologies
- Improved contact section with customizable contact info
- Fixed GitHub integration to pull real user repositories
- Applied consistent black and white color scheme throughout

## User Preferences

Preferred communication style: Simple, everyday language.
Project focus: Frontend developer portfolio with black and white design theme
Customization level: High - user wants extensive personalization