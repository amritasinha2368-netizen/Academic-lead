// Environment API Keys Configuration Helper

export const ENV = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // AI LLM & Speech API
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  
  // Telephony
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_VIRTUAL_NUMBER: process.env.TWILIO_VIRTUAL_NUMBER || '+1 (555) 019-2834',
  
  // Messaging
  WHATSAPP_API_KEY: process.env.WHATSAPP_BUSINESS_API_KEY || '',
  
  // Marketing Ads Webhooks
  GOOGLE_ADS_TOKEN: process.env.GOOGLE_ADS_CONVERSION_DEVELOPER_TOKEN || '',
  META_ADS_TOKEN: process.env.META_ADS_ACCESS_TOKEN || '',
  
  // Payments
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
};

export function hasValidKey(keyName: keyof typeof ENV): boolean {
  const val = ENV[keyName];
  return Boolean(val && !val.includes('placeholder') && val.trim() !== '');
}
