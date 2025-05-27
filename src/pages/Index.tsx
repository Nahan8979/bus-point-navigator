
import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import RouteSelection from '@/components/RouteSelection';
import BusListings from '@/components/BusListings';
import BusTracker from '@/components/BusTracker';
import { useLocation } from '@/hooks/useLocation';
import { generateMockBuses } from '@/data/mockBuses';
import { Bus } from '@/types/busTypes';

type Screen = 'welcome' | 'route' | 'buses' | 'tracker';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedLanguage] = useState<'en' | 'hi' | 'ml'>('en'); // Fixed to English
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [routeData, setRouteData] = useState({ route: '', from: '', to: '' });
  const [buses, setBuses] = useState<Bus[]>([]);
  
  const { coordinates, loading, requestLocation } = useLocation();

  const handleLocationRequest = () => {
    requestLocation();
  };

  // Move to route selection once location is obtained
  React.useEffect(() => {
    if (coordinates) {
      setCurrentScreen('route');
    }
  }, [coordinates]);

  const handleFindBuses = (routeId: string, from: string, to: string) => {
    const mockBuses = generateMockBuses(routeId, from, to);
    setBuses(mockBuses);
    setRouteData({ route: routeId, from, to });
    setCurrentScreen('buses');
  };

  const handleTrackBus = (bus: Bus) => {
    setSelectedBus(bus);
    setCurrentScreen('tracker');
  };

  const handleBack = () => {
    if (currentScreen === 'buses') {
      setCurrentScreen('route');
    } else if (currentScreen === 'tracker') {
      setCurrentScreen('buses');
    }
  };

  const getCurrentLocation = () => {
    return coordinates ? 'Current Location' : 'Unknown Location';
  };

  switch (currentScreen) {
    case 'welcome':
      return (
        <WelcomeScreen
          language={selectedLanguage}
          onLocationRequest={handleLocationRequest}
          locationLoading={loading}
        />
      );
    
    case 'route':
      return (
        <RouteSelection
          language={selectedLanguage}
          currentLocation={getCurrentLocation()}
          onFindBuses={handleFindBuses}
        />
      );
    
    case 'buses':
      return (
        <BusListings
          language={selectedLanguage}
          buses={buses}
          onTrackBus={handleTrackBus}
          onBack={handleBack}
        />
      );
    
    case 'tracker':
      return selectedBus ? (
        <BusTracker
          language={selectedLanguage}
          bus={selectedBus}
          route={routeData.route}
          from={routeData.from}
          to={routeData.to}
          onBack={handleBack}
        />
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
