import { useState } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DiscountBadge } from './DiscountBadge';
import { AddToCartToast } from './AddToCartToast';
import { products } from '../utils/products';
import { Product } from './ProductDetailPage';
import { AnimatePresence } from 'motion/react';

interface CategoryProductsPageProps {
  category: string;
  onNavigate: (page: Page) => void;
  onProductSelect?: (product: Product) => void;
}

export function CategoryProductsPage({ category, onNavigate, onProductSelect }: CategoryProductsPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<{ name: string; image: string; quantity: number } | null>(null);

  // Filter products by category
  const categoryProducts = products.filter(p => p.category === category);

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

  const categoryIcons: { [key: string]: string } = {
    'Vegetables': '🥬',
    'Dairy': '🥛',
    'Bakery': '🍞',
    'Meat': '🥩',
    'Groceries': '🌾',
    'Household': '🧴',
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

      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => onNavigate('categories')}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{categoryIcons[category] || '📦'}</span>
              <div>
                <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                  {category}
                </h2>
                <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                  {categoryProducts.length} {t('items')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product) => {
            const displayName = isRTL ? product.nameUr : product.name;
            
            return (
              <div
                key={product.id}
                className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer`}
              >
                <div 
                  onClick={() => {
                    if (onProductSelect) {
                      onProductSelect(product);
                    }
                    onNavigate('productDetail' as Page);
                  }}
                  className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-3"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute -top-2 -left-2">
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
                      <span className={`text-gray-400 line-through text-sm`}>
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className={`w-full h-10 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">{t('addToCart')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-12 text-center shadow-md`}>
            <span className="text-6xl mb-4 block">📦</span>
            <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-2`}>
              No Products Yet
            </h3>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              We're working on adding products to this category
            </p>
            <button
              onClick={() => onNavigate('categories')}
              className="h-12 px-6 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Browse Other Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}