import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Clock, ChevronDown, ChevronUp, X, Tag } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TimePickerModal } from './TimePickerModal';
import { toast } from 'sonner@2.0.3';

interface CartPageProps {
  onNavigate: (page: Page) => void;
}

interface Voucher {
  id: string;
  code: string;
  title: string;
  titleUr: string;
  description: string;
  descriptionUr: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrder: number;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const { items, updateQuantity, removeFromCart } = useCart();
  
  const [deliveryTime, setDeliveryTime] = useState('10:30 AM');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [expandedVoucher, setExpandedVoucher] = useState<string | null>(null);

  const vouchers: Voucher[] = [
    {
      id: 'v1',
      code: 'SAVE20',
      title: '20% Off',
      titleUr: '20% چھوٹ',
      description: 'Get 20% discount on orders above Rs. 500',
      descriptionUr: '500 روپے سے زیادہ کے آرڈر پر 20% چھوٹ حاصل کریں',
      discount: 20,
      discountType: 'percentage',
      minOrder: 500,
    },
    {
      id: 'v2',
      code: 'FLAT50',
      title: 'Rs. 50 Off',
      titleUr: '50 روپے چھوٹ',
      description: 'Save Rs. 50 on orders above Rs. 300',
      descriptionUr: '300 روپے سے زیادہ کے آرڈر پر 50 روپے کی بچت',
      discount: 50,
      discountType: 'fixed',
      minOrder: 300,
    },
    {
      id: 'v3',
      code: 'FIRST100',
      title: 'Rs. 100 Off',
      titleUr: '100 روپے چھوٹ',
      description: 'First order special - Save Rs. 100',
      descriptionUr: 'پہلا آرڈر خاص - 100 روپے کی بچت',
      discount: 100,
      discountType: 'fixed',
      minOrder: 200,
    },
  ];

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
    speak(`Quantity updated to ${newQuantity}`);
    toast.success(`Quantity updated`, { duration: 1500 });
  };

  const handleRemoveItem = (productId: string, name: string) => {
    if (settings.guidedMode) {
      if (!confirm(`${t('confirmDelete')} ${name}?`)) {
        return;
      }
    }
    removeFromCart(productId);
    speak(`${name} removed from cart`);
    toast.success(`${name} removed from cart`, { duration: 2000 });
  };

  const handleVoucherToggle = (voucher: Voucher) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    if (subtotal < voucher.minOrder) {
      toast.error(`Minimum order of Rs. ${voucher.minOrder} required`, { duration: 3000 });
      speak(`Minimum order of Rs. ${voucher.minOrder} required`);
      return;
    }

    setSelectedVoucher(voucher);
    setExpandedVoucher(null);
    speak(`Voucher ${voucher.code} applied`);
    toast.success(`Voucher ${voucher.code} applied!`, { duration: 2000 });
  };

  const handleRemoveVoucher = () => {
    if (selectedVoucher) {
      speak(`Voucher ${selectedVoucher.code} removed`);
      toast.info('Voucher removed', { duration: 2000 });
    }
    setSelectedVoucher(null);
  };

  const handleTimeChange = (newTime: string) => {
    setDeliveryTime(newTime);
    speak(`Delivery time set to ${newTime}`);
    toast.success(`Delivery time updated to ${newTime}`, { duration: 2000 });
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = 50;
  
  let discount = 0;
  if (selectedVoucher) {
    discount = selectedVoucher.discountType === 'percentage'
      ? (subtotal * selectedVoucher.discount) / 100
      : selectedVoucher.discount;
  }
  
  const total = subtotal + deliveryFee - discount;

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-96`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
            {t('cart')}
          </h2>
          <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>
            {items.length} {t('items')}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className={`w-24 h-24 ${settings.darkMode ? 'text-gray-700' : 'text-gray-300'} mb-4`} />
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 ${getTextClass()}`}>
              {t('emptyCart') || 'Your cart is empty'}
            </p>
            <button
              onClick={() => onNavigate('home')}
              className={`h-14 px-8 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center ${getTextClass()}`}
            >
              {t('startShopping') || 'Start Shopping'}
            </button>
          </div>
        ) : (
          <>
            {/* Delivery Time - Now Editable */}
            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#FACC06] bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#664D03]" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                      {t('deliveryTime') || 'Delivery Time'}
                    </p>
                    <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                      {deliveryTime}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTimePicker(true)}
                  className={`h-10 px-4 border-2 border-[#FACC06] text-[#664D03] rounded-lg hover:bg-[#FACC06] hover:bg-opacity-10 transition-all active:scale-95 ${getTextClass()}`}
                >
                  {t('change') || 'Change'}
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => {
                const displayName = isRTL ? item.product.nameUr : item.product.name;
                return (
                  <div key={item.product.id} className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
                    <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`${settings.guidedMode ? 'w-28 h-28' : 'w-24 h-24'} ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl overflow-hidden flex-shrink-0`}>
                        <ImageWithFallback
                          src={item.product.image}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <h4 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                            {displayName}
                          </h4>
                          <button
                            onClick={() => handleRemoveItem(item.product.id, displayName)}
                            className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-colors flex-shrink-0"
                            aria-label={`Remove ${displayName}`}
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                        <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-3 ${getTextClass()}`}>
                          Rs. {item.product.price}
                        </p>
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                            aria-label="Decrease quantity"
                          >
                            <Minus className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`} />
                          </button>
                          <span className={`min-w-[3rem] text-center ${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="h-12 w-12 bg-[#FACC06] rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-5 h-5 text-[#664D03]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vouchers Section */}
            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
                {t('vouchers') || 'Apply Voucher'}
              </h3>
              <div className="space-y-2">
                {vouchers.map((voucher) => (
                  <div key={voucher.id}>
                    <button
                      onClick={() => setExpandedVoucher(expandedVoucher === voucher.id ? null : voucher.id)}
                      className={`w-full ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4 transition-all hover:shadow-md active:scale-95`}
                    >
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Tag className="w-5 h-5 text-[#FACC06]" />
                          <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                            {isRTL ? voucher.titleUr : voucher.title}
                          </span>
                        </div>
                        {expandedVoucher === voucher.id ? (
                          <ChevronUp className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                      </div>
                    </button>
                    
                    {/* Dropdown Panel */}
                    {expandedVoucher === voucher.id && (
                      <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4 mt-2 space-y-3`}>
                        <div>
                          <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
                            {t('code') || 'Code'}:
                          </p>
                          <p className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} font-mono`}>
                            {voucher.code}
                          </p>
                        </div>
                        <div>
                          <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
                            {t('details') || 'Details'}:
                          </p>
                          <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                            {isRTL ? voucher.descriptionUr : voucher.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleVoucherToggle(voucher)}
                          disabled={selectedVoucher?.id === voucher.id}
                          className={`w-full h-12 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 ${getTextClass()} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {selectedVoucher?.id === voucher.id ? (t('applied') || 'Applied') : (t('apply') || 'Apply')}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout Summary - Fixed at bottom */}
      {items.length > 0 && (
        <div className={`fixed bottom-20 left-0 right-0 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl p-6 border-t-2 border-[#FACC06]`}>
          <div className="max-w-screen-xl mx-auto">
            <div className="space-y-3 mb-4">
              <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('subtotal') || 'Subtotal'}
                </span>
                <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                  Rs. {subtotal}
                </span>
              </div>
              <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('deliveryFee') || 'Delivery Fee'}
                </span>
                <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                  Rs. {deliveryFee}
                </span>
              </div>
              
              {/* Selected Voucher Display */}
              {selectedVoucher && (
                <div className={`${settings.darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'} rounded-xl p-3`}>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-mono">{selectedVoucher.code}</span>
                      </div>
                      <span className="text-sm text-green-600">
                        {selectedVoucher.discountType === 'percentage' 
                          ? `-${selectedVoucher.discount}% (Rs. ${discount})` 
                          : `-Rs. ${discount}`}
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveVoucher}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-all active:scale-95"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              )}
              
              <div className={`border-t-2 ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                  {t('total')}
                </span>
                <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                  Rs. {total.toFixed(0)}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                speak('Proceeding to checkout');
                onNavigate('checkout' as Page);
              }}
              className={`w-full h-16 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center ${getTextClass()}`}
            >
              {t('checkout') || 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      <TimePickerModal
        isOpen={showTimePicker}
        currentTime={deliveryTime}
        onClose={() => setShowTimePicker(false)}
        onConfirm={handleTimeChange}
      />
    </div>
  );
}
