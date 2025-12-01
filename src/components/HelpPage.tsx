import { useState } from 'react';
import { ArrowLeft, Mic, Send, MessageCircle } from 'lucide-react';
import { Page } from '../App';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface HelpPageProps {
  onNavigate: (page: Page) => void;
}

export function HelpPage({ onNavigate }: HelpPageProps) {
  const { settings, getTextClass, speak } = useAccessibility();
  const { t, isRTL, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', text: string }>>([
    { type: 'bot', text: language === 'ur' ? 'آپ کی کیسے مدد کر سکتے ہیں؟' : 'How can we help you today?' }
  ]);

  const handleVoiceQuery = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak('Voice input not supported');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      speak(t('listening'));
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setQuery(transcript);
      handleSubmitQuery(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      speak('Please try again');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSubmitQuery = (queryText?: string) => {
    const text = queryText || query;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text }]);
    
    // Simulate bot response
    setTimeout(() => {
      const response = language === 'ur' 
        ? 'شکریہ! ہماری ٹیم جلد آپ سے رابطہ کرے گی۔'
        : 'Thank you! Our support team will contact you shortly.';
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      speak(response);
    }, 1000);

    setQuery('');
    toast.success(t('querySent') || 'Query sent!', { duration: 2000 });
  };

  const commonQuestions = [
    { q: 'View Tutorial', qUr: 'ٹیوٹوریل دیکھیں', action: () => onNavigate('tutorial') },
    { q: 'How to track my order?', qUr: 'میرا آرڈر کیسے ٹریک کریں؟' },
    { q: 'Payment options?', qUr: 'ادائیگی کے طریقے؟' },
    { q: 'Delivery time?', qUr: 'ڈیلیوری کا وقت؟' },
    { q: 'Return policy?', qUr: 'واپسی کی پالیسی؟' },
  ];

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
                {t('help')}
              </h2>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {t('support')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Chat Messages */}
        <div className="space-y-3 min-h-[400px]">
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex ${msg.type === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.type === 'user'
                  ? 'bg-[#FACC06] text-[#664D03]'
                  : settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-[#664D03]'
              } shadow-md`}>
                {msg.type === 'bot' && (
                  <MessageCircle className="w-5 h-5 mb-2 text-[#FACC06]" />
                )}
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Common Questions */}
        <div>
          <h3 className={`${settings.darkMode ? 'text-[#FACC06]' : 'text-[#664D03]'} mb-3 ${getTextClass()}`}>
            {t('commonQuestions') || 'Common Questions'}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {commonQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.action ? item.action() : handleSubmitQuery(isRTL ? item.qUr : item.q)}
                className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left ${isRTL ? 'text-right' : ''}`}
              >
                <span className={`${settings.darkMode ? 'text-white' : 'text-[#664D03]'}`}>
                  {isRTL ? item.qUr : item.q}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md sticky bottom-20`}>
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitQuery()}
              placeholder={t('typeYourQuestion') || 'Type your question...'}
              className={`flex-1 h-14 px-4 rounded-xl ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-[#F8F9FA] text-[#664D03]'} outline-none`}
            />
            <button
              onClick={handleVoiceQuery}
              className={`h-14 w-14 bg-[#FACC06] bg-opacity-20 rounded-xl flex items-center justify-center hover:bg-opacity-30 transition-all active:scale-95 ${isListening ? 'animate-pulse' : ''}`}
            >
              <Mic className={`w-6 h-6 text-[#664D03] ${isListening ? 'animate-pulse' : ''}`} />
            </button>
            <button
              onClick={() => handleSubmitQuery()}
              disabled={!query.trim()}
              className="h-14 w-14 bg-[#FACC06] rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-6 h-6 text-[#664D03]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}