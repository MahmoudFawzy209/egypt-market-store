"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Flame,
  ChevronDown
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { cart, toggleCart, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> عروض مصر
            </span>
            <span className="text-slate-300 font-medium">
              خصم 10% بمناسبة الانطلاق! استخدم كود <strong className="text-amber-400">MASR10</strong> | شحن مجاني فوق 2000 ج.م 🇪🇬
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> الدعم الفني: 19999
            </span>
            <span>توصيل لكافة المحافظات</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                م
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  سوق مصر <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">EGP</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                  متجرك الإلكتروني الأول
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <input
              type="text"
              placeholder="ابحث عن موبايلات، أزياء قطنية، عطور، أو أجهزة منزلية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-11 py-2.5 text-sm rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all outline-none"
            />
            <button
              type="submit"
              className="absolute left-1.5 top-1.5 bottom-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
              title="بحث"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/products?featured=true"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>أحدث العروض</span>
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/products?wishlist=true"
              className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-all flex items-center gap-2"
              aria-label="سلة التسوق"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-black">السلة</span>
              {cartItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Navigation Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-reverse space-x-8 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              الرئيسية
            </Link>
            <Link href="/products" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              جميع المنتجات
            </Link>
            <Link href="/products?category=electronics" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              إلكترونيات وموبايلات
            </Link>
            <Link href="/products?category=fashion" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              أزياء وقطنيات مصرية
            </Link>
            <Link href="/products?category=perfumes" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              عطور وعناية
            </Link>
            <Link href="/products?category=home-kitchen" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              أجهزة منزلية
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          </form>
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>الرئيسية</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>جميع المنتجات</Link>
            <Link href="/products?category=electronics" onClick={() => setMobileMenuOpen(false)}>إلكترونيات وتكنولوجيا</Link>
            <Link href="/products?category=fashion" onClick={() => setMobileMenuOpen(false)}>أزياء وملابس قطنية</Link>
            <Link href="/products?category=perfumes" onClick={() => setMobileMenuOpen(false)}>عطور وتجميل</Link>
            <Link href="/products?category=home-kitchen" onClick={() => setMobileMenuOpen(false)}>أجهزة منزلية ومطبخ</Link>
          </div>
        </div>
      )}
    </header>
  );
};
