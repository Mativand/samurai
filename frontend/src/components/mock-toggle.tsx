import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Zap } from "lucide-react";

export default function MockToggle() {
  const [isMockEnabled, setIsMockEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      // Check if mocks are enabled via environment variable
      setIsMockEnabled(process.env.VITE_ENABLE_MOCKS === 'true');
    }
  }, []);

  const toggleMocks = () => {
    const newValue = !isMockEnabled;
    setIsMockEnabled(newValue);
    
    // Update environment variable (this will require a page reload to take effect)
    if (newValue) {
      localStorage.setItem('VITE_ENABLE_MOCKS', 'true');
    } else {
      localStorage.removeItem('VITE_ENABLE_MOCKS');
    }
    
    // Show reload message
    alert('Mock setting changed. Please reload the page for changes to take effect.');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 samurai-card border-yellow-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5" />
            Development Tools
            <Badge variant={isMockEnabled ? "default" : "secondary"} className="ml-auto">
              {isMockEnabled ? "MOCK" : "LIVE"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="mock-mode"
              checked={isMockEnabled}
              onCheckedChange={toggleMocks}
            />
            <Label htmlFor="mock-mode" className="text-sm">
              Enable Mock Data
            </Label>
          </div>
          
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Uses local mock data instead of API calls</p>
            <p>• Simulates network delays</p>
            <p>• Allows testing without backend</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.location.reload()}
            >
              <Zap className="w-4 h-4 mr-1" />
              Reload
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              Hide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 