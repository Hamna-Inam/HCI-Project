import { useState } from 'react';
import { Search, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VoiceSearchButton } from './VoiceSearchButton';
import { DiscountBadge } from './DiscountBadge';
import { AddToCartToast } from './AddToCartToast';
import { products } from '../utils/products';
import { Product } from './ProductDetailPage';
import { AnimatePresence } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onProductSelect?: (product: Product) => void;
}

export function HomePage({ onNavigate, onProductSelect }: HomePageProps) {
  const { speak, getTextClass, settings } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<{ name: string; image: string; quantity: number } | null>(null);

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
    speak(`${t('searching')} ${text}`);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    const displayName = isRTL ? product.nameUr : product.name;
    speak(`${displayName} ${t('addedToCart')}`);
    
    // Show custom toast
    setToastData({
      name: displayName,
      image: product.image,
      quantity: quantity
    });
    setShowToast(true);
    
    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const categories = [
    { name: t('vegetables'), icon: '🥬', nameEn: 'Vegetables', color: 'from-green-400 to-emerald-600' },
    { name: t('dairy'), icon: '🥛', nameEn: 'Dairy', color: 'from-blue-400 to-cyan-600' },
    { name: t('bakery'), icon: '🍞', nameEn: 'Bakery', color: 'from-amber-400 to-orange-600' },
    { name: t('meat'), icon: '🥩', nameEn: 'Meat', color: 'from-red-400 to-rose-600' },
    { name: t('snacks'), icon: '🍪', nameEn: 'Snacks', color: 'from-purple-400 to-pink-600' },
    { name: t('beverages'), icon: '🥤', nameEn: 'Beverages', color: 'from-sky-400 to-blue-600' },
  ];

  // Group products by category
  const productsByCategory = {
    Vegetables: products.filter(p => p.category === 'Vegetables'),
    Dairy: products.filter(p => p.category === 'Dairy'),
    Bakery: products.filter(p => p.category === 'Bakery'),
    Meat: products.filter(p => p.category === 'Meat'),
    Groceries: products.filter(p => p.category === 'Groceries'),
    Household: products.filter(p => p.category === 'Household'),
  };

  // Get featured/discounted products
  const featuredProducts = products.filter(p => p.discount).slice(0, 6);

  const renderProductCard = (product: Product) => {
    const displayName = isRTL ? product.nameUr : product.name;
    
    return (
      <div
        key={product.id}
        onClick={() => {
          if (onProductSelect) {
            onProductSelect(product);
          }
          onNavigate('productDetail' as Page);
        }}
        className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer flex-shrink-0 ${settings.guidedMode ? 'w-72' : 'w-64'}`}
      >
        <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
          <ImageWithFallback
            src={product.image}
            alt={displayName}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute top-2 right-2">
              <DiscountBadge discount={product.discount} size="medium" />
            </div>
          )}
        </div>
        <div>
          <h4 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-2 ${getTextClass()} truncate`}>
            {displayName}
          </h4>
          <div className={`flex items-baseline gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
              Rs. {product.price}
            </span>
            {product.originalPrice && (
              <span className={`text-sm ${settings.darkMode ? 'text-gray-500' : 'text-gray-400'} line-through`}>
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            disabled={!product.inStock}
            className={`w-full ${settings.guidedMode ? 'h-12' : 'h-10'} bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-24`}>
      {/* Add to Cart Toast */}
      <AnimatePresence>
        {showToast && toastData && (
          <AddToCartToast
            productName={toastData.name}
            productImage={toastData.image}
            quantity={toastData.quantity}
            onNavigate={onNavigate}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>

      {/* Premium Header - Clean & Minimal */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto p-4">
          {/* Search Bar */}
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => onNavigate('search')}
              className={`flex-1 ${settings.guidedMode ? 'h-16' : 'h-14'} ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-2xl px-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Search className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">{t('searchPlaceholder')}</span>
            </button>
            <VoiceSearchButton onResult={handleVoiceSearchResult} />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 space-y-8 mt-6">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-56">
          <img 
            src="https://images.unsplash.com/photo-1741517287225-7cd8d44b3cf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwdmVnZXRhYmxlcyUyMG1hcmtldCUyMGNvbG9yZnVsJTIwZnJlc2glMjBwcm9kdWNlfGVufDF8fHx8MTc2NDU2MDM2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fresh Vegetables"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#FACC06]" />
              <p className="text-[#FACC06] text-sm font-medium">Fresh Arrivals</p>
            </div>
            <h3 className="text-white text-3xl mb-2">Up to 40% Off</h3>
            <p className="text-white/90 text-sm mb-4">On fresh vegetables & fruits</p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-[#FACC06] text-[#664D03] px-6 py-3 rounded-xl w-fit shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Shop Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Grid - Premium Design */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-2xl`}>
              {t('shopByCategory')}
            </h2>
            <button
              onClick={() => onNavigate('categories')}
              className={`text-sm ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} flex items-center gap-1 hover:gap-2 transition-all`}
            >
              {t('viewAll')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => onNavigate('categories')}
                className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3 ${settings.guidedMode ? 'min-h-[120px]' : 'min-h-[100px]'}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <span className={`text-sm ${settings.darkMode ? 'text-white' : 'text-[#664D03]'} text-center`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Deals */}
        {featuredProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#FACC06]" />
              <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-2xl`}>
                {t('specialDeals') || 'Special Deals'}
              </h2>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-4 pb-4">
                {featuredProducts.map(renderProductCard)}
              </div>
            </div>
          </div>
        )}

        {/* Products by Category - Better Organized */}
        {Object.entries(productsByCategory).map(([categoryName, categoryProducts]) => {
          if (categoryProducts.length === 0) return null;
          
          const category = categories.find(c => c.nameEn === categoryName);
          
          return (
            <div key={categoryName}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {category && <span className="text-3xl">{category.icon}</span>}
                  <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-2xl`}>
                    {category ? category.name : categoryName}
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('categories')}
                  className={`text-sm ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} flex items-center gap-1 hover:gap-2 transition-all`}
                >
                  {t('viewAll')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-4 pb-4">
                  {categoryProducts.map(renderProductCard)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}