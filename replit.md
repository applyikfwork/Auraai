# Aura Avatar Studio

## Overview

Aura Avatar Studio is a Next.js-based AI-powered avatar generation platform that enables users to create personalized avatars across multiple artistic styles (Photoreal, Anime, Cartoon, Vector, Cyberpunk, Fantasy). The application leverages Google's Genkit AI framework to provide intelligent style mixing, brand-aware personalization, and real-time avatar generation capabilities.

The platform offers a complete avatar creation experience with user authentication, gallery management, and platform-specific presets for social media, streaming, corporate, gaming, and NFT use cases.

## Recent Changes

**Replit Migration (October 30, 2025)**
- Migrated project from Vercel to Replit environment
- Security improvements: Moved Firebase credentials from hardcoded values to environment variables
- Updated development and production scripts to use port 5000 and bind to 0.0.0.0 for Replit compatibility
- Created .env.local for local development configuration
- Created .env.example to document required environment variables
- Configured Replit deployment settings for autoscale deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering**
- Next.js 15.3.3 with App Router and React Server Components (RSC)
- TypeScript for type safety throughout the application
- Turbopack enabled for faster development builds
- Client-side routing with progressive enhancement

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component organization: `/src/components/ui` for base components, `/src/components` for feature components
- Dark/light mode support with CSS custom properties
- Responsive design with mobile-first approach

**State Management**
- React hooks for local component state
- React Hook Form with Zod schema validation for form handling
- Context API for authentication state (AuthProvider)
- Real-time Firestore subscriptions for user gallery updates

### Backend Architecture

**AI Integration (Genkit)**
- Google Genkit framework for AI workflows and prompt management
- Two primary AI flows:
  1. **Logo-Driven Personalization** (`/src/ai/flows/logo-driven-personalization.ts`): Analyzes brand logos to suggest color palettes and avatar styles
  2. **Style Mixer Tool** (`/src/ai/flows/style-mixer-tool.ts`): Blends two art styles with weighted parameters to generate unique avatars
- Server actions pattern for AI endpoints ('use server' directive)
- Structured input/output with Zod schemas for type safety
- Google Gemini 2.5 Flash as the default AI model

**API Pattern**
- Server actions for AI workflows (logo analysis, style mixing)
- Client-side Firebase SDK for authentication and Firestore operations
- Environment variable configuration for API keys and Firebase credentials

**Authentication & Authorization**
- Firebase Authentication with support for:
  - Email/password authentication
  - Google OAuth provider (social login)
- Protected routes pattern with authentication context
- User session management via Firebase Auth state observers

### Data Storage

**Firestore Database**
- NoSQL document database structure:
  - `/users/{userId}/avatars`: User-generated avatar collection
  - Real-time synchronization for gallery updates
- Document schema for avatars:
  - `imageUrl`: Data URI or URL of generated avatar
  - `createdAt`: Timestamp for ordering
  - Additional metadata fields as needed

**Client-Side Storage**
- Data URIs for in-memory avatar preview and manipulation
- Base64 encoding for image transmission to AI models

### Design System

**Theme Architecture**
- Custom CSS variables defined in `/src/app/globals.css`
- Primary gradient: Indigo (#6B5BFF) to Cyan (#00C2FF)
- Accent color: Warm Pink (#FF7AA2)
- Light/dark mode with HSL color space for theming
- Typography: Inter font family for both headings and body text

**Component Patterns**
- Controlled vs uncontrolled component patterns (forms use controlled)
- Compound component pattern (Accordion, Tabs, Dialog)
- Render props and slot pattern via Radix UI
- Toast notifications for user feedback

### Configuration & Build

**Build Configuration**
- TypeScript strict mode enabled
- Build-time error suppression for TypeScript and ESLint (rapid development mode)
- Image optimization configured for external domains (Unsplash, placeholder services)
- Module resolution: "bundler" mode with path aliases (`@/*` → `./src/*`)

**Development Workflow**
- Dual development servers:
  - Main app: `npm run dev` on port 5000
  - Genkit dev UI: `npm run genkit:dev` for AI workflow testing
- Hot module replacement via Turbopack
- Type checking via `npm run typecheck`

## External Dependencies

### AI & Machine Learning
- **@genkit-ai/google-genai**: Google Genkit plugin for Gemini AI models
- **@genkit-ai/next**: Next.js integration for Genkit workflows
- **genkit**: Core Genkit framework for AI orchestration

### Authentication & Database
- **Firebase SDK (v11.9.1)**:
  - `firebase/auth`: User authentication
  - `firebase/firestore`: Real-time database
  - Configuration via environment variables (API keys, project ID)

### UI Framework & Components
- **@radix-ui/react-***: Headless UI primitives (24+ components)
  - Accordion, Dialog, Dropdown Menu, Select, Slider, Tabs, Toast, Tooltip
  - Accessibility-first component architecture
- **lucide-react**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling
- **tailwind-merge**: Utility for merging Tailwind classes
- **embla-carousel-react**: Carousel/slider functionality

### Form Handling & Validation
- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Validation resolver integration
- **zod** (via genkit): Schema validation for forms and AI I/O

### Utilities
- **date-fns**: Date manipulation and formatting
- **recharts**: Charting library (for potential analytics features)
- **dotenv**: Environment variable management

### Image Handling
- **Next.js Image Component**: Optimized image loading
- **Remote patterns configured**:
  - images.unsplash.com
  - placehold.co
  - picsum.photos

### Development Tools
- **patch-package**: Post-install patching for npm packages
- **tsx**: TypeScript execution for Genkit dev server