
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-4 font-fredoka animate-gradient-x">
      <div className="max-w-lg mx-auto pt-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">{t.busPoint}</h2>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-slide-in">
          <div className="relative">
            {/* Circle Design - Increased size */}
            <div className="w-96 h-96 mx-auto relative border-4 border-blue-300 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center space-y-8">
              
              {/* Route Selection */}
              <div className="w-full px-10">
                <div className="flex items-center justify-end mb-2">
                  {selectedRoute && <Check size={16} className="text-green-500 mr-4" />}
                </div>
                <Select onValueChange={(value) => {
                  const route = routes.find(r => r.id === value);
                  setSelectedRoute(route || null);
                  setSelectedTo('');
                }}>
                  <SelectTrigger className="bg-white border-2 border-blue-200 rounded-xl h-12 text-base">
                    <SelectValue placeholder={t.selectRoute} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id} className="text-base py-3">
                        {route.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* From Selection */}
              <div className="w-full px-10">
                <div className="flex items-center justify-end mb-2">
                  {selectedFrom && <Check size={16} className="text-green-500 mr-4" />}
                </div>
                <Select value={selectedFrom} onValueChange={setSelectedFrom}>
                  <SelectTrigger className="bg-white border-2 border-blue-200 rounded-xl h-12 text-base">
                    <SelectValue placeholder={t.selectFrom} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 max-h-60">
                    <SelectItem value={currentLocation} className="text-base py-3">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {t.currentLocation}
                      </div>
                    </SelectItem>
                    {selectedRoute?.stops.map((stop) => (
                      <SelectItem key={stop} value={stop} className="text-base py-3">
                        {stop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* To Selection */}
              <div className="w-full px-10">
                <div className="flex items-center justify-end mb-2">
                  {selectedTo && <Check size={16} className="text-green-500 mr-4" />}
                </div>
                <Select value={selectedTo} onValueChange={setSelectedTo}>
                  <SelectTrigger className="bg-white border-2 border-blue-200 rounded-xl h-12 text-base">
                    <SelectValue placeholder={t.selectTo} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 max-h-60">
                    {selectedRoute && getFilteredStops(selectedRoute, selectedFrom).map((stop) => (
                      <SelectItem key={stop} value={stop} className="text-base py-3">
                        {stop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Find Buses Button - Positioned at bottom of circle */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
              <Button
                onClick={handleFindBuses}
                disabled={!isFormValid}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
