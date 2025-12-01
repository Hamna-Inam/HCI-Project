import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

interface DeliveryTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  initialHour?: number;
  initialMinute?: number;
  initialPeriod?: 'AM' | 'PM';
}

export function DeliveryTimePicker({ 
  isOpen, 
  onClose, 
  onConfirm,
  initialHour = 4,
  initialMinute = 0,
  initialPeriod = 'PM'
}: DeliveryTimePickerProps) {
  const { getTextClass, settings, speak } = useAccessibility();
  const { t } = useLanguage();
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(initialPeriod);
  
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Scroll to selected values
      setTimeout(() => {
        scrollToValue('hour', selectedHour - 1);
        scrollToValue('minute', selectedMinute);
        scrollToValue('period', selectedPeriod === 'AM' ? 0 : 1);
      }, 100);
    }
  }, [isOpen]);

  const scrollToValue = (type: 'hour' | 'minute' | 'period', index: number) => {
    const itemHeight = 48; // Height of each item
    const container = type === 'hour' ? hourRef.current : type === 'minute' ? minuteRef.current : periodRef.current;
    if (container) {
      container.scrollTop = index * itemHeight;
    }
  };

  const handleScroll = (type: 'hour' | 'minute' | 'period', event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const scrollTop = container.scrollTop;
    const itemHeight = 48;
    const index = Math.round(scrollTop / itemHeight);

    if (type === 'hour') {
      setSelectedHour(hours[index] || 1);
    } else if (type === 'minute') {
      setSelectedMinute(minutes[index] || 0);
    } else if (type === 'period') {
      setSelectedPeriod(periods[index] as 'AM' | 'PM');
    }
  };

  const handleConfirm = () => {
    const timeString = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    speak(`Delivery time set to ${timeString}`);
    onConfirm(timeString);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl w-full max-w-md overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
            Delivery Time
          </h3>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Time Picker */}
        <div className="p-6">
          {/* Column Headers */}
          <div className="flex mb-4 text-center">
            <div className="flex-1">
              <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hour</span>
            </div>
            <div className="flex-1">
              <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Min</span>
            </div>
            <div className="flex-1">
              <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Period</span>
            </div>
          </div>

          {/* Picker Wheels */}
          <div className="relative h-48 flex gap-2 mb-4">
            {/* Selection Highlight */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <div className="w-full h-12 bg-[#FACC06] bg-opacity-20 rounded-xl border-2 border-[#FACC06]"></div>
            </div>

            {/* Hour Picker */}
            <div
              ref={hourRef}
              onScroll={(e) => handleScroll('hour', e)}
              className="flex-1 h-48 overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="py-20">
                {hours.map((hour, index) => (
                  <div
                    key={hour}
                    onClick={() => {
                      setSelectedHour(hour);
                      scrollToValue('hour', index);
                    }}
                    className={`h-12 flex items-center justify-center snap-start cursor-pointer transition-all ${
                      hour === selectedHour
                        ? `${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} font-bold text-2xl`
                        : `${settings.darkMode ? 'text-gray-600' : 'text-gray-400'} text-xl`
                    }`}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </div>

            {/* Minute Picker */}
            <div
              ref={minuteRef}
              onScroll={(e) => handleScroll('minute', e)}
              className="flex-1 h-48 overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="py-20">
                {minutes.map((minute, index) => (
                  <div
                    key={minute}
                    onClick={() => {
                      setSelectedMinute(minute);
                      scrollToValue('minute', index);
                    }}
                    className={`h-12 flex items-center justify-center snap-start cursor-pointer transition-all ${
                      minute === selectedMinute
                        ? `${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} font-bold text-2xl`
                        : `${settings.darkMode ? 'text-gray-600' : 'text-gray-400'} text-xl`
                    }`}
                  >
                    {minute.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* Period Picker */}
            <div
              ref={periodRef}
              onScroll={(e) => handleScroll('period', e)}
              className="flex-1 h-48 overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="py-20">
                {periods.map((period, index) => (
                  <div
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period as 'AM' | 'PM');
                      scrollToValue('period', index);
                    }}
                    className={`h-12 flex items-center justify-center snap-start cursor-pointer transition-all ${
                      period === selectedPeriod
                        ? `${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} font-bold text-2xl`
                        : `${settings.darkMode ? 'text-gray-600' : 'text-gray-400'} text-xl`
                    }`}
                  >
                    {period}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Time Display */}
          <div className="text-center mb-6">
            <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Selected time</span>
            <div className={`text-2xl ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mt-2`}>
              {selectedHour}:{selectedMinute.toString().padStart(2, '0')} {selectedPeriod}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full h-14 bg-[#FACC06] text-[#664D03] rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Confirm Time
          </button>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
