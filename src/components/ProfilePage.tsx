import { ChevronRight, User, MapPin, Heart, HelpCircle, Settings, Edit2 } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { settings, getTextClass } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const { userData } = useUser();

  const menuItems = [
    { icon: Edit2, label: t('editProfile'), labelUr: 'پروفائل میں ترمیم', page: 'editProfile' as Page, color: 'text-blue-500' },
    { icon: Heart, label: t('favorites'), labelUr: 'پسندیدہ', page: 'favorites' as Page, color: 'text-red-500' },
    { icon: MapPin, label: t('addresses'), labelUr: 'پتے', page: 'addresses' as Page, color: 'text-green-500' },
    { icon: HelpCircle, label: t('help'), labelUr: 'مدد', page: 'help' as Page, color: 'text-orange-500' },
    { icon: Settings, label: t('settings'), labelUr: 'ترتیبات', page: 'settings' as Page, color: 'text-gray-500' },
  ];

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-[#F8F9FA]'} pb-24`}>
      {/* Header */}
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="max-w-screen-xl mx-auto">
          <h2 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
            {t('profileTitle')}
          </h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* User Info Card */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-[#FACC06] rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-[#664D03]" />
            </div>
            <div>
              <h3 className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
                {userData.name || 'Guest User'}
              </h3>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {userData.phone || 'No phone number'}
              </p>
            </div>
          </div>
          {userData.address && (
            <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#F8F9FA]'} rounded-xl p-4`}>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-1`}>
                📍 {t('addresses')}
              </p>
              <p className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                {userData.address}
              </p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => onNavigate(item.page)}
                className={`w-full ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md hover:shadow-lg transition-all active:scale-95 ${settings.guidedMode ? 'min-h-[100px]' : ''}`}
              >
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`${settings.guidedMode ? 'w-16 h-16' : 'w-12 h-12'} bg-[#FACC06] bg-opacity-20 rounded-xl flex items-center justify-center`}>
                      <Icon className={`${settings.guidedMode ? 'w-8 h-8' : 'w-6 h-6'} ${item.color}`} />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()}`}>
                        {isRTL ? item.labelUr : item.label}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className={`w-6 h-6 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
