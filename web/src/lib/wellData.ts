export interface Well {
  id: number;
  lat: number;
  lon: number;
  name: string;
  depth: string;
  aquifer: string;
  elevation: string;
  top_casing: string;
  bottom_casing: string;
  county: string;
  log_date: string;
  log_type: string;
  location_accuracy: string;
  more_info: string;
  distance_miles?: number;
}

export interface WellReport {
  targetLocation: {
    lat: number;
    lon: number;
    address: string;
    altitude?: number;
  };
  nearestWells: Well[];
  aquifers: string[];
  avgDepth: number;
  depthRange: { min: number; max: number };
  estimatedCost: { low: number; high: number };
}

/**
 * Calculate Haversine distance between two points in miles
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Find n nearest wells to a target location
 */
export function findNearestWells(
  targetLat: number,
  targetLon: number,
  allWells: Well[],
  n: number = 10
): Well[] {
  // Calculate distances
  const wellsWithDistance = allWells.map((well) => ({
    ...well,
    distance_miles: Number(
      haversineDistance(targetLat, targetLon, well.lat, well.lon).toFixed(2)
    ),
  }));

  // Sort by distance and return top n
  wellsWithDistance.sort((a, b) => a.distance_miles! - b.distance_miles!);
  return wellsWithDistance.slice(0, n);
}

/**
 * Load all Douglas County wells from JSON
 */
export async function loadWells(): Promise<Well[]> {
  const response = await fetch('/data/douglas_county_wells.json');
  if (!response.ok) {
    throw new Error('Failed to load well data');
  }
  return response.json();
}

/**
 * Parse depth string to number (handles "1000.00 ft" or "1000")
 */
function parseDepth(depthStr: string): number | null {
  if (!depthStr || depthStr.trim() === '') return null;
  const match = depthStr.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Generate a comprehensive well report
 */
export function generateWellReport(
  nearestWells: Well[],
  address: string,
  lat: number,
  lon: number,
  altitude?: number
): WellReport {
  // Extract unique aquifers
  const aquiferSet = new Set<string>();
  nearestWells.forEach((well) => {
    if (well.aquifer && well.aquifer !== 'Unknown') {
      well.aquifer.split(',').forEach((aq) => {
        const trimmed = aq.trim();
        if (trimmed) aquiferSet.add(trimmed);
      });
    }
  });

  // Calculate depth statistics
  const depths = nearestWells
    .map((w) => parseDepth(w.depth))
    .filter((d): d is number => d !== null);

  const avgDepth = depths.length > 0
    ? Math.round(depths.reduce((a, b) => a + b, 0) / depths.length)
    : 0;

  const depthRange = {
    min: depths.length > 0 ? Math.min(...depths) : 0,
    max: depths.length > 0 ? Math.max(...depths) : 0,
  };

  // Cost estimation ($15-$30 per foot typical range for Colorado)
  const estimatedCost = {
    low: Math.round(avgDepth * 15),
    high: Math.round(avgDepth * 30),
  };

  return {
    targetLocation: { lat, lon, address, altitude },
    nearestWells,
    aquifers: Array.from(aquiferSet).sort(),
    avgDepth,
    depthRange,
    estimatedCost,
  };
}

/**
 * Geocode an address to lat/lon using OpenStreetMap Nominatim API
 */
export async function geocodeAddress(address: string): Promise<{
  lat: number;
  lon: number;
  displayName: string;
} | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
        new URLSearchParams({
          q: address,
          format: 'json',
          limit: '1',
          countrycodes: 'us',
        })
    );

    const results = await response.json();
    if (results && results.length > 0) {
      return {
        lat: parseFloat(results[0].lat),
        lon: parseFloat(results[0].lon),
        displayName: results[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

/**
 * Get elevation/altitude for a given lat/lon using Open-Elevation API
 */
export async function getElevation(lat: number, lon: number): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch elevation data');
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      // Convert meters to feet
      const elevationMeters = data.results[0].elevation;
      const elevationFeet = Math.round(elevationMeters * 3.28084);
      return elevationFeet;
    }
    return null;
  } catch (error) {
    console.error('Elevation error:', error);
    return null;
  }
}

/**
 * Determine aquifer layer based on location (simplified - would use actual geological maps)
 */
export function determineAquiferLayer(_lat: number, _lon: number): string {
  // Simplified logic - in production, this would analyze the geological map images
  // Based on Douglas County data, common aquifers are:
  // Upper Dawson, Lower Dawson, Denver, Arapahoe, Laramie-Fox Hills

  // For now, return likely aquifers based on general Douglas County geology
  return 'Upper Dawson, Lower Dawson, Denver, Arapahoe';
}
