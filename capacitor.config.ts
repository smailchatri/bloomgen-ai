import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5f4e317e25984147a200290d40264a11',
  appName: 'BloomGen',
  webDir: 'dist',
  server: {
    // For development - connects directly to Lovable preview for hot-reload
    url: 'https://5f4e317e-2598-4147-a200-290d40264a11.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#000000'
  }
};

export default config;
