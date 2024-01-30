import Script from 'next/script';
import AuthProvider from '@/lib/next-auth/SessionProvider';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/0de87d0496.js"
          crossOrigin="anonymous"
          defer
        ></Script>
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="content-wrapper">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default AdminLayout;
