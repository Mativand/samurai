import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your donation!",
      });
    }
  };

  return (
    <Card className="samurai-card max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl samurai-heading text-samurai-gold text-center">
          COMPLETE DONATION
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          <Button
            type="submit"
            disabled={!stripe || !elements || isProcessing}
            className="w-full samurai-button"
          >
            {isProcessing ? "PROCESSING..." : "DONATE NOW"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Get donation parameters from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount') || localStorage.getItem('donationAmount');
    const type = urlParams.get('type') || localStorage.getItem('donationType');
    const message = urlParams.get('message') || localStorage.getItem('donationMessage');

    if (!amount) {
      toast({
        title: "Error",
        description: "No donation amount specified",
        variant: "destructive",
      });
      return;
    }

    // Create PaymentIntent
    apiRequest("POST", "/api/create-payment-intent", { 
      amount: parseFloat(amount), 
      type: type || "one-time",
      message: message || ""
    })
      .then((res: any) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to initialize payment",
          variant: "destructive",
        });
      });
  }, [toast]);

  if (!stripeKey) {
    return (
      <div className="min-h-screen bg-samurai-deep text-white flex flex-col items-center justify-center">
        <Header />
        <div className="max-w-lg mx-auto mt-12 p-8 bg-samurai-dark rounded-lg shadow-lg text-center">
          <h2 className="text-2xl mb-4 text-samurai-gold">Stripe Disabled</h2>
          <p className="mb-2">Stripe payments are not enabled in this environment.</p>
          <p className="text-sm text-gray-400">Set <code>VITE_STRIPE_PUBLIC_KEY</code> in your <code>.env</code> to enable live payments.</p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-samurai-deep text-white">
        <Header />
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-samurai-deep text-white">
      <Header />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl samurai-heading text-white mb-6">
            SECURE <span className="text-samurai-gold">CHECKOUT</span>
          </h1>
          <div className="katana-divider w-24 mx-auto mb-6"></div>
        </div>
        
        <Elements stripe={stripePromise!} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
