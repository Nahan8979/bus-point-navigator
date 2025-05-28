
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4 font-fredoka">
      <div className="text-center animate-fade-in w-full max-w-lg">
        <div className="mb-8 animate-bounce-gentle flex justify-center">
          <Bus size={80} className="text-white" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-wide">
          {t.busPoint}
        </h1>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mx-auto">
          <p className="text-xl text-white mb-6 font-medium">
            {t.turnOnLocation}
          </p>
          
          <div className="flex justify-center">
            <Button
              onClick={onLocationRequest}
              disabled={locationLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {locationLoading ? 'Getting Location...' : t.allowLocation}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
