import { Volume2 } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

interface ReadAloudButtonProps {
  text: string;
  className?: string;
}

export function ReadAloudButton({ text, className = '' }: ReadAloudButtonProps) {
  const { speak } = useAccessibility();
  const { t } = useLanguage();

  const handleSpeak = () => {
    speak(text);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`flex items-center justify-center gap-2 bg-[#FACC06] text-[#664D03] px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 ${className}`}
      aria-label={t('readAloud')}
    >
      <Volume2 className="w-5 h-5" />
      <span>{t('readAloud')}</span>
    </button>
  );
}
