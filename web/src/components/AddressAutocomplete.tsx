import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';
import { Input } from './ui/input';

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectAddress?: (suggestion: AddressSuggestion) => void;
  placeholder?: string;
  className?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelectAddress,
  placeholder = "Start typing an address...",
  className = "",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

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
              limit: '5',
              countrycodes: 'us',
              addressdetails: '1',
            }),
          { signal: abortControllerRef.current.signal }
        );

        const results = await response.json();
        setSuggestions(results || []);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error fetching address suggestions:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelectAddress) {
      onSelectAddress(suggestion);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleClear = () => {
    onChange('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className={`text-base pl-10 pr-10 ${className}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
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

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-900 break-words">
                  {suggestion.display_name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && value.length >= 3 && suggestions.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            No addresses found. Try a different search.
          </p>
        </div>
      )}
    </div>
  );
}
