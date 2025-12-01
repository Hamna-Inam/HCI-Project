import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

interface VoiceSearchButtonProps {
  onResult: (text: string) => void;
  className?: string;
}

export function VoiceSearchButton({ onResult, className = '' }: VoiceSearchButtonProps) {
  const { speak } = useAccessibility();
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak(t('voiceNotSupported') || 'Voice search not supported');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      speak(t('listening'));
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      onResult(transcript);
      speak(`${t('searching')} ${transcript}`);
    };

    recognition.onerror = () => {
      setIsListening(false);
      speak(t('voiceError') || 'Please try again');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    speak(t('speakProduct'));
  };

  return (
    <button
      onClick={handleVoiceSearch}
      className={`flex items-center justify-center h-14 w-14 bg-[#FACC06] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 ${
        isListening ? 'animate-pulse' : ''
      } ${className}`}
      aria-label={t('voiceSearch')}
    >
      <Mic className={`w-6 h-6 text-[#664D03] ${isListening ? 'animate-pulse' : ''}`} />
    </button>
  );
}
