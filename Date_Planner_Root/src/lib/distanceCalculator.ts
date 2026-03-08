/**
 * Calculates straight line distance using Haversine formula (good for MVP fallback).
 * In production Phase 2, this must be swapped with Mapbox or Google Distance Matrix API.
 */
export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Number(d.toFixed(2));
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

/**
 * Advanced Petrol Calculator specific to Cape Town assumptions.
 * @param totalDistanceKm Distance driven between all planned stops.
 * @param fuelPricePerLitre User-configurable or default (e.g., R23.80)
 * @param fuelEfficiencyLPer100Km User-configurable or default (e.g., 8.0L/100km)
 * @returns Object tracking total cost, total litres used
 */
export function calculatePetrolCost(
    totalDistanceKm: number,
    fuelPricePerLitre = 23.80,
    fuelEfficiencyLPer100Km = 8.0
): { fuelCost: number; litresUsed: number; distanceDriven: number } {
    const totalLitres = (totalDistanceKm / 100) * fuelEfficiencyLPer100Km;
    const cost = totalLitres * fuelPricePerLitre;
    return {
        fuelCost: Math.ceil(cost),
        litresUsed: Number(totalLitres.toFixed(1)),
        distanceDriven: totalDistanceKm
    };
}

/**
 * Uber cost estimation bounds (Base fare + Rate per km). 
 */
export function calculateUberEstimate(distanceKm: number): { minCost: number, maxCost: number, isWalkable: boolean } {
    const baseRate = 20;
    const ratePerKm = 8.5;
    const total = baseRate + (distanceKm * ratePerKm);

    // Highlight nearby venues where users wouldn't need an Uber
    const isWalkable = distanceKm <= 1.5;

    // Return range (e.g., lower bound to upper bound taking traffic/surge into account)
    return {
        minCost: Math.ceil(total * 1),
        maxCost: Math.ceil(total * 1.5),
        isWalkable
    };
}
