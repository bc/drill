import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';
import { Input } from './ui/input';

// Use environment variable for API key, with fallback for development
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export interface AddressDetails {
  formattedAddress: string;
  lat: number;
  lng: number;
  zipCode: string;
  city: string;
  state: string;
  streetAddress: string;
}

interface GoogleAddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectAddress?: (details: AddressDetails) => void;
  placeholder?: string;
  className?: string;
}

// Track if the Google Maps script is loading or loaded
let isScriptLoading = false;
let isScriptLoaded = false;

function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded) {
      resolve();
      return;
    }

    if (isScriptLoading) {
      // Wait for the existing script to load
      const checkLoaded = setInterval(() => {
        if (isScriptLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }

    isScriptLoading = true;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      resolve();
    };

    script.onerror = () => {
      isScriptLoading = false;
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });
}

export function GoogleAddressAutocomplete({
  value,
  onChange,
  onSelectAddress,
  placeholder = "Start typing your address...",
  className = "",
}: GoogleAddressAutocompleteProps) {
  const [isApiReady, setIsApiReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load Google Maps script on mount
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setIsApiReady(true))
      .catch((error) => console.error('Google Maps API failed to load:', error));
  }, []);

  // Initialize autocomplete once API is ready
  useEffect(() => {
    if (!isApiReady || !inputRef.current || autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      fields: ['formatted_address', 'geometry', 'address_components'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.formatted_address) {
        return;
      }

      // Extract address components
      let zipCode = '';
      let city = '';
      let state = '';
      let streetNumber = '';
      let streetName = '';

      place.address_components?.forEach((component) => {
        const types = component.types;
        if (types.includes('postal_code')) {
          zipCode = component.long_name;
        }
        if (types.includes('locality')) {
          city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          state = component.short_name;
        }
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        }
        if (types.includes('route')) {
          streetName = component.long_name;
        }
      });

      const details: AddressDetails = {
        formattedAddress: place.formatted_address,
        lat: place.geometry.location?.lat() || 0,
        lng: place.geometry.location?.lng() || 0,
        zipCode,
        city,
        state,
        streetAddress: `${streetNumber} ${streetName}`.trim(),
      };

      onChange(place.formatted_address);
      onSelectAddress?.(details);
    });

    autocompleteRef.current = autocomplete;

    return () => {
      // Cleanup
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isApiReady, onChange, onSelectAddress]);

  const handleClear = useCallback(() => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          onChange={handleInputChange}
          className={`text-base pl-10 pr-10 ${className}`}
          disabled={!isApiReady}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
          {!isApiReady ? (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          ) : value ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
