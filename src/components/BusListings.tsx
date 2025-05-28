
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';
import { Bus } from '@/types/busTypes';
import { translations } from '@/data/translations';
import { useCurrentTime } from '@/hooks/useCurrentTime';

interface BusListingsProps {
  language: 'en' | 'hi' | 'ml';
  buses: Bus[];
  onTrackBus: (bus: Bus) => void;
  onBack: () => void;
}

const BusListings: React.FC<BusListingsProps> = ({ 
  language, 
  buses, 
  onTrackBus, 
  onBack 
}) => {
  const t = translations[language];
  const { formatTime } = useCurrentTime();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-3 sm:p-4 lg:p-6 font-fredoka">
      <div className="max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 animate-fade-in">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/20 p-2 rounded-xl"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </Button>
          
          <div className="flex items-center text-white">
            <Clock size={16} className="mr-2 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-lg font-semibold">{formatTime()}</span>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {t.whereIsMyBus}
          </h2>
        </div>

        {/* Bus Table - Responsive grid */}
        <div className="space-y-3 sm:space-y-4 animate-slide-in">
          {buses.map((bus) => (
            <Card 
              key={bus.id} 
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 hover:scale-102 ${
                bus.isUpcoming 
                  ? 'bg-green-50 border-2 border-green-400 shadow-green-200' 
                  : 'bg-white/95 backdrop-blur-sm'
              }`}
            >
              {/* Mobile Layout */}
              <div className="block sm:hidden space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium text-gray-600">{t.busNumber}</div>
                    <div className="text-lg font-bold text-gray-800">{bus.number}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-600">{t.arrival}</div>
                    <div className="text-lg font-semibold text-gray-800">{bus.arrival}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium text-gray-600">{t.fair}</div>
                    <div className="text-base font-semibold text-gray-800">₹{bus.fair}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600">{t.distance}</div>
                    <div className="text-base font-semibold text-gray-800">{bus.distance}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600">{t.time}</div>
                    <div className="text-base font-semibold text-gray-800">{bus.time}</div>
                  </div>
                </div>
                
                <Button
                  onClick={() => onTrackBus(bus)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 w-full text-sm"
                >
                  {t.trackBus}
                </Button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:grid grid-cols-6 gap-4 items-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">{t.busNumber}</div>
                  <div className="text-lg font-bold text-gray-800">{bus.number}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">{t.arrival}</div>
                  <div className="text-lg font-semibold text-gray-800">{bus.arrival}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">{t.fair}</div>
                  <div className="text-lg font-semibold text-gray-800">₹{bus.fair}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">{t.distance}</div>
                  <div className="text-lg font-semibold text-gray-800">{bus.distance}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">{t.time}</div>
                  <div className="text-lg font-semibold text-gray-800">{bus.time}</div>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={() => onTrackBus(bus)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    {t.trackBus}
                  </Button>
                </div>
              </div>
              
              {bus.isUpcoming && (
                <div className="mt-3 text-center">
                  <span className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {t.upcomingBus}
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusListings;
