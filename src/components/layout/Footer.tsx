"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Clock, RefreshCw, Mail, Phone, MapPin, CreditCard, Smartphone } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-20 border-t border-slate-800">
      {/* Value Proposition Badges Bar */}
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">شحن سريع لكل المحافظات</h4>
              <p className="text-xs text-slate-400 mt-0.5">القاهرة والجيزة خلال 24 ساعة وشحن مجاني فوق 2000 ج.م</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">منتجات أصلية 100%</h4>
              <p className="text-xs text-slate-400 mt-0.5">مع ضمان الوكلاء المحليين في مصر وفحص قبل الاستلام</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">استبدال واسترجاع سهل</h4>
              <p className="text-xs text-slate-400 mt-0.5">سياسة استرجاع مجانية خلال 14 يوماً وفق قانون المستهلك</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">خدمة عملاء 24/7</h4>
              <p className="text-xs text-slate-400 mt-0.5">فريق دعم مصري متاح دائماً لخدمتكم عبر الواتساب والهاتف</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
              م
            </div>
            <span className="text-xl font-black text-white">
              سوق مصر <span className="text-emerald-400 text-xs">EGP</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            المنصة الرائدة للتسوق الإلكتروني في جمهورية مصر العربية. نوفر لك أحدث الأجهزة الإلكترونية والأزياء القطنية والعطور العالمية بأفضل الأسعار مع خيارات دفع متعددة.
          </p>

          <div className="pt-2">
            <h5 className="text-xs font-bold text-white mb-2">وسائل الدفع المتاحة في مصر:</h5>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-semibold">
                <Smartphone className="w-3.5 h-3.5 text-rose-500" /> فودافون كاش
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-semibold">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" /> إنستا باي InstaPay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-semibold">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" /> كارت فيزا / ماستركارد
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-semibold">
                💵 الدفع عند الاستلام (COD)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4">روابط سريعة</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">الرئيسية</Link></li>
            <li><Link href="/products" className="hover:text-emerald-400 transition-colors">تصفح المنتجات</Link></li>
            <li><Link href="/products?featured=true" className="hover:text-emerald-400 transition-colors">أحدث العروض والخصومات</Link></li>
            <li><Link href="/checkout" className="hover:text-emerald-400 transition-colors">إنهاء الطلب</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4">التصنيفات الرئيسية</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/products?category=electronics" className="hover:text-emerald-400 transition-colors">إلكترونيات وموبايلات</Link></li>
            <li><Link href="/products?category=fashion" className="hover:text-emerald-400 transition-colors">ملابس وأزياء قطنية</Link></li>
            <li><Link href="/products?category=perfumes" className="hover:text-emerald-400 transition-colors">عطور ومنتجات تجميل</Link></li>
            <li><Link href="/products?category=home-kitchen" className="hover:text-emerald-400 transition-colors">أجهزة منزلية ومطبخ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white mb-4">تواصل معنا في مصر</h4>
          <div className="text-xs text-slate-400 space-y-2.5">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>القاهرة - التجمع الخامس - شارع التسعين</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span dir="ltr">+20 100 123 4567</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>support@suqmasr.eg</span>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} سوق مصر (SuqMasr EGP) - جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};
