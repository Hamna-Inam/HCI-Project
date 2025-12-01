import { useState, useRef, TouchEvent } from 'react';
import { ChevronRight, Mic, Volume2, Settings as SettingsIcon } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

interface TutorialPageProps {
  onNavigate: (page: Page) => void;
}

interface Slide {
  emoji: string;
  icon?: React.ReactNode;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  color: string;
}

export function TutorialPage({ onNavigate }: TutorialPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    {
      emoji: '👋',
      titleEn: 'Welcome to Krave Mart!',
      titleUr: 'کریو مارٹ میں خوش آمدید!',
      descriptionEn: 'Shop groceries easily with our accessibility-first app designed for everyone.',
      descriptionUr: 'ہماری رسائی پر مبنی ایپ کے ساتھ آسانی سے خریداری کریں۔ ہر ایک کے لیے ڈیزائن کیا گیا۔',
      color: '#FACC06',
    },
    {
      emoji: '🛒',
      titleEn: 'Easy Shopping',
      titleUr: 'آسان خریداری',
      descriptionEn: 'Browse categories, search products, and add them to your cart with large, easy-to-tap buttons.',
      descriptionUr: 'اقسام دیکھیں، مصنوعات تلاش کریں، اور بڑے، آسان بٹنوں سے اپنی ٹوکری میں شامل کریں۔',
      color: '#FACC06',
    },
    {
      emoji: '🎤',
      icon: <Mic className="w-20 h-20 text-[#664D03]" />,
      titleEn: 'Voice Search',
      titleUr: 'آواز سے تلاش',
      descriptionEn: 'Tap the microphone icon and speak the product name. Works in English and Urdu!',
      descriptionUr: 'مائیکروفون آئیکن پر ٹیپ کریں اور مصنوعات کا نام بولیں۔ انگریزی اور اردو میں کام کرتا ہے!',
      color: '#FACC06',
    },
    {
      emoji: '🔊',
      icon: <Volume2 className="w-20 h-20 text-[#664D03]" />,
      titleEn: 'Read Aloud',
      titleUr: 'بلند آواز سے پڑھیں',
      descriptionEn: 'Tap the speaker icon on any page to hear the content read out loud. Perfect for low-vision users.',
      descriptionUr: 'کسی بھی صفحے پر اسپیکر آئیکن پر ٹیپ کریں تاکہ مواد سنا جائے۔ کم بینائی والوں کے لیے بہترین۔',
      color: '#FACC06',
    },
    {
      emoji: '⚙️',
      icon: <SettingsIcon className="w-20 h-20 text-[#664D03]" />,
      titleEn: 'Accessibility Settings',
      titleUr: 'رسائی کی ترتیبات',
      descriptionEn: 'Find accessibility options in Settings: text size, dark mode, guided mode, and more!',
      descriptionUr: 'ترتیبات میں رسائی کے اختیارات تلاش کریں: متن کا سائز، گہرا موڈ، رہنمائی موڈ، اور بہت کچھ!',
      color: '#FACC06',
    },
  ];

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    }
    
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      speak(isRTL ? slides[newSlide].titleUr : slides[newSlide].titleEn);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      speak(isRTL ? slides[newSlide].titleUr : slides[newSlide].titleEn);
    }
  };

  const skipTutorial = () => {
    speak('Starting shopping');
    onNavigate('welcome');
  };

  const getStarted = () => {
    speak('Tutorial completed. Starting shopping');
    onNavigate('welcome');
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    speak(isRTL ? slides[index].titleUr : slides[index].titleEn);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} flex flex-col overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={skipTutorial}
          className={`px-6 py-3 ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} hover:${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} transition-colors ${getTextClass()}`}
        >
          {t('skip') || 'Skip'}
        </button>
      </div>

      {/* Slide Content */}
      <div 
        ref={slideRef}
        className="flex-1 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Illustration */}
        <div 
          className="mb-8 transform transition-all duration-500"
          style={{ 
            animation: 'slideIn 0.5s ease-out',
          }}
        >
          {currentSlideData.icon ? (
            <div className="w-40 h-40 bg-[#FACC06] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              {currentSlideData.icon}
            </div>
          ) : (
            <div className="text-9xl mb-4 animate-bounce-slow">
              {currentSlideData.emoji}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 
          className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-6 max-w-md ${
            settings.guidedMode ? 'text-4xl' : 'text-3xl'
          }`}
          style={{ fontWeight: 800 }}
        >
          {isRTL ? currentSlideData.titleUr : currentSlideData.titleEn}
        </h1>

        {/* Description */}
        <p 
          className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-lg leading-relaxed ${
            settings.guidedMode ? 'text-2xl' : 'text-xl'
          }`}
        >
          {isRTL ? currentSlideData.descriptionUr : currentSlideData.descriptionEn}
        </p>

        {/* Special Instructions for Interactive Slides */}
        {currentSlide === 2 && (
          <div className={`mt-6 p-4 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md max-w-md`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-[#FACC06] rounded-full flex items-center justify-center">
                <Mic className="w-6 h-6 text-[#664D03]" />
              </div>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} text-left ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'مثال: "ٹماٹر" یا "Tomatoes"' : 'Example: Say "Tomatoes" or "ٹماٹر"'}
              </p>
            </div>
          </div>
        )}

        {currentSlide === 3 && (
          <div className={`mt-6 p-4 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md max-w-md`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-[#FACC06] rounded-full flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-[#664D03]" />
              </div>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'صفحے کے اوپر دائیں کونے میں' : 'Located in top right corner'}
              </p>
            </div>
          </div>
        )}

        {currentSlide === 4 && (
          <div className={`mt-6 p-4 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md max-w-md`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-[#FACC06] rounded-full flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-[#664D03]" />
              </div>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'پروفائل → ترتیبات' : 'Profile → Settings'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-[#FACC06]'
                : 'w-3 h-3 bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="p-6 space-y-4">
        {currentSlide === slides.length - 1 ? (
          <button
            onClick={getStarted}
            className={`w-full ${settings.guidedMode ? 'h-20' : 'h-16'} bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${getTextClass()}`}
          >
            {t('getStarted') || 'Get Started'}
            <ChevronRight className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={nextSlide}
            className={`w-full ${settings.guidedMode ? 'h-20' : 'h-16'} bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${getTextClass()}`}
          >
            {t('next')}
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className={`w-full ${settings.guidedMode ? 'h-16' : 'h-14'} ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-[#664D03]'} rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 ${getTextClass()}`}
          >
            {t('back')}
          </button>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
