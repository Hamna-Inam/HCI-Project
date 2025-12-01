import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CategoriesPageProps {
  onNavigate: (page: Page) => void;
  onCategorySelect?: (category: string) => void;
}

export function CategoriesPage({ onNavigate, onCategorySelect }: CategoriesPageProps) {
  const { settings, speak, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();

  const categories = [
    { 
      name: t('vegetables'), 
      nameEn: 'Vegetables',
      icon: '🥬', 
      image: 'https://images.unsplash.com/photo-1549248581-cf105cd081f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwcHJvZHVjZSUyMG1hcmtldHxlbnwxfHx8fDE3NjQ1MjA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      count: 45
    },
    { 
      name: t('dairy'), 
      nameEn: 'Dairy',
      icon: '🥛', 
      image: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjQ0NzM4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      count: 28
    },
    { 
      name: t('bakery'), 
      nameEn: 'Bakery',
      icon: '🍞', 
      image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc2NDQ4MjIzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      count: 32
    },
    { 
      name: t('meat'), 
      nameEn: 'Meat',
      icon: '🥩', 
      image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMGZyZXNofGVufDF8fHx8MTc2NDUyMDU5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      count: 24
    },
    { 
      name: t('snacks'), 
      nameEn: 'Snacks',
      icon: '🍪', 
      image: 'https://images.unsplash.com/photo-1599629974232-2365495b9ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwcyUyMGNvb2tpZXN8ZW58MXx8fHwxNzY0NTE4MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      count: 56
    },
    { 
      name: t('beverages'), 
      nameEn: 'Beverages',
      icon: '🥤', 
      image: 'https://images.unsplash.com/photo-1650201920760-e5b2abd5e156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXZlcmFnZXMlMjBkcmlua3MlMjBib3R0bGVzfGVufDF8fHx8MTc2NDQzMjA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      count: 38
    },
  ];

  const handleCategoryClick = (categoryNameEn: string, categoryName: string) => {
    speak(`Browsing ${categoryName}`);
    toast.success(`Browsing ${categoryName}`, { duration: 2000 });
    if (onCategorySelect) {
      onCategorySelect(categoryNameEn);
    }
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
                {t('shopByCategory')}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {categories.length} {t('categories') || 'categories'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.nameEn, category.name)}
              className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all active:scale-95 ${settings.guidedMode ? 'min-h-[180px]' : ''}`}
            >
              <div className="relative h-40">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className={`text-white ${getTextClass()}`}>
                        {category.name}
                      </h3>
                      <p className="text-white text-sm opacity-90">
                        {category.count} {t('items')}
                      </p>
                    </div>
                    <div className={`${settings.guidedMode ? 'text-5xl' : 'text-4xl'}`}>
                      {category.icon}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Action */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md mt-6`}>
          <div className="flex items-center justify-between">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} mb-2`}>
                {t('needHelp') || 'Need help finding something?'}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                {t('tryVoiceSearch') || 'Try voice search or browse categories'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="h-14 w-14 bg-[#FACC06] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <ShoppingBag className="w-6 h-6 text-[#664D03]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}