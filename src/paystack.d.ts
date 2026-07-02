// Ambient types for the Paystack inline.js script loaded in index.html
// and the Vite env var that holds our public key.
interface ImportMetaEnv {
  readonly VITE_PAYSTACK_PUBLIC_KEY: string;
}

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number; // in the currency subunit — for KES this is cents (KSh * 100)
  currency?: string;
  ref?: string;
  channels?: string[];
  metadata?: Record<string, unknown>;
  callback?: (response: { reference: string }) => void;
  onClose?: () => void;
}

interface PaystackPopStatic {
  setup: (options: PaystackSetupOptions) => PaystackHandler;
}

declare const PaystackPop: PaystackPopStatic;

interface Window {
  PaystackPop: PaystackPopStatic;
}
