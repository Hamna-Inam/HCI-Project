import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface Translations {
  [key: string]: {
    en: string;
    ur: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ur: 'گھر' },
  search: { en: 'Search', ur: 'تلاش' },
  cart: { en: 'Cart', ur: 'ٹوکری' },
  profile: { en: 'Profile', ur: 'پروفائل' },
  
  // Common
  next: { en: 'Next', ur: 'اگلا' },
  back: { en: 'Back', ur: 'واپس' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  continue: { en: 'Continue', ur: 'جاری رکھیں' },
  
  // Sign Up
  nameQuestion: { en: "What's your name?", ur: 'آپ کا نام؟' },
  phoneQuestion: { en: 'Phone number?', ur: 'فون نمبر؟' },
  addressQuestion: { en: 'Delivery location?', ur: 'پتہ کہاں ہے؟' },
  enterName: { en: 'Enter your name', ur: 'نام لکھیں' },
  enterPhone: { en: '03XX XXXXXXX', ur: '03XX XXXXXXX' },
  selected: { en: 'Selected:', ur: 'منتخب:' },
  startShopping: { en: 'Start Shopping', ur: 'خریداری شروع کریں' },
  
  // Home
  hello: { en: 'Hello', ur: 'السلام علیکم' },
  whatNeed: { en: 'What do you need?', ur: 'کیا چاہیے؟' },
  searchPlaceholder: { en: 'Search...', ur: 'تلاش کریں...' },
  voiceSearch: { en: 'Voice Search', ur: 'آواز سے تلاش' },
  shopByCategory: { en: 'Shop by Category', ur: 'قسم سے خریدیں' },
  seeAll: { en: 'See All', ur: 'سب دیکھیں' },
  popularItems: { en: 'Popular Items', ur: 'مشہور چیزیں' },
  weekendSpecial: { en: 'Weekend Special', ur: 'ہفتہ کی خاص پیشکش' },
  discountText: { en: 'Get up to 30% OFF on fresh vegetables', ur: 'تازہ سبزیوں پر 30% چھوٹ' },
  shopNow: { en: 'Shop Now', ur: 'ابھی خریدیں' },
  outOfStock: { en: 'Out of Stock', ur: 'ختم' },
  addedToCart: { en: 'added to cart', ur: 'ٹوکری میں شامل' },
  
  // Categories
  vegetables: { en: 'Vegetables', ur: 'سبزیاں' },
  dairy: { en: 'Dairy', ur: 'دودھ کی مصنوعات' },
  bakery: { en: 'Bakery', ur: 'بیکری' },
  meat: { en: 'Meat', ur: 'گوشت' },
  snacks: { en: 'Snacks', ur: 'نمکین' },
  beverages: { en: 'Beverages', ur: 'مشروبات' },
  household: { en: 'Household Items', ur: 'گھر کا سامان' },
  personalCare: { en: 'Personal Care', ur: 'ذاتی نگہداشت' },
  
  // Profile
  profileTitle: { en: 'Profile', ur: 'پروفائل' },
  editInfo: { en: 'Edit Info', ur: 'معلومات بدلیں' },
  updateDetails: { en: 'Update details', ur: 'تفصیلات' },
  settings: { en: 'Settings', ur: 'ترتیبات' },
  customizeApp: { en: 'Customize app', ur: 'ایپ کو بدلیں' },
  favorites: { en: 'Favorites', ur: 'پسندیدہ' },
  savedItems: { en: 'Saved items', ur: 'محفوظ چیزیں' },
  help: { en: 'Help', ur: 'مدد' },
  support: { en: 'Support', ur: 'سپورٹ' },
  addresses: { en: 'Addresses', ur: 'پتے' },
  deliveryLocations: { en: 'Delivery locations', ur: 'ترسیل کے پتے' },
  payment: { en: 'Payment', ur: 'ادائیگی' },
  paymentOptions: { en: 'Payment options', ur: 'ادائیگی کے طریقے' },
  voiceHelp: { en: 'Voice Help', ur: 'آواز سے مدد' },
  tapToStart: { en: 'Tap to start', ur: 'شروع کریں' },
  
  // Settings
  settingsTitle: { en: 'Settings', ur: 'ترتیبات' },
  textSize: { en: 'Text Size', ur: 'حروف کا سائز' },
  darkMode: { en: 'Dark Mode', ur: 'گہرا موڈ' },
  voice: { en: 'Voice', ur: 'آواز' },
  colorVision: { en: 'Color Vision', ur: 'رنگ' },
  vibration: { en: 'Vibration', ur: 'کمپن' },
  sound: { en: 'Sound', ur: 'آواز' },
  guidedMode: { en: 'Guided Mode', ur: 'رہنمائی موڈ' },
  stepByStep: { en: 'Step by step', ur: 'آہستہ آہستہ' },
  language: { en: 'Language', ur: 'زبان' },
  
  // Cart
  cart: { en: 'Shopping Cart', ur: 'خریداری کی ٹوکری' },
  emptyCart: { en: 'Your cart is empty', ur: 'آپ کی ٹوکری خالی ہے' },
  startShopping: { en: 'Start Shopping', ur: 'خریداری شروع کریں' },
  deliveryTime: { en: 'Delivery Time', ur: 'ڈیلیوری کا وقت' },
  change: { en: 'Change', ur: 'تبدیل کریں' },
  removedFromCart: { en: 'removed from cart', ur: 'ٹوکری سے ہٹا دیا' },
  maxStock: { en: 'Max stock reached', ur: 'زیادہ سے زیادہ اسٹاک' },
  vouchers: { en: 'Apply Voucher', ur: 'واؤچر لگائیں' },
  code: { en: 'Code', ur: 'کوڈ' },
  details: { en: 'Details', ur: 'تفصیلات' },
  applied: { en: 'Applied', ur: 'لگا دیا' },
  apply: { en: 'Apply', ur: 'لگائیں' },
  subtotal: { en: 'Subtotal', ur: 'ذیلی کل' },
  deliveryFee: { en: 'Delivery Fee', ur: 'ڈیلیوری فیس' },
  total: { en: 'Total', ur: 'کل' },
  checkout: { en: 'Proceed to Checkout', ur: 'چیک آؤٹ کی طرف بڑھیں' },
  proceedingCheckout: { en: 'Proceeding to checkout', ur: 'چیک آؤٹ کی طرف بڑھ رہے ہیں' },
  
  // Checkout
  deliveryAddress: { en: 'Delivery Address', ur: 'ڈیلیوری کا پتہ' },
  tapToChange: { en: 'Tap to change', ur: 'تبدیل کرنے کے لیے ٹیپ کریں' },
  paymentMethod: { en: 'Payment Method', ur: 'ادائیگی کا طریقہ' },
  creditDebitCard: { en: 'Credit/Debit Card', ur: 'کریڈٹ/ڈیبٹ کارڈ' },
  cashOnDelivery: { en: 'Cash on Delivery', ur: 'ڈیلیوری پر نقد' },
  orderSummary: { en: 'Order Summary', ur: 'آرڈر کا خلاصہ' },
  discount: { en: 'Discount', ur: 'رعایت' },
  placeOrder: { en: 'Place Order', ur: 'آرڈر دیں' },
  continueShopping: { en: 'Continue Shopping', ur: 'خریداری جاری رکھیں' },
  selectAddress: { en: 'Select Address', ur: 'پتہ منتخب کریں' },
  dragPinToLocation: { en: 'Drag the pin to your location', ur: 'پن کو اپنے مقام پر گھسیٹیں' },
  savedAddresses: { en: 'Saved Addresses', ur: 'محفوظ شدہ پتے' },
  confirmAddress: { en: 'Confirm Address', ur: 'پتہ تصدیق کریں' },
  editPayment: { en: 'Edit Payment', ur: 'ادائیگی میں ترمیم' },
  cardNumber: { en: 'Card Number', ur: 'کارڈ نمبر' },
  cardholderName: { en: 'Cardholder Name', ur: 'کارڈ ہولڈر کا نام' },
  expiry: { en: 'Expiry', ur: 'میعاد ختم' },
  mobileNumber: { en: 'Mobile Number', ur: 'موبائل نمبر' },
  mpin: { en: 'MPIN', ur: 'ایم پن' },
  paymentUpdated: { en: 'Payment details updated!', ur: 'ادائیگی کی تفصیلات اپ ڈیٹ!' },
  
  // Voice
  voiceActivated: { en: 'Voice search activated', ur: 'آواز سے تلاش شروع' },
  speakProduct: { en: 'Please say the product', ur: 'چیز کا نام بولیں' },
  listening: { en: 'Listening...', ur: 'سن رہے ہیں...' },
  searching: { en: 'Searching for', ur: 'تلاش کر رہے ہیں' },
  voiceNotSupported: { en: 'Voice search not supported', ur: 'آواز کی تلاش دستیاب نہیں' },
  voiceError: { en: 'Please try again', ur: 'دوبارہ کوشش کریں' },
  price: { en: 'Price', ur: 'قیمت' },
  
  // Guided Mode
  guidedConfirm: { en: 'Do you want to add this?', ur: 'کیا آپ یہ شامل کرنا چاہتے ہیں؟' },
  yes: { en: 'Yes', ur: 'ہاں' },
  no: { en: 'No', ur: 'نہیں' },
  
  // Additional
  manageAddresses: { en: 'Manage', ur: 'نظمیت کریں' },
  addAnotherAddress: { en: '+ Add Another Address', ur: '+ نیا پتہ شامل کریں' },
  noFavorites: { en: 'No favorites yet', ur: 'ابھی کوئی پسندیدہ نہیں' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  commonQuestions: { en: 'Common Questions', ur: 'عام سوالات' },
  typeYourQuestion: { en: 'Type your question...', ur: 'اپنا سوال لکھیں...' },
  querySent: { en: 'Query sent!', ur: 'سوال بھیج دیا!' },
  confirmDelete: { en: 'Are you sure?', ur: 'کیا آپ واقعی چاہتے ہیں؟' },
  fillAllFields: { en: 'Please fill all fields', ur: 'تمام خانے بھریں' },
  saved: { en: 'saved', ur: 'محفوظ' },
  default: { en: 'Default', ur: 'طے شدہ' },
  addNewAddress: { en: 'Add New Address', ur: 'نیا پتہ شامل کریں' },
  label: { en: 'Label', ur: 'لیبل' },
  home: { en: 'Home', ur: 'گھر' },
  office: { en: 'Office', ur: 'دفتر' },
  cancel: { en: 'Cancel', ur: 'منسوخ کریں' },
  add: { en: 'Add', ur: 'شامل کریں' },
  
  // Categories
  categories: { en: 'categories', ur: 'اقسام' },
  needHelp: { en: 'Need help finding something?', ur: 'کچھ تلاش کرنے میں مدد چاہیے؟' },
  tryVoiceSearch: { en: 'Try voice search or browse categories', ur: 'آواز سے تلاش یا اقسام دیکھیں' },
  
  // Orders
  myOrders: { en: 'My Orders', ur: 'میرے آرڈرز' },
  orders: { en: 'orders', ur: 'آرڈرز' },
  items: { en: 'items', ur: 'اشیاء' },
  status: { en: 'Status', ur: 'حالت' },
  findingRider: { en: 'Finding Rider', ur: 'رائیڈر تلاش' },
  preparing: { en: 'Preparing', ur: 'تیاری جاری' },
  pickedUp: { en: 'Picked Up', ur: 'اٹھایا گیا' },
  delivered: { en: 'Delivered', ur: 'ڈیلیور ہوگیا' },
  noOrders: { en: 'No orders yet', ur: 'ابھی تک کوئی آرڈر نہیں' },
  trackOrder: { en: 'Track Order', ur: 'آرڈر ٹریک کریں' },
  estimatedTime: { en: 'Estimated time', ur: 'تخمینی وقت' },
  orderProgress: { en: 'Order Progress', ur: 'آرڈر کی پیش رفت' },
  riderInfo: { en: 'Rider Information', ur: 'رائیڈر کی معلومات' },
  orderItems: { en: 'Order Items', ur: 'آرڈر کی اشیاء' },
  qty: { en: 'Qty', ur: 'مقدار' },
  orderAgain: { en: 'Order Again', ur: 'دوبارہ آرڈر کریں' },
  
  // Product Detail
  reviews: { en: 'reviews', ur: 'جائزے' },
  inStock: { en: 'In Stock', ur: 'دستیاب' },
  description: { en: 'Description', ur: 'تفصیل' },
  nutritionInfo: { en: 'Nutrition Information', ur: 'غذائی معلومات' },
  calories: { en: 'Calories', ur: 'کیلوریز' },
  protein: { en: 'Protein', ur: 'پروٹین' },
  fat: { en: 'Fat', ur: 'چربی' },
  carbs: { en: 'Carbs', ur: 'کاربوہائیڈریٹ' },
  
  // Tutorial
  skip: { en: 'Skip', ur: 'چھوڑیں' },
  getStarted: { en: 'Get Started', ur: 'شروع کریں' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'krave-mart-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Load from localStorage on initial mount
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'ur') {
          return stored;
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    }
    return 'en';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-noto-nastaliq' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}