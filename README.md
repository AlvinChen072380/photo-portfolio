# 🪄 Magic Portfolio 

An immersive, high-performance photography portfolio and e-commerce platform built to demonstrate advanced front-end patterns and performance optimization techniques.

🌐 **Live Demo:** [(https://photo-portfolio-nine-theta.vercel.app/)]

## 🚀 Key Features & Performance

This project is not just a standard UI slicing exercise. It tackles real-world performance bottlenecks:

* **Handling 2500+ Items (List Virtualization):** Implemented `react-window` to render only the visible elements in the DOM, maintaining 60FPS scrolling performance even with massive datasets.
* **Custom RWD Auto-Sizer:** Instead of relying on buggy third-party wrappers, I wrote a custom `ResizeObserver` hook to perfectly calculate responsive grid columns and row heights without layout shifts or flickers.
* **Zero-API Backend:** Utilized **Next.js Server Actions** to handle contact form submissions and server-side validation without deploying a separate Node.js backend.
* **Optimized Typographic Loading:** Integrated `next/font` with Tailwind v4 variables to load custom fonts (Ringw) while eliminating Cumulative Layout Shift (CLS).

## 🛠 Tech Stack

**Core Architecture**
* **Next.js 16 (App Router):** Server-First architecture, Metadata API for SEO.
* **React 19:** Utilizing modern hooks (`useActionState`, `useFormStatus`).
* **TypeScript:** Strict typing for stable and predictable code.

**State Management & Logic**
* **Zustand (with Persist):** Lightweight global state management for the shopping cart and dark mode, synced with LocalStorage.
* **Custom Hooks:** Abstracted complex logic (e.g., `useDebounce` for search, `useGalleryLogic`).

**Styling & UI**
* **Tailwind CSS v4:** Modern `@theme` architecture and system-aware Dark Mode.
* **Framer Motion:** Smooth, physics-based micro-interactions and modal animations.
* **Lucide React:** Clean and consistent iconography.

## 🛒 E-Commerce & Full-Stack Architecture

This project goes beyond a static frontend by implementing a secure, full-stack order processing system using **Next.js Server Components** and **Supabase (PostgreSQL)**.

* **State Management & Checkout Logic:**
    * Utilized **Zustand** for lightweight, global cart state management, allowing seamless data extraction during the checkout process.
    * **Custom Order ID Generation:** Instead of exposing database UUIDs or sequential IDs, I implemented a custom algorithm (`ORD-{timestamp}-{random}`). This significantly improves UX for customer support while protecting business intelligence (hiding daily order volumes from competitors).
* **Database Design (`jsonb`):**
    * Leveraged PostgreSQL's powerful **`jsonb`** column type to store complex cart arrays directly into a single database row. This approach eliminates the need for complex SQL `JOIN` operations, keeping the MVP agile and highly performant.
* **Strict Security & Row Level Security (RLS):**
    * Configured rigorous RLS policies in Supabase. The public checkout route is restricted to `INSERT-only` operations for `anon` (unauthenticated) users, ensuring malicious actors cannot `SELECT` or modify other customers' data.
* **Server-Side Admin Dashboard:**
    * Built a dedicated `/admin` dashboard relying entirely on **Next.js Server Components**.
    * **Secure Credential Separation:** Strictly separated environment variables. Public keys (`NEXT_PUBLIC_`) are used for client-side checkouts, while a highly privileged `service_role` key is safely isolated on the server.
    * Implemented `export const dynamic = 'force-dynamic'` to opt out of static caching, ensuring the admin dashboard fetches real-time, up-to-date order data directly from the database without exposing endpoints to the browser.


## 💻 Getting Started (Local Development)

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/AlvinChen072380/photo-portfolio](https://github.com/AlvinChen072380/photo-portfolio)