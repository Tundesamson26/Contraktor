# Contraktor - Artisan Marketplace

A modern, responsive web application for connecting clients with skilled artisans. Built with Next.js 14, TypeScript, Tailwind CSS, and Redux Toolkit.

## Features

- **Explore Artisans**: Browse and search for artisans with real-time filtering by trade and search terms
- **Artisan Profiles**: Detailed profile pages with portfolio galleries and service request forms
- **Admin Dashboard**: Analytics visualization showing service request trends
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- **Form Validation**: Client-side validation using React Hook Form and Zod
- **State Management**: Redux Toolkit for predictable state management
- **Persistence**: localStorage integration for saving user preferences

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # Internal API Routes
│   │   ├── artisans/      # Artisan list & filtering
│   │   ├── artisans/[id]/ # Individual artisan details
│   │   ├── requests/      # Service request submission
│   │   └── analytics/     # Dashboard statistics
│   ├── artisans/[id]/     # Artisan Profile Page
│   ├── admin/             # Admin Dashboard Page
│   └── page.tsx           # Explore Artisans Home
├── components/
│   ├── features/          # Feature-specific components (ArtisanCard, Pagination, etc.)
│   ├── layout/            # Layout components (Navbar)
│   ├── providers/         # Context providers (ThemeProvider)
│   └── ui/                # Base UI components (shadcn/ui style)
├── lib/
│   ├── features/          # Redux Toolkit slices
│   ├── __tests__/         # Unit tests
│   ├── data.ts            # Centralized mock dataset
│   ├── mock-api.ts        # Client-side API service (fetch)
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks
│   └── utils.ts           # Utility functions (cn, etc.)
└── types/                 # TypeScript interfaces
```

## Key Decisions

- **URL-Based State**: Search, trade filters, and pagination are synced with the URL. This enables browser history support and shareable search results.
- **Glassmorphism UI**: Used a premium "glass" aesthetic with `backdrop-blur` and high-contrast typography to create a high-end feel.
- **Zod for Validation**: Implemented schema-based validation for the "Request Service" form to ensure data integrity before submission.
- **Redux for Global State**: While small, Redux was implemented to demonstrate the ability to scale for complex features like user session management or a global "saved artisans" list.

## Tradeoffs

- **Client vs Server Rendering**: Used `use client` for filtering-intensive sections to provide instant feedback, while leveraging Next.js layouts for SEO.
- **Mock Data over real DB**: Used a static dataset for speed of development while maintaining the API structure so it can be swapped for a real DB (PostgreSQL/MongoDB) with minimal changes.
- **Vanilla CSS vs Tailwind**: Opted for Tailwind for rapid development and consistent spacing/theming while using custom HSL vars for brand colors.

## Future Improvements

- **Authentication**: Implementing NextAuth.js for artisan/client login.
- **Real-time Chat**: Integration of Socket.io for direct communication between clients and artisans.
- **Review System**: A dedicated database-backed review and rating system.
- **Map Integration**: Using Google Maps API to show artisan locations.
- **Optimistic UI**: Using React `useOptimistic` for form submissions to make the app feel even faster.

## License

MIT
