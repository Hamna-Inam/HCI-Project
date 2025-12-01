import { motion } from 'motion/react';
import { ShoppingCart, Mic, Settings, ChevronRight } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
  onSettingsSetup: () => void;
}

export function WelcomePage({ onGetStarted, onSettingsSetup }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      {/* Settings Quick Access */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onSettingsSetup}
        className="absolute top-6 right-6 flex flex-col items-center gap-1"
        aria-label="Settings"
      >
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <Settings className="w-6 h-6 text-[#664D03] dark:text-[#FACC06]" />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">Settings</span>
      </motion.button>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="bg-[#FACC06] w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl">
          <ShoppingCart className="w-16 h-16 text-[#664D03]" strokeWidth={2.5} />
        </div>
        <h1 className="text-center mt-6 text-[#664D03] dark:text-[#FACC06]">
          Krave Mart
        </h1>
      </motion.div>

      {/* Features - More Visual, Less Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-md space-y-4 mb-12"
      >
        <FeatureCard icon="🛒" title="Easy Shopping" />
        <FeatureCard icon="🎤" title="Voice Search" />
        <FeatureCard icon="⚙️" title="Customizable" />
      </motion.div>

      {/* Get Started Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={onGetStarted}
        className="w-full max-w-md h-16 bg-[#FACC06] text-[#664D03] rounded-2xl font-semibold 
                   shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3
                   active:scale-95"
      >
        Get Started
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

function FeatureCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
      <div className="text-5xl">{icon}</div>
      <h3 className="text-[#664D03] dark:text-[#FACC06]">{title}</h3>
    </div>
  );
}