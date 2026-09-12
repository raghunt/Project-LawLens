# Law Lens

## Overview

Law Lens is a full-stack web application that provides AI-powered legal analysis for users in the United States and India. The application allows users to describe their legal situations and receive comprehensive analysis including favorable impacts, potential concerns, detailed explanations, and recommended actions. It also includes a searchable database of current and proposed laws from both countries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for legal analysis and law database queries
- **Request Logging**: Custom middleware for API request monitoring
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Development Storage**: In-memory storage implementation for development
- **Connection**: Neon Database serverless PostgreSQL for production

### Authentication and Authorization
- **Current State**: Basic user schema defined but not implemented
- **Planned Features**: Username/password authentication with session management
- **Session Storage**: PostgreSQL-based session store using connect-pg-simple

### AI Integration
- **Provider**: Google Gemini AI (gemini-2.5-pro model)
- **Use Case**: Legal situation analysis with structured JSON responses
- **Input Processing**: Country-specific analysis for US and Indian law
- **Output Format**: Structured analysis with favorable impacts, concerns, detailed analysis, and recommended actions

### Database Schema
- **Users Table**: Basic user authentication (username, password)
- **Legal Analyses Table**: Stores analysis requests and AI-generated results
- **Laws Table**: Curated database of current and proposed laws by country and category
- **Data Types**: JSONB for analysis results, timestamps for audit trails

### Application Structure
- **Shared Types**: Common TypeScript definitions in `/shared` directory
- **Client-Server Separation**: Clear separation with shared schema validation
- **Development Setup**: Hot reloading with Vite, TypeScript compilation checking
- **Production Build**: Optimized client bundle and server bundle with esbuild

### Key Design Patterns
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Component Architecture**: Reusable UI components with consistent styling
- **Error Boundaries**: Comprehensive error handling at multiple levels
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure WCAG compliance

### Development Environment
- **Replit Integration**: Special handling for Replit development environment
- **Hot Module Replacement**: Fast development feedback with Vite HMR
- **Code Quality**: TypeScript strict mode, ESLint integration ready
- **Asset Management**: Proper static asset handling and optimization

## External Dependencies

### Core Runtime Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **drizzle-zod**: Integration between Drizzle and Zod for validation
- **express**: Web application framework for Node.js
- **tsx**: TypeScript execution environment for development

### Frontend UI Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for constructing className strings
- **tailwindcss**: Utility-first CSS framework

### AI and External Services
- **@google/genai**: Google Generative AI client for Gemini integration
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development and Build Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: Database migration and schema management tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **wouter**: Minimalist client-side routing
- **cmdk**: Command palette component
- **nanoid**: URL-safe unique ID generator
- **zod**: TypeScript-first schema validation library

### Environment Variables Required
- **DATABASE_URL**: PostgreSQL connection string
- **GEMINI_API_KEY** or **GOOGLE_AI_API_KEY**: Google AI API authentication