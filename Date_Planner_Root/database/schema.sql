-- Users are managed by Supabase Auth (auth.users)

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  email TEXT,
  has_car BOOLEAN DEFAULT false,
  home_location TEXT,
  default_budget INTEGER DEFAULT 800,
  car_fuel_efficiency DECIMAL(5, 2) DEFAULT 8.0, -- L/100km
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved profiles for the specific people the user dates
CREATE TABLE public.saved_date_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_name TEXT NOT NULL, -- e.g., "Sarah" or "Anniversary Profile"
  description_text TEXT, -- "Describe Her" free text field
  energy_type TEXT CHECK (energy_type IN ('introverted', 'extroverted', 'balanced')),
  vibe_preference TEXT CHECK (vibe_preference IN ('nature', 'culture', 'fun', 'romantic')),
  setting_preference TEXT CHECK (setting_preference IN ('mountain', 'beach', 'city')),
  favorite_drink TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_preferences (
  user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  transport_type TEXT,
  max_travel_radius_km INTEGER DEFAULT 15,
  preferred_areas TEXT[],
  areas_to_avoid TEXT[]
);

CREATE TABLE public.activities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location_name TEXT NOT NULL, -- e.g., 'V&A Waterfront'
  area TEXT, -- e.g., 'Atlantic Seaboard', 'City Bowl'
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  cost_estimate INTEGER DEFAULT 0,
  duration_minutes INTEGER DEFAULT 60,
  car_required BOOLEAN DEFAULT false,
  indoor BOOLEAN DEFAULT false,
  introvert_score INTEGER DEFAULT 0,
  extrovert_score INTEGER DEFAULT 0,
  romance_score INTEGER DEFAULT 0,
  conversation_score INTEGER DEFAULT 0,
  first_date_suitability INTEGER DEFAULT 0, -- 1-10
  anniversary_suitability INTEGER DEFAULT 0, -- 1-10
  scenic_score INTEGER DEFAULT 0, -- 1-10
  weather_dependency TEXT, -- e.g., 'needs_clear_sky', 'needs_no_wind', 'indoor_safe'
  description TEXT,
  deal_info TEXT,
  tags TEXT[], -- basic categories
  psychographic_tags TEXT[], -- e.g., '#Instagrammable', '#LowVolume', '#ConversationFriendly'
  vibe_taxonomy TEXT[] -- e.g., 'Minimalist', 'Cozy', 'Trendy', 'Rustic'
);

CREATE TABLE public.date_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  date_profile_id UUID REFERENCES public.saved_date_profiles(id),
  title TEXT DEFAULT 'My Cape Town Date',
  date_stage TEXT, -- 'first_date', 'second_date', 'anniversary', 'birthday', etc.
  budget INTEGER DEFAULT 800,
  max_travel_radius_km INTEGER DEFAULT 15,
  total_estimated_cost INTEGER DEFAULT 0,
  planned_datetime TIMESTAMPTZ,
  share_token TEXT UNIQUE,
  share_passcode_hash TEXT,
  token_expires_at TIMESTAMPTZ,
  show_pricing_to_receiver BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.date_plan_stops (
  id SERIAL PRIMARY KEY,
  date_plan_id UUID REFERENCES public.date_plans(id) ON DELETE CASCADE,
  activity_id INTEGER REFERENCES public.activities(id),
  stop_order INTEGER NOT NULL,
  estimated_cost INTEGER DEFAULT 0,
  user_notes TEXT
);

CREATE TABLE public.safety_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date_plan_id UUID REFERENCES public.date_plans(id),
  enabled_by_receiver BOOLEAN DEFAULT false,
  trusted_contacts TEXT[],
  location_sharing_active BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_date_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.date_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.date_plan_stops ENABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own date profiles" ON public.saved_date_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own plans" ON public.date_plans FOR SELECT USING (auth.uid() = user_id);
