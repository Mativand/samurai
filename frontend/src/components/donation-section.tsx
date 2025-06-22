import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Users, Award, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/contexts/LocaleContext";

export default function DonationSection() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, formatCurrency, locale } = useLocale();
  const [donationForm, setDonationForm] = useState({
    amount: "",
    type: "one-time",
    message: "",
  });

  const selectAmount = (amount: number) => {
    setDonationForm({ ...donationForm, amount: amount.toString() });
  };

  const handleDonate = () => {
    if (!donationForm.amount || parseFloat(donationForm.amount) <= 0) {
      toast({
        title: t('common.error'),
        description: t('donation.errorAmount'),
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      // Store donation details and redirect to login
      localStorage.setItem('donationAmount', donationForm.amount);
      localStorage.setItem('donationType', donationForm.type);
      localStorage.setItem('donationMessage', donationForm.message);
      
      toast({
        title: t('donation.loginRequired'),
        description: t('donation.loginDescription'),
      });
      
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    // Redirect to checkout with donation details
    const params = new URLSearchParams({
      amount: donationForm.amount,
      type: donationForm.type,
      message: donationForm.message,
    });
    
    window.location.href = `/checkout?${params.toString()}`;
  };

  return (
    <section id="donate" className="py-20 bg-samurai-deep relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      ></div>
      <div className="texture-overlay absolute inset-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl samurai-heading text-white mb-6">
            {t('donation.title')} <span className="text-samurai-gold">{t('donation.titleHighlight')}</span>
          </h2>
          <div className="katana-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('donation.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Donation Form */}
            <Card className="samurai-card">
              <CardHeader>
                <CardTitle className="text-2xl samurai-heading text-samurai-gold">{t('donation.makeTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    onClick={() => selectAmount(locale === 'es' ? 200 : 50)}
                    variant={donationForm.amount === (locale === 'es' ? "200" : "50") ? "default" : "outline"}
                    className={donationForm.amount === (locale === 'es' ? "200" : "50") ? "samurai-button" : "samurai-button-outline"}
                  >
                    {formatCurrency(locale === 'es' ? 200 : 50)}
                  </Button>
                  <Button
                    onClick={() => selectAmount(locale === 'es' ? 400 : 100)}
                    variant={donationForm.amount === (locale === 'es' ? "400" : "100") ? "default" : "outline"}
                    className={donationForm.amount === (locale === 'es' ? "400" : "100") ? "samurai-button" : "samurai-button-outline"}
                  >
                    {formatCurrency(locale === 'es' ? 400 : 100)}
                  </Button>
                  <Button
                    onClick={() => selectAmount(locale === 'es' ? 1000 : 250)}
                    variant={donationForm.amount === (locale === 'es' ? "1000" : "250") ? "default" : "outline"}
                    className={donationForm.amount === (locale === 'es' ? "1000" : "250") ? "samurai-button" : "samurai-button-outline"}
                  >
                    {formatCurrency(locale === 'es' ? 1000 : 250)}
                  </Button>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">{t('donation.customAmount')}</label>
                  <Input
                    type="number"
                    placeholder={t('donation.enterAmount')}
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                    className="samurai-input"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">{t('donation.donationType')}</label>
                  <Select value={donationForm.type} onValueChange={(value) => setDonationForm({ ...donationForm, type: value })}>
                    <SelectTrigger className="samurai-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">{t('donation.oneTime')}</SelectItem>
                      <SelectItem value="monthly">{t('donation.monthly')}</SelectItem>
                      <SelectItem value="annual">{t('donation.annual')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">{t('donation.message')}</label>
                  <Textarea
                    placeholder={t('donation.messagePlaceholder')}
                    rows={3}
                    value={donationForm.message}
                    onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                    className="samurai-input resize-none"
                  />
                </div>

                <Button onClick={handleDonate} className="w-full samurai-button">
                  <CreditCard className="mr-2 w-4 h-4" />
                  {t('donation.donateNow')}
                </Button>
              </CardContent>
            </Card>

            {/* Impact Information */}
            <div className="space-y-8">
              <Card className="samurai-card border-l-4 border-samurai-gold">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="text-samurai-gold text-2xl mr-4" />
                    <h4 className="text-xl samurai-heading font-bold text-white">{t('donation.communityImpact')}</h4>
                  </div>
                  <p className="text-gray-300">
                    {t('donation.communityDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="samurai-card border-l-4 border-samurai-gold">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Award className="text-samurai-gold text-2xl mr-4" />
                    <h4 className="text-xl samurai-heading font-bold text-white">{t('donation.recognition')}</h4>
                  </div>
                  <p className="text-gray-300">
                    {t('donation.recognitionDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="samurai-card border-l-4 border-samurai-gold">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="text-samurai-gold text-2xl mr-4" />
                    <h4 className="text-xl samurai-heading font-bold text-white">{t('donation.transparency')}</h4>
                  </div>
                  <p className="text-gray-300">
                    {t('donation.transparencyDescription')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
