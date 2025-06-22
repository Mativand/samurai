import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="text-gray-300 hover:text-samurai-gold transition-colors duration-300"
    >
      <Globe className="w-4 h-4 mr-2" />
      {locale === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}