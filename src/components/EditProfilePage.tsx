import { useState } from 'react';
import { ArrowLeft, Edit2, Mic, MapPin, Save } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface EditProfilePageProps {
  onNavigate: (page: Page) => void;
}

export function EditProfilePage({ onNavigate }: EditProfilePageProps) {
  const { settings, getTextClass, speak } = useAccessibility();
  const { t, isRTL, language } = useLanguage();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [name, setName] = useState('Ahmed Ali');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [address, setAddress] = useState('123 Main Street, Karachi');

  const handleVoiceInput = (field: 'name' | 'phone') => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak('Voice input not supported');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      speak(t('listening'));
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (field === 'name') {
        setName(transcript);
      } else {
        setPhone(transcript);
      }
      speak(`${field} updated to ${transcript}`);
    };

    recognition.onerror = () => {
      speak('Please try again');
    };

    recognition.start();
  };

  const handleSave = () => {
    speak('Profile updated successfully');
    toast.success('Profile updated!', { duration: 2000 });
    setTimeout(() => onNavigate('profile'), 500);
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-24`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => onNavigate('profile')}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
              {t('editInfo')}
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Name Field */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              {t('nameQuestion')}
            </label>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => handleVoiceInput('name')}
                className="h-10 w-10 bg-[#FACC06] bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95"
              >
                <Mic className="w-5 h-5 text-[#664D03]" />
              </button>
              <button
                onClick={() => setEditingField(editingField === 'name' ? null : 'name')}
                className="h-10 w-10 bg-[#FACC06] bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95"
              >
                <Edit2 className="w-5 h-5 text-[#664D03]" />
              </button>
            </div>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={editingField !== 'name'}
            className={`w-full h-14 px-4 rounded-xl border-2 ${
              editingField === 'name' 
                ? 'border-[#FACC06] bg-white' 
                : settings.darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
            } ${settings.darkMode && editingField === 'name' ? 'bg-gray-700' : ''} outline-none text-lg ${settings.darkMode ? 'text-white' : 'text-[#664D03]'} disabled:cursor-not-allowed`}
          />
        </div>

        {/* Phone Field */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              {t('phoneQuestion')}
            </label>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => handleVoiceInput('phone')}
                className="h-10 w-10 bg-[#FACC06] bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95"
              >
                <Mic className="w-5 h-5 text-[#664D03]" />
              </button>
              <button
                onClick={() => setEditingField(editingField === 'phone' ? null : 'phone')}
                className="h-10 w-10 bg-[#FACC06] bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95"
              >
                <Edit2 className="w-5 h-5 text-[#664D03]" />
              </button>
            </div>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={editingField !== 'phone'}
            dir="ltr"
            className={`w-full h-14 px-4 rounded-xl border-2 ${
              editingField === 'phone' 
                ? 'border-[#FACC06] bg-white' 
                : settings.darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
            } ${settings.darkMode && editingField === 'phone' ? 'bg-gray-700' : ''} outline-none text-lg ${settings.darkMode ? 'text-white' : 'text-[#664D03]'} disabled:cursor-not-allowed`}
          />
        </div>

        {/* Address Field with Map */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              {t('addressQuestion')}
            </label>
            <button
              onClick={() => onNavigate('addresses' as Page)}
              className="h-10 px-4 bg-[#FACC06] bg-opacity-20 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-30 transition-all active:scale-95"
            >
              <MapPin className="w-5 h-5 text-[#664D03]" />
              <span className={`text-sm ${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                {t('manageAddresses') || 'Manage'}
              </span>
            </button>
          </div>
          
          {/* Interactive Map */}
          <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              
              {/* Draggable Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full cursor-move hover:scale-110 transition-transform">
                <MapPin className="w-12 h-12 text-red-500 fill-red-200" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-700">
              💡 {language === 'ur' ? 'پن کو گھسیٹیں' : 'Drag pin to update location'}
            </div>
          </div>

          <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
            <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`} dir="ltr">
              {address}
            </p>
          </div>

          <button
            onClick={() => onNavigate('addresses' as Page)}
            className="w-full h-14 border-2 border-dashed border-[#FACC06] rounded-xl flex items-center justify-center gap-2 hover:bg-[#FACC06] hover:bg-opacity-10 transition-all active:scale-95"
          >
            <MapPin className="w-5 h-5 text-[#664D03]" />
            <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
              {t('addAnotherAddress') || '+ Add Another Address'}
            </span>
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full h-16 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <Save className="w-6 h-6" />
          <span className={getTextClass()}>{t('save')}</span>
        </button>
      </div>
    </div>
  );
}
