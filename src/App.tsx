import { useState } from 'react';
import { InitialWelcome } from './components/InitialWelcome';
import { LanguageSelect } from './components/LanguageSelect';
import { SignUpPage } from './components/SignUpPage';
import { WelcomePage } from './components/WelcomePage';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';
import { EditProfilePage } from './components/EditProfilePage';
import { FavoritesPage } from './components/FavoritesPage';
import { HelpPage } from './components/HelpPage';
import { AddressesPage } from './components/AddressesPage';
import { SearchPage } from './components/SearchPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSummaryPage } from './components/OrderSummaryPage';
import { CategoriesPage } from './components/CategoriesPage';
import { CategoryProductsPage } from './components/CategoryProductsPage';
import { OrdersPage } from './components/OrdersPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { ProductDetailPage, Product } from './components/ProductDetailPage';
import { AccessibilitySettings } from './components/AccessibilitySettings';
import { Navigation } from './components/Navigation';
import { FloatingCartButton } from './components/FloatingCartButton';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';

export type Page = 'initial' | 'language' | 'signup' | 'welcome' | 'home' | 'profile' | 'editProfile' | 'favorites' | 'help' | 'addresses' | 'search' | 'cart' | 'checkout' | 'orderSummary' | 'categories' | 'categoryProducts' | 'orders' | 'orderTracking' | 'productDetail' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('initial');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showSettingsFirst, setShowSettingsFirst] = useState(false);

  const handleInitialProceed = () => {
    setCurrentPage('language');
  };

  const handleLanguageSelect = (language: 'en' | 'ur') => {
    setCurrentPage('signup');
  };

  const handleSignUpComplete = (data: { name: string; phone: string; address: string }) => {
    // User data is now handled by UserContext in SignUpPage
    setCurrentPage('home'); // Skip welcome screen, go directly to home
  };

  const handleGetStarted = () => {
    setCurrentPage('home');
  };

  const handleSettingsSetup = () => {
    setShowSettingsFirst(true);
    setCurrentPage('settings');
  };

  const handleSettingsComplete = () => {
    setCurrentPage('home');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('categoryProducts');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'initial':
        return <InitialWelcome onProceed={handleInitialProceed} />;
      case 'language':
        return <LanguageSelect onSelect={handleLanguageSelect} />;
      case 'signup':
        return <SignUpPage onComplete={handleSignUpComplete} />;
      case 'welcome':
        return (
          <WelcomePage 
            onGetStarted={handleGetStarted}
            onSettingsSetup={handleSettingsSetup}
          />
        );
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onProductSelect={handleProductSelect} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'editProfile':
        return <EditProfilePage onNavigate={setCurrentPage} />;
      case 'favorites':
        return <FavoritesPage onNavigate={setCurrentPage} />;
      case 'help':
        return <HelpPage onNavigate={setCurrentPage} />;
      case 'addresses':
        return <AddressesPage onNavigate={setCurrentPage} />;
      case 'search':
        return <SearchPage onNavigate={setCurrentPage} />;
      case 'cart':
        return <CartPage onNavigate={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage onNavigate={setCurrentPage} />;
      case 'orderSummary':
        return <OrderSummaryPage onNavigate={setCurrentPage} />;
      case 'categories':
        return <CategoriesPage onNavigate={setCurrentPage} onCategorySelect={handleCategorySelect} />;
      case 'categoryProducts':
        return <CategoryProductsPage category={selectedCategory} onNavigate={setCurrentPage} onProductSelect={handleProductSelect} />;
      case 'orders':
        return <OrdersPage onNavigate={setCurrentPage} />;
      case 'orderTracking':
        return <OrderTrackingPage onNavigate={setCurrentPage} />;
      case 'productDetail':
        if (!selectedProduct) {
          return <HomePage onNavigate={setCurrentPage} onProductSelect={handleProductSelect} />;
        }
        return <ProductDetailPage product={selectedProduct} onNavigate={setCurrentPage} />;
      case 'settings':
        return (
          <AccessibilitySettings 
            onBack={() => setCurrentPage('profile')}
            onComplete={showSettingsFirst ? handleSettingsComplete : undefined}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} onProductSelect={handleProductSelect} />;
    }
  };

  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <UserProvider>
          <CartProvider>
            <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900">
              {renderPage()}
              {!['initial', 'language', 'signup', 'welcome', 'settings', 'editProfile', 'favorites', 'help', 'addresses', 'checkout', 'categories', 'categoryProducts', 'orders', 'orderTracking', 'productDetail'].includes(currentPage) && (
                <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
              )}
              <FloatingCartButton onNavigate={setCurrentPage} />
              <Toaster position="top-center" />
            </div>
          </CartProvider>
        </UserProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;