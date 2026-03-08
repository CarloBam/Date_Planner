import streamlit as st
from engine import extract_tags, get_distance_km, calculate_fuel_and_uber, get_recommendations
from data import VENUES, AREAS_COORDINATES

st.set_page_config(page_title="DateCart Cape Town", page_icon="🧡", layout="wide")

if "itinerary" not in st.session_state:
    st.session_state.itinerary = []
if "budget" not in st.session_state:
    st.session_state.budget = 800

# App Sidebar for Date Persona Engine
st.sidebar.title("🧠 Date Persona Engine")

st.sidebar.subheader("Describe Her")
description = st.sidebar.text_area("Tell us about her personality, likes, or vibe", "She is quiet, likes books, and enjoys beautiful scenery...")
extracted_tags = extract_tags(description)

if extracted_tags:
    st.sidebar.caption("Detected Vibes: " + ", ".join(extracted_tags))

st.sidebar.subheader("Logistics & Stage")
date_stage = st.sidebar.selectbox("Date Stage", ["First Date", "Second Date", "Third Date", "Anniversary", "Birthday Date"])
energy = st.sidebar.selectbox("Her Energy", ["Introverted", "Extroverted", "Balanced"])
budget = st.sidebar.number_input("Total Budget (ZAR)", min_value=100, max_value=10000, value=800, step=100)
st.session_state.budget = budget

start_area = st.sidebar.selectbox("Starting Area", list(AREAS_COORDINATES.keys()))
max_radius = st.sidebar.slider("Travel Radius (km)", 5, 50, 15)
has_car = st.sidebar.checkbox("We have a car", value=True)

st.sidebar.subheader("Weather Conditions")
col1, col2 = st.sidebar.columns(2)
is_rainy = col1.checkbox("Rainy? 🌧️")
is_windy = col2.checkbox("Strong Wind? 🌬️")

profile = {
    "description": description,
    "date_stage": date_stage,
    "energy": energy,
    "has_car": has_car,
    "start_lat": AREAS_COORDINATES[start_area][0],
    "start_lon": AREAS_COORDINATES[start_area][1],
    "max_radius_km": max_radius,
    "rainy": is_rainy,
    "windy": is_windy
}

# App Layout
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
            
            # Using unique keys for each venue button
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
        
        # Calculate stats over the itinerary
        # Distance from start area to first stop
        first_v = st.session_state.itinerary[0]
        dist_start_to_first = get_distance_km(profile["start_lat"], profile["start_lon"], first_v["latitude"], first_v["longitude"])
        total_distance += dist_start_to_first
        
        # Render Itinerary
        for i, v in enumerate(st.session_state.itinerary):
            st.markdown(f"**Stop {i+1}: {v['name']}**")
            total_activity_cost += v["cost_estimate"]
            total_time += v["duration_minutes"]
            
            # Distance logic for UI visual flow
            if i == 0:
                dist_str = f"From {start_area}: {dist_start_to_first:.1f} km"
            else:
                prev_v = st.session_state.itinerary[i-1]
                dist = get_distance_km(prev_v["latitude"], prev_v["longitude"], v["latitude"], v["longitude"])
                total_distance += dist
                dist_str = f"From previous stop: {dist:.1f} km"
            
            st.caption(dist_str)
            
            if st.button(f"Remove", key=f"rm_{i}"):
                st.session_state.itinerary.pop(i)
                st.rerun()
                
            st.markdown("---")
        
        # Estimate Uber/Fuel Based on Travel Total
        travel_est = calculate_fuel_and_uber(total_distance, has_car)
        
        st.subheader("💰 Tally")
        st.write(f"**Activity Cost:** R {total_activity_cost}")
        
        if travel_est["type"] == "fuel":
            st.write(f"**Petrol Estimate ({total_distance:.1f} km):** R {travel_est['cost']}")
            total_cost = total_activity_cost + travel_est["cost"]
        else:
            min_c, max_c = travel_est.get("minCost",0), travel_est.get("maxCost",0)
            if total_distance > 0:
                st.write(f"**Uber Estimate ({total_distance:.1f} km):** R {min_c} - R {max_c}")
            else:
                st.write("**Uber Estimate:** R 0")
                
            if travel_est.get("isWalkable"):
                st.success("High walkability! Uber might not be needed.")
            total_cost = total_activity_cost + max_c
            
        curr_budget = st.session_state.budget
        rem = curr_budget - total_cost
        
        st.metric("Total Estimated Cost", f"R {total_cost}")
        
        if rem < 0:
            st.error(f"⚠️ Over budget by R {abs(rem)}")
        elif rem < 150:
            st.warning(f"Close to budget. Remaining: R {rem}")
        else:
            st.success(f"Under budget! Remaining: R {rem}")
            
        with st.expander("🛡️ Guardian Mode & Share"):
            st.write("Generate a secure view-only link for her.")
            st.info("https://capedate.app/plan/secure_token_123")
            st.caption("Receiver has access to Guardian Mode allowing opt-in location sharing with their trusted contacts.")
