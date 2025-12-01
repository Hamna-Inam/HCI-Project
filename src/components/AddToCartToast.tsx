import { CheckCircle, ShoppingBag, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Page } from '../App';

interface AddToCartToastProps {
  productName: string;
  productImage: string;
  quantity: number;
  onNavigate: (page: Page) => void;
  onClose: () => void;
}

export function AddToCartToast({ 
  productName, 
  productImage, 
  quantity, 
  onNavigate, 
  onClose 
}: AddToCartToastProps) {
  const { getTotalItems, getTotalPrice } = useCart();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-500">
        {/* Success Header */}
        <div className="bg-green-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            <span className="text-white font-semibold">Added to Cart!</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex items-center gap-3 border-b border-gray-100">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={productImage} alt={productName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-[#664D03] font-semibold truncate">{productName}</p>
            <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-[#FACC06] bg-opacity-10 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#664D03] text-sm">Items in Cart</span>
            <span className="text-[#664D03] font-bold">{getTotalItems()} items</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#664D03] text-sm">Cart Total</span>
            <span className="text-[#664D03] font-bold text-lg">Rs. {getTotalPrice()}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigate('cart');
              }}
              className="flex-1 h-10 bg-[#664D03] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">View Cart</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-10 bg-white border-2 border-gray-200 text-[#664D03] rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-95"
            >
              <span className="text-sm">Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
