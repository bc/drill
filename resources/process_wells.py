#!/usr/bin/env python3
"""
Process well data for Douglas County, Colorado
Merges wells.csv with DWR_Well_Geophysical_Log.csv and finds nearest neighbors
"""

import csv
import json
import math
from typing import List, Dict, Tuple

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two points in miles using Haversine formula"""
    R = 3959  # Earth's radius in miles

    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)

    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.asin(math.sqrt(a))

    return R * c

def load_and_merge_wells() -> List[Dict]:
    """Load and merge the two CSV files"""
    print("Loading wells.csv...")
    with open('wells.csv', 'r') as f:
        reader = csv.DictReader(f)
        coords = list(reader)

    print(f"Loaded {len(coords)} coordinate records")

    print("Loading DWR_Well_Geophysical_Log.csv...")
    with open('DWR_Well_Geophysical_Log.csv', 'r') as f:
        reader = csv.DictReader(f)
        details = list(reader)

    print(f"Loaded {len(details)} detail records")

    # Merge by row index
    merged = []
    for i, (coord, detail) in enumerate(zip(coords, details)):
        try:
            lat = float(coord['lat'])
            lon = float(coord['lon'])

            # Filter to Douglas County only
            if detail.get('County', '').upper() == 'DOUGLAS':
                well = {
                    'id': i,
                    'lat': lat,
                    'lon': lon,
                    'name': detail.get('Well Name', 'Unknown'),
                    'depth': detail.get('Well Depth', 'Unknown'),
                    'aquifer': detail.get('Aquifer Picks', 'Unknown'),
                    'elevation': detail.get('Elevation', 'Unknown'),
                    'top_casing': detail.get('Top Perforated Casing', ''),
                    'bottom_casing': detail.get('Bottom Perforated Casing', ''),
                    'county': detail.get('County', ''),
                    'log_date': detail.get('Log Date', ''),
                    'log_type': detail.get('Log Type', ''),
                    'location_accuracy': detail.get('Location Accuracy', ''),
                    'more_info': detail.get('More Information', '')
                }
                merged.append(well)
        except (ValueError, KeyError) as e:
            continue

    print(f"Found {len(merged)} wells in Douglas County")
    return merged

def find_nearest_wells(target_lat: float, target_lon: float, wells: List[Dict], n: int = 10) -> List[Dict]:
    """Find n nearest wells to target coordinates"""
    # Calculate distances
    wells_with_distance = []
    for well in wells:
        distance = haversine_distance(target_lat, target_lon, well['lat'], well['lon'])
        well_copy = well.copy()
        well_copy['distance_miles'] = round(distance, 2)
        wells_with_distance.append(well_copy)

    # Sort by distance and return top n
    wells_with_distance.sort(key=lambda x: x['distance_miles'])
    return wells_with_distance[:n]

def main():
    # Load and merge data
    all_wells = load_and_merge_wells()

    # Save merged Douglas County wells
    output_file = 'douglas_county_wells.json'
    print(f"\nSaving merged data to {output_file}...")
    with open(output_file, 'w') as f:
        json.dump(all_wells, f, indent=2)

    print(f"✓ Saved {len(all_wells)} Douglas County wells")

    # Example: Find wells near Castle Rock (39.3722, -104.8561)
    example_lat = 39.3722
    example_lon = -104.8561

    print(f"\nExample: Finding 10 nearest wells to Castle Rock ({example_lat}, {example_lon})...")
    nearest = find_nearest_wells(example_lat, example_lon, all_wells, 10)

    print("\nNearest wells:")
    for i, well in enumerate(nearest, 1):
        print(f"{i}. {well['name']}")
        print(f"   Distance: {well['distance_miles']} miles")
        print(f"   Depth: {well['depth']} ft")
        print(f"   Aquifer: {well['aquifer']}")
        print(f"   Location: ({well['lat']}, {well['lon']})")
        print()

    # Save example
    with open('example_nearest_wells.json', 'w') as f:
        json.dump({
            'target': {'lat': example_lat, 'lon': example_lon, 'name': 'Castle Rock'},
            'nearest_wells': nearest
        }, f, indent=2)

    print("✓ Saved example to example_nearest_wells.json")

if __name__ == '__main__':
    main()
