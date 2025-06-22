import { Button } from "@/components/ui/button";
import { ChevronDown, DollarSign, Newspaper } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export default function Hero() {
  const { t } = useLocale();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark textured mountain landscape background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      >
        <div className="absolute inset-0 bg-samurai-deep bg-opacity-80"></div>
        <div className="absolute inset-0 texture-overlay"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-blade-slash">
          <h1 className="text-6xl md:text-8xl samurai-heading text-white mb-6 tracking-wider">
            {t('hero.sponsor')}
            <span className="block text-samurai-gold">{t('hero.platform')}</span>
          </h1>
          <div className="katana-divider w-32 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            {t('hero.tagline')}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            onClick={() => scrollToSection('donate')}
            className="samurai-button min-w-48"
          >
            <DollarSign className="mr-2 w-4 h-4" />
            {t('hero.makeDonation')}
          </Button>
          <Button
            onClick={() => scrollToSection('news')}
            className="samurai-button-outline min-w-48"
          >
            <Newspaper className="mr-2 w-4 h-4" />
            {t('hero.viewNews')}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-samurai-gold text-2xl" />
      </div>
    </section>
  );
}
