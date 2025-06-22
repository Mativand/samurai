import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, Sword } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import LanguageSwitcher from "@/components/language-switcher";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLocale();

  return (
    <header className="bg-samurai-black border-b border-samurai-border relative">
      <div className="texture-overlay absolute inset-0 opacity-50"></div>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="text-2xl samurai-heading text-samurai-gold tracking-wider">
              <Sword className="inline mr-2" />
              SAMURAI
            </div>
            <div className="katana-divider w-16 hidden md:block"></div>
            <span className="text-sm text-gray-300 hidden md:block">{t('header.platform')}</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#news" className="hover:text-samurai-gold transition-colors duration-300 font-medium">
              {t('header.news')}
            </a>
            <a href="#donate" className="hover:text-samurai-gold transition-colors duration-300 font-medium">
              {t('header.donate')}
            </a>
            {!isAuthenticated && (
              <a href="#register" className="hover:text-samurai-gold transition-colors duration-300 font-medium">
                {t('header.register')}
              </a>
            )}
            {isAuthenticated && (user as any)?.isAdmin && (
              <Link href="/admin" className="hover:text-samurai-gold transition-colors duration-300 font-medium">
                {t('header.admin')}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button
                onClick={() => window.location.href = '/api/logout'}
                className="samurai-button"
              >
                {t('header.logout')}
              </Button>
            ) : (
              <Button
                onClick={() => window.location.href = '/api/login'}
                className="samurai-button"
              >
                {t('header.login')}
              </Button>
            )}
            <button className="md:hidden text-samurai-gold text-xl">
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
