// Colorado reservoir data with elevations
// Elevations are in feet above sea level

export interface Reservoir {
  name: string;
  elevation: number; // feet
  capacity?: string; // acre-feet
  description?: string;
}

export interface ReservoirZone {
  zipCodes: string[];
  reservoirs: Reservoir[];
  zoneName: string;
}

// Major Colorado reservoirs serving the Denver metro area
export const reservoirs: Reservoir[] = [
  { name: "Chatfield Reservoir", elevation: 5432, capacity: "27,428 acre-feet", description: "South Platte River" },
  { name: "Cherry Creek Reservoir", elevation: 5555, capacity: "14,300 acre-feet", description: "Cherry Creek" },
  { name: "Aurora Reservoir", elevation: 5670, capacity: "5,270 acre-feet", description: "City of Aurora" },
  { name: "Bear Creek Lake", elevation: 5596, capacity: "2,700 acre-feet", description: "Bear Creek" },
  { name: "Strontia Springs Reservoir", elevation: 6117, capacity: "7,863 acre-feet", description: "South Platte River" },
  { name: "Cheesman Reservoir", elevation: 6840, capacity: "79,064 acre-feet", description: "South Platte River" },
  { name: "Eleven Mile Reservoir", elevation: 8595, capacity: "97,779 acre-feet", description: "South Platte River" },
  { name: "Spinney Mountain Reservoir", elevation: 8690, capacity: "53,900 acre-feet", description: "South Platte River" },
  { name: "Dillon Reservoir", elevation: 9017, capacity: "257,304 acre-feet", description: "Blue River" },
  { name: "Gross Reservoir", elevation: 7280, capacity: "41,811 acre-feet", description: "South Boulder Creek" },
  { name: "Antero Reservoir", elevation: 9000, capacity: "19,800 acre-feet", description: "South Platte headwaters" },
  { name: "Marston Reservoir", elevation: 5650, capacity: "19,600 acre-feet", description: "Denver Water" },
  { name: "Ralston Reservoir", elevation: 5950, capacity: "10,900 acre-feet", description: "Denver Water" },
];

// Zip code zones mapped to nearby reservoirs
// Douglas County and surrounding areas
export const reservoirZones: ReservoirZone[] = [
  {
    zoneName: "Castle Rock / Central Douglas County",
    zipCodes: ["80104", "80108", "80109"],
    reservoirs: [
      { name: "Chatfield Reservoir", elevation: 5432 },
      { name: "Cherry Creek Reservoir", elevation: 5555 },
      { name: "Cheesman Reservoir", elevation: 6840 },
    ]
  },
  {
    zoneName: "Parker / East Douglas County",
    zipCodes: ["80134", "80138"],
    reservoirs: [
      { name: "Cherry Creek Reservoir", elevation: 5555 },
      { name: "Aurora Reservoir", elevation: 5670 },
      { name: "Chatfield Reservoir", elevation: 5432 },
    ]
  },
  {
    zoneName: "Highlands Ranch / Littleton",
    zipCodes: ["80124", "80125", "80126", "80129", "80120", "80121", "80122", "80123", "80127", "80128"],
    reservoirs: [
      { name: "Chatfield Reservoir", elevation: 5432 },
      { name: "Marston Reservoir", elevation: 5650 },
      { name: "Bear Creek Lake", elevation: 5596 },
    ]
  },
  {
    zoneName: "Lone Tree / Centennial",
    zipCodes: ["80124", "80111", "80112", "80015", "80016"],
    reservoirs: [
      { name: "Cherry Creek Reservoir", elevation: 5555 },
      { name: "Chatfield Reservoir", elevation: 5432 },
      { name: "Aurora Reservoir", elevation: 5670 },
    ]
  },
  {
    zoneName: "Larkspur / Monument",
    zipCodes: ["80118", "80132", "80133"],
    reservoirs: [
      { name: "Cheesman Reservoir", elevation: 6840 },
      { name: "Strontia Springs Reservoir", elevation: 6117 },
      { name: "Eleven Mile Reservoir", elevation: 8595 },
    ]
  },
  {
    zoneName: "Aurora",
    zipCodes: ["80010", "80011", "80012", "80013", "80014", "80015", "80016", "80017", "80018", "80019"],
    reservoirs: [
      { name: "Aurora Reservoir", elevation: 5670 },
      { name: "Cherry Creek Reservoir", elevation: 5555 },
      { name: "Spinney Mountain Reservoir", elevation: 8690 },
    ]
  },
  {
    zoneName: "Denver Metro",
    zipCodes: ["80202", "80203", "80204", "80205", "80206", "80207", "80209", "80210", "80211", "80212", "80218", "80219", "80220", "80221", "80222", "80223", "80224", "80226", "80227", "80228", "80229", "80230", "80231", "80232", "80233", "80234", "80235", "80236", "80237", "80238", "80239", "80246", "80247", "80249"],
    reservoirs: [
      { name: "Marston Reservoir", elevation: 5650 },
      { name: "Chatfield Reservoir", elevation: 5432 },
      { name: "Gross Reservoir", elevation: 7280 },
    ]
  },
  {
    zoneName: "Evergreen / Conifer",
    zipCodes: ["80439", "80433", "80465", "80470"],
    reservoirs: [
      { name: "Strontia Springs Reservoir", elevation: 6117 },
      { name: "Cheesman Reservoir", elevation: 6840 },
      { name: "Gross Reservoir", elevation: 7280 },
    ]
  },
  {
    zoneName: "Boulder Area",
    zipCodes: ["80301", "80302", "80303", "80304", "80305", "80310", "80314"],
    reservoirs: [
      { name: "Gross Reservoir", elevation: 7280 },
      { name: "Ralston Reservoir", elevation: 5950 },
      { name: "Dillon Reservoir", elevation: 9017 },
    ]
  },
];

// Default reservoirs for any zip code not in our mapping
export const defaultReservoirs: Reservoir[] = [
  { name: "Chatfield Reservoir", elevation: 5432 },
  { name: "Cherry Creek Reservoir", elevation: 5555 },
  { name: "Cheesman Reservoir", elevation: 6840 },
];

/**
 * Get reservoirs for a given zip code
 */
export function getReservoirsForZipCode(zipCode: string): { zoneName: string; reservoirs: Reservoir[] } {
  // Extract just the 5-digit zip code
  const zip = zipCode.substring(0, 5);

  for (const zone of reservoirZones) {
    if (zone.zipCodes.includes(zip)) {
      return {
        zoneName: zone.zoneName,
        reservoirs: zone.reservoirs
      };
    }
  }

  // Return default if zip code not found
  return {
    zoneName: "Colorado Front Range",
    reservoirs: defaultReservoirs
  };
}

/**
 * Compare home elevation to reservoir elevations
 */
export function compareElevations(homeElevation: number, reservoirs: Reservoir[]): {
  reservoir: Reservoir;
  difference: number;
  status: 'above' | 'below' | 'same';
}[] {
  return reservoirs.map(reservoir => {
    const difference = homeElevation - reservoir.elevation;
    let status: 'above' | 'below' | 'same' = 'same';
    if (difference > 50) status = 'above';
    else if (difference < -50) status = 'below';

    return {
      reservoir,
      difference,
      status
    };
  });
}
