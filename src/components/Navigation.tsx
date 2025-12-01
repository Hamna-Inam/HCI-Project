import { Home, Search, ShoppingCart, User, Package } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { speak, settings } = useAccessibility();

  const navItems = [
    { page: 'home' as Page, icon: Home, label: 'Home' },
    { page: 'search' as Page, icon: Search, label: 'Search' },
    { page: 'orders' as Page, icon: Package, label: 'Orders' },
    { page: 'cart' as Page, icon: ShoppingCart, label: 'Cart' },
    { page: 'profile' as Page, icon: User, label: 'Profile' },
  ];

  const handleNavClick = (page: Page, label: string) => {
    speak(`Navigating to ${label}`);
    onNavigate(page);
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} border-t-2 ${settings.darkMode ? 'border-gray-700' : 'border-[#F8F9FA]'} shadow-2xl z-50`}>
      <div className="max-w-screen-xl mx-auto px-1">
        <div className={`flex items-center justify-around ${settings.guidedMode ? 'h-24' : 'h-20'}`}>
          {navItems.map(({ page, icon: Icon, label }) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => handleNavClick(page, label)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${settings.guidedMode ? 'min-w-[70px] h-20' : 'min-w-[60px] h-16'} ${
                  isActive
                    ? 'bg-[#FACC06] shadow-md'
                    : settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#F8F9FA]'
                }`}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={`${settings.guidedMode ? 'w-7 h-7' : 'w-6 h-6'} ${
                    isActive ? 'text-[#664D03]' : settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <span
                  className={`text-xs ${
                    isActive ? 'text-[#664D03] font-semibold' : settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
