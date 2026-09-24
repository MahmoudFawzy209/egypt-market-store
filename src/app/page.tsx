import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Sparkles,
  Flame,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Percent,
  Clock,
  Award,
  ChevronLeft
} from "lucide-react";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function Home() {
  const categories = await prisma.category.findMany();
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      reviews: true,
    },
    take: 8,
  });

  const allProducts = await prisma.product.findMany({
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      reviews: true,
    },
    take: 12,
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>مهرجان عروض سوق مصر 2026 🇪🇬</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              أقوى التخفيضات على <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                الإلكترونيات والقطنيات المصرية
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-medium">
              تسوق منتجاتك المفضلة بأسعار الجنيه المصري المعقولة، مع خيارات الدفع عبر فودافون كاش، إنستا باي، والكارت البنكي، وشحن مجاني للطلبات فوق 2000 ج.م!
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2 transform active:scale-95"
              >
                <span>تسوق العروض الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
                <span>كود الخصم: <strong className="text-amber-400">MASR10</strong></span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop"
              alt="أحدث المنتجات المصرية"
              fill
              priority
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">آيفون 16 بروماكس تيتانيوم</p>
                <p className="text-sm font-black text-emerald-400">64,999 ج.م <span className="text-xs line-through text-slate-400">69,999 ج.م</span></p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-black">خصم خاص</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-7 rounded-full bg-emerald-600 inline-block" />
              تسوق حسب القسم
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">اختر قسمك المفضل واستكشف أرقى المنتجات</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
            عرض الكل <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
            >
              <Image
                src={cat.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800"}
                alt={cat.nameAr || cat.name}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                  {cat.nameAr || cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals / Hot Offers */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/30">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                عروض الساعات الأخيرة 🔥
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">تخفيضات مذهلة على المنتجات الأكثر طلباً في مصر</p>
            </div>
          </div>

          {/* Timer Mock */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 font-mono text-sm font-black shadow-sm">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>ينتهي العرض خلال: 08 : 42 : 19</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.titleAr || product.title}
              slug={product.slug}
              price={product.price}
              comparePrice={product.comparePrice}
              image={product.images[0]?.url || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000"}
              categoryName={product.category.nameAr || product.category.name}
              variantId={product.variants[0]?.id}
              variantName={product.variants[0]?.name}
              stock={product.variants[0]?.stock || 10}
            />
          ))}
        </div>
      </section>

      {/* Egyptian Cotton & Luxury Highlight Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 p-8 sm:p-12 border border-slate-800 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30 inline-block">
              🌟 فخر الصناعة المصرية
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-snug">
              أجود منتجات القطن المصري 100% والعطور الشرقية الفاخرة
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              اختر ملابس قماش أكسفورد ناعم الملمس، وعطور خشبية برائحة المستكة والعود الملكي المعتق. تصنيع راقي بأعلى معايير الجودة العالمية.
            </p>
            <div className="pt-2">
              <Link
                href="/products?category=fashion"
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
              >
                <span>استكشف تشكيلة القطنيات</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
              alt="قطن مصري فاخر"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-7 rounded-full bg-emerald-600 inline-block" />
              أحدث المنتجات في المتجر
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تصفح تشكيلة واسعة من أفضل الماركات والمنتجات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.titleAr || product.title}
              slug={product.slug}
              price={product.price}
              comparePrice={product.comparePrice}
              image={product.images[0]?.url || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000"}
              categoryName={product.category.nameAr || product.category.name}
              variantId={product.variants[0]?.id}
              variantName={product.variants[0]?.name}
              stock={product.variants[0]?.stock || 10}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
