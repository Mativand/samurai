import { Link } from "wouter";
import { Sword, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-samurai-black border-t border-samurai-border py-12 relative">
      <div className="texture-overlay absolute inset-0 opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl samurai-heading text-samurai-gold tracking-wider mb-4">
              <Sword className="inline mr-2" />
              SAMURAI
            </div>
            <p className="text-gray-300 mb-4">
              Uniting sponsors and warriors in pursuit of excellence and community growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-samurai-gold hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-samurai-gold hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-samurai-gold hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg samurai-heading font-bold text-white mb-4">PLATFORM</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#news" className="hover:text-samurai-gold transition-colors">Latest News</a></li>
              <li><a href="#donate" className="hover:text-samurai-gold transition-colors">Make Donation</a></li>
              <li><a href="#register" className="hover:text-samurai-gold transition-colors">Become Sponsor</a></li>
              <li><Link href="/admin" className="hover:text-samurai-gold transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg samurai-heading font-bold text-white mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-samurai-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-samurai-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-samurai-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-samurai-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg samurai-heading font-bold text-white mb-4">NEWSLETTER</h4>
            <p className="text-gray-300 mb-4">Stay updated with our latest news and events.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-samurai-dark border border-samurai-border text-white focus:border-samurai-gold focus:outline-none rounded-none"
              />
              <Button className="bg-samurai-gold text-samurai-black px-4 py-3 font-bold hover:animate-gold-glow transition-all duration-300 rounded-none">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="katana-divider w-full mb-8"></div>
        
        <div className="text-center text-gray-400">
          <p>&copy; 2024 SAMURAI Sponsor Platform. All rights reserved. Built with honor and dedication.</p>
        </div>
      </div>
    </footer>
  );
}
