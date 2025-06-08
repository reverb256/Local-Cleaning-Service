import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
  };

  if (!showInstallBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:left-auto lg:right-4 lg:w-80">
      <div className="glass-card p-4 border-2 border-workplace-blue">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="diamond-shape mr-3" style={{ width: '32px', height: '32px' }}>
              <div className="diamond-shape-content">
                <Download className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-workplace-dark text-sm">Install App</h3>
              <p className="text-workplace-gray text-xs">Add to home screen for quick access</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-workplace-gray hover:text-workplace-dark transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleInstallClick}
            className="bg-workplace-blue text-white hover:bg-workplace-blue-dark flex-1 text-sm py-2"
            id="install-pwa"
          >
            <Download className="w-4 h-4 mr-1" />
            Install
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            className="border-workplace-gray text-workplace-dark hover:bg-workplace-light text-sm py-2"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
}