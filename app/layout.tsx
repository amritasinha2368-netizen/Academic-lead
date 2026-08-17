import type { Metadata } from 'next';
import './globals.css';
import { LeadProvider } from '@/lib/lead-store';

export const metadata: Metadata = {
  title: 'Academy Lead Management Portal',
  description: 'Centralized Academy Lead Management Portal - Website Enquiry Capture to Student Enrollment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        <LeadProvider>
          {children}
        </LeadProvider>
      </body>
    </html>
  );
}
