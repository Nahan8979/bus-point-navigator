
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4 font-fredoka">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/20 p-2 rounded-xl"
          >
            <ArrowLeft size={24} />
          </Button>
          
          <div className="flex items-center text-white">
            <Clock size={20} className="mr-2" />
            <span className="text-lg font-semibold">{formatTime()}</span>
          </div>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.whereIsMyBus}
          </h2>
        </div>

        {/* Bus Table */}
        <div className="space-y-4 animate-slide-in">
          {buses.map((bus) => (
            <Card 
              key={bus.id} 
              className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-102 ${
                bus.isUpcoming 
                  ? 'bg-green-50 border-2 border-green-400 shadow-green-200' 
                  : 'bg-white/95 backdrop-blur-sm'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
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
                
                <div className="text-center col-span-2 md:col-span-1">
                  <Button
                    onClick={() => onTrackBus(bus)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 w-full md:w-auto"
                  >
                    {t.trackBus}
                  </Button>
                </div>
              </div>
              
              {bus.isUpcoming && (
                <div className="mt-3 text-center">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
