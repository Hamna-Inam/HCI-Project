import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface FavoritesPageProps {
  onNavigate: (page: Page) => void;
}

export function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { settings, getTextClass, speak } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const [favorites, setFavorites] = useState([
    { 
      id: 1,
      name: 'Fresh Tomatoes', 
      nameUr: 'تازہ ٹماٹر', 
      price: 120, 
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1560433802-62c9db426a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjQ1MjA1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 2,
      name: 'Whole Milk 1L', 
      nameUr: 'دودھ 1 لیٹر', 
      price: 180,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlJTIwZGFpcnl8ZW58MXx8fHwxNzY0NDc5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 3,
      name: 'Fresh Bread', 
      nameUr: 'تازہ روٹی', 
      price: 90,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1555932450-31a8aec2adf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwYmFrZXJ5fGVufDF8fHx8MTc2NDQ0MzgxOXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ]);

  const handleRemoveFromFavorites = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
    speak('Removed from favorites');
    toast.success('Removed from favorites', { duration: 2000 });
  };

  const handleAddToCart = (productName: string, price: number) => {
    speak(`${productName} added to cart for Rs. ${price}`);
    toast.success(`${productName} ${t('addedToCart')}`, { duration: 2000 });
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
                {t('favorites')}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {favorites.length} {t('items')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className={`w-20 h-20 ${settings.darkMode ? 'text-gray-700' : 'text-gray-300'} mb-4`} />
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
              {t('noFavorites') || 'No favorites yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((product) => {
              const displayName = isRTL ? product.nameUr : product.name;
              
              return (
                <div 
                  key={product.id}
                  className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}
                >
                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`${settings.guidedMode ? 'w-32 h-32' : 'w-24 h-24'} rounded-xl overflow-hidden flex-shrink-0`}>
                      <ImageWithFallback 
                        src={product.image}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div>
                          <h4 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-1 ${getTextClass()}`}>
                            {displayName}
                          </h4>
                          <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Star className="w-4 h-4 fill-[#FACC06] text-[#FACC06]" />
                            <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {product.rating}
                            </span>
                          </div>
                          <p className={`${getTextClass()} ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`}>
                            Rs. {product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromFavorites(product.id)}
                          className="h-10 w-10 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg transition-all active:scale-95"
                        >
                          <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(displayName, product.price)}
                        className={`w-full h-12 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-3 ${getTextClass()}`}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        {t('addToCart') || 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
