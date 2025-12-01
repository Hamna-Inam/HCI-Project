import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSelectProps {
  onSelect: (language: 'en' | 'ur') => void;
}

export function LanguageSelect({ onSelect }: LanguageSelectProps) {
  const { setLanguage } = useLanguage();

  const handleSelect = (lang: 'en' | 'ur') => {
    setLanguage(lang);
    onSelect(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#F8F9FA] to-[#FFF3CD] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl text-[#664D03] mb-4">Select Language</h2>
        <h2 className="text-3xl text-[#664D03] font-noto-nastaliq">زبان منتخب کریں</h2>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => handleSelect('en')}
          className="w-full h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          <span className="text-5xl">🇬🇧</span>
          <span className="text-2xl text-[#664D03]">English</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => handleSelect('ur')}
          className="w-full h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          <span className="text-5xl">🇵🇰</span>
          <span className="text-2xl text-[#664D03] font-noto-nastaliq">اردو</span>
        </motion.button>
      </div>
    </div>
  );
}