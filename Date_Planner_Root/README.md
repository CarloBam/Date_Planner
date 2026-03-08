# DateCart Cape Town - Setup Instructions

Welcome to the DateCart Cape Town planner app, a full stack solution to help plan thoughtful and optimized dates.

## ✨ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **State Management:** Zustand, @dnd-kit/core (for drag-and-drop planner)
- **Backend/Database:** Supabase (PostgreSQL), Supabase Auth
- **APIs:** Maps integration (Mapbox / Google Maps equivalent), Weather (OpenWeather/Open-Meteo)

## 📁 Repository Structure

```
.
├── database/
│   ├── schema.sql           # Complete Supabase schema (Tables, RLS policies, Relations)
│   ├── seed.sql             # Curated default activities & venues for Cape Town
├── src/
│   ├── lib/
│   │   ├── recommendationLogic.ts  # Algorithm checking personality, vibe, weather
│   │   ├── distanceCalculator.ts   # Travel estimations (cost via petrol/Uber, duration)
│   │   ├── store.ts                # Zustand global state (cart, budget)
│   │   └── utils.ts                # Tailwind merge cn() helper
│   ├── app/                 # Next.js 14 app router
│   └── components/          # Reusable React UI elements (PlannerBoard, ActivityCard, etc.)
└── package.json             # App dependencies
```

## 🛠 Prerequisites

1. Install [Node.js](https://nodejs.org/) (Version 18+ recommended)
2. A free [Supabase](https://supabase.com) account

## 🚀 Usage & Setup Instructions

1. **Install Dependencies:**
   Run the following command at the root of the project:
   ```bash
   npm install
   ```

2. **Supabase Database Setup:**
   - Create a new project in the Supabase Dashboard.
   - Go to the SQL Editor and run the contents of `database/schema.sql`.
   - Then, run the contents of `database/seed.sql` to populate sample date venues in Cape Town.
   - Note: The schema enables RLS (Row Level Security) and user logic for Authentication.

3. **Environment Setup:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

4. **Run the App:**
   Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## 🔑 Core Features & Next Steps

1. **Personality Quiz**: Modify `app/quiz/page.tsx` utilizing Zustand storing user responses.
2. **Recommendation Engine**: Found in `src/lib/recommendationLogic.ts`, this will accept the quiz profile and yield ranked cards.
3. **Date Planner (Shopping Cart)**: Uses `@dnd-kit` to allow real-time adjustment of stops with real-time budget, travel distance, and weather metric updates.
4. **Secure Sharing**: Token implementation for sharing read-only schedules mapped in the `date_plans` schema table.

Enjoy planning dates safely and stylishly!
