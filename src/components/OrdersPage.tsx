import { ArrowLeft, Package, ChevronRight, Clock } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrdersPageProps {
  onNavigate: (page: Page) => void;
  onOrderSelect?: (orderId: string) => void;
}

export type OrderStatus = 'finding_rider' | 'preparing' | 'picked_up' | 'delivered';

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    name: string;
    nameUr: string;
    quantity: number;
    image: string;
  }[];
}

export function OrdersPage({ onNavigate, onOrderSelect }: OrdersPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      date: '2024-11-30',
      total: 386,
      status: 'preparing',
      items: [
        {
          name: 'Fresh Tomatoes',
          nameUr: 'تازہ ٹماٹر',
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1560433802-62c9db426a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjQ1MjA1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Whole Milk 1L',
          nameUr: 'دودھ 1 لیٹر',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlJTIwZGFpcnl8ZW58MXx8fHwxNzY0NDc5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 'ORD-2024-002',
      date: '2024-11-28',
      total: 520,
      status: 'delivered',
      items: [
        {
          name: 'Fresh Bread',
          nameUr: 'تازہ روٹی',
          quantity: 3,
          image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc2NDQ4MjIzNXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 'ORD-2024-003',
      date: '2024-11-25',
      total: 680,
      status: 'delivered',
      items: [
        {
          name: 'Chicken Breast',
          nameUr: 'مرغی کا سینہ',
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMGZyZXNofGVufDF8fHx8MTc2NDUyMDU5NHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  ]);

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'finding_rider':
        return t('findingRider') || 'Finding Rider';
      case 'preparing':
        return t('preparing') || 'Preparing';
      case 'picked_up':
        return t('pickedUp') || 'Picked Up';
      case 'delivered':
        return t('delivered') || 'Delivered';
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'finding_rider':
        return 'text-orange-500';
      case 'preparing':
        return 'text-blue-500';
      case 'picked_up':
        return 'text-purple-500';
      case 'delivered':
        return 'text-green-500';
    }
  };

  const handleOrderClick = (orderId: string) => {
    speak('Opening order details');
    if (onOrderSelect) {
      onOrderSelect(orderId);
    }
    onNavigate('orderTracking' as Page);
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
            <div>
              <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('myOrders') || 'My Orders'}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {orders.length} {t('orders') || 'orders'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => handleOrderClick(order.id)}
            className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98`}
          >
            {/* Order Header */}
            <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`} dir="ltr">
                  {order.id}
                </p>
                <div className={`flex items-center gap-2 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className={`w-4 h-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} dir="ltr">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Order Progress Bar */}
            <OrderProgressBar currentStatus={order.status} />

            {/* Order Items Preview */}
            <div className={`flex items-center gap-3 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex -space-x-2">
                {order.items.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${settings.darkMode ? 'border-gray-800' : 'border-white'} shadow-sm`}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className={`w-12 h-12 rounded-lg ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center border-2 ${settings.darkMode ? 'border-gray-800' : 'border-white'} shadow-sm`}>
                    <span className={`text-sm ${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                      +{order.items.length - 3}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                  {order.items.length} {t('items')}
                </p>
              </div>
              <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                Rs. {order.total}
              </p>
            </div>

            {/* Order Status */}
            <div className={`mt-4 pt-4 border-t ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('status') || 'Status'}:
                </span>
                <span className={`${getStatusColor(order.status)} ${getTextClass()}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className={`w-24 h-24 ${settings.darkMode ? 'text-gray-700' : 'text-gray-300'} mb-4`} />
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 ${getTextClass()}`}>
              {t('noOrders') || 'No orders yet'}
            </p>
            <button
              onClick={() => onNavigate('home')}
              className={`h-14 px-8 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center ${getTextClass()}`}
            >
              {t('startShopping') || 'Start Shopping'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Order Progress Bar Component
export function OrderProgressBar({ currentStatus }: { currentStatus: OrderStatus }) {
  const { settings } = useAccessibility();
  const { t, isRTL } = useLanguage();

  const steps: { status: OrderStatus; label: string; labelUr: string; icon: string }[] = [
    { status: 'finding_rider', label: 'Finding Rider', labelUr: 'رائیڈر تلاش', icon: '🔍' },
    { status: 'preparing', label: 'Preparing', labelUr: 'تیاری', icon: '👨‍🍳' },
    { status: 'picked_up', label: 'Picked Up', labelUr: 'اٹھایا گیا', icon: '🏍️' },
    { status: 'delivered', label: 'Delivered', labelUr: 'ڈیلیور', icon: '✅' },
  ];

  const currentStepIndex = steps.findIndex(step => step.status === currentStatus);

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className={`absolute top-6 ${isRTL ? 'right-0' : 'left-0'} w-full h-1 ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
      <div 
        className="absolute top-6 left-0 h-1 bg-[#FACC06] transition-all duration-500"
        style={{ 
          width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          ...(isRTL ? { right: 0, left: 'auto' } : {})
        }}
      />

      {/* Steps */}
      <div className={`relative flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.status} className="flex flex-col items-center" style={{ width: '25%' }}>
              {/* Circle */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#FACC06] shadow-lg scale-110' 
                    : settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
                } ${isCurrent ? 'ring-4 ring-[#FACC06] ring-opacity-30' : ''}`}
              >
                {step.icon}
              </div>
              
              {/* Label */}
              <p 
                className={`text-xs mt-2 text-center ${
                  isActive 
                    ? settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]' 
                    : settings.darkMode ? 'text-gray-500' : 'text-gray-400'
                } ${isCurrent ? settings.guidedMode ? 'text-base' : 'text-sm' : ''}`}
              >
                {isRTL ? step.labelUr : step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
