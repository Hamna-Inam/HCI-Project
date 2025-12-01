import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Page } from '../App';

interface FloatingCartButtonProps {
  onNavigate: (page: Page) => void;
}

export function FloatingCartButton({ onNavigate }: FloatingCartButtonProps) {
  const { getTotalItems, getTotalPrice } = useCart();
  const { settings, getTextClass } = useAccessibility();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-24 right-4 z-40"
    >
      <button
        onClick={() => onNavigate('cart')}
        className="relative bg-[#664D03] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all active:scale-95 overflow-hidden"
      >
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 bg-[#FACC06] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        <div className="relative px-6 py-4 flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
            {/* Item count badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-[#FACC06] text-[#664D03] rounded-full flex items-center justify-center text-xs font-black shadow-lg"
              >
                {totalItems}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col items-start">
            <span className="text-xs text-[#FACC06]">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            <span className="font-semibold">Rs. {totalPrice}</span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
