
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Bus, MapPin } from 'lucide-react';
import { Bus as BusType } from '@/types/busTypes';
import { translations } from '@/data/translations';
import { routes } from '@/data/routes';

interface BusTrackerProps {
  language: 'en' | 'hi' | 'ml';
  bus: BusType;
  route: string;
  from: string;
  to: string;
  onBack: () => void;
}

const BusTracker: React.FC<BusTrackerProps> = ({ 
  language, 
  bus, 
  route,
  from,
  to,
  onBack 
}) => {
  const t = translations[language];
  
  const selectedRoute = routes.find(r => r.id === route);
  const fromIndex = selectedRoute?.stops.findIndex(stop => stop === from) || 0;
  const toIndex = selectedRoute?.stops.findIndex(stop => stop === to) || 0;
  const routeStops = selectedRoute?.stops.slice(fromIndex, toIndex + 1) || [];
  
  // Simulate bus position (you can enhance this with real tracking)
  const currentBusPosition = Math.floor(routeStops.length * 0.3); // Bus is 30% through the route

  return (
    <div className="min-h-screen bg-gray-900 text-white font-fredoka">
      {/* Header */}
      <div className="bg-gray-800 p-3 sm:p-4 flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-gray-700 p-2 rounded-xl"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </Button>
        
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">{t.whereIsMyBus}?</h2>
        
        <div className="w-8 sm:w-10" /> {/* Spacer */}
      </div>

      {/* Bus Info */}
      <div className="p-3 sm:p-4 lg:p-6">
        <Card className="bg-gray-800 border-gray-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bus size={24} className="text-blue-400 mr-3 sm:w-8 sm:h-8" />
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{bus.number}</h3>
                <p className="text-sm sm:text-base text-gray-400">{selectedRoute?.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base sm:text-lg lg:text-xl font-semibold">{bus.arrival}</p>
              <p className="text-sm sm:text-base text-gray-400">{bus.time}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Route Progress */}
      <div className="p-3 sm:p-4 lg:p-6">
        <Card className="bg-gray-800 border-gray-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
          <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 sm:mb-6 text-center">{t.busStop}s</h4>
          
          <div className="space-y-3 sm:space-y-4">
            {routeStops.map((stop, index) => {
              const isPassed = index < currentBusPosition;
              const isCurrent = index === currentBusPosition;
              const isDestination = index === routeStops.length - 1;
              const isOrigin = index === 0;
              
              return (
                <div key={stop} className="flex items-center">
                  <div className="flex items-center w-full">
                    {/* Stop Indicator */}
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0 ${
                      isCurrent 
                        ? 'bg-blue-500 border-blue-500 animate-pulse' 
                        : isPassed 
                        ? 'bg-green-500 border-green-500' 
                        : 'bg-gray-600 border-gray-500'
                    }`} />
                    
                    {/* Connection Line */}
                    {index < routeStops.length - 1 && (
                      <div className={`w-1 h-6 sm:h-8 ml-1 sm:ml-1.5 -mb-3 sm:-mb-4 ${
                        isPassed ? 'bg-green-500' : 'bg-gray-600'
                      }`} />
                    )}
                    
                    {/* Stop Info */}
                    <div className="ml-3 sm:ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`font-medium text-sm sm:text-base ${
                            isCurrent ? 'text-blue-400' : 
                            isPassed ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            {stop}
                          </span>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {index} km • {Math.round((index * 2.5) + 5)} min
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {(isOrigin || isDestination) && (
                            <MapPin size={14} className="text-orange-400 sm:w-4 sm:h-4" />
                          )}
                          
                          {isCurrent && (
                            <Bus size={16} className="text-blue-400 animate-bounce-gentle sm:w-5 sm:h-5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BusTracker;
