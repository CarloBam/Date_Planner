export type PersonalityProfile = {
  descriptionText?: string;
  energyType: 'introverted' | 'extroverted' | 'balanced';
  vibePreference: 'nature' | 'culture' | 'fun' | 'romantic';
  settingPreference: 'mountain' | 'beach' | 'city';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'full-day';
  hasCar: boolean;
};

export type DateActivity = {
  id: number;
  name: string;
  category: string;
  location_name: string;
  area: string;
  latitude: number;
  longitude: number;
  cost_estimate: number;
  duration_minutes: number;
  car_required: boolean;
  indoor: boolean;
  introvert_score: number;
  extrovert_score: number;
  romance_score: number;
  conversation_score: number;
  first_date_suitability: number;
  anniversary_suitability: number;
  scenic_score: number;
  weather_dependency: string;
  tags: string[];
  psychographic_tags: string[];
  vibe_taxonomy: string[];
};

/**
 * Extracts psychographic tags from natural language "Describe Her" descriptions.
 */
function extractTagsFromDescription(desc: string): string[] {
  if (!desc) return [];
  const tags: string[] = [];
  const lowerDesc = desc.toLowerCase();

  // Keyword rules -> Psychographic Tags
  if (/(aesthetic|photos|cute|pretty|instagram)/i.test(lowerDesc)) {
    tags.push('#Instagrammable', '#Aesthetic', '#VisualFocus');
  }
  if (/(quiet|bookworm|reading|calm|shy|introvert)/i.test(lowerDesc)) {
    tags.push('#Cozy', '#LowVolume', '#Quiet', '#ConversationFriendly');
  }
  if (/(adventurous|active|outdoors|sporty|energetic)/i.test(lowerDesc)) {
    tags.push('#Outdoors', '#HighEnergy', '#Adventure', '#Movement');
  }
  if (/(foodie|trendy|stylish|new|brunch)/i.test(lowerDesc)) {
    tags.push('#Culinary', '#Trendy', '#NewOpening', '#BrunchFriendly');
  }
  return tags;
}

/**
 * Recommends activities based on Persona Engine inputs
 */
export function getRecommendedActivities(
  activities: DateActivity[],
  profile: PersonalityProfile,
  dateStage: string, // e.g. 'first_date', 'anniversary'
  maxRadiusKm: number,
  startLocation: { lat: number; lng: number } | null,
  weatherForecast: 'sunny' | 'rainy' | 'windy' | 'clear' = 'sunny'
) {
  // 1. Keyword extraction from unstructured text
  const extractedTags = extractTagsFromDescription(profile.descriptionText || '');

  return activities
    .filter((activity) => {
      // Hard logistics filters
      if (!profile.hasCar && activity.car_required) return false;

      // Weather Shield Module
      if (weatherForecast === 'rainy' && !activity.indoor) return false;
      if (weatherForecast === 'windy' && activity.weather_dependency === 'needs_no_wind') return false;

      return true;
    })
    .map((activity) => {
      let score = 0;

      // Energy matching
      if (profile.energyType === 'introverted') score += activity.introvert_score * 2;
      else if (profile.energyType === 'extroverted') score += activity.extrovert_score * 2;
      else score += (activity.introvert_score + activity.extrovert_score);

      // Vibe & Category matching
      if (profile.vibePreference === 'nature' && activity.tags.includes('nature')) score += 5;
      if (profile.vibePreference === 'romantic' && activity.tags.includes('romantic')) score += 5;

      // Psychographic matching from NLP extraction
      extractedTags.forEach(tag => {
        if (activity.psychographic_tags.includes(tag)) {
          score += 10; // High confidence match based on specific user keyword description
        }
      });

      // Date Progression Stages Context Logic
      if (dateStage === 'first_date') {
        score += activity.first_date_suitability * 2;
        if (activity.psychographic_tags.includes('#ConversationFriendly')) score += 5;
        if (activity.psychographic_tags.includes('#PublicSafe')) score += 5;
      } else if (dateStage === 'anniversary' || dateStage === 'special_occasion') {
        score += activity.anniversary_suitability * 3;
        score += activity.scenic_score;
        if (activity.vibe_taxonomy.includes('Luxurious')) score += 5;
      }

      return { ...activity, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
