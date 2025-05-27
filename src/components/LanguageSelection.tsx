
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Language } from '@/types/busTypes';

interface LanguageSelectionProps {
  onLanguageSelect: (language: 'en' | 'hi' | 'ml') => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
];

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex flex-col items-center justify-center p-4 font-fredoka">
      <div className="text-center animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Select Language
        </h2>
        
        <div className="space-y-4 max-w-sm mx-auto">
          {languages.map((lang) => (
            <Card key={lang.code} className="overflow-hidden animate-slide-in">
              <Button
                onClick={() => onLanguageSelect(lang.code)}
                className="w-full p-6 bg-white/90 hover:bg-white text-gray-800 font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                variant="ghost"
              >
                <div className="text-center">
                  <div className="text-xl">{lang.nativeName}</div>
                  <div className="text-sm text-gray-600">{lang.name}</div>
                </div>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
