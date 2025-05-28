
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bus } from 'lucide-react';
import { translations } from '@/data/translations';

interface WelcomeScreenProps {
  language: 'en' | 'hi' | 'ml';
  onLocationRequest: () => void;
  locationLoading: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  language, 
  onLocationRequest, 
  locationLoading 
}) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-fredoka">
      <div className="text-center animate-fade-in w-full max-w-lg">
        <div className="mb-6 sm:mb-8 animate-bounce-gentle">
          <Bus size={60} className="text-white mx-auto mb-3 sm:mb-4 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 tracking-wide">
          {t.busPoint}
        </h1>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full">
          <p className="text-lg sm:text-xl lg:text-2xl text-white mb-4 sm:mb-6 font-medium">
            {t.turnOnLocation}
          </p>
          
          <Button
            onClick={onLocationRequest}
            disabled={locationLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            {locationLoading ? 'Getting Location...' : t.allowLocation}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
