VENUES = [
    {
        "id": 1, "name": "Two Oceans Aquarium", "category": "Fun", "location_name": "V&A Waterfront", "area": "Atlantic Seaboard",
        "latitude": -33.902, "longitude": 18.421, "cost_estimate": 220, "duration_minutes": 90,
        "car_required": False, "indoor": True, "introvert_score": 3, "extrovert_score": 2,
        "romance_score": 2, "conversation_score": 3, "first_date_suitability": 9,
        "anniversary_suitability": 3, "scenic_score": 7, "weather_dependency": "indoor_safe",
        "description": "A relaxing walk through marine exhibits. Google Maps review: 'The jellyfish are mesmerizing and it is a super cute date! A must-see at the waterfront.'",
        "tags": ["indoor", "easy", "fun", "waterfront"],
        "psychographic_tags": ["#ConversationFriendly", "#PublicSafe", "#Cozy", "#VisualFocus"],
        "vibe_taxonomy": ["Playful", "Scenic"]
    },
    {
        "id": 2, "name": "Harbour Sunset Cruise", "category": "Romantic", "location_name": "V&A Waterfront", "area": "Atlantic Seaboard",
        "latitude": -33.902, "longitude": 18.421, "cost_estimate": 280, "duration_minutes": 75,
        "car_required": False, "indoor": False, "introvert_score": 2, "extrovert_score": 2,
        "romance_score": 4, "conversation_score": 3, "first_date_suitability": 6,
        "anniversary_suitability": 9, "scenic_score": 10, "weather_dependency": "needs_clear_sky",
        "description": "Stunning sunset over the ocean. Google Maps review: 'Unbelievably romantic, they gave us complimentary champagne and the mountain views were insane!'",
        "tags": ["romantic", "sunset", "scenic", "waterfront"],
        "psychographic_tags": ["#Instagrammable", "#Scenic", "#Luxury", "#Aesthetic"],
        "vibe_taxonomy": ["Luxurious", "Romantic"]
    },
    {
        "id": 3, "name": "Lion's Head Hike", "category": "Adventure", "location_name": "Signal Hill", "area": "City Bowl",
        "latitude": -33.921, "longitude": 18.400, "cost_estimate": 0, "duration_minutes": 180,
        "car_required": False, "indoor": False, "introvert_score": 2, "extrovert_score": 3,
        "romance_score": 2, "conversation_score": 3, "first_date_suitability": 5,
        "anniversary_suitability": 2, "scenic_score": 10, "weather_dependency": "needs_no_wind",
        "description": "Iconic hike with 360-degree views. Google Maps review: 'Tough climb but the sunset at the top makes you forget your legs are burning.'",
        "tags": ["nature", "outdoor", "active", "free"],
        "psychographic_tags": ["#Outdoors", "#HighEnergy", "#Adventure", "#Movement"],
        "vibe_taxonomy": ["Rustic", "Active"]
    },
    {
        "id": 4, "name": "Kirstenbosch Gardens", "category": "Nature", "location_name": "Southern Suburbs", "area": "Southern Suburbs",
        "latitude": -33.988, "longitude": 18.432, "cost_estimate": 220, "duration_minutes": 150,
        "car_required": True, "indoor": False, "introvert_score": 3, "extrovert_score": 1,
        "romance_score": 4, "conversation_score": 4, "first_date_suitability": 8,
        "anniversary_suitability": 8, "scenic_score": 10, "weather_dependency": "needs_clear_sky",
        "description": "Lovely botanical gardens. Google Maps review: 'Bring a picnic blanket, the vibe is incredibly peaceful and the canopy walkway is very cool.'",
        "tags": ["nature", "picnic", "relaxed"],
        "psychographic_tags": ["#Cozy", "#Quiet", "#Outdoors", "#ConversationFriendly"],
        "vibe_taxonomy": ["Scenic", "Minimalist"]
    },
    {
        "id": 5, "name": "Clifton 4th Beach", "category": "Relaxing", "location_name": "Clifton", "area": "Atlantic Seaboard",
        "latitude": -33.942, "longitude": 18.375, "cost_estimate": 0, "duration_minutes": 150,
        "car_required": False, "indoor": False, "introvert_score": 2, "extrovert_score": 3,
        "romance_score": 3, "conversation_score": 3, "first_date_suitability": 7,
        "anniversary_suitability": 5, "scenic_score": 9, "weather_dependency": "needs_no_wind",
        "description": "Chill on the white sands of Clifton. Google Maps review: 'Water is freezing but laying on the sand listening to the waves is perfect.'",
        "tags": ["beach", "free", "scenic"],
        "psychographic_tags": ["#Outdoors", "#Scenic", "#Instagrammable"],
        "vibe_taxonomy": ["Relaxed", "Scenic"]
    },
    {
        "id": 6, "name": "Iziko South African Museum", "category": "Cultural", "location_name": "Company's Garden", "area": "City Bowl",
        "latitude": -33.928, "longitude": 18.414, "cost_estimate": 40, "duration_minutes": 120,
        "car_required": False, "indoor": True, "introvert_score": 4, "extrovert_score": 1,
        "romance_score": 2, "conversation_score": 4, "first_date_suitability": 8,
        "anniversary_suitability": 3, "scenic_score": 5, "weather_dependency": "indoor_safe",
        "description": "National museum spanning millions of years. Google Maps review: 'The whale skeleton is massive! Lots of quiet exhibits to talk about.'",
        "tags": ["indoor", "museum", "history", "educational"],
        "psychographic_tags": ["#Quiet", "#ConversationFriendly", "#PublicSafe", "#VisualFocus"],
        "vibe_taxonomy": ["Educational", "Quiet"]
    },
    {
        "id": 7, "name": "Iziko Planetarium", "category": "Fun", "location_name": "Company's Garden", "area": "City Bowl",
        "latitude": -33.928, "longitude": 18.414, "cost_estimate": 80, "duration_minutes": 60,
        "car_required": False, "indoor": True, "introvert_score": 4, "extrovert_score": 1,
        "romance_score": 4, "conversation_score": 2, "first_date_suitability": 9,
        "anniversary_suitability": 5, "scenic_score": 8, "weather_dependency": "indoor_safe",
        "description": "A fully immersive digital dome. Google Maps review: 'Literally sitting under the stars for an hour, surprisingly romantic and mind-blowing!'",
        "tags": ["indoor", "museum", "stars", "romantic"],
        "psychographic_tags": ["#Cozy", "#VisualFocus", "#Quiet"],
        "vibe_taxonomy": ["Scenic", "Playful"]
    },
    {
        "id": 8, "name": "Labia Theatre", "category": "Entertainment", "location_name": "Gardens", "area": "City Bowl",
        "latitude": -33.931, "longitude": 18.410, "cost_estimate": 70, "duration_minutes": 120,
        "car_required": False, "indoor": True, "introvert_score": 4, "extrovert_score": 1,
        "romance_score": 4, "conversation_score": 2, "first_date_suitability": 8,
        "anniversary_suitability": 6, "scenic_score": 6, "weather_dependency": "indoor_safe",
        "description": "Oldest independent art-repertory cinema. Google Maps review: 'Old school charm, vintage vibe! They even let you take wine into the theater.'",
        "tags": ["indoor", "cinema", "arts", "vintage"],
        "psychographic_tags": ["#Cozy", "#Aesthetic", "#Quiet"],
        "vibe_taxonomy": ["Vintage", "Relaxed"]
    },
    {
        "id": 9, "name": "Galileo Open Air Cinema", "category": "Entertainment", "location_name": "Various / Kirstenbosch", "area": "Southern Suburbs",
        "latitude": -33.988, "longitude": 18.432, "cost_estimate": 150, "duration_minutes": 150,
        "car_required": True, "indoor": False, "introvert_score": 3, "extrovert_score": 2,
        "romance_score": 5, "conversation_score": 2, "first_date_suitability": 7,
        "anniversary_suitability": 9, "scenic_score": 8, "weather_dependency": "needs_clear_sky",
        "description": "Outdoor movie under the stars. Google Maps review: 'Cozying up with blankets watching classics is a top tier date night activity.' (Summer only)",
        "tags": ["outdoor", "cinema", "scenic"],
        "psychographic_tags": ["#Cozy", "#Outdoors", "#Aesthetic", "#Romantic"],
        "vibe_taxonomy": ["Romantic", "Scenic"]
    },
    {
        "id": 10, "name": "Ice Skating at Grand West", "category": "Adventure", "location_name": "Grand West Casino", "area": "Northern Suburbs",
        "latitude": -33.921, "longitude": 18.546, "cost_estimate": 120, "duration_minutes": 120,
        "car_required": True, "indoor": True, "introvert_score": 2, "extrovert_score": 4,
        "romance_score": 3, "conversation_score": 3, "first_date_suitability": 8,
        "anniversary_suitability": 4, "scenic_score": 4, "weather_dependency": "indoor_safe",
        "description": "Olympic-sized ice rink. Google Maps review: 'So much fun slipping and sliding. Excellent excuse to hold hands if you aren't sure how to skate!'",
        "tags": ["indoor", "active", "fun"],
        "psychographic_tags": ["#HighEnergy", "#Movement", "#Playful", "#PublicSafe"],
        "vibe_taxonomy": ["Active", "Playful"]
    },
    {
        "id": 11, "name": "Cave Golf & Arcade", "category": "Fun", "location_name": "V&A Waterfront", "area": "Atlantic Seaboard",
        "latitude": -33.903, "longitude": 18.420, "cost_estimate": 100, "duration_minutes": 60,
        "car_required": False, "indoor": True, "introvert_score": 3, "extrovert_score": 3,
        "romance_score": 2, "conversation_score": 4, "first_date_suitability": 9,
        "anniversary_suitability": 2, "scenic_score": 3, "weather_dependency": "indoor_safe",
        "description": "Indoor mini golf. Google Maps review: 'Awesome retro vibes! Super cheap and close to everything else at the Waterfront.'",
        "tags": ["indoor", "active", "fun", "waterfront"],
        "psychographic_tags": ["#Playful", "#Movement", "#ConversationFriendly"],
        "vibe_taxonomy": ["Playful", "Casual"]
    },
    {
        "id": 12, "name": "Zeitz MOCAA", "category": "Cultural", "location_name": "Silo District", "area": "Atlantic Seaboard",
        "latitude": -33.908, "longitude": 18.422, "cost_estimate": 250, "duration_minutes": 120,
        "car_required": False, "indoor": True, "introvert_score": 4, "extrovert_score": 2,
        "romance_score": 3, "conversation_score": 3, "first_date_suitability": 7,
        "anniversary_suitability": 7, "scenic_score": 10, "weather_dependency": "indoor_safe",
        "description": "Modern art gallery in grain silos. Google Maps review: 'The architecture inside is mind-blowing. Amazing spot for photos and deep conversations.'",
        "tags": ["indoor", "museum", "art", "scenic"],
        "psychographic_tags": ["#VisualFocus", "#Aesthetic", "#Instagrammable", "#Quiet"],
        "vibe_taxonomy": ["Trendy", "Sophisticated"]
    },
    {
        "id": 13, "name": "The Cape Wheel", "category": "Fun", "location_name": "V&A Waterfront", "area": "Atlantic Seaboard",
        "latitude": -33.904, "longitude": 18.420, "cost_estimate": 175, "duration_minutes": 20,
        "car_required": False, "indoor": False, "introvert_score": 2, "extrovert_score": 3,
        "romance_score": 4, "conversation_score": 3, "first_date_suitability": 8,
        "anniversary_suitability": 5, "scenic_score": 9, "weather_dependency": "needs_no_wind",
        "description": "Giant observation wheel. Google Maps review: 'Try going exactly at sunset, the views of Table Mountain from the top cabin are spectacular.'",
        "tags": ["scenic", "outdoor", "fun"],
        "psychographic_tags": ["#Scenic", "#Playful", "#Instagrammable"],
        "vibe_taxonomy": ["Casual", "Scenic"]
    },
    {
        "id": 14, "name": "Nu Metro Cinema", "category": "Entertainment", "location_name": "V&A Waterfront", "area": "Atlantic Seaboard",
        "latitude": -33.902, "longitude": 18.419, "cost_estimate": 150, "duration_minutes": 150,
        "car_required": False, "indoor": True, "introvert_score": 4, "extrovert_score": 2,
        "romance_score": 3, "conversation_score": 1, "first_date_suitability": 5,
        "anniversary_suitability": 4, "scenic_score": 2, "weather_dependency": "indoor_safe",
        "description": "Modern cinema. Google Maps review: 'Great 4DX screens and really comfortable VIP seating available. Perfect for a miserable weather day.'",
        "tags": ["indoor", "movies", "entertainment"],
        "psychographic_tags": ["#Cozy", "#Quiet"],
        "vibe_taxonomy": ["Relaxed", "Casual"]
    },
    {
        "id": 15, "name": "Rose Picking at Chart Farm", "category": "Nature", "location_name": "Wynberg", "area": "Southern Suburbs",
        "latitude": -34.004, "longitude": 18.452, "cost_estimate": 100, "duration_minutes": 90,
        "car_required": True, "indoor": False, "introvert_score": 4, "extrovert_score": 2,
        "romance_score": 5, "conversation_score": 4, "first_date_suitability": 9,
        "anniversary_suitability": 7, "scenic_score": 8, "weather_dependency": "needs_clear_sky",
        "description": "Pick your own roses (R10/stem). Google Maps review: 'Such a wholesome date! Getting to choose flowers together makes for incredible memories and photos.'",
        "tags": ["nature", "outdoor", "flowers", "romantic"],
        "psychographic_tags": ["#Outdoors", "#Cozy", "#ConversationFriendly", "#Instagrammable"],
        "vibe_taxonomy": ["Romantic", "Rustic"]
    },
    {
        "id": 16, "name": "Arderne Gardens", "category": "Nature", "location_name": "Claremont", "area": "Southern Suburbs",
        "latitude": -33.985, "longitude": 18.463, "cost_estimate": 0, "duration_minutes": 60,
        "car_required": False, "indoor": False, "introvert_score": 4, "extrovert_score": 1,
        "romance_score": 4, "conversation_score": 4, "first_date_suitability": 8,
        "anniversary_suitability": 6, "scenic_score": 8, "weather_dependency": "needs_clear_sky",
        "description": "Historic park with giant trees and Japanese ponds. Google Maps review: 'A hidden gem in Claremont. Feeding the koi fish and walking under the huge Moreton Bay Figs is very peaceful.'",
        "tags": ["nature", "walk", "free"],
        "psychographic_tags": ["#Quiet", "#Outdoors", "#ConversationFriendly", "#Scenic"],
        "vibe_taxonomy": ["Relaxed", "Scenic"]
    },
    {
        "id": 17, "name": "Green Point Park", "category": "Nature", "location_name": "Green Point", "area": "Atlantic Seaboard",
        "latitude": -33.904, "longitude": 18.406, "cost_estimate": 0, "duration_minutes": 90,
        "car_required": False, "indoor": False, "introvert_score": 2, "extrovert_score": 4,
        "romance_score": 3, "conversation_score": 4, "first_date_suitability": 9,
        "anniversary_suitability": 5, "scenic_score": 7, "weather_dependency": "needs_clear_sky",
        "description": "Huge urban park with biodiversity gardens. Google Maps review: 'Great place to grab an ice cream and just walk and talk! Super well maintained and safe.'",
        "tags": ["park", "walk", "outdoor", "free"],
        "psychographic_tags": ["#Outdoors", "#Movement", "#ConversationFriendly", "#PublicSafe"],
        "vibe_taxonomy": ["Playful", "Casual"]
    },
    {
        "id": 18, "name": "Clay Cafe", "category": "Fun", "location_name": "Hout Bay", "area": "Deep South",
        "latitude": -34.020, "longitude": 18.358, "cost_estimate": 250, "duration_minutes": 150,
        "car_required": True, "indoor": True, "introvert_score": 4, "extrovert_score": 2,
        "romance_score": 3, "conversation_score": 5, "first_date_suitability": 9,
        "anniversary_suitability": 6, "scenic_score": 5, "weather_dependency": "indoor_safe",
        "description": "Paint your own ceramics while eating. Google Maps review: 'Takes the pressure off making constant eye contact because you're painting! So much fun and the food was great.'",
        "tags": ["indoor", "art", "creative", "food"],
        "psychographic_tags": ["#Cozy", "#Playful", "#ConversationFriendly", "#Trendy"],
        "vibe_taxonomy": ["Playful", "Trendy"]
    }
]

AREAS_COORDINATES = {
    "V&A Waterfront": (-33.902, 18.421),
    "City Bowl": (-33.929, 18.424),
    "Atlantic Seaboard": (-33.942, 18.375),
    "Southern Suburbs": (-33.988, 18.432),
    "Deep South": (-34.198, 18.450),
    "Northern Suburbs": (-33.893, 18.513),
    "Silo District": (-33.908, 18.422)
}
