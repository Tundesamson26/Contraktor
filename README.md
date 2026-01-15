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
│   ├── page.tsx           # Explore Artisans (home)
│   ├── artisans/[id]/     # Artisan Profile
│   └── admin/             # Admin Dashboard
├── components/
│   ├── features/          # Feature components
│   ├── layout/            # Layout components (Navbar)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── features/          # Redux slices
│   ├── mock-api.ts        # Mock API implementation
│   ├── store.ts           # Redux store configuration
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript type definitions
```

## State Management Justification

**Redux Toolkit** was chosen for state management because:
- Provides predictable state updates with clear action/reducer patterns
- Built-in async handling with `createAsyncThunk`
- Excellent TypeScript support
- DevTools integration for debugging
- Scales well for complex applications with multiple data sources

## Testing

The project includes unit tests for core functionality:
- Mock API filtering and pagination logic
- Service request submission

Run tests with:
```bash
npm test
```

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements

## Performance Optimizations

- Debounced search input (300ms)
- Image optimization with Next.js Image component
- Code splitting via Next.js App Router
- Memoization where appropriate

## License

MIT
