import { motion } from 'motion/react';
import { CheckCircle, Package, Clock, MapPin, Receipt } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

interface OrderSummaryPageProps {
  onNavigate: (page: Page) => void;
}

export function OrderSummaryPage({ onNavigate }: OrderSummaryPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();

  const orderDetails = {
    orderNumber: '#KM' + Math.floor(100000 + Math.random() * 900000),
    items: [
      { name: 'Fresh Tomatoes', quantity: 2, price: 120 },
      { name: 'Whole Wheat Bread', quantity: 1, price: 180 },
      { name: 'Organic Milk', quantity: 1, price: 200 },
    ],
    subtotal: 500,
    voucher: 50,
    deliveryCharges: 50,
    total: 500,
    deliveryTime: '25-30 minutes',
    deliveryAddress: 'Gulshan-e-Iqbal, Block 13-D, Karachi',
  };

  const handleTrackOrder = () => {
    speak('Opening order tracking');
    onNavigate('orderTracking');
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-24`}>
      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="flex flex-col items-center justify-center py-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
            >
              <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-2 -right-2 bg-[#FACC06] w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">🎉</span>
            </motion.div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-3xl mt-6 mb-2`}
          >
            Order Placed Successfully!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}
          >
            Your order is being prepared
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} text-xl mt-2`}
          >
            {orderDetails.orderNumber}
          </motion.p>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-[#FACC06]" />
            <div>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                Estimated Delivery
              </h3>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} text-2xl`}>
                {orderDetails.deliveryTime}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <MapPin className="w-5 h-5 text-[#664D03] mt-1" />
            <div>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
                Delivering to
              </p>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                {orderDetails.deliveryAddress}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6 text-[#FACC06]" />
            <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
              Order Items
            </h3>
          </div>
          <div className="space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className={`flex items-center justify-between py-2 ${index !== orderDetails.items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                <div>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                    {item.name}
                  </p>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} font-semibold`}>
                  Rs. {item.price}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-6 h-6 text-[#FACC06]" />
            <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
              Payment Summary
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subtotal</p>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>Rs. {orderDetails.subtotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Voucher Applied</p>
              <p className="text-green-600">- Rs. {orderDetails.voucher}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Delivery Charges</p>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>Rs. {orderDetails.deliveryCharges}</p>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex items-center justify-between pt-2">
              <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>Total Paid</p>
              <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-2xl`}>Rs. {orderDetails.total}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <button
            onClick={handleTrackOrder}
            className="w-full h-14 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 font-semibold"
          >
            <MapPin className="w-5 h-5" />
            <span>Track Your Order</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className={`w-full h-14 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} text-[#664D03] rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
          >
            <span>Continue Shopping</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
