# Cape Date — Cape Town Date Planner App
## Project Brief for Antigravity Agent

---

## Overview

Build a full-stack web application called **Cape Date** that helps men plan dates in Cape Town, South Africa. The app combines personality-based activity matching, cost estimation, drag-and-drop itinerary building, weather awareness, and safety features into a polished, production-ready experience.

---

## Tech Stack

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email/password)
- **Weather**: Open-Meteo API (free, no key needed)
- **Drag and Drop**: @dnd-kit/core
- **Deployment**: Vercel (frontend) + Railway (backend)

---

## Pages & Features

### 1. Authentication Screen (`/login`, `/signup`)
- Email + password login and registration via Supabase Auth
- "Continue as Guest" option (no account required, plans not saved)
- Clean, modern UI with Cape Town ocean-inspired colour palette
- On login, redirect to Quiz if no profile exists, or Dashboard if returning user

---

### 2. Personality Quiz (`/quiz`)
A 6-step onboarding quiz to personalise activity recommendations. One question per screen with a progress bar.

**Questions:**
1. Her energy type → options: Introverted / Extroverted / In between
2. Setting preference → options: Mountains & nature / Beach & sea / City & culture
3. Date vibe → options: Nature & outdoors / Art, wine & culture / Fun & spontaneous / Dreamy & romantic
4. Activity energy level → options: Easy and relaxed / A bit of movement / Get up and go
5. Time of day → options: Morning (8am–12pm) / Afternoon (12pm–5pm) / Evening (5pm+) / Full day
6. Transport → options: I have a car / Uber/MyCiTi only

Store quiz answers in Zustand state and Supabase user profile.

---

### 3. Activity Explorer (`/explore`)
Browse and add activities to the date plan. Style this like a shopping app — each activity has an **"Add to Date"** button that works like "Add to Cart".

**Activity data** (hardcode these 20 Cape Town activities with accurate costs):

| Name | Area | Cost/person (R) | Duration | Requires Car |
|------|------|-----------------|----------|--------------|
| Two Oceans Aquarium | V&A Waterfront | R220 | 90 min | No |
| Harbour Sunset Cruise | V&A Waterfront | R280 | 75 min | No |
| Zeitz MOCAA Museum | V&A Waterfront | R200 | 90 min | No |
| Table Mountain Cable Car | Table Mountain | R390 | 120 min | No |
| Signal Hill Sunset | Signal Hill | FREE | 90 min | Yes |
| Lion's Head Hike | Signal Hill | FREE | 180 min | No |
| Kirstenbosch Gardens | Southern Suburbs | R220 | 150 min | Yes |
| Constantia Wine Tasting | Constantia | R200 | 150 min | Yes |
| Clifton 4th Beach | Atlantic Seaboard | FREE | 150 min | No |
| Boulders Beach Penguins | Simon's Town | R215 | 90 min | Yes |
| Chapman's Peak Drive | Hout Bay | R55 | 60 min | Yes |
| Truth Coffee | CBD | R120 | 75 min | No |
| Oranjezicht City Farm Market | De Waterkant | R220 | 90 min | No |
| Cave Golf | Canal Walk | R130 | 90 min | No |
| Unframed Ice Cream | De Waterkant | R80 | 30 min | No |
| Rooftop Bar at The Shift | CBD | R260 | 120 min | No |
| Green Point Park Picnic | Green Point | R160 | 120 min | No |
| Neighbourgoods Market | Woodstock | R200 | 90 min | No |
| Sea Point Promenade Walk | Sea Point | FREE | 90 min | No |
| Cape Point Nature Reserve | Cape Point | R360 | 240 min | Yes |

**Each activity card must display:**
- Emoji icon
- Name + area
- Cost for 2 people (show "FREE" in green for R0 activities)
- Duration
- A short description (2 sentences max)
- Deal/tip callout (e.g. "Book online for R20 off")
- Tags: category, energy level, car required (if applicable)
- A green "⭐ Great match" badge if it scores highly against the quiz answers
- **"+ Add to Date" button** (turns to "✓ Added" / "Remove" when active)

**Filtering:**
- Category filter tabs: all, nature, culture, food, adventure, romantic, fun, coffee, nightlife, beach, scenic, luxury, dessert
- Text search by name or area
- Activities requiring a car are automatically hidden if user selected "no car" in quiz

**Budget bar at top:**
- Input field for total budget (default R800)
- Live counter: activities selected, running total cost, amount remaining (green) or over (red)

**Scoring algorithm:**
Rank activities by relevance to quiz answers:
- +3 points if personality matches (intro/extro/mixed)
- +3 points if setting matches (mountain/beach/city)
- +2 points if energy level matches
- +2 points if vibe category matches
Show highest-scoring activities first.

---

### 4. Date Planner / Itinerary Builder (`/planner`)

**Drag and drop reorderable itinerary** using @dnd-kit/core.

Each activity in the itinerary shows:
- Drag handle (⠿ icon on left)
- Emoji + name
- Estimated time slot (calculated from start time based on quiz answer + duration of each preceding activity + 30min travel buffer between stops)
- Area / location
- Cost for 2
- Deal tip

Between each activity item, show a travel leg:
- Distance in km (calculated using Haversine formula from lat/lng coordinates listed below)
- If car: "🚗 X.Xkm drive"
- If no car: "🚕 ~X.Xkm — Uber ≈ RXX" (estimate R3.80/km)

**Area coordinates for distance calculation:**
```
V&A Waterfront:    -33.902, 18.421
Table Mountain:    -33.957, 18.403
Signal Hill:       -33.921, 18.400
Southern Suburbs:  -33.988, 18.432
Constantia:        -34.024, 18.437
Atlantic Seaboard: -33.942, 18.375
Simon's Town:      -34.198, 18.450
Hout Bay:          -34.085, 18.361
CBD:               -33.929, 18.424
De Waterkant:      -33.921, 18.414
Woodstock:         -33.929, 18.448
Canal Walk:        -33.893, 18.513
Green Point:       -33.904, 18.406
Sea Point:         -33.927, 18.387
Cape Point:        -34.356, 18.497
```

**Weather widget (top of planner page):**
- Fetch from Open-Meteo API for Cape Town (lat: -33.9249, lon: 18.4241)
- Show: condition, temperature, wind speed and direction
- Show a warning banner if wind > 40km/h (Cape Doctor): "⚠️ Strong south-easter — Table Mountain cables may be closed"
- Show a date planning tip based on conditions

**Bill estimate sidebar (sticky on desktop, collapsible on mobile):**
- Itemised list: each activity + cost for 2
- Petrol subtotal (if car): calculated as `(totalKm / 100) × 9.5L × R23.80/L`
- OR Uber subtotal (if no car): sum of leg estimates
- Grand total
- Budget comparison: "✓ R___ to spare" (green) or "⚠️ R___ over budget" (red)

**Petrol breakdown card:**
- Show total km driven
- Petrol price used: R23.80/L
- Consumption rate: 9.5L/100km
- Final petrol cost

---

### 5. Share & Safety (`/share`)

**Share Plan section:**
- Generate a secure unique token for the date plan using: `btoa(JSON.stringify({ planId, userId, ts: Date.now() })).replace(/=/g,'').slice(0,28).toUpperCase()`
- Display shareable URL: `https://capedate.app/view/[TOKEN]`
- "📋 Copy Link" button
- "📱 Share via WhatsApp" button — pre-filled message:
  ```
  Hey! 🌊 I've planned our Cape Town date!
  
  1. [emoji] [Activity name] ([Area])
  2. ...
  
  Estimated total: R[X]
  
  View the full plan: [URL]
  ```
- Date preview card showing all activities + weather for the day

**Public view route (`/view/:token`):**
- Decode token to load the plan
- Display read-only beautiful date card (no login required for girl to view)
- Shows: activities in order, times, costs, map overview, weather, deals
- Secured: tokens expire after 7 days

**Safety Tools section:**
- Safety contact input (phone or email)
- Check-in timer: select 30 / 60 / 90 / 120 / 180 minutes
- Visual countdown timer with large digital display
- Alert turns red in final 5 minutes
- Cancel button
- WhatsApp live location instructions: step-by-step guide to share live location with safety contact
- "Open WhatsApp" deep link button

---

### 6. Profile / Saved Dates (`/profile`)

- User avatar (initials fallback)
- Display name and email
- List of saved date plans (stored in Supabase)
- Each saved plan shows: date created, number of activities, estimated cost, share link
- Delete plan option
- Edit plan option (redirects to planner with that plan loaded)

---

## Database Schema (Supabase)

```sql
-- Users are managed by Supabase Auth

-- Quiz profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  quiz_personality TEXT,
  quiz_setting TEXT,
  quiz_vibe TEXT,
  quiz_energy TEXT,
  quiz_time TEXT,
  has_car BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved date plans
CREATE TABLE date_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT DEFAULT 'My Cape Town Date',
  activity_ids INTEGER[] NOT NULL,
  activity_order INTEGER[] NOT NULL,
  budget INTEGER DEFAULT 800,
  share_token TEXT UNIQUE,
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Design System

**Colour palette:**
- Background: `#040d1c` (deep navy)
- Surface: `rgba(15, 28, 54, 0.7)`
- Primary accent: `#00c9ff` (ocean blue)
- Secondary accent: `#ff6b35` (sunset orange)
- Success/free: `#4dff91` (sea green)
- Warning: `#ffd166` (golden)
- Danger: `#ff6b6b` (coral red)
- Text: `#e8f4f8`

**Typography:**
- Headings: `'Playfair Display', Georgia, serif`
- Body: `'DM Sans', system-ui, sans-serif`
- Monospace (timers, tokens): `'JetBrains Mono', monospace`

**Components to build:**
- `ActivityCard` — the shopping-cart-style card
- `DateItineraryItem` — draggable planner row
- `BillSidebar` — sticky cost breakdown
- `WeatherWidget` — conditions + warning
- `QuizStep` — single quiz question screen
- `ShareCard` — the shareable date overview
- `SafetyTimer` — animated countdown
- `NavBar` — sticky top with tab navigation

---

## Responsive Behaviour

- Mobile first
- Planner: single column stacked, bill sidebar collapses to bottom sheet
- Explorer: 1 column on mobile, 2 on tablet, 3 on desktop
- Quiz: always single column, centered max-width 560px
- Share: stack vertically on mobile

---

## Environment Variables Needed

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Build Order for Agent

1. Scaffold Vite + React + TypeScript + Tailwind project
2. Install dependencies: `@supabase/supabase-js`, `zustand`, `@dnd-kit/core`, `@dnd-kit/sortable`, `react-router-dom`
3. Set up Supabase client and Auth
4. Build AuthScreen (login + signup + guest)
5. Build QuizScreen (6 steps, progress bar, store answers)
6. Build Activity data file with all 20 activities + coordinates
7. Build ExploreScreen with filtering, scoring, Add to Date
8. Build PlannerScreen with drag-and-drop, timeline, distance legs
9. Build WeatherWidget using Open-Meteo API
10. Build BillSidebar with petrol calculator
11. Build ShareScreen with token generation + WhatsApp integration
12. Build SafetyTimer component
13. Build ProfileScreen with saved plans
14. Build public `/view/:token` read-only route
15. Add Supabase persistence for plans and profile
16. Polish UI: animations, transitions, mobile responsiveness
17. Deploy
