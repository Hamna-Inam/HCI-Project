import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, User, Phone, MapPin, X, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';

interface SignUpPageProps {
  onComplete: (data: { name: string; phone: string; address: string }) => void;
}

export function SignUpPage({ onComplete }: SignUpPageProps) {
  const { t, isRTL } = useLanguage();
  const { speak, settings } = useAccessibility();
  const { updateUserData } = useUser();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 }); // Percentage position
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleComplete = () => {
    if (name && phone && address) {
      speak(t('startShopping'));
      updateUserData({ name, phone, address });
      onComplete({ name, phone, address });
    } else {
      speak('Please fill all fields');
    }
  };

  const predefinedLocations = [
    { name: 'Gulshan-e-Iqbal, Karachi', x: 45, y: 48 },
    { name: 'DHA Phase 5, Karachi', x: 55, y: 52 },
    { name: 'Clifton Block 8, Karachi', x: 50, y: 55 },
    { name: 'Saddar Town, Karachi', x: 48, y: 50 },
  ];

  const handleMapMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePinPosition(e);
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updatePinPosition(e);
    }
  };

  const handleMapMouseUp = () => {
    setIsDragging(false);
  };

  const updatePinPosition = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinPosition({ 
      x: Math.max(5, Math.min(95, x)), 
      y: Math.max(5, Math.min(95, y)) 
    });
  };

  const selectLocation = (location: { name: string; x: number; y: number }) => {
    setAddress(location.name);
    setPinPosition({ x: location.x, y: location.y });
    speak(`${t('selected')} ${location.name}`);
  };

  const confirmLocation = () => {
    if (!address) {
      const closestLocation = predefinedLocations[0];
      setAddress(closestLocation.name);
    }
    setShowMap(false);
    speak(`Location confirmed: ${address}`);
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F8F9FA] to-white'} flex flex-col items-center justify-center p-6`}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-[#FACC06] w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl">
          <ShoppingCart className="w-12 h-12 text-[#664D03]" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 text-center"
      >
        <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-3xl mb-2`}>
          {t('createAccount') || 'Create Account'}
        </h2>
        <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('enterDetails') || 'Enter your details to get started'}
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md space-y-4"
      >
        {/* Name Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('enterName')}
            className={`w-full ${settings.guidedMode ? 'h-16' : 'h-14'} pl-12 pr-6 rounded-2xl border-2 ${settings.darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'border-gray-200 placeholder:text-gray-400'} focus:border-[#FACC06] outline-none text-lg shadow-sm`}
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Phone className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('enterPhone')}
            className={`w-full ${settings.guidedMode ? 'h-16' : 'h-14'} pl-12 pr-6 rounded-2xl border-2 ${settings.darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'border-gray-200 placeholder:text-gray-400'} focus:border-[#FACC06] outline-none text-lg shadow-sm`}
          />
        </div>

        {/* Address Input with Map Button */}
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('enterAddress')}
              className={`w-full ${settings.guidedMode ? 'h-16' : 'h-14'} pl-12 pr-6 rounded-2xl border-2 ${settings.darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'border-gray-200 placeholder:text-gray-400'} focus:border-[#FACC06] outline-none text-lg shadow-sm`}
            />
          </div>
          
          <button
            type="button"
            onClick={() => {
              setShowMap(true);
              speak('Opening map to select location');
            }}
            className={`w-full h-12 ${settings.darkMode ? 'bg-gray-800 border-gray-700 text-[#FACC06]' : 'bg-white border-gray-200 text-[#664D03]'} border-2 rounded-xl flex items-center justify-center gap-2 hover:border-[#FACC06] transition-all`}
          >
            <MapPin className="w-5 h-5" />
            <span>Select on Map</span>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleComplete}
          disabled={!name || !phone || !address}
          className={`w-full ${settings.guidedMode ? 'h-16' : 'h-14'} bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6`}
        >
          <span className="text-lg">{t('continue')}</span>
        </button>
      </motion.div>

      {/* Realistic Google Maps Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl`}
          >
            {/* Header */}
            <div className={`p-4 border-b ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <h3 className={`text-xl ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`}>
                📍 Select Your Location
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className={`w-10 h-10 rounded-full ${settings.darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-all`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Realistic Google Maps Container */}
            <div className="relative">
              <div
                ref={mapRef}
                onMouseDown={handleMapMouseDown}
                onMouseMove={handleMapMouseMove}
                onMouseUp={handleMapMouseUp}
                onMouseLeave={handleMapMouseUp}
                className="w-full h-96 bg-gray-100 relative overflow-hidden cursor-crosshair select-none"
                style={{
                  background: 'linear-gradient(to bottom, #e8f3f1 0%, #f5f5dc 100%)',
                }}
              >
                {/* Map Grid and Streets - Google Maps Style */}
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Parks and green areas */}
                  <rect x="10%" y="15%" width="25%" height="20%" fill="#c8e6c9" opacity="0.6" rx="8" />
                  <rect x="60%" y="45%" width="30%" height="25%" fill="#c8e6c9" opacity="0.6" rx="8" />
                  <rect x="15%" y="65%" width="20%" height="18%" fill="#c8e6c9" opacity="0.5" rx="6" />
                  
                  {/* Water body */}
                  <ellipse cx="75%" cy="20%" rx="18%" ry="15%" fill="#b3d9ff" opacity="0.7" />
                  
                  {/* Major Roads - Yellow */}
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffd54f" strokeWidth="6" opacity="0.8" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#ffd54f" strokeWidth="6" opacity="0.8" />
                  
                  {/* Secondary Roads - White */}
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#ffffff" strokeWidth="4" opacity="0.7" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#ffffff" strokeWidth="4" opacity="0.7" />
                  <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#ffffff" strokeWidth="4" opacity="0.7" />
                  <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#ffffff" strokeWidth="4" opacity="0.7" />
                  
                  {/* Buildings */}
                  <rect x="40%" y="30%" width="8%" height="6%" fill="#d7ccc8" opacity="0.7" rx="2" />
                  <rect x="52%" y="32%" width="6%" height="5%" fill="#d7ccc8" opacity="0.7" rx="2" />
                  <rect x="30%" y="55%" width="7%" height="8%" fill="#d7ccc8" opacity="0.7" rx="2" />
                  <rect x="65%" y="60%" width="9%" height="7%" fill="#d7ccc8" opacity="0.7" rx="2" />
                  
                  {/* Points of Interest markers */}
                  <circle cx="35%" cy="40%" r="8" fill="#4285f4" opacity="0.8" />
                  <circle cx="68%" cy="35%" r="8" fill="#ea4335" opacity="0.8" />
                  <circle cx="45%" cy="70%" r="8" fill="#34a853" opacity="0.8" />
                </svg>

                {/* Location Labels */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-medium text-gray-700 border border-gray-200">
                  🇵🇰 Karachi, Pakistan
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoom(Math.min(zoom + 1, 18));
                    }}
                    className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoom(Math.max(zoom - 1, 8));
                    }}
                    className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all"
                  >
                    <ZoomOut className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPinPosition({ x: 50, y: 50 });
                    }}
                    className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all"
                  >
                    <Navigation className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Draggable Pin with Drop Shadow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${pinPosition.x}%`,
                    top: `${pinPosition.y}%`,
                    transform: 'translate(-50%, -100%)',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
                  }}
                >
                  <div className="relative">
                    <MapPin className="w-12 h-12 text-red-500 fill-red-500 animate-bounce" strokeWidth={1.5} />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black opacity-20 rounded-full blur-sm"></div>
                  </div>
                </div>

                {/* Crosshair center guide */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-2 border-blue-500 rounded-full bg-blue-200 opacity-70"></div>
                </div>

                {/* Zoom level indicator */}
                <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm border border-gray-200">
                  Zoom: {zoom}
                </div>
              </div>

              {/* Quick Location Buttons */}
              <div className={`p-4 ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-t ${settings.darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 font-medium`}>
                  📍 Quick Select Popular Areas
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => selectLocation(location)}
                      className={`${settings.darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-50 text-[#664D03]'} rounded-xl p-3 text-left border-2 ${settings.darkMode ? 'border-gray-600' : 'border-gray-200'} hover:border-[#FACC06] transition-all text-sm`}
                    >
                      <MapPin className="w-4 h-4 inline mr-1 text-[#FACC06]" />
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm Button */}
              <div className="p-4">
                <button
                  onClick={confirmLocation}
                  className="w-full h-14 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Confirm Location</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
