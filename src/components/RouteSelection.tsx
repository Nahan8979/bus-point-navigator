
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, MapPin } from 'lucide-react';
import { routes } from '@/data/routes';
import { translations } from '@/data/translations';
import { Bus, Route } from '@/types/busTypes';

interface RouteSelectionProps {
  language: 'en' | 'hi' | 'ml';
  currentLocation: string;
  onFindBuses: (routeId: string, from: string, to: string) => void;
}

const RouteSelection: React.FC<RouteSelectionProps> = ({ 
  language, 
  currentLocation, 
  onFindBuses 
}) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedFrom, setSelectedFrom] = useState<string>(currentLocation);
  const [selectedTo, setSelectedTo] = useState<string>('');
  
  const t = translations[language];

  useEffect(() => {
    setSelectedFrom(currentLocation);
  }, [currentLocation]);

  const getFilteredStops = (route: Route, from: string) => {
    if (!from || from === currentLocation) return route.stops;
    
    const fromIndex = route.stops.findIndex(stop => 
      stop.toLowerCase().includes(from.toLowerCase())
    );
    
    if (fromIndex === -1) return route.stops;
    
    return route.stops.slice(fromIndex + 1);
  };

  const handleFindBuses = () => {
    if (selectedRoute && selectedFrom && selectedTo) {
      onFindBuses(selectedRoute.id, selectedFrom, selectedTo);
    }
  };

  const isFormValid = selectedRoute && selectedFrom && selectedTo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-4 sm:p-6 lg:p-8 font-fredoka animate-gradient-x">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto pt-4 sm:pt-8">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">{t.busPoint}</h2>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl animate-slide-in">
          <div className="relative">
            {/* Circle Design - Responsive sizing */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] mx-auto relative border-4 border-blue-300 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center space-y-6 sm:space-y-8">
              
              {/* Route Selection */}
              <div className="w-full px-8 sm:px-10 lg:px-12">
                <div className="flex items-center justify-end mb-2">
                  {selectedRoute && <Check size={16} className="text-green-500 mr-4" />}
                </div>
                <Select onValueChange={(value) => {
                  const route = routes.find(r => r.id === value);
                  setSelectedRoute(route || null);
                  setSelectedTo('');
                }}>
                  <SelectTrigger className="bg-white border-2 border-blue-200 rounded-xl h-10 sm:h-12 lg:h-14 text-sm sm:text-base">
                    <SelectValue placeholder={t.selectRoute} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id} className="text-sm sm:text-base py-2 sm:py-3">
                        {route.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* From Selection */}
              <div className="w-full px-8 sm:px-10 lg:px-12">
                <div className="flex items-center justify-end mb-2">
                  {selectedFrom && <Check size={16} className="text-green-500 mr-4" />}
                </div>
                <Select value={selectedFrom} onValueChange={setSelectedFrom}>
                  <SelectTrigger className="bg-white border-2 border-blue-200 rounded-xl h-10 sm:h-12 lg:h-14 text-sm sm:text-base">
                    <SelectValue placeholder={t.selectFrom} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 max-h-48 sm:max-h-60">
                    <SelectItem value={currentLocation} className="text-sm sm:text-base py-2 sm:py-3">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 sm:w-4 sm:h-4" />
                        {t.currentLocation}
                      </div>
                    </SelectItem>
                    {selectedRoute?.stops.map((stop) => (
                      <SelectItem key={stop} value={stop} className="text-sm sm:text-base py-2 sm:py-3">
                        {stop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* To Selection */}
              <div className="w-full px-8 sm:px-10 lg:px-12">
                <div className="flex items-center justify-end mb-2">
                  {selectedTo && <Check size={16} className="text-green-500 mr-4" />}
                </div>
                <Select value={selectedTo} onValueChange={setSelectedTo}>
                  <SelectTrigger className="bg-white border-2 border-blue-200 rounded-xl h-10 sm:h-12 lg:h-14 text-sm sm:text-base">
                    <SelectValue placeholder={t.selectTo} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 max-h-48 sm:max-h-60">
                    {selectedRoute && getFilteredStops(selectedRoute, selectedFrom).map((stop) => (
                      <SelectItem key={stop} value={stop} className="text-sm sm:text-base py-2 sm:py-3">
                        {stop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Find Buses Button - Responsive positioning */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 sm:translate-y-6">
              <Button
                onClick={handleFindBuses}
                disabled={!isFormValid}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.findBuses}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RouteSelection;
