import { useState } from 'react';
import { Search, Mic, ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DiscountBadge } from './DiscountBadge';
import { products as allProducts } from '../utils/products';
import { toast } from 'sonner@2.0.3';

interface SearchPageProps {
  onNavigate: (page: Page) => void;
}

export function SearchPage({ onNavigate }: SearchPageProps) {
  const { speak, getTextClass } = useAccessibility();
  const { language } = useLanguage();
  const [view, setView] = useState<'categories' | 'products'>('categories');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVoiceSearch = () => {
    speak('Voice search activated. Please say the product you want to find.');
  };

  const handleCategorySelect = (categoryName: string) => {
    speak(`Opening ${categoryName} products`);
    setView('products');
  };

  const handleBack = () => {
    if (view === 'products') {
      setView('categories');
    } else {
      onNavigate('home');
    }
  };

  const handleAddToCart = (productName: string) => {
    speak(`${productName} added to cart`);
    toast.success(`${productName} added to cart`, {
      duration: 2000,
    });
  };

  const categories = [
    { name: 'Vegetables & Fruits', icon: '🥬', color: '#10b981' },
    { name: 'Dairy & Eggs', icon: '🥛', color: '#3b82f6' },
    { name: 'Bakery', icon: '🍞', color: '#f59e0b' },
    { name: 'Meat & Seafood', icon: '🥩', color: '#ef4444' },
    { name: 'Snacks & Biscuits', icon: '🍪', color: '#8b5cf6' },
    { name: 'Beverages', icon: '🥤', color: '#06b6d4' },
    { name: 'Household Items', icon: '🧹', color: '#ec4899' },
    { name: 'Personal Care', icon: '🧴', color: '#14b8a6' },
  ];

  const products = allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBack}
              className="h-12 w-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-[#664D03]" />
            </button>
            <h2 className={`text-[#664D03] flex-1 ${getTextClass()}`}>
              {view === 'categories' ? 'Categories' : 'Products'}
            </h2>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 h-14 bg-[#F8F9FA] rounded-xl px-4 flex items-center gap-3 shadow-sm">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            </div>
            <button
              onClick={handleVoiceSearch}
              className="h-14 w-14 bg-[#FACC06] rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow active:scale-95"
              aria-label="Voice Search"
            >
              <Mic className="w-6 h-6 text-[#664D03]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        {view === 'categories' ? (
          /* Categories Grid */
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategorySelect(category.name)}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all active:scale-95 min-h-[160px] flex flex-col items-center justify-center gap-4"
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <span className={`text-[#664D03] text-center ${getTextClass()}`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* Products List */
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.name} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className={`text-[#664D03] mb-2 ${getTextClass()}`}>{product.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 fill-[#FACC06] text-[#FACC06]" />
                        <span className="text-[#664D03]">{product.rating}</span>
                        {!product.inStock && (
                          <span className="text-sm text-red-600 font-semibold ml-2">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-[#664D03] ${getTextClass()}`}>
                          Rs. {product.price}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              Rs. {product.originalPrice}
                            </span>
                            {product.discount && (
                              <DiscountBadge discount={product.discount} size="small" />
                            )}
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product.name)}
                        disabled={!product.inStock}
                        className="h-12 w-12 bg-[#FACC06] rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingBag className="w-5 h-5 text-[#664D03]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}