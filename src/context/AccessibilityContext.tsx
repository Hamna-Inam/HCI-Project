import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type TextSize = 'normal' | 'large' | 'extra-large';
export type ColorMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

interface AccessibilitySettings {
  textSize: TextSize;
  voiceEnabled: boolean;
  colorMode: ColorMode;
  darkMode: boolean;
  hapticFeedback: boolean;
  soundEffects: boolean;
  guidedMode: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
  getTextClass: () => string;
  speak: (text: string) => void;
  getColorFilter: () => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'krave-mart-accessibility-settings';

// Load settings from localStorage
const loadSettings = (): AccessibilitySettings => {
  if (typeof window === 'undefined') {
    return {
      textSize: 'large',
      voiceEnabled: true,
      colorMode: 'normal',
      darkMode: false,
      hapticFeedback: true,
      soundEffects: true,
      guidedMode: false,
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load accessibility settings:', error);
  }

  return {
    textSize: 'large',
    voiceEnabled: true,
    colorMode: 'normal',
    darkMode: false,
    hapticFeedback: true,
    soundEffects: true,
    guidedMode: false,
  };
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);

  // Save to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const getTextClass = () => {
    switch (settings.textSize) {
      case 'large':
        return 'text-lg';
      case 'extra-large':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  const speak = (text: string) => {
    if (settings.voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getColorFilter = () => {
    switch (settings.colorMode) {
      case 'protanopia':
        return 'hue-rotate-15 saturate-75';
      case 'deuteranopia':
        return 'hue-rotate-180 saturate-50';
      case 'tritanopia':
        return 'hue-rotate-90 saturate-75';
      default:
        return '';
    }
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, getTextClass, speak, getColorFilter }}>
      <div className={`${settings.darkMode ? 'dark' : ''} ${getColorFilter()} transition-all duration-300`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}