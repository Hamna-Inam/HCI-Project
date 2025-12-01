import { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DiscountBadge } from './DiscountBadge';
import { toast } from 'sonner@2.0.3';

export interface Product {
  id: string;
  name: string;
  nameUr: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  categoryUr: string;
  description: string;
  descriptionUr: string;
  unit: string;
  unitUr: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  nutritionInfo?: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  };
}

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: Page) => void;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export function ProductDetailPage({ product, onNavigate, onAddToCart }: ProductDetailPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
    }
    speak(`Added ${quantity} ${product.name} to cart`);
    toast.success(`${quantity}x ${product.name} added to cart!`, { duration: 2000 });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    speak(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites!', { duration: 2000 });
  };

  const handleShare = () => {
    speak('Sharing product');
    toast.success('Product link copied!', { duration: 2000 });
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      speak(`Quantity ${quantity + 1}`);
    } else {
      toast.error('Maximum 10 items', { duration: 2000 });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      speak(`Quantity ${quantity - 1}`);
    }
  };

  const displayName = isRTL ? product.nameUr : product.name;
  const displayCategory = isRTL ? product.categoryUr : product.category;
  const displayDescription = isRTL ? product.descriptionUr : product.description;
  const displayUnit = isRTL ? product.unitUr : product.unit;

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-32`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 sticky top-0 z-20`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => onNavigate('home')}
              className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
            >
              <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
              >
                <Share2 className={`w-5 h-5 ${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} />
              </button>
              <button
                onClick={handleFavorite}
                className={`h-12 w-12 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95`}
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'}`} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* Product Image */}
        <div className={`relative ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={displayName}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 right-4">
                <DiscountBadge discount={product.discount} size="large" />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Product Info */}
          <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
            {/* Category Badge */}
            <div className="mb-3">
              <span className={`inline-block px-4 py-1 rounded-full text-sm ${settings.darkMode ? 'bg-gray-700 text-[#FACC06]' : 'bg-[#FACC06] bg-opacity-20 text-[#664D03]'}`}>
                {displayCategory}
              </span>
            </div>

            {/* Product Name */}
            <h1 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-3`}>
              {displayName}
            </h1>

            {/* Rating */}
            <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                {product.rating} ({product.reviews} {t('reviews') || 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${settings.guidedMode ? 'text-4xl' : 'text-3xl'}`} style={{ fontWeight: 800 }}>
                Rs. {product.price}
              </span>
              {product.originalPrice && (
                <span className={`${settings.darkMode ? 'text-gray-500' : 'text-gray-400'} text-xl line-through`}>
                  Rs. {product.originalPrice}
                </span>
              )}
              <span className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                / {displayUnit}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mt-4">
              {product.inStock ? (
                <span className="text-green-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {t('inStock') || 'In Stock'}
                </span>
              ) : (
                <span className="text-red-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  {t('outOfStock')}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
            <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-3`}>
              {t('description') || 'Description'}
            </h2>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {displayDescription}
            </p>
          </div>

          {/* Nutrition Info */}
          {product.nutritionInfo && (
            <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
              <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-4`}>
                {t('nutritionInfo') || 'Nutrition Information'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4`}>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-1`}>
                    {t('calories') || 'Calories'}
                  </p>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                    {product.nutritionInfo.calories}
                  </p>
                </div>
                <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4`}>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-1`}>
                    {t('protein') || 'Protein'}
                  </p>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                    {product.nutritionInfo.protein}
                  </p>
                </div>
                <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4`}>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-1`}>
                    {t('fat') || 'Fat'}
                  </p>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                    {product.nutritionInfo.fat}
                  </p>
                </div>
                <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4`}>
                  <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-1`}>
                    {t('carbs') || 'Carbs'}
                  </p>
                  <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                    {product.nutritionInfo.carbs}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Add to Cart */}
      <div className={`fixed bottom-0 left-0 right-0 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl p-6 border-t-2 border-[#FACC06]`}>
        <div className="max-w-screen-xl mx-auto">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Quantity Selector */}
            <div className={`flex items-center ${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-2xl p-2 ${settings.guidedMode ? 'h-20' : 'h-16'}`}>
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className={`${settings.guidedMode ? 'w-16 h-16' : 'w-12 h-12'} bg-[#FACC06] rounded-xl flex items-center justify-center hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Minus className={`${settings.guidedMode ? 'w-6 h-6' : 'w-5 h-5'} text-[#664D03]`} />
              </button>
              <span className={`${settings.guidedMode ? 'w-16' : 'w-12'} text-center ${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= 10}
                className={`${settings.guidedMode ? 'w-16 h-16' : 'w-12 h-12'} bg-[#FACC06] rounded-xl flex items-center justify-center hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Plus className={`${settings.guidedMode ? 'w-6 h-6' : 'w-5 h-5'} text-[#664D03]`} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 ${settings.guidedMode ? 'h-20' : 'h-16'} bg-[#FACC06] text-[#664D03] rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${getTextClass()} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ShoppingCart className={`${settings.guidedMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
              {product.inStock ? (
                <>
                  {t('addToCart')} - Rs. {product.price * quantity}
                </>
              ) : (
                t('outOfStock')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
