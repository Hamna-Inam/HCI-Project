import { useState } from 'react';
import { ArrowLeft, Edit2, Trash2, MapPin, Plus } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface Address {
  id: number;
  label: string;
  labelUr: string;
  address: string;
  isDefault: boolean;
}

interface AddressesPageProps {
  onNavigate: (page: Page) => void;
}

export function AddressesPage({ onNavigate }: AddressesPageProps) {
  const { settings, getTextClass, speak } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const [addresses, setAddresses] = useState<Address[]>([
    { 
      id: 1, 
      label: 'Home', 
      labelUr: 'گھر',
      address: '123 Main Street, Karachi', 
      isDefault: true 
    },
    { 
      id: 2, 
      label: 'Office', 
      labelUr: 'دفتر',
      address: '456 Business Park, Lahore', 
      isDefault: false 
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });

  const handleEdit = (id: number, currentAddress: string) => {
    setEditingId(id);
    setEditText(currentAddress);
    speak('Edit mode activated');
  };

  const handleSaveEdit = (id: number) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, address: editText } : addr
    ));
    setEditingId(null);
    speak('Address updated');
    toast.success('Address updated!', { duration: 2000 });
  };

  const handleDelete = (id: number) => {
    if (settings.guidedMode) {
      if (!confirm(t('confirmDelete') || 'Are you sure you want to delete this address?')) {
        return;
      }
    }
    
    setAddresses(addresses.filter(addr => addr.id !== id));
    speak('Address deleted');
    toast.success('Address deleted', { duration: 2000 });
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      toast.error(t('fillAllFields') || 'Please fill all fields', { duration: 2000 });
      return;
    }

    const newAddr: Address = {
      id: Date.now(),
      label: newAddress.label,
      labelUr: newAddress.label, // In real app, would have translation
      address: newAddress.address,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddr]);
    setShowAddDialog(false);
    setNewAddress({ label: '', address: '' });
    speak('New address added');
    toast.success('Address added!', { duration: 2000 });
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
                {t('addresses')}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {addresses.length} {t('saved') || 'saved'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div 
              key={addr.id}
              className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}
            >
              <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#FACC06] bg-opacity-20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#664D03]" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} ${getTextClass()} flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {isRTL ? addr.labelUr : addr.label}
                      {addr.isDefault && (
                        <span className="text-xs bg-[#FACC06] text-[#664D03] px-2 py-1 rounded">
                          {t('default') || 'Default'}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => editingId === addr.id ? handleSaveEdit(addr.id) : handleEdit(addr.id, addr.address)}
                    className="h-10 w-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95"
                  >
                    <Edit2 className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="h-10 w-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
              
              {editingId === addr.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  dir="ltr"
                  className={`w-full h-12 px-4 rounded-xl border-2 border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
                  autoFocus
                />
              ) : (
                <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} ${isRTL ? 'text-right' : 'text-left'}`} dir="ltr">
                  {addr.address}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Add New Address Button */}
        <button
          onClick={() => setShowAddDialog(true)}
          className="w-full h-16 border-2 border-dashed border-[#FACC06] rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FACC06] hover:bg-opacity-10 transition-all active:scale-95"
        >
          <Plus className="w-6 h-6 text-[#664D03]" />
          <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'} ${getTextClass()}`}>
            {t('addAnotherAddress') || 'Add New Address'}
          </span>
        </button>
      </div>

      {/* Add Address Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 max-w-md w-full shadow-2xl`}>
            <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} text-xl mb-6 ${getTextClass()}`}>
              {t('addNewAddress') || 'Add New Address'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                  {t('label') || 'Label'} ({t('home') || 'Home'}, {t('office') || 'Office'}, etc.)
                </label>
                <input
                  type="text"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  placeholder={t('home') || 'Home'}
                  className={`w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none`}
                />
              </div>
              
              <div>
                <label className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 block`}>
                  {t('addressQuestion')}
                </label>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  placeholder="123 Main Street, City"
                  dir="ltr"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FACC06] ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#664D03]'} outline-none resize-none`}
                />
              </div>
            </div>

            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setShowAddDialog(false)}
                className="flex-1 h-14 bg-gray-300 text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                {t('cancel') || 'Cancel'}
              </button>
              <button
                onClick={handleAddAddress}
                className="flex-1 h-14 bg-[#FACC06] text-[#664D03] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                {t('add') || 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
