
import { useState, useEffect } from 'react';

interface LocationState {
  coordinates: [number, number] | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    coordinates: null,
    error: null,
    loading: false
  });

  const requestLocation = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation({
        coordinates: null,
        error: 'Geolocation is not supported by this browser.',
        loading: false
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coordinates: [position.coords.longitude, position.coords.latitude],
          error: null,
          loading: false
        });
      },
      (error) => {
        setLocation({
          coordinates: null,
          error: error.message,
          loading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return { ...location, requestLocation };
};
