import Header from '@/components/header';
import Footer from '@/components/footer';
import '../styles/globals.css';
import { ComponentWrapper } from '@/lib/interfaces';
export const metadata = {
  title: 'Neil Coley Band',
};

const RootLayout = ({ children }: ComponentWrapper) => {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/0de87d0496.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </head>
      <body>
        <Header />
        <div className="content-wrapper">{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
