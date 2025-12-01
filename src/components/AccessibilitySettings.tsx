import { ArrowLeft } from 'lucide-react';
import { useAccessibility, TextSize, ColorMode } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

interface AccessibilitySettingsProps {
  onBack: () => void;
  onComplete?: () => void;
}

export function AccessibilitySettings({ onBack, onComplete }: AccessibilitySettingsProps) {
  const { settings, updateSettings, getTextClass } = useAccessibility();
  const { t, language, setLanguage, isRTL } = useLanguage();

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      onBack();
    }
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-24`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onBack}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
              aria-label="Go back"
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <div>
              <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('settingsTitle')}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {t('customizeApp')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Language */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-4 ${getTextClass()}`}>
            {t('language')}
          </h3>
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 h-16 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
                language === 'en'
                  ? 'bg-[#FACC06] shadow-md'
                  : settings.darkMode ? 'bg-gray-700 hover:shadow-sm' : 'bg-[#F8F9FA] hover:shadow-sm'
              }`}
            >
              <span className="text-2xl">🇬🇧</span>
              <span className={`${language === 'en' ? 'text-[#664D03]' : settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
                English
              </span>
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`flex-1 h-16 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
                language === 'ur'
                  ? 'bg-[#FACC06] shadow-md'
                  : settings.darkMode ? 'bg-gray-700 hover:shadow-sm' : 'bg-[#F8F9FA] hover:shadow-sm'
              }`}
            >
              <span className="text-2xl">🇵🇰</span>
              <span className={`${language === 'ur' ? 'text-[#664D03]' : settings.darkMode ? 'text-white' : 'text-gray-700'} font-noto-nastaliq`}>
                اردو
              </span>
            </button>
          </div>
        </div>

        {/* Text Size */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-4 ${getTextClass()}`}>
            {t('textSize')}
          </h3>
          <div className="space-y-3">
            {(['normal', 'large', 'extra-large'] as TextSize[]).map((size) => (
              <button
                key={size}
                onClick={() => updateSettings({ textSize: size })}
                className={`w-full h-16 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                  settings.textSize === size
                    ? 'bg-[#FACC06] shadow-md'
                    : settings.darkMode ? 'bg-gray-700 hover:shadow-sm' : 'bg-[#F8F9FA] hover:shadow-sm'
                }`}
              >
                <span className={`${settings.textSize === size ? 'text-[#664D03]' : settings.darkMode ? 'text-white' : 'text-gray-700'} ${
                  size === 'normal' ? 'text-base' :
                  size === 'large' ? 'text-lg' :
                  'text-xl'
                }`}>
                  {size === 'normal' ? 'A' :
                   size === 'large' ? 'A+' :
                   'A++'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Guided Mode */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('guidedMode')}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {t('stepByStep')}
              </p>
            </div>
            <button
              onClick={() => updateSettings({ guidedMode: !settings.guidedMode })}
              className={`w-20 h-12 rounded-full transition-all ${
                settings.guidedMode ? 'bg-[#FACC06]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-10 h-10 bg-white rounded-full shadow-md transition-transform ${
                settings.guidedMode ? (isRTL ? '-translate-x-9' : 'translate-x-9') : (isRTL ? '-translate-x-1' : 'translate-x-1')
              } flex items-center justify-center`}>
                <span className="text-sm">{settings.guidedMode ? 'ON' : 'OFF'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Dark Mode */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('darkMode')}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>🌙</p>
            </div>
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className={`w-20 h-12 rounded-full transition-all ${
                settings.darkMode ? 'bg-[#FACC06]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-10 h-10 bg-white rounded-full shadow-md transition-transform ${
                settings.darkMode ? (isRTL ? '-translate-x-9' : 'translate-x-9') : (isRTL ? '-translate-x-1' : 'translate-x-1')
              } flex items-center justify-center`}>
                <span className="text-sm">{settings.darkMode ? 'ON' : 'OFF'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Voice */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('voice')}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>🎤</p>
            </div>
            <button
              onClick={() => updateSettings({ voiceEnabled: !settings.voiceEnabled })}
              className={`w-20 h-12 rounded-full transition-all ${
                settings.voiceEnabled ? 'bg-[#FACC06]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-10 h-10 bg-white rounded-full shadow-md transition-transform ${
                settings.voiceEnabled ? (isRTL ? '-translate-x-9' : 'translate-x-9') : (isRTL ? '-translate-x-1' : 'translate-x-1')
              } flex items-center justify-center`}>
                <span className="text-sm">{settings.voiceEnabled ? 'ON' : 'OFF'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Color Mode */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-4 ${getTextClass()}`}>
            {t('colorVision')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {([
              { mode: 'normal', label: 'Standard', emoji: '👁️' },
              { mode: 'protanopia', label: 'Red-Weak', emoji: '🔴' },
              { mode: 'deuteranopia', label: 'Green-Weak', emoji: '🟢' },
              { mode: 'tritanopia', label: 'Blue-Weak', emoji: '🔵' }
            ] as const).map(({ mode, label, emoji }) => (
              <button
                key={mode}
                onClick={() => updateSettings({ colorMode: mode as ColorMode })}
                className={`h-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                  settings.colorMode === mode
                    ? 'bg-[#FACC06] shadow-md'
                    : settings.darkMode ? 'bg-gray-700 hover:shadow-sm' : 'bg-[#F8F9FA] hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className={`text-sm ${settings.colorMode === mode ? 'text-[#664D03]' : settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Vibration */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('vibration')}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>📳</p>
            </div>
            <button
              onClick={() => updateSettings({ hapticFeedback: !settings.hapticFeedback })}
              className={`w-20 h-12 rounded-full transition-all ${
                settings.hapticFeedback ? 'bg-[#FACC06]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-10 h-10 bg-white rounded-full shadow-md transition-transform ${
                settings.hapticFeedback ? (isRTL ? '-translate-x-9' : 'translate-x-9') : (isRTL ? '-translate-x-1' : 'translate-x-1')
              } flex items-center justify-center`}>
                <span className="text-sm">{settings.hapticFeedback ? 'ON' : 'OFF'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sound */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('sound')}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>🔊</p>
            </div>
            <button
              onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
              className={`w-20 h-12 rounded-full transition-all ${
                settings.soundEffects ? 'bg-[#FACC06]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-10 h-10 bg-white rounded-full shadow-md transition-transform ${
                settings.soundEffects ? (isRTL ? '-translate-x-9' : 'translate-x-9') : (isRTL ? '-translate-x-1' : 'translate-x-1')
              } flex items-center justify-center`}>
                <span className="text-sm">{settings.soundEffects ? 'ON' : 'OFF'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Complete Button (if setup mode) */}
        {onComplete && (
          <button
            onClick={handleComplete}
            className="w-full h-16 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center"
          >
            {t('continue')}
          </button>
        )}
      </div>
    </div>
  );
}
