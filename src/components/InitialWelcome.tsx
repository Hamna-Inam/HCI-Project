import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import logoImage from 'figma:asset/c38bb74e79c4b84c3602abf16a6c737fe7281092.png';

interface InitialWelcomeProps {
  onProceed: () => void;
}

export function InitialWelcome({ onProceed }: InitialWelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#F8F9FA] to-[#FFF3CD] relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Enhanced Food Doodles Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="text-7xl absolute top-10 left-10 animate-bounce-slow" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🍎</div>
        <div className="text-6xl absolute top-32 right-20 animate-bounce-slow" style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🥕</div>
        <div className="text-7xl absolute top-1/4 left-1/4 animate-bounce-slow" style={{ animationDelay: '1s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🍞</div>
        <div className="text-6xl absolute bottom-1/4 right-1/4 animate-bounce-slow" style={{ animationDelay: '1.5s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🥛</div>
        <div className="text-7xl absolute bottom-20 left-20 animate-bounce-slow" style={{ animationDelay: '2s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🍕</div>
        <div className="text-6xl absolute top-1/2 right-10 animate-bounce-slow" style={{ animationDelay: '2.5s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🍇</div>
        <div className="text-7xl absolute bottom-1/3 left-1/3 animate-bounce-slow" style={{ animationDelay: '0.8s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🧀</div>
        <div className="text-6xl absolute top-20 left-1/2 -translate-x-1/2 animate-bounce-slow" style={{ animationDelay: '1.2s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🥐</div>
        <div className="text-7xl absolute bottom-32 right-1/3 animate-bounce-slow" style={{ animationDelay: '1.8s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🍅</div>
        <div className="text-6xl absolute top-1/3 right-1/3 animate-bounce-slow" style={{ animationDelay: '0.3s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🥑</div>
        <div className="text-7xl absolute top-2/3 left-1/4 animate-bounce-slow" style={{ animationDelay: '1.6s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🥦</div>
        <div className="text-6xl absolute bottom-1/2 right-20 animate-bounce-slow" style={{ animationDelay: '2.2s', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🌽</div>
      </div>

      {/* Logo - Centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 relative z-10 flex flex-col items-center"
      >
        <div className="bg-[#FACC06] w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl">
          <img src={logoImage} alt="Krave Mart Logo" className="w-32 h-32 object-contain" />
        </div>
        <h1 className="text-center mt-8 text-[#664D03] text-5xl">
          Krave Mart
        </h1>
        <p className="text-center mt-4 text-gray-600 text-2xl">
          Your Shopping Made Easy
        </p>
      </motion.div>

      {/* Main CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onProceed}
        className="w-full max-w-md h-20 bg-[#FACC06] text-[#664D03] text-2xl rounded-2xl font-semibold 
                   shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-4
                   active:scale-95 relative z-10"
      >
        Let's Begin
        <ChevronRight className="w-8 h-8" />
      </motion.button>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}