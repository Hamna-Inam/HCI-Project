import { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Edit2, ChevronRight, ShoppingBag } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
}

type PaymentMethod = 'card' | 'jazzcash' | 'easypaisa' | 'cod';

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main Street, Karachi');
  const [showMapSelector, setShowMapSelector] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [showPaymentEdit, setShowPaymentEdit] = useState(false);

  // Payment Details
  const [cardDetails, setCardDetails] = useState({
    number: '**** **** **** 1234',
    name: 'Ahmed Ali',
    expiry: '12/25',
    cvv: '***',
  });

  const [jazzCashDetails, setJazzCashDetails] = useState({
    number: '03XX XXXXXXX',
    pin: '****',
  });

  const [easypaisaDetails, setEasypaisaDetails] = useState({
    number: '03XX XXXXXXX',
    pin: '****',
  });

  const handleAddressClick = () => {
    setShowMapSelector(true);
    speak('Opening map selector');
  };

  const handleMapAddressSelect = (newAddress: string) => {
    setDeliveryAddress(newAddress);
    setShowMapSelector(false);
    speak('Address updated');
    toast.success('Address updated!', { duration: 2000 });
  };

  const handlePlaceOrder = () => {
    speak('Order placed successfully');
    toast.success('Order placed successfully! 🎉', { duration: 3000 });
    setTimeout(() => onNavigate('orderSummary'), 1500);
  };

  const orderSummary = {
    subtotal: 420,
    deliveryFee: 50,
    discount: 84,
    total: 386,
  };

  if (showMapSelector) {
    return (
      <MapAddressSelector
        currentAddress={deliveryAddress}
        onConfirm={handleMapAddressSelect}
        onCancel={() => setShowMapSelector(false)}
      />
    );
  }

  if (showPaymentEdit) {
    return (
      <PaymentEditPage
        paymentMethod={selectedPayment}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
        jazzCashDetails={jazzCashDetails}
        setJazzCashDetails={setJazzCashDetails}
        easypaisaDetails={easypaisaDetails}
        setEasypaisaDetails={setEasypaisaDetails}
        onBack={() => setShowPaymentEdit(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-96`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => onNavigate('cart')}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
              {t('checkout') || 'Checkout'}
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Delivery Address - Clickable */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
            {t('deliveryAddress') || 'Delivery Address'}
          </h3>
          <button
            onClick={handleAddressClick}
            className={`w-full ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4 transition-all hover:shadow-md active:scale-95`}
          >
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-[#FACC06] bg-opacity-20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#664D03]" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`} dir="ltr">
                    {deliveryAddress}
                  </p>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                    {t('tapToChange') || 'Tap to change'}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </button>
        </div>

        {/* Payment Methods */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
            {t('paymentMethod') || 'Payment Method'}
          </h3>
          
          <div className="space-y-3">
            {/* Credit/Debit Card */}
            <div
              onClick={() => setSelectedPayment('card')}
              className={`w-full ${
                selectedPayment === 'card'
                  ? 'bg-[#FACC06] bg-opacity-20 border-2 border-[#FACC06]'
                  : settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'
              } rounded-xl p-4 transition-all cursor-pointer`}
            >
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CreditCard className="w-6 h-6 text-[#664D03]" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                      {t('creditDebitCard') || 'Credit/Debit Card'}
                    </p>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} dir="ltr">
                      {cardDetails.number}
                    </p>
                  </div>
                </div>
                {selectedPayment === 'card' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPaymentEdit(true);
                    }}
                    className="h-10 w-10 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-all"
                  >
                    <Edit2 className="w-5 h-5 text-[#664D03] dark:text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* JazzCash */}
            <div
              onClick={() => setSelectedPayment('jazzcash')}
              className={`w-full ${
                selectedPayment === 'jazzcash'
                  ? 'bg-[#FACC06] bg-opacity-20 border-2 border-[#FACC06]'
                  : settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'
              } rounded-xl p-4 transition-all cursor-pointer`}
            >
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-3xl">💳</div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                      JazzCash
                    </p>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} dir="ltr">
                      {jazzCashDetails.number}
                    </p>
                  </div>
                </div>
                {selectedPayment === 'jazzcash' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPaymentEdit(true);
                    }}
                    className="h-10 w-10 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-all"
                  >
                    <Edit2 className="w-5 h-5 text-[#664D03] dark:text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Easypaisa */}
            <div
              onClick={() => setSelectedPayment('easypaisa')}
              className={`w-full ${
                selectedPayment === 'easypaisa'
                  ? 'bg-[#FACC06] bg-opacity-20 border-2 border-[#FACC06]'
                  : settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'
              } rounded-xl p-4 transition-all cursor-pointer`}
            >
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-3xl">📱</div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                      Easypaisa
                    </p>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`} dir="ltr">
                      {easypaisaDetails.number}
                    </p>
                  </div>
                </div>
                {selectedPayment === 'easypaisa' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPaymentEdit(true);
                    }}
                    className="h-10 w-10 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-all"
                  >
                    <Edit2 className="w-5 h-5 text-[#664D03] dark:text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setSelectedPayment('cod')}
              className={`w-full ${
                selectedPayment === 'cod'
                  ? 'bg-[#FACC06] bg-opacity-20 border-2 border-[#FACC06]'
                  : settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'
              } rounded-xl p-4 transition-all cursor-pointer`}
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-3xl">💵</div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                    {t('cashOnDelivery') || 'Cash on Delivery'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
            {t('orderSummary') || 'Order Summary'}
          </h3>
          <div className="space-y-3">
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {t('subtotal')}
              </span>
              <span className={settings.darkMode ? 'text-white' : 'text-[#664D03]'}>
                Rs. {orderSummary.subtotal}
              </span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {t('deliveryFee')}
              </span>
              <span className={settings.darkMode ? 'text-white' : 'text-[#664D03]'}>
                Rs. {orderSummary.deliveryFee}
              </span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-green-600">{t('discount')}</span>
              <span className="text-green-600">-Rs. {orderSummary.discount}</span>
            </div>
            <div className={`border-t-2 ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3 flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                {t('total')}
              </span>
              <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                Rs. {orderSummary.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`fixed bottom-20 left-0 right-0 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl p-6 border-t-2 border-[#FACC06]`}>
        <div className="max-w-screen-xl mx-auto space-y-3">
          <button
            onClick={handlePlaceOrder}
            className={`w-full h-16 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center ${getTextClass()}`}
          >
            {t('placeOrder') || 'Place Order'} - Rs. {orderSummary.total}
          </button>
          <button
            onClick={() => onNavigate('categories' as Page)}
            className={`w-full h-14 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} text-[#664D03] ${settings.darkMode ? 'dark:text-white' : ''} rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
          >
            <ShoppingBag className="w-5 h-5" />
            {t('continueShopping') || 'Continue Shopping'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Map Address Selector Component
function MapAddressSelector({ 
  currentAddress, 
  onConfirm, 
  onCancel 
}: { 
  currentAddress: string; 
  onConfirm: (address: string) => void; 
  onCancel: () => void;
}) {
  const { settings, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(currentAddress);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPinPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const addresses = [
    '123 Main Street, Karachi',
    '456 Business Park, Lahore',
    '789 Garden Road, Islamabad',
    '321 Market Avenue, Rawalpindi',
  ];

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'}`}>
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onCancel}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
              {t('selectAddress') || 'Select Address'}
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Interactive Map */}
        <div 
          className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl relative overflow-hidden shadow-lg cursor-move"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          
          {/* Map Details */}
          <div className="absolute top-4 left-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#664D03]" />
              <span>{t('dragPinToLocation') || 'Drag the pin to your location'}</span>
            </div>
          </div>

          {/* Roads (visual elements) */}
          <div className="absolute top-1/3 left-0 right-0 h-8 bg-gray-400 opacity-30" />
          <div className="absolute top-0 bottom-0 left-1/2 w-8 bg-gray-400 opacity-30" />

          {/* Draggable Pin */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-move hover:scale-110 transition-transform select-none"
            style={{ left: `${pinPosition.x}%`, top: `${pinPosition.y}%` }}
            onMouseDown={handleMouseDown}
          >
            <MapPin className="w-14 h-14 text-red-500 fill-red-200 drop-shadow-lg" />
          </div>

          {/* Landmarks */}
          <div className="absolute top-1/4 left-1/4 text-2xl">🏪</div>
          <div className="absolute top-2/3 left-3/4 text-2xl">🏢</div>
          <div className="absolute bottom-1/4 right-1/4 text-2xl">🏥</div>
        </div>

        {/* Suggested Addresses */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
            {t('savedAddresses') || 'Saved Addresses'}
          </h3>
          <div className="space-y-2">
            {addresses.map((addr, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAddress(addr)}
                className={`w-full p-4 rounded-xl transition-all active:scale-95 ${
                  selectedAddress === addr
                    ? 'bg-[#FACC06] bg-opacity-20 border-2 border-[#FACC06]'
                    : settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'
                } ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`} dir="ltr">
                  {addr}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => onConfirm(selectedAddress)}
          className={`w-full h-16 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center ${getTextClass()}`}
        >
          {t('confirmAddress') || 'Confirm Address'}
        </button>
      </div>
    </div>
  );
}

// Payment Edit Component
function PaymentEditPage({
  paymentMethod,
  cardDetails,
  setCardDetails,
  jazzCashDetails,
  setJazzCashDetails,
  easypaisaDetails,
  setEasypaisaDetails,
  onBack,
}: any) {
  const { settings, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();

  const handleSave = () => {
    toast.success(t('paymentUpdated') || 'Payment details updated!', { duration: 2000 });
    onBack();
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'}`}>
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onBack}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
              {t('editPayment') || 'Edit Payment'}
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                {t('cardNumber') || 'Card Number'}
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
                dir="ltr"
                className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
              />
            </div>

            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                {t('cardholderName') || 'Cardholder Name'}
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
                <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                  {t('expiry') || 'Expiry'}
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  placeholder="MM/YY"
                  dir="ltr"
                  className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
                />
              </div>

              <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
                <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                  dir="ltr"
                  maxLength={3}
                  className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'jazzcash' && (
          <div className="space-y-4">
            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                {t('mobileNumber') || 'Mobile Number'}
              </label>
              <input
                type="tel"
                value={jazzCashDetails.number}
                onChange={(e) => setJazzCashDetails({ ...jazzCashDetails, number: e.target.value })}
                placeholder="03XX XXXXXXX"
                dir="ltr"
                className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
              />
            </div>

            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                {t('mpin') || 'MPIN'}
              </label>
              <input
                type="password"
                value={jazzCashDetails.pin}
                onChange={(e) => setJazzCashDetails({ ...jazzCashDetails, pin: e.target.value })}
                placeholder="****"
                maxLength={4}
                dir="ltr"
                className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
              />
            </div>
          </div>
        )}

        {paymentMethod === 'easypaisa' && (
          <div className="space-y-4">
            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                {t('mobileNumber') || 'Mobile Number'}
              </label>
              <input
                type="tel"
                value={easypaisaDetails.number}
                onChange={(e) => setEasypaisaDetails({ ...easypaisaDetails, number: e.target.value })}
                placeholder="03XX XXXXXXX"
                dir="ltr"
                className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
              />
            </div>

            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                {t('mpin') || 'MPIN'}
              </label>
              <input
                type="password"
                value={easypaisaDetails.pin}
                onChange={(e) => setEasypaisaDetails({ ...easypaisaDetails, pin: e.target.value })}
                placeholder="****"
                maxLength={4}
                dir="ltr"
                className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          className={`w-full h-16 bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center ${getTextClass()}`}
        >
          {t('save')}
        </button>
      </div>
    </div>
  );
}