import math
import re

def extract_tags(description: str):
    tags = []
    desc = description.lower()
    if re.search(r'(aesthetic|photos|cute|pretty|instagram)', desc):
        tags.extend(["#Instagrammable", "#Aesthetic", "#VisualFocus"])
    if re.search(r'(quiet|bookworm|reading|calm|shy|introvert)', desc):
        tags.extend(["#Cozy", "#LowVolume", "#Quiet", "#ConversationFriendly"])
    if re.search(r'(adventurous|active|outdoors|sporty|energetic)', desc):
        tags.extend(["#Outdoors", "#HighEnergy", "#Adventure", "#Movement"])
    if re.search(r'(foodie|trendy|stylish|new|brunch)', desc):
        tags.extend(["#Culinary", "#Trendy", "#NewOpening", "#BrunchFriendly", "#Trending"])
    return tags

def get_distance_km(lat1, lon1, lat2, lon2):
    R = 6371
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat / 2) * math.sin(dLat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon / 2) * math.sin(dLon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return float(f"{R * c:.2f}")

def calculate_fuel_and_uber(distance_km, has_car=True, efficiency=8.0, price_per_litre=23.80):
    if has_car:
        litres = (distance_km / 100.0) * efficiency
        cost = litres * price_per_litre
        return {"type": "fuel", "cost": max(0, int(cost))}
    else:
        base_rate = 20
        rate_per_km = 8.5
        total = base_rate + (distance_km * rate_per_km)
        is_walkable = distance_km <= 1.5
        if distance_km == 0:
            return {"type": "walk", "cost": 0, "minCost": 0, "maxCost": 0, "isWalkable": True}
        return {"type": "uber", "minCost": int(total * 1), "maxCost": int(total * 1.5), "isWalkable": is_walkable}

def get_recommendations(venues, profile):
    extracted = extract_tags(profile.get("description", ""))
    
    scored = []
    for v in venues:
        # Logistic rules
        if not profile.get("has_car", True) and v["car_required"]:
            continue
            
        # Radius logic
        if profile.get("start_lat") and profile.get("start_lon"):
            dist = get_distance_km(profile["start_lat"], profile["start_lon"], v["latitude"], v["longitude"])
            if dist > profile.get("max_radius_km", 15):
                continue
                
        # Weather rules
        windy = profile.get("windy", False)
        rainy = profile.get("rainy", False)
        
        if rainy and not v["indoor"]:
            continue
        if windy and v["weather_dependency"] == "needs_no_wind":
            continue
            
        score = 0
        
        # Energy
        energy = profile.get("energy", "Balanced")
        if energy == "Introverted":
            score += v["introvert_score"] * 2
        elif energy == "Extroverted":
            score += v["extrovert_score"] * 2
        else:
            score += v["introvert_score"] + v["extrovert_score"]
            
        # NLP matching
        for t in extracted:
            if t in v["psychographic_tags"]:
                score += 10
                
        # Date Stage
        stage = profile.get("date_stage", "First Date")
        if stage == "First Date":
            score += v["first_date_suitability"] * 2
            if "#ConversationFriendly" in v["psychographic_tags"]: score += 5
            if "#PublicSafe" in v["psychographic_tags"]: score += 5
        elif stage == "Anniversary" or stage == "Birthday Date":
            score += v["anniversary_suitability"] * 3
            score += v["scenic_score"]
            if "Luxurious" in v["vibe_taxonomy"]: score += 5
            
        scored.append({"venue": v, "score": score})
        
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored
