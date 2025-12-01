import { ArrowLeft, Phone, MapPin, User, Package, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface OrderTrackingPageProps {
  onNavigate: (page: Page) => void;
}

type OrderStage = 'finding_rider' | 'preparing' | 'picked_up' | 'delivered';

export function OrderTrackingPage({ onNavigate }: OrderTrackingPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  
  const [currentStage, setCurrentStage] = useState<OrderStage>('preparing');
  const [estimatedMinutes, setEstimatedMinutes] = useState(28);

  // Simulate real-time countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedMinutes(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const stages: { id: OrderStage; label: string; icon: JSX.Element }[] = [
    {
      id: 'finding_rider',
      label: 'Finding a Rider',
      icon: <User className="w-6 h-6" />,
    },
    {
      id: 'preparing',
      label: 'Preparing Order',
      icon: <Package className="w-6 h-6" />,
    },
    {
      id: 'picked_up',
      label: 'Rider Picked Up',
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      id: 'delivered',
      label: 'Order Delivered',
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === currentStage);

  const orderSummary = {
    orderNumber: '#KM458932',
    items: [
      { name: 'Fresh Tomatoes', quantity: 2, price: 120 },
      { name: 'Whole Wheat Bread', quantity: 1, price: 180 },
      { name: 'Organic Milk', quantity: 1, price: 200 },
    ],
    subtotal: 500,
    voucher: 50,
    deliveryCharges: 50,
    total: 500,
  };

  const rider = {
    name: 'Muhammad Ali',
    phone: '+92 300 1234567',
    rating: 4.8,
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-24`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => onNavigate('home')}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <div>
              <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                Track Your Order
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                {orderSummary.orderNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Estimated Time */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 shadow-lg text-center`}
        >
          <Clock className={`w-16 h-16 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mx-auto mb-4`} />
          <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            Estimated Delivery Time
          </p>
          <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-5xl mb-2`}>
            {estimatedMinutes} min
          </p>
          <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Your order will arrive soon!
          </p>
        </motion.div>

        {/* Delivery Status Bar */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-lg`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-6 text-center`}>
            Delivery Progress
          </h3>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-200 dark:bg-gray-700"></div>
            <div 
              className="absolute left-8 top-8 w-1 bg-[#FACC06] transition-all duration-1000"
              style={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            ></div>

            {/* Stages */}
            <div className="relative space-y-8">
              {stages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const isPending = index > currentStageIndex;

                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    {/* Icon Circle */}
                    <div className={`
                      relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all
                      ${isCurrent ? 'bg-[#FACC06] scale-110' : ''}
                      ${isCompleted ? 'bg-green-500' : ''}
                      ${isPending ? 'bg-gray-200 dark:bg-gray-700' : ''}
                    `}>
                      <div className={`
                        ${isCurrent ? 'text-[#664D03]' : ''}
                        ${isCompleted ? 'text-white' : ''}
                        ${isPending ? 'text-gray-400' : ''}
                      `}>
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : stage.icon}
                      </div>
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#FACC06] opacity-30"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        ></motion.div>
                      )}
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1 pt-3">
                      <h4 className={`
                        ${getTextClass()}
                        ${isCurrent ? (settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]') : ''}
                        ${isCompleted ? 'text-green-600' : ''}
                        ${isPending ? (settings.darkMode ? 'text-gray-500' : 'text-gray-400') : ''}
                      `}>
                        {stage.label}
                      </h4>
                      <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                        {isCompleted && '✓ Completed'}
                        {isCurrent && '⏳ In Progress...'}
                        {isPending && '○ Pending'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rider Info */}
        {currentStageIndex >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-lg`}
          >
            <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
              Your Delivery Rider
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FACC06] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-[#664D03]" />
                </div>
                <div>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                    {rider.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {rider.rating}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={`tel:${rider.phone}`}
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Phone className="w-6 h-6 text-white" />
              </a>
            </div>
          </motion.div>
        )}

        {/* Order Summary */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-lg`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
            Order Summary
          </h3>
          <div className="space-y-3">
            {orderSummary.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                    {item.name}
                  </p>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`}>
                  Rs. {item.price}
                </p>
              </div>
            ))}
            <div className="pt-3 space-y-2 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                <span className={settings.darkMode ? 'text-white' : 'text-[#664D03]'}>Rs. {orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-600'}>Voucher</span>
                <span className="text-green-600">- Rs. {orderSummary.voucher}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-600'}>Delivery</span>
                <span className={settings.darkMode ? 'text-white' : 'text-[#664D03]'}>Rs. {orderSummary.deliveryCharges}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>Total</span>
                <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-2xl`}>Rs. {orderSummary.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <button
          onClick={() => toast.success('Customer support will contact you shortly')}
          className={`w-full h-14 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} text-[#664D03] rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
        >
          <Phone className="w-5 h-5" />
          <span>Need Help? Contact Support</span>
        </button>
      </div>
    </div>
  );
}
