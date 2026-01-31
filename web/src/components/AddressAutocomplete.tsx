import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';
import { Input } from './ui/input';

export interface AddressDetails {
  formattedAddress: string;
  lat: number;
  lng: number;
  zipCode: string;
  city: string;
  state: string;
  streetAddress: string;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    county?: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectAddress?: (details: AddressDetails) => void;
  placeholder?: string;
  className?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelectAddress,
  placeholder = "Start typing your address...",
  className = "",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounced search
  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              q: value,
              format: 'json',
              addressdetails: '1',
              limit: '5',
              countrycodes: 'us',
            }),
          {
            signal: abortControllerRef.current.signal,
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Search failed');

        const results: NominatimResult[] = await response.json();
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Address search error:', error);
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [value]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((result: NominatimResult) => {
    const address = result.address || {};

    const details: AddressDetails = {
      formattedAddress: result.display_name,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      zipCode: address.postcode || '',
      city: address.city || address.town || address.village || '',
      state: address.state || '',
      streetAddress: [address.house_number, address.road].filter(Boolean).join(' '),
    };

    onChange(result.display_name);
    onSelectAddress?.(details);
    setShowDropdown(false);
    setSuggestions([]);
  }, [onChange, onSelectAddress]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  }, [showDropdown, suggestions, selectedIndex, handleSelect]);

  const handleClear = useCallback(() => {
    onChange('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          className={`text-base pl-10 pr-10 ${className}`}
          autoComplete="off"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls="address-suggestions"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          ) : value ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Clear address"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          id="address-suggestions"
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((result, index) => (
            <button
              key={result.place_id}
              type="button"
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-900 line-clamp-2">{result.display_name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
