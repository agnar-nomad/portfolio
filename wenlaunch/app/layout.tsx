import '@/src/css/globals.css';
import { Montserrat } from 'next/font/google'
import ThemeContextProvider from '@/src/context/ThemeContext'
import Header from '@/src/components/common/Header';
import Footer from '@/src/components/common/Footer';
import ReactHotToaster from '@/src/components/common/ReactHotToaster';

export const metadata = {
  title: 'Wenlaunch',
  description:
    'Wenlaunch: The launch calendar for all blockchain enthusiasts',
};

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
      </body>
    </html>
  );
}
