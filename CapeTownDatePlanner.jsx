import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA: CAPE TOWN ACTIVITIES
═══════════════════════════════════════════════════════════════ */

const ACTIVITIES = [
  { id: 1, name: "Two Oceans Aquarium", area: "V&A Waterfront", lat: -33.902, lng: 18.421, costPP: 220, duration: 90, emoji: "🦈", category: "culture", setting: ["beach","city"], energy: "relaxed", social: ["intro","extro"], deal: "Combo with Harbour Cruise saves R60 per couple", description: "World-class marine exhibits with sharks, rays and African penguins. One of the best dates in the city.", requiresCar: false },
  { id: 2, name: "Harbour Sunset Cruise", area: "V&A Waterfront", lat: -33.901, lng: 18.419, costPP: 280, duration: 75, emoji: "⛵", category: "adventure", setting: ["beach"], energy: "moderate", social: ["extro","mixed"], deal: "Sundowner cruise includes one complimentary drink per person", description: "Sail around Table Bay as the sun sets behind the mountain. Absolutely iconic.", requiresCar: false },
  { id: 3, name: "Zeitz MOCAA Museum", area: "V&A Waterfront", lat: -33.904, lng: 18.423, costPP: 200, duration: 90, emoji: "🎨", category: "culture", setting: ["city"], energy: "relaxed", social: ["intro","extro"], deal: "Free entry on the last Sunday of each month", description: "Africa's largest contemporary art museum inside a converted grain silo. Wildly impressive architecture.", requiresCar: false },
  { id: 4, name: "Table Mountain Cable Car", area: "Table Mountain", lat: -33.957, lng: 18.403, costPP: 390, duration: 120, emoji: "🚠", category: "nature", setting: ["mountain"], energy: "relaxed", social: ["intro","extro"], deal: "Book online for a R20 pp discount. Check wind status — cables close in high winds", description: "Rotating cable car to the summit. Views that will genuinely take your breath away.", requiresCar: false },
  { id: 5, name: "Signal Hill Sunset", area: "Signal Hill", lat: -33.921, lng: 18.400, costPP: 0, duration: 90, emoji: "🌅", category: "romantic", setting: ["mountain","beach"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Completely free — just bring a bottle of wine and two glasses", description: "The most romantic free thing in Cape Town. Overlooking the city and Atlantic as the sun drops into the ocean.", requiresCar: true },
  { id: 6, name: "Lion's Head Hike", area: "Signal Hill", lat: -33.937, lng: 18.393, costPP: 0, duration: 180, emoji: "🧗", category: "adventure", setting: ["mountain"], energy: "active", social: ["extro","mixed"], deal: "Sunrise or full moon hikes are legendary. Arrive by 5:30am for sunrise.", description: "Circular hike with ladders and chains near the top. Hard work but the views are elite.", requiresCar: false },
  { id: 7, name: "Kirstenbosch Gardens", area: "Southern Suburbs", lat: -33.988, lng: 18.432, costPP: 220, duration: 150, emoji: "🌸", category: "nature", setting: ["mountain"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Summer Sunday concerts (Nov–Apr) include entry. Bring a picnic blanket.", description: "Stunning botanical gardens draped over the eastern slopes of Table Mountain.", requiresCar: true },
  { id: 8, name: "Constantia Wine Tasting", area: "Constantia", lat: -34.024, lng: 18.437, costPP: 200, duration: 150, emoji: "🍷", category: "luxury", setting: ["mountain"], energy: "relaxed", social: ["intro","extro"], deal: "Groot Constantia: cellar tour + tasting from R220 pp. Book in advance on weekends.", description: "World-heritage wine estates in a lush forested valley. Slow, romantic and sophisticated.", requiresCar: true },
  { id: 9, name: "Clifton 4th Beach", area: "Atlantic Seaboard", lat: -33.942, lng: 18.375, costPP: 0, duration: 150, emoji: "🏖️", category: "beach", setting: ["beach"], energy: "relaxed", social: ["extro","mixed"], deal: "Totally free. Bring a blanket, snacks and sunscreen. Parking is tight — arrive before 10am.", description: "Cape Town's most fashionable beach. Boulder-sheltered, clean and very scenic.", requiresCar: false },
  { id: 10, name: "Boulders Beach Penguins", area: "Simon's Town", lat: -34.198, lng: 18.450, costPP: 215, duration: 90, emoji: "🐧", category: "nature", setting: ["beach"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Early mornings on weekdays: fewer crowds, more penguins. Combined False Bay scenic drive is free.", description: "Walk alongside a wild African penguin colony on a gorgeous granite-boulder beach.", requiresCar: true },
  { id: 11, name: "Chapman's Peak Drive", area: "Hout Bay", lat: -34.085, lng: 18.361, costPP: 55, duration: 60, emoji: "🛣️", category: "scenic", setting: ["mountain","beach"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Combine with Hout Bay harbour fish and chips (Mariner's Wharf, ~R120 pp) for a perfect afternoon.", description: "One of the world's top coastal drives — dramatic cliffs, turquoise sea, mountain above.", requiresCar: true },
  { id: 12, name: "Truth Coffee", area: "CBD", lat: -33.929, lng: 18.424, costPP: 120, duration: 75, emoji: "☕", category: "coffee", setting: ["city"], energy: "relaxed", social: ["intro","mixed"], deal: "Voted World's Best Coffee Shop multiple times. Worth going just for the steampunk interior.", description: "Iconic steampunk-themed coffee shop. Great for a relaxed first date or a morning date before activities.", requiresCar: false },
  { id: 13, name: "Oranjezicht City Farm Market", area: "De Waterkant", lat: -33.929, lng: 18.409, costPP: 220, duration: 90, emoji: "🛒", category: "food", setting: ["city","beach"], energy: "moderate", social: ["extro","mixed"], deal: "Saturdays and Sundays only. Budget R150–R250 pp for food. Incredible variety from local producers.", description: "Cape Town's best artisan food market with sea views. Perfect for a casual Saturday morning date.", requiresCar: false },
  { id: 14, name: "Cave Golf", area: "Canal Walk", lat: -33.893, lng: 18.513, costPP: 130, duration: 90, emoji: "⛳", category: "fun", setting: ["city"], energy: "active", social: ["extro","mixed"], deal: "Book online for R20 pp off. Great rainy-day option — it's fully indoors.", description: "Blacklight mini-golf in a cave-themed venue at Canal Walk. Genuinely fun for everyone.", requiresCar: false },
  { id: 15, name: "Unframed Ice Cream", area: "De Waterkant", lat: -33.921, lng: 18.414, costPP: 80, duration: 30, emoji: "🍦", category: "dessert", setting: ["city"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Try the salted caramel + fynbos combo. Walk to the Sea Point promenade after for a free scenic stroll.", description: "Artisan ice cream with unique South African flavours. A perfect quick treat to add to any date.", requiresCar: false },
  { id: 16, name: "Rooftop Bar at The Shift", area: "CBD", lat: -33.928, lng: 18.421, costPP: 260, duration: 120, emoji: "🍸", category: "nightlife", setting: ["city"], energy: "social", social: ["extro"], deal: "Happy hour 5–7pm: craft cocktails from R65 each. Best city views at dusk.", description: "Panoramic rooftop views over the Bowl and Table Mountain. Ideal for evening dates.", requiresCar: false },
  { id: 17, name: "Green Point Park Picnic", area: "Green Point", lat: -33.904, lng: 18.406, costPP: 160, duration: 120, emoji: "🧺", category: "romantic", setting: ["mountain","beach"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Woolworths Food at the Waterfront is 10 mins away — pick up a curated picnic spread for ~R300 total.", description: "Beautiful urban park overlooking the city bowl. Bring a blanket, wine and food for an easy romantic afternoon.", requiresCar: false },
  { id: 18, name: "Neighbourgoods Market", area: "Woodstock", lat: -33.929, lng: 18.448, costPP: 200, duration: 90, emoji: "🍕", category: "food", setting: ["city"], energy: "social", social: ["extro"], deal: "Saturdays only, 9am–2pm. Get there by 10am before it gets too crowded.", description: "Trendy artisan market in the Old Biscuit Mill. Craft beer, wood-fired pizza, live music.", requiresCar: false },
  { id: 19, name: "Sea Point Promenade Walk", area: "Sea Point", lat: -33.927, lng: 18.387, costPP: 0, duration: 90, emoji: "🌊", category: "beach", setting: ["beach"], energy: "relaxed", social: ["intro","extro","mixed"], deal: "Completely free. Combine with sunset at Rocklands beach for a perfect evening.", description: "Scenic 3km coastal promenade along the Atlantic. Lively, beautiful and free.", requiresCar: false },
  { id: 20, name: "Cape Point Nature Reserve", area: "Cape Point", lat: -34.356, lng: 18.497, costPP: 360, duration: 240, emoji: "🦏", category: "nature", setting: ["mountain","beach"], energy: "active", social: ["intro","extro","mixed"], deal: "Entry includes access to the entire Table Mountain National Park on the day. Book the funicular to the lighthouse — R72 extra pp.", description: "The dramatic meeting of two oceans. Baboons, lighthouses, epic cliff views. A full day date in nature.", requiresCar: true },
];

const AREAS = {
  "V&A Waterfront":    { lat: -33.902, lng: 18.421 },
  "Table Mountain":    { lat: -33.957, lng: 18.403 },
  "Signal Hill":       { lat: -33.921, lng: 18.400 },
  "Southern Suburbs":  { lat: -33.988, lng: 18.432 },
  "Constantia":        { lat: -34.024, lng: 18.437 },
  "Atlantic Seaboard": { lat: -33.942, lng: 18.375 },
  "Simon's Town":      { lat: -34.198, lng: 18.450 },
  "Hout Bay":          { lat: -34.085, lng: 18.361 },
  "CBD":               { lat: -33.929, lng: 18.424 },
  "De Waterkant":      { lat: -33.921, lng: 18.414 },
  "Woodstock":         { lat: -33.929, lng: 18.448 },
  "Canal Walk":        { lat: -33.893, lng: 18.513 },
  "Green Point":       { lat: -33.904, lng: 18.406 },
  "Sea Point":         { lat: -33.927, lng: 18.387 },
  "Cape Point":        { lat: -34.356, lng: 18.497 },
};

const PETROL_PRICE = 23.80;
const FUEL_CONSUMPTION = 9.5;

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function petrolCostForKm(km) {
  return ((km / 100) * FUEL_CONSUMPTION * PETROL_PRICE).toFixed(0);
}

function generateShareToken(plan) {
  const payload = JSON.stringify({ plan, ts: Date.now() });
  return btoa(payload).replace(/=/g, "").slice(0, 28).toUpperCase();
}

function getWeatherForDate() {
  const weathers = [
    { condition: "Sunny & Clear", temp: 26, wind: 12, windDir: "SW", icon: "☀️", warning: null, tip: "Perfect beach or mountain day! Apply SPF 50+." },
    { condition: "Partly Cloudy", temp: 22, wind: 18, windDir: "S", icon: "⛅", warning: null, tip: "Great for outdoor activities. Layers advised for evening." },
    { condition: "Cape Doctor (SE Wind)", temp: 24, wind: 45, windDir: "SE", icon: "💨", warning: "Strong south-easter advisory. Table Mountain cables may be closed.", tip: "Avoid cable car. Indoor or sheltered activities recommended." },
    { condition: "Overcast", temp: 18, wind: 8, windDir: "N", icon: "☁️", warning: null, tip: "Good day for museums, coffee shops and markets." },
    { condition: "Light Rain", temp: 16, wind: 14, windDir: "NW", icon: "🌧️", warning: "Light rain expected in the afternoon.", tip: "Plan indoor activities. Cave Golf, Truth Coffee, MOCAA or Constantia wines are ideal." },
  ];
  return weathers[new Date().getDay() % weathers.length];
}

function scoreActivity(activity, quiz) {
  let score = 0;
  if (!quiz) return score;
  if (quiz.personality && activity.social.includes(quiz.personality)) score += 3;
  if (quiz.setting && activity.setting.includes(quiz.setting)) score += 3;
  if (quiz.energy && activity.energy === quiz.energy) score += 2;
  if (quiz.vibe === "nature" && ["nature","beach","scenic","adventure"].includes(activity.category)) score += 2;
  if (quiz.vibe === "culture" && ["culture","coffee","luxury","art"].includes(activity.category)) score += 2;
  if (quiz.vibe === "fun" && ["fun","food","nightlife","social"].includes(activity.category)) score += 2;
  if (quiz.vibe === "romantic" && ["romantic","dessert"].includes(activity.category)) score += 2;
  return score;
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */

const S = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #040d1c 0%, #071428 50%, #050b18 100%)",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#e8f4f8",
    position: "relative",
    overflow: "hidden",
  },
  bg: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(ellipse at 20% 80%, rgba(0,180,220,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.05) 0%, transparent 50%)",
    pointerEvents: "none", zIndex: 0,
  },
  container: { position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 16px" },
  
  // Nav
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(0,180,220,0.12)", background: "rgba(4,13,28,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: 20, fontWeight: 700, letterSpacing: "0.04em", color: "#00c9ff", cursor: "pointer" },
  logoSub: { fontSize: 11, color: "rgba(0,201,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginTop: 2 },
  navTabs: { display: "flex", gap: 6 },
  navTab: (active) => ({
    padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", transition: "all 0.2s",
    background: active ? "rgba(0,201,255,0.15)" : "transparent",
    color: active ? "#00c9ff" : "rgba(232,244,248,0.5)",
    border: active ? "1px solid rgba(0,201,255,0.35)" : "1px solid transparent",
    fontFamily: "inherit",
  }),

  // Cards
  card: { background: "rgba(15,28,54,0.7)", border: "1px solid rgba(0,201,255,0.12)", borderRadius: 16, padding: "24px", backdropFilter: "blur(8px)" },
  cardSm: { background: "rgba(15,28,54,0.6)", border: "1px solid rgba(0,201,255,0.1)", borderRadius: 12, padding: "16px" },

  // Buttons
  btn: (variant = "primary") => ({
    padding: variant === "sm" ? "8px 16px" : "12px 28px",
    borderRadius: 40,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 600,
    fontSize: variant === "sm" ? 12 : 14,
    transition: "all 0.2s",
    background: variant === "primary"
      ? "linear-gradient(135deg, #00c9ff, #0080b3)"
      : variant === "danger"
      ? "rgba(255,80,80,0.15)"
      : variant === "ghost"
      ? "transparent"
      : "rgba(255,107,53,0.15)",
    color: variant === "danger" ? "#ff6b6b" : variant === "ghost" ? "rgba(232,244,248,0.5)" : "#e8f4f8",
    border: variant === "secondary" ? "1px solid rgba(255,107,53,0.3)" : variant === "ghost" ? "1px solid rgba(232,244,248,0.15)" : "none",
    letterSpacing: "0.02em",
  }),

  // Activity card
  actCard: (inDate) => ({
    background: inDate ? "rgba(0,201,255,0.08)" : "rgba(15,28,54,0.6)",
    border: inDate ? "1px solid rgba(0,201,255,0.35)" : "1px solid rgba(0,201,255,0.1)",
    borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all 0.2s",
    position: "relative",
  }),

  // Tags
  tag: (color = "blue") => ({
    display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11,
    background: color === "blue" ? "rgba(0,201,255,0.12)" : color === "orange" ? "rgba(255,107,53,0.15)" : "rgba(255,209,102,0.12)",
    color: color === "blue" ? "#00c9ff" : color === "orange" ? "#ff6b35" : "#ffd166",
    border: `1px solid ${color === "blue" ? "rgba(0,201,255,0.25)" : color === "orange" ? "rgba(255,107,53,0.25)" : "rgba(255,209,102,0.25)"}`,
    marginRight: 4, marginBottom: 4,
  }),

  // Inputs
  input: {
    width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(0,201,255,0.2)",
    background: "rgba(15,28,54,0.8)", color: "#e8f4f8", fontFamily: "inherit", fontSize: 14,
    outline: "none", boxSizing: "border-box",
  },
  label: { fontSize: 12, color: "rgba(0,201,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, display: "block" },

  // Quiz option
  quizOpt: (sel) => ({
    padding: "14px 20px", borderRadius: 12, cursor: "pointer", transition: "all 0.2s", textAlign: "center",
    background: sel ? "rgba(0,201,255,0.15)" : "rgba(15,28,54,0.6)",
    border: sel ? "1px solid rgba(0,201,255,0.5)" : "1px solid rgba(0,201,255,0.1)",
    color: sel ? "#00c9ff" : "#e8f4f8", fontFamily: "inherit",
  }),
};

/* ═══════════════════════════════════════════════════════════════
   SCREENS
═══════════════════════════════════════════════════════════════ */

function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (!email || !pass) { setErr("Please fill in all fields."); return; }
    if (mode === "signup" && !name) { setErr("Please enter your name."); return; }
    onLogin({ name: name || email.split("@")[0], email });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌊</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#00c9ff", margin: 0, letterSpacing: "-0.01em" }}>Cape Date</h1>
          <p style={{ color: "rgba(232,244,248,0.5)", margin: "8px 0 0", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>Plan. Impress. Repeat.</p>
        </div>

        <div style={{ ...S.card, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 4 }}>
            {["login","signup"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, transition: "all 0.2s", background: mode === m ? "rgba(0,201,255,0.15)" : "transparent", color: mode === m ? "#00c9ff" : "rgba(232,244,248,0.5)" }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <div style={{ marginBottom: 16 }}>
              <label style={S.label}>Your Name</label>
              <input style={S.input} placeholder="What do your mates call you?" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Email</label>
            <input style={S.input} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
          </div>
          {err && <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12 }}>{err}</p>}
          <button style={{ ...S.btn("primary"), width: "100%" }} onClick={handle}>
            {mode === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </div>

        <button style={{ ...S.btn("ghost"), width: "100%", fontSize: 13 }} onClick={() => onLogin({ name: "Guest", email: "guest@capedate.app" })}>
          Continue as Guest
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(232,244,248,0.25)", marginTop: 24, letterSpacing: "0.05em" }}>
          🔒 Your date plans are private and encrypted
        </p>
      </div>
    </div>
  );
}

const QUIZ_STEPS = [
  {
    q: "How would you describe her energy?",
    key: "personality",
    opts: [
      { val: "intro", label: "🌙 Introverted", sub: "Prefers meaningful 1-on-1 time" },
      { val: "extro", label: "☀️ Extroverted", sub: "Loves being out, social & lively" },
      { val: "mixed", label: "🌓 Somewhere in between", sub: "Adaptable and mood-dependent" },
    ],
  },
  {
    q: "Mountains or the ocean?",
    key: "setting",
    opts: [
      { val: "mountain", label: "⛰️ Mountains & nature", sub: "Trails, wine farms and green spaces" },
      { val: "beach", label: "🌊 Beach & sea", sub: "Coastline, ocean views and sea air" },
      { val: "city", label: "🏙️ City & culture", sub: "Coffee shops, markets and architecture" },
    ],
  },
  {
    q: "What kind of vibe does she love most?",
    key: "vibe",
    opts: [
      { val: "nature", label: "🌿 Nature & outdoors", sub: "Animals, hikes, gardens and open air" },
      { val: "culture", label: "🎨 Art, wine & culture", sub: "Museums, tastings and refined experiences" },
      { val: "fun", label: "🎉 Fun & spontaneous", sub: "Markets, activities and good food" },
      { val: "romantic", label: "💫 Dreamy & romantic", sub: "Sunsets, picnics and intimate spots" },
    ],
  },
  {
    q: "Her ideal date energy level is...",
    key: "energy",
    opts: [
      { val: "relaxed", label: "😌 Easy and relaxed", sub: "No rushing — just flowing naturally" },
      { val: "moderate", label: "🚶 A bit of movement", sub: "Some walking and exploring" },
      { val: "active", label: "🏃 Get up and go", sub: "She loves hiking, adventure and activity" },
    ],
  },
  {
    q: "When does the date start?",
    key: "time",
    opts: [
      { val: "morning", label: "🌄 Morning (8am–12pm)", sub: "Sunrise hike or brunch date" },
      { val: "afternoon", label: "🌤️ Afternoon (12pm–5pm)", sub: "Lunch, beaches and sightseeing" },
      { val: "evening", label: "🌆 Evening (5pm onward)", sub: "Sunset, dinner and nightlife" },
      { val: "allday", label: "☀️ Full day", sub: "The full Cape Town experience" },
    ],
  },
  {
    q: "Do you have a car for the date?",
    key: "hasCar",
    opts: [
      { val: "yes", label: "🚗 Yes, I'm driving", sub: "Full Cape Town unlocked" },
      { val: "no", label: "🚕 No — Uber/MyCiTi", sub: "City and waterfront areas only" },
    ],
  },
];

function QuizScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = QUIZ_STEPS[step];
  const sel = answers[current.key];

  const next = () => {
    if (!sel) return;
    if (step < QUIZ_STEPS.length - 1) setStep(step + 1);
    else {
      const hasCar = answers.hasCar === "yes";
      onComplete({ ...answers, hasCar });
    }
  };

  const progress = ((step) / QUIZ_STEPS.length) * 100;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 16px" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "rgba(0,201,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Step {step + 1} of {QUIZ_STEPS.length}</span>
          <span style={{ fontSize: 12, color: "rgba(0,201,255,0.6)" }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 3, background: "rgba(0,201,255,0.15)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #00c9ff, #0080b3)", borderRadius: 2, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "#e8f4f8", lineHeight: 1.3 }}>{current.q}</h2>
      <p style={{ fontSize: 13, color: "rgba(232,244,248,0.4)", marginBottom: 28 }}>Tell us about her so we can suggest the perfect activities</p>

      <div style={{ display: "grid", gridTemplateColumns: current.opts.length > 3 ? "1fr 1fr" : "1fr", gap: 10, marginBottom: 32 }}>
        {current.opts.map(opt => (
          <button key={opt.val} style={S.quizOpt(sel === opt.val)}
            onClick={() => setAnswers({ ...answers, [current.key]: opt.val })}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.label.split(" ")[0]}</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label.split(" ").slice(1).join(" ")}</div>
            {opt.sub && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 3 }}>{opt.sub}</div>}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        {step > 0 && (
          <button style={{ ...S.btn("ghost") }} onClick={() => setStep(step - 1)}>← Back</button>
        )}
        <button style={{ ...S.btn("primary"), marginLeft: "auto", opacity: sel ? 1 : 0.4 }} onClick={next} disabled={!sel}>
          {step === QUIZ_STEPS.length - 1 ? "See my recommendations →" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function ActivityCard({ activity, inDate, onAdd, onRemove, quiz }) {
  const score = scoreActivity(activity, quiz);

  return (
    <div style={S.actCard(inDate)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>{activity.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#e8f4f8" }}>{activity.name}</div>
            <div style={{ fontSize: 12, color: "rgba(0,201,255,0.6)" }}>📍 {activity.area}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: activity.costPP === 0 ? "#4dff91" : "#ffd166" }}>
            {activity.costPP === 0 ? "FREE" : `R${activity.costPP * 2}`}
          </div>
          <div style={{ fontSize: 11, color: "rgba(232,244,248,0.4)" }}>for 2 people</div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: "rgba(232,244,248,0.65)", margin: "0 0 12px", lineHeight: 1.5 }}>{activity.description}</p>

      <div style={{ marginBottom: 10 }}>
        <span style={S.tag("blue")}>⏱ {activity.duration} min</span>
        <span style={S.tag("orange")}>{activity.category}</span>
        {activity.requiresCar && <span style={S.tag("yellow")}>🚗 Car needed</span>}
        {score >= 5 && <span style={{ ...S.tag("blue"), background: "rgba(77,255,145,0.1)", color: "#4dff91", border: "1px solid rgba(77,255,145,0.25)" }}>⭐ Great match</span>}
      </div>

      {activity.deal && (
        <div style={{ background: "rgba(255,209,102,0.08)", border: "1px solid rgba(255,209,102,0.2)", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "#ffd166" }}>
          💰 {activity.deal}
        </div>
      )}

      <button
        style={{ ...S.btn(inDate ? "danger" : "primary"), width: "100%", fontSize: 13 }}
        onClick={() => inDate ? onRemove(activity.id) : onAdd(activity)}
      >
        {inDate ? "✕ Remove from Date" : "+ Add to Date"}
      </button>
    </div>
  );
}

function ExploreScreen({ quiz, dateItems, onAdd, onRemove, budget, setBudget }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const hasCar = quiz?.hasCar;

  const inDateIds = new Set(dateItems.map(a => a.id));
  const totalCost = dateItems.reduce((s, a) => s + a.costPP * 2, 0);

  const categories = ["all","nature","culture","food","adventure","romantic","fun","coffee","nightlife","beach","scenic","luxury","dessert"];

  const filtered = ACTIVITIES
    .filter(a => filter === "all" || a.category === filter)
    .filter(a => !a.requiresCar || hasCar)
    .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.area.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => scoreActivity(b, quiz) - scoreActivity(a, quiz));

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Budget bar */}
      <div style={{ ...S.card, marginBottom: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={S.label}>Date Budget (Total)</label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#ffd166", fontSize: 18, fontWeight: 700 }}>R</span>
            <input style={{ ...S.input, width: "auto", flex: 1 }} type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} placeholder="500" />
          </div>
        </div>
        <div style={{ textAlign: "center", minWidth: 120 }}>
          <div style={{ fontSize: 11, color: "rgba(232,244,248,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Activities Selected</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: dateItems.length > 0 ? "#00c9ff" : "rgba(232,244,248,0.3)" }}>{dateItems.length}</div>
        </div>
        <div style={{ textAlign: "center", minWidth: 140 }}>
          <div style={{ fontSize: 11, color: "rgba(232,244,248,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Estimated Total</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: totalCost > budget && budget > 0 ? "#ff6b6b" : "#4dff91" }}>R{totalCost}</div>
          {budget > 0 && <div style={{ fontSize: 11, color: totalCost > budget ? "#ff6b6b" : "#4dff91" }}>{totalCost > budget ? `R${totalCost - budget} over` : `R${budget - totalCost} remaining`}</div>}
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 16 }}>
        <input style={{ ...S.input, marginBottom: 12 }} placeholder="🔍  Search activities..." value={search} onChange={e => setSearch(e.target.value)} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "6px 14px", borderRadius: 20, border: filter === c ? "1px solid rgba(0,201,255,0.5)" : "1px solid rgba(0,201,255,0.15)", background: filter === c ? "rgba(0,201,255,0.15)" : "transparent", color: filter === c ? "#00c9ff" : "rgba(232,244,248,0.5)", cursor: "pointer", fontSize: 12, fontFamily: "inherit", textTransform: "capitalize" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {!hasCar && (
        <div style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#ff6b35" }}>
          🚕 No car mode — activities requiring a car are hidden. Uber distance costs are estimated separately.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map(a => (
          <ActivityCard key={a.id} activity={a} inDate={inDateIds.has(a.id)} onAdd={onAdd} onRemove={onRemove} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

function PlannerScreen({ dateItems, onReorder, onRemove, quiz, budget }) {
  const [dragIdx, setDragIdx] = useState(null);
  const weather = getWeatherForDate();

  const totalActivityCost = dateItems.reduce((s, a) => s + a.costPP * 2, 0);

  // Calculate total distance driven
  let totalKm = 0;
  const legs = [];
  for (let i = 0; i < dateItems.length - 1; i++) {
    const a1 = AREAS[dateItems[i].area];
    const a2 = AREAS[dateItems[i + 1].area];
    if (a1 && a2) {
      const km = haversineKm(a1.lat, a1.lng, a2.lat, a2.lng);
      totalKm += km;
      legs.push({ from: dateItems[i].area, to: dateItems[i + 1].area, km: km.toFixed(1) });
    }
  }
  const petrolCost = quiz?.hasCar ? Number(petrolCostForKm(totalKm)) : Math.round(totalKm * 1.8) * 2;
  const grandTotal = totalActivityCost + petrolCost;
  let startTime = 14 * 60;
  if (quiz?.time === "morning") startTime = 8 * 60;
  else if (quiz?.time === "afternoon") startTime = 12 * 60;
  else if (quiz?.time === "evening") startTime = 17 * 60;

  const toTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const suffix = h >= 12 ? "pm" : "am";
    return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, "0")}${suffix}`;
  };

  let cursor = startTime;

  const handleDragStart = (e, idx) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDrop = (e, idx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const newItems = [...dateItems];
    const [moved] = newItems.splice(dragIdx, 1);
    newItems.splice(idx, 0, moved);
    onReorder(newItems);
    setDragIdx(null);
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Weather widget */}
      <div style={{ ...S.card, marginBottom: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ fontSize: 48 }}>{weather.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#e8f4f8" }}>{weather.condition}</div>
          <div style={{ fontSize: 13, color: "rgba(232,244,248,0.5)", marginTop: 2 }}>
            🌡️ {weather.temp}°C  |  💨 {weather.wind}km/h {weather.windDir}  |  📍 Cape Town
          </div>
          {weather.warning && <div style={{ fontSize: 12, color: "#ff6b35", marginTop: 6, background: "rgba(255,107,53,0.08)", padding: "4px 10px", borderRadius: 6, display: "inline-block" }}>⚠️ {weather.warning}</div>}
          <div style={{ fontSize: 12, color: "#ffd166", marginTop: 6 }}>💡 {weather.tip}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "rgba(232,244,248,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Today</div>
          <div style={{ fontSize: 13, color: "rgba(232,244,248,0.6)" }}>{new Date().toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </div>

      {dateItems.length === 0 ? (
        <div style={{ ...S.card, textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "rgba(232,244,248,0.5)" }}>Your date plan is empty</div>
          <div style={{ fontSize: 13, color: "rgba(232,244,248,0.3)", marginTop: 8 }}>Head to the Explore tab and add activities to your date</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,201,255,0.6)", marginBottom: 16 }}>Date Itinerary — Drag to Reorder</h3>
            {dateItems.map((item, idx) => {
              const itemStart = cursor;
              cursor += item.duration + 30;
              const a1 = idx < dateItems.length - 1 ? AREAS[item.area] : null;
              const a2 = idx < dateItems.length - 1 ? AREAS[dateItems[idx + 1].area] : null;
              const legKm = a1 && a2 ? haversineKm(a1.lat, a1.lng, a2.lat, a2.lng).toFixed(1) : null;

              return (
                <div key={item.id}>
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragOver={handleDragOver}
                    style={{ ...S.card, marginBottom: 8, cursor: "grab", display: "flex", alignItems: "flex-start", gap: 12, opacity: dragIdx === idx ? 0.5 : 1, transition: "opacity 0.2s, border-color 0.2s", borderColor: dragIdx !== null && dragIdx !== idx ? "rgba(0,201,255,0.3)" : "rgba(0,201,255,0.12)" }}
                  >
                    <div style={{ color: "rgba(232,244,248,0.2)", fontSize: 20, paddingTop: 2, cursor: "grab" }}>⠿</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div>
                          <span style={{ fontSize: 20, marginRight: 8 }}>{item.emoji}</span>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</span>
                        </div>
                        <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "rgba(255,107,107,0.5)", cursor: "pointer", fontSize: 18, padding: "0 4px", lineHeight: 1 }}>×</button>
                      </div>
                      <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(232,244,248,0.5)" }}>
                        <span>🕐 {toTime(itemStart)} – {toTime(itemStart + item.duration)}</span>
                        <span>📍 {item.area}</span>
                        <span style={{ color: item.costPP === 0 ? "#4dff91" : "#ffd166" }}>
                          {item.costPP === 0 ? "Free" : `R${item.costPP * 2}`}
                        </span>
                      </div>
                      {item.deal && <div style={{ fontSize: 11, color: "#ffd166", marginTop: 6, opacity: 0.8 }}>💰 {item.deal}</div>}
                    </div>
                  </div>
                  {legKm && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", marginBottom: 8 }}>
                      <div style={{ flex: 1, height: 1, background: "rgba(0,201,255,0.1)" }} />
                      <span style={{ fontSize: 11, color: "rgba(0,201,255,0.4)", whiteSpace: "nowrap" }}>
                        {quiz?.hasCar ? `🚗 ${legKm}km drive` : `🚕 ~${legKm}km (Uber ≈R${(Number(legKm) * 3.8).toFixed(0)})`}
                      </span>
                      <div style={{ flex: 1, height: 1, background: "rgba(0,201,255,0.1)" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cost Summary */}
          <div>
            <div style={{ ...S.card, marginBottom: 16, position: "sticky", top: 80 }}>
              <h3 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,201,255,0.6)", marginBottom: 16 }}>Bill Estimate</h3>
              {dateItems.map(a => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(0,201,255,0.06)" }}>
                  <span style={{ color: "rgba(232,244,248,0.65)" }}>{a.emoji} {a.name}</span>
                  <span style={{ color: a.costPP === 0 ? "#4dff91" : "#ffd166", fontWeight: 600 }}>{a.costPP === 0 ? "Free" : `R${a.costPP * 2}`}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid rgba(0,201,255,0.15)", paddingTop: 12, marginTop: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "rgba(232,244,248,0.5)" }}>
                  <span>{quiz?.hasCar ? `⛽ Petrol (~${totalKm.toFixed(0)}km)` : "🚕 Uber estimate"}</span>
                  <span style={{ color: "#ff6b35" }}>R{petrolCost}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, paddingTop: 8, borderTop: "1px solid rgba(0,201,255,0.1)" }}>
                  <span style={{ color: "rgba(232,244,248,0.7)" }}>Total</span>
                  <span style={{ color: grandTotal > budget && budget > 0 ? "#ff6b6b" : "#4dff91" }}>R{grandTotal}</span>
                </div>
                {budget > 0 && (
                  <div style={{ fontSize: 12, textAlign: "right", marginTop: 4, color: grandTotal > budget ? "#ff6b6b" : "#4dff91" }}>
                    {grandTotal > budget ? `⚠️ R${grandTotal - budget} over budget` : `✓ R${budget - grandTotal} to spare`}
                  </div>
                )}
              </div>

              {quiz?.hasCar && (
                <div style={{ marginTop: 16, background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)", borderRadius: 8, padding: "10px 12px", fontSize: 12 }}>
                  <div style={{ color: "#ff6b35", marginBottom: 4, fontWeight: 600 }}>⛽ Petrol Breakdown</div>
                  <div style={{ color: "rgba(232,244,248,0.5)" }}>Distance: {totalKm.toFixed(1)}km total</div>
                  <div style={{ color: "rgba(232,244,248,0.5)" }}>At R{PETROL_PRICE}/L × {FUEL_CONSUMPTION}L/100km</div>
                  <div style={{ color: "#ff6b35", marginTop: 4 }}>≈ R{petrolCost} for the full date</div>
                </div>
              )}

              {legs.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 11, color: "rgba(232,244,248,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Route Legs</div>
                  {legs.map((l, i) => (
                    <div key={i} style={{ fontSize: 11, color: "rgba(232,244,248,0.4)", marginBottom: 4 }}>
                      {l.from.split(" ")[0]} → {l.to.split(" ")[0]}: {l.km}km
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShareScreen({ dateItems, user, quiz }) {
  const [copied, setCopied] = useState(false);
  const [safetyMode, setSafetyMode] = useState(false);
  const [checkInTimer, setCheckInTimer] = useState(120);
  const [safetyContact, setSafetyContact] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const token = generateShareToken({ items: dateItems.map(a => a.id), user: user?.name });
  const shareUrl = `https://capedate.app/view/${token}`;

  const weather = getWeatherForDate();
  const totalCost = dateItems.reduce((s, a) => s + a.costPP * 2, 0);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppMsg = encodeURIComponent(
    `Hey! 🌊 I've planned our Cape Town date!\n\n` +
    dateItems.map((a, i) => `${i + 1}. ${a.emoji} ${a.name} (${a.area})`).join("\n") +
    `\n\nEstimated total: R${totalCost}\n\nView the full plan: ${shareUrl}`
  );

  useEffect(() => {
    if (!timerActive || timeLeft === null) return;
    if (timeLeft <= 0) { setTimerActive(false); return; }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(checkInTimer * 60);
    setTimerActive(true);
  };

  const timerMin = timeLeft !== null ? Math.floor(timeLeft / 60) : checkInTimer;
  const timerSec = timeLeft !== null ? timeLeft % 60 : 0;

  return (
    <div style={{ padding: "24px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Share Plan */}
        <div style={S.card}>
          <h3 style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,201,255,0.6)", marginBottom: 20 }}>📤 Share the Plan</h3>

          {dateItems.length === 0 ? (
            <p style={{ color: "rgba(232,244,248,0.4)", fontSize: 14 }}>Add activities to your date first before sharing.</p>
          ) : (
            <>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, color: "rgba(0,201,255,0.5)", fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shareUrl}</span>
                <span style={{ fontSize: 12, color: "#4dff91", background: "rgba(77,255,145,0.1)", padding: "2px 8px", borderRadius: 4 }}>🔒 Secure</span>
              </div>

              <button style={{ ...S.btn("primary"), width: "100%", marginBottom: 10 }} onClick={copyLink}>
                {copied ? "✓ Link Copied!" : "📋 Copy Share Link"}
              </button>

              <a href={`https://wa.me/?text=${whatsAppMsg}`} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 40, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", color: "#25d366", textDecoration: "none", fontSize: 13, fontFamily: "inherit", fontWeight: 600, marginBottom: 16 }}>
                📱 Share via WhatsApp
              </a>

              <div style={{ background: "rgba(0,201,255,0.05)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, color: "rgba(0,201,255,0.6)", marginBottom: 8 }}>Date Summary Preview</div>
                {dateItems.map(a => (
                  <div key={a.id} style={{ fontSize: 13, color: "rgba(232,244,248,0.65)", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
                    <span>{a.emoji} {a.name}</span>
                    <span style={{ color: "#ffd166" }}>{a.costPP === 0 ? "Free" : `R${a.costPP * 2}`}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(0,201,255,0.1)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span>Total estimate</span>
                  <span style={{ color: "#4dff91" }}>R{totalCost}</span>
                </div>
                <div style={{ fontSize: 12, marginTop: 8, color: "rgba(232,244,248,0.4)" }}>
                  {weather.icon} {weather.condition} · {weather.temp}°C on date day
                </div>
              </div>
            </>
          )}
        </div>

        {/* Safety Feature */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,107,53,0.7)", margin: 0 }}>🛡️ Safety Tools</h3>
            <span style={{ fontSize: 11, color: "rgba(232,244,248,0.3)" }}>For her peace of mind</span>
          </div>

          <p style={{ fontSize: 13, color: "rgba(232,244,248,0.5)", marginBottom: 20, lineHeight: 1.6 }}>
            Share these safety tools with her before the date. She can track her own location and set check-in timers to keep a trusted friend in the loop.
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Her Safety Contact (phone or email)</label>
            <input style={S.input} placeholder="e.g. +27 82 000 0000 or mom@email.com" value={safetyContact} onChange={e => setSafetyContact(e.target.value)} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Check-in Timer (minutes)</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[30,60,90,120,180].map(m => (
                <button key={m} onClick={() => { setCheckInTimer(m); setTimeLeft(null); setTimerActive(false); }}
                  style={{ padding: "8px 14px", borderRadius: 20, border: checkInTimer === m ? "1px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,107,53,0.15)", background: checkInTimer === m ? "rgba(255,107,53,0.12)" : "transparent", color: checkInTimer === m ? "#ff6b35" : "rgba(232,244,248,0.4)", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {timerActive && timeLeft !== null ? (
            <div style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.25)", borderRadius: 12, padding: "16px", textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: timeLeft < 300 ? "#ff6b6b" : "#ff6b35", fontFamily: "monospace" }}>
                {String(timerMin).padStart(2,"0")}:{String(timerSec).padStart(2,"0")}
              </div>
              <div style={{ fontSize: 12, color: "rgba(232,244,248,0.4)", marginTop: 4 }}>Check-in timer running</div>
              <button style={{ ...S.btn("ghost"), marginTop: 10, fontSize: 12 }} onClick={() => { setTimerActive(false); setTimeLeft(null); }}>Cancel Timer</button>
            </div>
          ) : (
            <button style={{ ...S.btn("secondary"), width: "100%", marginBottom: 10 }} onClick={startTimer}>
              ⏰ Start Check-in Timer ({checkInTimer} min)
            </button>
          )}

          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, color: "rgba(0,201,255,0.6)", marginBottom: 8 }}>📍 Live Location Options</div>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" style={{ display: "block", padding: "10px 14px", borderRadius: 8, background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", color: "#25d366", textDecoration: "none", fontSize: 13, marginBottom: 8, textAlign: "center" }}>
              Share Live Location via WhatsApp →
            </a>
            <div style={{ fontSize: 11, color: "rgba(232,244,248,0.3)", lineHeight: 1.6 }}>
              She can share her real-time location with a trusted contact directly through WhatsApp. The link above opens WhatsApp where she can tap "📎 Attachment → Location → Share Live Location" and send it to her emergency contact.
            </div>
          </div>
        </div>
      </div>

      {/* Saved dates */}
      {user && user.email !== "guest@capedate.app" && (
        <div style={{ ...S.card, marginTop: 20 }}>
          <h3 style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,201,255,0.6)", marginBottom: 16 }}>💾 Saved to Your Profile</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: "linear-gradient(135deg, #00c9ff, #0080b3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "rgba(232,244,248,0.4)" }}>{user.email}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#4dff91" }}>✓ Date plan saved</div>
              <div style={{ fontSize: 11, color: "rgba(232,244,248,0.3)" }}>{dateItems.length} activities · R{dateItems.reduce((s,a)=>s+a.costPP*2,0)} est.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("quiz");
  const [quiz, setQuiz] = useState(null);
  const [dateItems, setDateItems] = useState([]);
  const [budget, setBudget] = useState(800);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => { setUser(null); setView("quiz"); setQuiz(null); setDateItems([]); };

  const handleQuizComplete = (answers) => {
    setQuiz(answers);
    setView("explore");
  };

  const addToDate = (activity) => {
    if (!dateItems.find(a => a.id === activity.id)) {
      setDateItems([...dateItems, activity]);
    }
  };

  const removeFromDate = (id) => setDateItems(dateItems.filter(a => a.id !== id));

  if (!user) return (
    <div style={S.app}>
      <div style={S.bg} />
      <LoginScreen onLogin={handleLogin} />
    </div>
  );

  const tabs = [
    { key: "quiz", label: "🧭 Quiz" },
    { key: "explore", label: `🗂 Explore${dateItems.length > 0 ? ` (${dateItems.length})` : ""}` },
    { key: "planner", label: "📋 Date Plan" },
    { key: "share", label: "📤 Share & Safety" },
  ];

  return (
    <div style={S.app}>
      <div style={S.bg} />

      <nav style={S.nav}>
        <div onClick={() => setView("quiz")} style={{ cursor: "pointer" }}>
          <span style={S.logo}>🌊 Cape Date</span>
          <span style={S.logoSub}>Cape Town Date Planner</span>
        </div>

        <div style={S.navTabs}>
          {tabs.map(t => (
            <button key={t.key} style={S.navTab(view === t.key)} onClick={() => setView(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: "linear-gradient(135deg, #00c9ff, #0080b3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {user.name[0].toUpperCase()}
          </div>
          <button style={S.navTab(false)} onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <div style={S.container}>
        {view === "quiz" && (
          quiz ? (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Quiz complete, {user.name}!</h2>
              <p style={{ color: "rgba(232,244,248,0.5)", fontSize: 14, marginBottom: 24 }}>
                Your recommendations are personalised for her. Head to Explore to build the date.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
                {[
                  { label: "Personality", val: quiz.personality },
                  { label: "Setting", val: quiz.setting },
                  { label: "Vibe", val: quiz.vibe },
                  { label: "Energy", val: quiz.energy },
                  { label: "Transport", val: quiz.hasCar ? "Has car" : "Uber/taxi" },
                ].map(i => (
                  <div key={i.label} style={S.cardSm}>
                    <div style={{ fontSize: 11, color: "rgba(0,201,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{i.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, textTransform: "capitalize", marginTop: 4 }}>{i.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button style={S.btn("primary")} onClick={() => setView("explore")}>Browse Activities →</button>
                <button style={S.btn("ghost")} onClick={() => setQuiz(null)}>Redo Quiz</button>
              </div>
            </div>
          ) : (
            <QuizScreen onComplete={handleQuizComplete} />
          )
        )}

        {view === "explore" && (
          <ExploreScreen quiz={quiz} dateItems={dateItems} onAdd={addToDate} onRemove={removeFromDate} budget={budget} setBudget={setBudget} />
        )}

        {view === "planner" && (
          <PlannerScreen dateItems={dateItems} onReorder={setDateItems} onRemove={removeFromDate} quiz={quiz} budget={budget} />
        )}

        {view === "share" && (
          <ShareScreen dateItems={dateItems} user={user} quiz={quiz} />
        )}
      </div>
    </div>
  );
}
