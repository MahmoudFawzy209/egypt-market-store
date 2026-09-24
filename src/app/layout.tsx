import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "سوق مصر | تسوق أفضل المنتجات الإلكترونية والأزياء والعطور في مصر",
  description: "متجرك الإلكتروني الأول في جمهورية مصر العربية. نوفر لك أحدث الأجهزة الإلكترونية والأزياء القطنية والعطور الأصلية بشحن سريع لجميع المحافظات.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
