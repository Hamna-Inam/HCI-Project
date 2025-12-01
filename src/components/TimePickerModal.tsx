import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Check } from 'lucide-react';

interface TimePickerModalProps {
  isOpen: boolean;
  currentTime: string;
  onClose: () => void;
  onConfirm: (time: string) => void;
}

export function TimePickerModal({ isOpen, currentTime, onClose, onConfirm }: TimePickerModalProps) {
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM');
  
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse current time when modal opens
    if (isOpen) {
      const match = currentTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        const hour = parseInt(match[1]);
        const minute = parseInt(match[2]);
        const period = match[3].toUpperCase() as 'AM' | 'PM';
        
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setSelectedPeriod(period);
        
        // Scroll to selected values after a short delay
        setTimeout(() => {
          if (hourRef.current) {
            hourRef.current.scrollTop = (hour - 1) * 60;
          }
          if (minuteRef.current) {
            minuteRef.current.scrollTop = minute * 60;
          }
        }, 100);
      }
    }
  }, [currentTime, isOpen]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleScroll = (ref: HTMLDivElement, setter: (val: number) => void, values: number[]) => {
    const scrollTop = ref.scrollTop;
    const itemHeight = 60;
    const index = Math.round(scrollTop / itemHeight);
    setter(values[index] || values[0]);
  };

  const handleConfirm = () => {
    const formattedTime = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    onConfirm(formattedTime);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-end justify-center p-0">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-t-[32px] w-full max-w-2xl shadow-2xl overflow-hidden"
      >
        {/* Premium Header with Gradient */}
        <div className="relative bg-gradient-to-br from-[#FACC06] to-[#F8B500] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#664D03]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl text-[#664D03] font-bold">Delivery Time</h3>
                <p className="text-[#664D03] text-opacity-70 text-sm">Choose your preferred time</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white bg-opacity-30 backdrop-blur-sm hover:bg-opacity-50 flex items-center justify-center transition-all active:scale-95"
            >
              <X className="w-5 h-5 text-[#664D03]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Premium Time Picker with Enhanced Visibility */}
        <div className="p-8 bg-gradient-to-b from-white to-gray-50">
          {/* Current Selection Display */}
          <div className="mb-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Selected Time</p>
            <div className="inline-flex items-center gap-3 bg-[#FACC06] bg-opacity-10 px-6 py-3 rounded-2xl border-2 border-[#FACC06] border-opacity-30">
              <Clock className="w-5 h-5 text-[#664D03]" />
              <span className="text-3xl font-bold text-[#664D03] tabular-nums">
                {selectedHour}:{selectedMinute.toString().padStart(2, '0')}
              </span>
              <span className="text-xl font-semibold text-[#664D03]">{selectedPeriod}</span>
            </div>
          </div>

          {/* Premium Wheel Picker */}
          <div className="relative">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white to-transparent z-30 pointer-events-none rounded-t-2xl"></div>
            
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent z-30 pointer-events-none rounded-b-2xl"></div>

            {/* Premium Selection Highlight */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 z-20 pointer-events-none flex items-center justify-center mx-4">
              <div className="w-full h-full bg-gradient-to-r from-[#FACC06] to-[#F8B500] rounded-2xl shadow-2xl border-2 border-[#664D03] border-opacity-20">
                {/* Inner glow */}
                <div className="w-full h-full bg-white bg-opacity-30 rounded-2xl"></div>
              </div>
            </div>

            <div className="relative h-80 flex items-center justify-center gap-4 bg-white rounded-2xl shadow-inner p-4">
              {/* Hour Picker */}
              <div className="flex-1 relative">
                <div
                  ref={hourRef}
                  onScroll={(e) => handleScroll(e.currentTarget, setSelectedHour, hours)}
                  className="h-80 overflow-y-auto snap-y snap-mandatory scrollbar-hide scroll-smooth"
                  style={{ scrollPaddingTop: '128px' }}
                >
                  <div className="h-32"></div>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      onClick={() => {
                        setSelectedHour(hour);
                        if (hourRef.current) {
                          hourRef.current.scrollTop = (hour - 1) * 60;
                        }
                      }}
                      className={`h-[60px] flex items-center justify-center text-4xl snap-center cursor-pointer transition-all duration-200 ${
                        selectedHour === hour
                          ? 'text-[#664D03] font-black scale-125 drop-shadow-lg'
                          : 'text-gray-300 font-semibold scale-90 hover:text-gray-400'
                      }`}
                    >
                      {hour}
                    </div>
                  ))}
                  <div className="h-32"></div>
                </div>
              </div>

              {/* Colon Separator */}
              <div className="text-5xl text-[#664D03] font-black relative z-20 drop-shadow-md">:</div>

              {/* Minute Picker */}
              <div className="flex-1 relative">
                <div
                  ref={minuteRef}
                  onScroll={(e) => handleScroll(e.currentTarget, setSelectedMinute, minutes)}
                  className="h-80 overflow-y-auto snap-y snap-mandatory scrollbar-hide scroll-smooth"
                  style={{ scrollPaddingTop: '128px' }}
                >
                  <div className="h-32"></div>
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      onClick={() => {
                        setSelectedMinute(minute);
                        if (minuteRef.current) {
                          minuteRef.current.scrollTop = minute * 60;
                        }
                      }}
                      className={`h-[60px] flex items-center justify-center text-4xl snap-center cursor-pointer transition-all duration-200 ${
                        selectedMinute === minute
                          ? 'text-[#664D03] font-black scale-125 drop-shadow-lg'
                          : 'text-gray-300 font-semibold scale-90 hover:text-gray-400'
                      }`}
                    >
                      {minute.toString().padStart(2, '0')}
                    </div>
                  ))}
                  <div className="h-32"></div>
                </div>
              </div>

              {/* Premium AM/PM Toggle */}
              <div className="flex flex-col gap-3 relative z-20">
                <button
                  onClick={() => setSelectedPeriod('AM')}
                  className={`w-20 h-16 rounded-2xl font-black text-lg transition-all shadow-md ${
                    selectedPeriod === 'AM'
                      ? 'bg-gradient-to-br from-[#FACC06] to-[#F8B500] text-[#664D03] shadow-xl scale-105 border-2 border-[#664D03] border-opacity-20'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 scale-95'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {selectedPeriod === 'AM' && (
                      <Check className="w-4 h-4 mb-0.5" strokeWidth={3} />
                    )}
                    <span>AM</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedPeriod('PM')}
                  className={`w-20 h-16 rounded-2xl font-black text-lg transition-all shadow-md ${
                    selectedPeriod === 'PM'
                      ? 'bg-gradient-to-br from-[#FACC06] to-[#F8B500] text-[#664D03] shadow-xl scale-105 border-2 border-[#664D03] border-opacity-20'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 scale-95'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {selectedPeriod === 'PM' && (
                      <Check className="w-4 h-4 mb-0.5" strokeWidth={3} />
                    )}
                    <span>PM</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full h-16 bg-gradient-to-r from-[#664D03] to-[#7d5e04] text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 mt-8 font-bold text-lg group overflow-hidden relative"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7d5e04] to-[#664D03] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5" strokeWidth={3} />
              </div>
              <span>Confirm Delivery Time</span>
            </div>
          </button>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </motion.div>
    </div>
  );
}
