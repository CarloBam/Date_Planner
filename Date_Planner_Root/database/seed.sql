-- Seed for Cape Town with psychographics, taxonomy, and safety ratings
INSERT INTO public.activities (
    name, category, location_name, area, latitude, longitude, cost_estimate, duration_minutes,
    car_required, indoor, introvert_score, extrovert_score, romance_score, conversation_score,
    first_date_suitability, anniversary_suitability, scenic_score, weather_dependency,
    description, deal_info, tags, psychographic_tags, vibe_taxonomy
) VALUES 
('Two Oceans Aquarium', 'Fun', 'V&A Waterfront', 'Atlantic Seaboard', -33.902, 18.421, 220, 90, false, true, 3, 2, 2, 3, 9, 3, 7, 'indoor_safe', 'A relaxing walk through marine exhibits, great for easy conversation.', 'Book online for R20 off', ARRAY['indoor', 'easy', 'fun', 'waterfront'], ARRAY['#ConversationFriendly', '#PublicSafe', '#Cozy', '#VisualFocus'], ARRAY['Playful', 'Scenic']),

('Harbour Sunset Cruise', 'Romantic', 'V&A Waterfront', 'Atlantic Seaboard', -33.902, 18.421, 280, 75, false, false, 2, 2, 4, 3, 6, 9, 10, 'needs_clear_sky', 'Enjoy the stunning sunset over the ocean with drinks on board.', NULL, ARRAY['romantic', 'sunset', 'scenic', 'waterfront'], ARRAY['#Instagrammable', '#Scenic', '#Luxury', '#Aesthetic'], ARRAY['Luxurious', 'Romantic']),

('Lion''s Head Hike', 'Adventure', 'Signal Hill', 'City Bowl', -33.921, 18.400, 0, 180, false, false, 2, 3, 2, 3, 5, 2, 10, 'needs_no_wind', 'Iconic hike with rewarding 360-degree views of Cape Town.', NULL, ARRAY['nature', 'outdoor', 'active', 'free'], ARRAY['#Outdoors', '#HighEnergy', '#Adventure', '#Movement'], ARRAY['Rustic', 'Active']),

('Kirstenbosch Gardens', 'Nature', 'Southern Suburbs', 'Southern Suburbs', -33.988, 18.432, 220, 150, true, false, 3, 1, 4, 4, 8, 8, 10, 'needs_clear_sky', 'Beautiful botanical gardens, perfect for a picnic and a peaceful stroll.', NULL, ARRAY['nature', 'picnic', 'relaxed'], ARRAY['#Cozy', '#Quiet', '#Outdoors', '#ConversationFriendly'], ARRAY['Scenic', 'Minimalist']),

('Clifton 4th Beach', 'Relaxing', 'Clifton', 'Atlantic Seaboard', -33.942, 18.375, 0, 150, false, false, 2, 3, 3, 3, 7, 5, 9, 'needs_no_wind', 'Chill on the white sands of Clifton, great for sunsets and swimming.', NULL, ARRAY['beach', 'free', 'scenic'], ARRAY['#Outdoors', '#Scenic', '#Instagrammable'], ARRAY['Relaxed', 'Scenic']),

('Truth Coffee Roasting', 'Coffee', 'Buitenkant St', 'City Bowl', -33.929, 18.424, 120, 75, false, true, 3, 2, 2, 4, 9, 3, 5, 'indoor_safe', 'Steampunk-themed coffee shop named one of the best in the world.', NULL, ARRAY['coffee', 'indoor', 'food'], ARRAY['#Culinary', '#Trendy', '#Aesthetic', '#LowVolume'], ARRAY['Trendy', 'Cozy']),

('Cave Golf', 'Fun', 'Canal Walk', 'Northern Suburbs', -33.893, 18.513, 130, 90, false, true, 2, 3, 2, 3, 8, 2, 3, 'indoor_safe', 'Indoor putt-putt great for a playful, low-stakes date.', NULL, ARRAY['fun', 'indoor', 'active', 'winter-friendly'], ARRAY['#PublicSafe', '#Movement'], ARRAY['Playful']),

('Rooftop Bar at The Silo', 'Luxury', 'V&A Waterfront', 'Atlantic Seaboard', -33.902, 18.421, 350, 120, false, false, 1, 4, 4, 3, 4, 9, 10, 'needs_clear_sky', 'High-end drinks with a breathtaking view of the harbour and mountain.', NULL, ARRAY['drinks', 'luxury', 'view'], ARRAY['#Instagrammable', '#Luxury', '#Aesthetic', '#HighEnergy'], ARRAY['Luxurious', 'Sophisticated']),

('Oranjezicht City Farm Market', 'Food', 'Granger Bay', 'Atlantic Seaboard', -33.902, 18.414, 250, 90, false, false, 1, 4, 2, 3, 8, 4, 6, 'needs_clear_sky', 'Famous weekend market with amazing food, fresh produce, and buzz.', NULL, ARRAY['food', 'market', 'outdoor', 'weekend'], ARRAY['#Culinary', '#Trending', '#Outdoors', '#Social'], ARRAY['Trendy', 'Rustic', 'Social']),

('Boulders Beach Penguins', 'Nature', 'Simon''s Town', 'Deep South', -34.198, 18.450, 215, 90, true, false, 3, 2, 4, 3, 8, 6, 8, 'needs_clear_sky', 'Walk along the boardwalks and admire the African penguin colony.', 'Wild Card holders enter free', ARRAY['nature', 'animals', 'scenic'], ARRAY['#Outdoors', '#ConversationFriendly', '#Scenic', '#Instagrammable'], ARRAY['Scenic', 'Relaxed']);
