import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'es';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.news': 'NEWS',
    'header.donate': 'DONATE',
    'header.register': 'REGISTER',
    'header.admin': 'ADMIN',
    'header.login': 'LOGIN',
    'header.logout': 'LOGOUT',
    'header.platform': 'SPONSOR PLATFORM',

    // Hero
    'hero.sponsor': 'SPONSOR',
    'hero.platform': 'PLATFORM',
    'hero.tagline': 'Unite with warriors, support the mission, forge the future',
    'hero.makeDonation': 'MAKE DONATION',
    'hero.viewNews': 'VIEW NEWS',

    // News Section
    'news.title': 'LATEST',
    'news.titleHighlight': 'NEWS',
    'news.description': 'Stay informed about our mission and recent developments',
    'news.readMore': 'READ MORE',
    'news.viewAll': 'VIEW ALL NEWS',
    'news.noArticles': 'No news articles available at this time.',
    'news.noImage': 'No image',

    // Donation Section
    'donation.title': 'SUPPORT THE',
    'donation.titleHighlight': 'MISSION',
    'donation.description': 'Join our community of sponsors and help forge the future',
    'donation.makeTitle': 'MAKE A DONATION',
    'donation.customAmount': 'Custom Amount',
    'donation.enterAmount': 'Enter amount',
    'donation.donationType': 'Donation Type',
    'donation.oneTime': 'One-time Donation',
    'donation.monthly': 'Monthly Sponsorship',
    'donation.annual': 'Annual Sponsorship',
    'donation.message': 'Message (Optional)',
    'donation.messagePlaceholder': 'Your message of support...',
    'donation.donateNow': 'DONATE NOW',
    'donation.communityImpact': 'Community Impact',
    'donation.communityDescription': 'Your sponsorship directly supports training programs, equipment, and community outreach initiatives.',
    'donation.recognition': 'Recognition Program',
    'donation.recognitionDescription': 'Sponsors receive official recognition and exclusive access to events and updates.',
    'donation.transparency': 'Transparency',
    'donation.transparencyDescription': 'Regular reports show exactly how your contributions make a difference in our community.',
    'donation.errorAmount': 'Please enter a valid donation amount',
    'donation.loginRequired': 'Login Required',
    'donation.loginDescription': 'Please log in to complete your donation',

    // Registration Section
    'registration.title': 'JOIN THE',
    'registration.titleHighlight': 'ALLIANCE',
    'registration.description': 'Register as a sponsor and become part of our warrior community',
    'registration.formTitle': 'SPONSOR REGISTRATION',
    'registration.firstName': 'First Name',
    'registration.lastName': 'Last Name',
    'registration.email': 'Email Address',
    'registration.organization': 'Organization/Company',
    'registration.sponsorshipInterest': 'Sponsorship Interest',
    'registration.individual': 'Individual Sponsor',
    'registration.corporate': 'Corporate Sponsor',
    'registration.event': 'Event Sponsor',
    'registration.equipment': 'Equipment Sponsor',
    'registration.messageLabel': 'Message',
    'registration.messagePlaceholder': 'Tell us about your interest in sponsoring...',
    'registration.terms': 'I agree to the terms and conditions',
    'registration.register': 'REGISTER AS SPONSOR',
    'registration.errorFields': 'Please fill in all required fields',
    'registration.errorTerms': 'Please accept the terms and conditions',
    'registration.success': 'Registration submitted successfully! Please log in to complete your profile.',
    'registration.error': 'Failed to submit registration. Please try again.',

    // Admin
    'admin.createNews': 'Create News Article',
    'admin.title': 'Title',
    'admin.content': 'Content',
    'admin.excerpt': 'Excerpt',
    'admin.category': 'Category',
    'admin.status': 'Status',
    'admin.imageUrl': 'Image URL',
    'admin.draft': 'Draft',
    'admin.published': 'Published',
    'admin.generalNews': 'General News',
    'admin.events': 'Events',
    'admin.announcements': 'Announcements',
    'admin.save': 'Save Article',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.publish': 'Publish',
    'admin.unpublish': 'Unpublish',
    'admin.unauthorized': 'Unauthorized',
    'admin.unauthorizedDescription': 'You are logged out. Logging in again...',
    'admin.success': 'News article created successfully!',
    'admin.error': 'Failed to create news article',

    // Common
    'common.required': '*',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  es: {
    // Header
    'header.news': 'NOTICIAS',
    'header.donate': 'DONAR',
    'header.register': 'REGISTRARSE',
    'header.admin': 'ADMIN',
    'header.login': 'INICIAR SESIÓN',
    'header.logout': 'CERRAR SESIÓN',
    'header.platform': 'PLATAFORMA DE PATROCINIO',

    // Hero
    'hero.sponsor': 'PLATAFORMA',
    'hero.platform': 'PATROCINIO',
    'hero.tagline': 'Únete a los guerreros, apoya la misión, forja el futuro',
    'hero.makeDonation': 'HACER DONACIÓN',
    'hero.viewNews': 'VER NOTICIAS',

    // News Section
    'news.title': 'ÚLTIMAS',
    'news.titleHighlight': 'NOTICIAS',
    'news.description': 'Mantente informado sobre nuestra misión y desarrollos recientes',
    'news.readMore': 'LEER MÁS',
    'news.viewAll': 'VER TODAS LAS NOTICIAS',
    'news.noArticles': 'No hay artículos de noticias disponibles en este momento.',
    'news.noImage': 'Sin imagen',

    // Donation Section
    'donation.title': 'APOYA LA',
    'donation.titleHighlight': 'MISIÓN',
    'donation.description': 'Únete a nuestra comunidad de patrocinadores y ayuda a forjar el futuro',
    'donation.makeTitle': 'HACER UNA DONACIÓN',
    'donation.customAmount': 'Cantidad Personalizada',
    'donation.enterAmount': 'Ingresa la cantidad',
    'donation.donationType': 'Tipo de Donación',
    'donation.oneTime': 'Donación Única',
    'donation.monthly': 'Patrocinio Mensual',
    'donation.annual': 'Patrocinio Anual',
    'donation.message': 'Mensaje (Opcional)',
    'donation.messagePlaceholder': 'Tu mensaje de apoyo...',
    'donation.donateNow': 'DONAR AHORA',
    'donation.communityImpact': 'Impacto Comunitario',
    'donation.communityDescription': 'Tu patrocinio apoya directamente programas de entrenamiento, equipamiento e iniciativas de extensión comunitaria.',
    'donation.recognition': 'Programa de Reconocimiento',
    'donation.recognitionDescription': 'Los patrocinadores reciben reconocimiento oficial y acceso exclusivo a eventos y actualizaciones.',
    'donation.transparency': 'Transparencia',
    'donation.transparencyDescription': 'Los informes regulares muestran exactamente cómo tus contribuciones marcan la diferencia en nuestra comunidad.',
    'donation.errorAmount': 'Por favor ingresa una cantidad válida de donación',
    'donation.loginRequired': 'Inicio de Sesión Requerido',
    'donation.loginDescription': 'Por favor inicia sesión para completar tu donación',

    // Registration Section
    'registration.title': 'ÚNETE A LA',
    'registration.titleHighlight': 'ALIANZA',
    'registration.description': 'Regístrate como patrocinador y conviértete en parte de nuestra comunidad guerrera',
    'registration.formTitle': 'REGISTRO DE PATROCINADOR',
    'registration.firstName': 'Nombre',
    'registration.lastName': 'Apellido',
    'registration.email': 'Dirección de Correo',
    'registration.organization': 'Organización/Empresa',
    'registration.sponsorshipInterest': 'Interés de Patrocinio',
    'registration.individual': 'Patrocinador Individual',
    'registration.corporate': 'Patrocinador Corporativo',
    'registration.event': 'Patrocinador de Eventos',
    'registration.equipment': 'Patrocinador de Equipamiento',
    'registration.messageLabel': 'Mensaje',
    'registration.messagePlaceholder': 'Cuéntanos sobre tu interés en patrocinar...',
    'registration.terms': 'Acepto los términos y condiciones',
    'registration.register': 'REGISTRARSE COMO PATROCINADOR',
    'registration.errorFields': 'Por favor completa todos los campos requeridos',
    'registration.errorTerms': 'Por favor acepta los términos y condiciones',
    'registration.success': '¡Registro enviado exitosamente! Por favor inicia sesión para completar tu perfil.',
    'registration.error': 'Error al enviar el registro. Por favor intenta de nuevo.',

    // Admin
    'admin.createNews': 'Crear Artículo de Noticias',
    'admin.title': 'Título',
    'admin.content': 'Contenido',
    'admin.excerpt': 'Extracto',
    'admin.category': 'Categoría',
    'admin.status': 'Estado',
    'admin.imageUrl': 'URL de Imagen',
    'admin.draft': 'Borrador',
    'admin.published': 'Publicado',
    'admin.generalNews': 'Noticias Generales',
    'admin.events': 'Eventos',
    'admin.announcements': 'Anuncios',
    'admin.save': 'Guardar Artículo',
    'admin.edit': 'Editar',
    'admin.delete': 'Eliminar',
    'admin.publish': 'Publicar',
    'admin.unpublish': 'Despublicar',
    'admin.unauthorized': 'No Autorizado',
    'admin.unauthorizedDescription': 'Has cerrado sesión. Iniciando sesión de nuevo...',
    'admin.success': '¡Artículo de noticias creado exitosamente!',
    'admin.error': 'Error al crear el artículo de noticias',

    // Common
    'common.required': '*',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
  },
};

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved as Locale) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations[typeof locale]] || key;
  };

  const formatCurrency = (amount: number): string => {
    if (locale === 'es') {
      // Peruvian Sol (PEN)
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
      }).format(amount);
    } else {
      // US Dollar (USD) for English
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    }
  };

  const value = {
    locale,
    setLocale,
    t,
    formatCurrency,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}