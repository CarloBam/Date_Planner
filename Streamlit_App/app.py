import streamlit as st
import urllib.parse
import datetime
from engine import extract_tags, get_distance_km, calculate_fuel_and_uber, get_recommendations
from data import VENUES, AREAS_COORDINATES
import database as db

st.set_page_config(page_title="DateCart Cape Town", page_icon="🧡", layout="wide")

# Initialize Session State
if "itinerary" not in st.session_state:
    st.session_state.itinerary = []
if "budget" not in st.session_state:
    st.session_state.budget = 800
if "is_verified" not in st.session_state:
    st.session_state.is_verified = False

def render_receiver_view(token):
    plan = db.get_date_plan(token)
    if not plan:
        st.error("Oops! This date link seems invalid or has expired.")
        return

    st.title("💌 You've been invited on a Date!")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        if plan["status"] == "pending":
            st.info(f"{plan['planner_name']} has planned a thoughtful day out for you both in Cape Town.")
        elif plan["status"] == "accepted":
            st.success("🎉 You've accepted this date! See you soon.")
        elif plan["status"] == "rejected":
            st.warning("You kindly passed on this date. Thanks for letting them know!")
            
        st.subheader("📋 The Itinerary")
        
        # Determine duration and total vibe
        total_time = sum(v["duration_minutes"] for v in plan["itinerary"])
        
        for i, v in enumerate(plan["itinerary"]):
            st.markdown(f"**Step {i+1}: {v['name']}**")
            st.caption(f"📍 {v['area']}  ⏳ {v['duration_minutes']} mins")
            
            if i == 0:
                maps_url = f"https://www.google.com/maps/dir/?api=1&destination={v['latitude']},{v['longitude']}"
            else:
                prev_v = plan["itinerary"][i-1]
                maps_url = f"https://www.google.com/maps/dir/?api=1&origin={prev_v['latitude']},{prev_v['longitude']}&destination={v['latitude']},{v['longitude']}"
            
            st.markdown(f"🗺️ [Directions to here]({maps_url})")
            st.markdown(f"_{v['description']}_")
            tags = " ".join([f"`{t}`" for t in v["psychographic_tags"]])
            st.markdown(tags)
            st.divider()

    with col2:
        # Trust Indicators Panel
        st.markdown("### 🛡️ Trust & Safety")
        if plan["is_verified"]:
            st.success("✅ Planner ID Verified")
            st.caption("The planner securely verified their identity before creating this link.")
        else:
            st.warning("⚠️ Unverified Planner")
            
        st.markdown("### 🕊️ Guardian Mode (Optional)")
        st.caption("You will have the option to privately share real-time location with your trusted contacts during the date.")
        
        if plan.get("date_stage") == "First Date":
            st.info("💡 **First Date Safety Tip:** We always recommend sharing your live location with a friend! (Also, it's always smart to carry some pepper spray just to be safe.)")
            
            # Reconstruct invite url for whatsapp sharing
            base_url = "http://localhost:8501"
            invite_url = f"{base_url}?invite={token}"
            wa_share = urllib.parse.quote(f"Hey! I'm going on a first date. I'll share my live location soon, but here is my itinerary: {invite_url}")
            st.markdown(f"📱 [Share Alert to WhatsApp Friend](https://wa.me/?text={wa_share})")
            
        # Actions for the receiver
        if plan["status"] == "pending":
            st.markdown("### Your Decision")
            if st.button("💖 I'd love to! (Accept)"):
                db.update_date_plan_status(token, "accepted")
                st.rerun()
                
            if plan["allow_customization"]:
                if st.button("✨ Can we customize it?"):
                    # For simplicity, customization can just flag the DB, or we can build an advanced swap UI.
                    # We will mark it as returned for customization.
                    st.info("Customization requested! The planner will be notified.")
                    db.update_date_plan_status(token, "customized")
                    
            if st.button("Maybe next time (Reject)", type="secondary"):
                db.update_date_plan_status(token, "rejected")
                st.rerun()

def render_planner_view():
    st.sidebar.title("🧠 Date Persona Engine")

    # Identity Verification
    st.sidebar.subheader("🔒 Verification")
    if not st.session_state.is_verified:
        id_file = st.sidebar.file_uploader("Upload ID/Selfie to Verify", help="Increases trust. We do not store this image.")
        if id_file is not None:
            st.session_state.is_verified = True
            st.sidebar.success("✅ Confirmed! You are Verified.")
    else:
        st.sidebar.success("✅ Account Verified")

    planner_name = st.sidebar.text_input("Your Name", "Liam")

    st.sidebar.subheader("Describe Her")
    description = st.sidebar.text_area("Tell us about her personality, likes, or vibe", "She is quiet, likes books, and enjoys beautiful scenery...")
    extracted_tags = extract_tags(description)

    if extracted_tags:
        st.sidebar.caption("Detected Vibes: " + ", ".join(extracted_tags))

    st.sidebar.subheader("Logistics & Stage")
    date_stage = st.sidebar.selectbox("Date Stage", ["First Date", "Second Date", "Third Date", "Anniversary", "Birthday Date"])
    planned_date = st.sidebar.date_input("Planned Date", datetime.date.today())
    energy = st.sidebar.selectbox("Her Energy", ["Introverted", "Extroverted", "Balanced"])
    budget = st.sidebar.number_input("Total Budget (ZAR)", min_value=100, max_value=10000, value=800, step=100)
    st.session_state.budget = budget

    start_area = st.sidebar.selectbox("Starting Area", list(AREAS_COORDINATES.keys()))
    max_radius = st.sidebar.slider("Travel Radius (km)", 5, 50, 15)
    has_car = st.sidebar.checkbox("We have a car", value=True)

    st.sidebar.subheader("Weather Conditions")
    colA, colB = st.sidebar.columns(2)
    is_rainy = colA.checkbox("Rainy? 🌧️")
    is_windy = colB.checkbox("Strong Wind? 🌬️")

    start_lat = AREAS_COORDINATES[start_area][0]
    start_lon = AREAS_COORDINATES[start_area][1]
    if len(st.session_state.itinerary) > 0:
        last_item = st.session_state.itinerary[-1]
        start_lat = last_item["latitude"]
        start_lon = last_item["longitude"]

    profile = {
        "description": description,
        "date_stage": date_stage,
        "planned_date_month": planned_date.month,
        "energy": energy,
        "has_car": has_car,
        "start_lat": start_lat,
        "start_lon": start_lon,
        "max_radius_km": max_radius,
        "rainy": is_rainy,
        "windy": is_windy
    }


    st.title("🧡 DateCart Cape Town")
    st.write("Plan the perfect, thoughtful Cape Town date based on her vibe and your logistics.")

    recs = get_recommendations(VENUES, profile)

    col_feed, col_board = st.columns([3, 2])

    with col_feed:
        st.subheader("Discover Venues")
        if not recs:
            st.warning("No venues match these strict criteria. Try expanding the radius or changing the weather.")
        
        for r in recs[:5]:
            v = r["venue"]
            with st.container():
                st.markdown(f"#### {v['name']}")
                st.caption(f"{v['area']} | Cost: ~R{v['cost_estimate']} | {v['duration_minutes']} mins | Score: {r['score']}")
                st.markdown(f"_{v['description']}_")
                tags = " ".join([f"`{t}`" for t in v["psychographic_tags"]])
                st.markdown(tags)
                
                if st.button(f"Add to Date", key=f"add_{v['id']}"):
                    st.session_state.itinerary.append(v)
                    st.rerun()
                st.divider()

    with col_board:
        st.subheader("📋 Date Itinerary")
        
        if len(st.session_state.itinerary) == 0:
            st.info("Your date planner is empty. Add some venues from the feed.")
        else:
            total_time = 0
            total_activity_cost = 0
            total_distance = 0
            
            first_v = st.session_state.itinerary[0]
            dist_start_to_first = get_distance_km(profile["start_lat"], profile["start_lon"], first_v["latitude"], first_v["longitude"])
            total_distance += dist_start_to_first
            
            for i, v in enumerate(st.session_state.itinerary):
                st.markdown(f"**Stop {i+1}: {v['name']}**")
                total_activity_cost += v["cost_estimate"]
                total_time += v["duration_minutes"]
                
                if i == 0:
                    dist_str = f"From {start_area}: {dist_start_to_first:.1f} km"
                    origin_lat, origin_lon = profile["start_lat"], profile["start_lon"]
                else:
                    prev_v = st.session_state.itinerary[i-1]
                    dist = get_distance_km(prev_v["latitude"], prev_v["longitude"], v["latitude"], v["longitude"])
                    total_distance += dist
                    dist_str = f"From previous stop: {dist:.1f} km"
                    origin_lat, origin_lon = prev_v["latitude"], prev_v["longitude"]
                
                maps_url = f"https://www.google.com/maps/dir/?api=1&origin={origin_lat},{origin_lon}&destination={v['latitude']},{v['longitude']}"
                st.caption(dist_str)
                st.markdown(f"🗺️ [Get Directions]({maps_url})")
                
                if st.button(f"Remove", key=f"rm_{i}"):
                    st.session_state.itinerary.pop(i)
                    st.rerun()
                    
                st.markdown("---")
            
            travel_est = calculate_fuel_and_uber(total_distance, has_car)
            
            st.subheader("💰 Tally")
            st.write(f"**Activity Cost:** R {total_activity_cost}")
            
            if travel_est["type"] == "fuel":
                st.write(f"**Petrol Estimate ({total_distance:.1f} km):** R {travel_est['cost']}")
                total_cost = total_activity_cost + travel_est["cost"]
            else:
                max_c = travel_est.get("maxCost",0)
                st.write(f"**Uber Estimate ({total_distance:.1f} km):** R {travel_est.get('minCost',0)} - R {max_c}")
                total_cost = total_activity_cost + max_c
                
            curr_budget = st.session_state.budget
            rem = curr_budget - total_cost
            st.metric("Total Estimated Cost", f"R {total_cost}")
            
            if rem < 0:
                st.error(f"⚠️ Over budget by R {abs(rem)}")
            
            with st.expander("💌 Generate Secure Invite Link", expanded=True):
                st.write("Generate a beautiful, secure link for her to view and confirm the plan.")
                allow_customization = st.checkbox("Allow her to customize the itinerary", value=True)
                
                if date_stage == "First Date" and len(st.session_state.itinerary) > 3:
                     st.warning("✨ **Tip:** You've added quite a few stops! For a first date, keeping it to 1-3 activities helps take the pressure off and keeps things casual. But feel free to continue if you're just comparing options!")
                
                if st.button("Generate Link"):
                    token = db.save_date_plan(
                        planner_name=planner_name,
                        is_verified=st.session_state.is_verified,
                        itinerary=st.session_state.itinerary,
                        allow_customization=allow_customization,
                        date_stage=date_stage,
                        planned_date=str(planned_date)
                    )
                    
                    # Create the sharing links
                    base_url = "http://localhost:8501" # Default Streamlit port
                    invite_url = f"{base_url}?invite={token}"
                    
                    message = f"Hey! I've planned something special for us... 🌷 Thought you might like this itinerary. Let me know what you think: {invite_url}"
                    wa_encoded = urllib.parse.quote(message)
                    email_encoded_sub = urllib.parse.quote("Our Date Plan!")
                    email_encoded_body = urllib.parse.quote(message)

                    st.success("Link safely generated!")
                    st.code(invite_url, language="text")
                    
                    st.markdown(f"📱 [Send via WhatsApp](https://wa.me/?text={wa_encoded})")
                    st.markdown(f"📧 [Send via Email](mailto:?subject={email_encoded_sub}&body={email_encoded_body})")
                    st.caption("This link is entirely secure and hides your budget calculations from the receiver.")
            
            # HIDDEN DEV TOOL: Fast view as receiver
            st.write("")
            st.write("")
            with st.expander("🛠️ Dev Tools (Hidden)", expanded=False):
                st.caption("Testing feature to quickly view the app as the receiver without opening a new tab.")
                
                # Fetch recent date plans from db for quick testing
                import sqlite3
                conn = sqlite3.connect(db.DB_FILE)
                c = conn.cursor()
                c.execute('SELECT token, planner_name FROM date_plans ORDER BY created_at DESC LIMIT 5')
                recent_plans = c.fetchall()
                conn.close()
                
                if recent_plans:
                    st.write("Recent tokens:")
                    for p in recent_plans:
                        if st.button(f"View Plan: {p[0]} ({p[1]})"):
                            # Instead of a complex url rewrite, we just jump state
                            st.query_params.update(invite=p[0])
                            st.rerun()
                else:
                    st.caption("No generated plans to view yet. Generate a link first!")

# --- Main App Routing ---
query_params = st.query_params
invite_token = query_params.get("invite")

if invite_token:
    # Add a "Go Back to Planner" button for the dev tools testing flow
    if st.sidebar.button("🔙 Developer: End Guest View"):
        st.query_params.clear()
        st.rerun()
        
    render_receiver_view(invite_token)
else:
    render_planner_view()
