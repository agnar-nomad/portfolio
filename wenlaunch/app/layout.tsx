import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { AxiomWebVitals } from 'next-axiom';
import ClarityAnalyticsScript from '@/src/components/common/ClarityAnalyticsScript';
import UmamiAnalyticsScript from '@/src/components/common/UmamiAnalyticsScript';

import '@/src/css/globals.css';
import { Montserrat } from 'next/font/google'
import ThemeContextProvider from '@/src/components/common/ThemeContext'
import Header from '@/src/components/common/Header';
import Footer from '@/src/components/common/Footer';
import ReactHotToaster from '@/src/components/common/ReactHotToaster';

export const metadata = {
  title: 'Wenlaunch',
  description:
    'Wenlaunch: The launch calendar for all blockchain enthusiasts',
};

// If loading a variable font, you don't need to specify the font weight
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className} >
      <body className="mx-auto max-w-7xl text-base-content">
        <ThemeContextProvider>
          <Header />
          {children}
          <Footer />
          <ReactHotToaster />
        </ThemeContextProvider>

        <SpeedInsights />
        <VercelAnalytics />
        <UmamiAnalyticsScript />
        <AxiomWebVitals />
        <ClarityAnalyticsScript />
      </body>
    </html>
  );
}
