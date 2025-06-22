import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function RegistrationSection() {
  const { toast } = useToast();
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    sponsorshipType: "Individual Sponsor",
    message: "",
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationForm.firstName || !registrationForm.lastName || !registrationForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!registrationForm.acceptTerms) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/register", registrationForm);
      toast({
        title: "Success",
        description: "Registration submitted successfully! Please log in to complete your profile.",
      });
      
      // Reset form
      setRegistrationForm({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        sponsorshipType: "Individual Sponsor",
        message: "",
        acceptTerms: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="register" className="py-20 bg-samurai-black relative">
      <div className="texture-overlay absolute inset-0 opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl samurai-heading text-white mb-6">
            JOIN THE <span className="text-samurai-gold">ALLIANCE</span>
          </h2>
          <div className="katana-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Register as a sponsor and become part of our warrior community
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="samurai-card">
            <CardHeader>
              <CardTitle className="text-2xl samurai-heading text-samurai-gold text-center">
                SPONSOR REGISTRATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">First Name *</label>
                    <Input
                      required
                      value={registrationForm.firstName}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, firstName: e.target.value })}
                      className="samurai-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">Last Name *</label>
                    <Input
                      required
                      value={registrationForm.lastName}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, lastName: e.target.value })}
                      className="samurai-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Email Address *</label>
                  <Input
                    type="email"
                    required
                    value={registrationForm.email}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                    className="samurai-input"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Organization/Company</label>
                  <Input
                    value={registrationForm.organization}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, organization: e.target.value })}
                    className="samurai-input"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Sponsorship Interest</label>
                  <Select 
                    value={registrationForm.sponsorshipType} 
                    onValueChange={(value) => setRegistrationForm({ ...registrationForm, sponsorshipType: value })}
                  >
                    <SelectTrigger className="samurai-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual Sponsor">Individual Sponsor</SelectItem>
                      <SelectItem value="Corporate Sponsor">Corporate Sponsor</SelectItem>
                      <SelectItem value="Event Sponsor">Event Sponsor</SelectItem>
                      <SelectItem value="Equipment Sponsor">Equipment Sponsor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Message</label>
                  <Textarea
                    placeholder="Tell us about your interest in sponsoring..."
                    rows={4}
                    value={registrationForm.message}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, message: e.target.value })}
                    className="samurai-input resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={registrationForm.acceptTerms}
                    onCheckedChange={(checked) => setRegistrationForm({ ...registrationForm, acceptTerms: !!checked })}
                  />
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the terms and conditions *
                  </label>
                </div>

                <Button type="submit" className="w-full samurai-button">
                  <UserPlus className="mr-2 w-4 h-4" />
                  REGISTER AS SPONSOR
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
