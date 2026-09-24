"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  Check,
  Share2,
  Sparkles
} from "lucide-react";

interface ProductDetailClientProps {
  product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const images = product.images.length > 0
    ? product.images
    : [{ url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000", alt: product.title }];

  const currentVariant = product.variants[selectedVariantIndex] || {
    id: product.id,
    name: "القياسي",
    price: product.price,
    stock: 15,
  };

  const currentPrice = currentVariant.price || product.price;
  const isWishlisted = isInWishlist(product.id);

  const discountPercent =
    product.comparePrice && product.comparePrice > currentPrice
      ? Math.round(((product.comparePrice - currentPrice) / product.comparePrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart({
      id: currentVariant.id || product.id,
      productId: product.id,
      variantId: currentVariant.id,
      title: product.titleAr || product.title,
      variantName: currentVariant.name,
      price: currentPrice,
      image: images[activeImageIndex]?.url || images[0]?.url,
      quantity,
      stock: currentVariant.stock || 10,
    });

    setToastMessage("تمت الإضافة إلى السلة بنجاح! 🛒");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left / Gallery Column */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Large Image */}
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <Image
            src={images[activeImageIndex]?.url}
            alt={images[activeImageIndex]?.alt || product.title}
            fill
            priority
            className="object-cover object-center"
          />

          {discountPercent && (
            <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
              خصم {discountPercent}%
            </span>
          )}

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-4 left-4 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isWishlisted
                ? "bg-rose-500 text-white shadow-rose-500/30"
                : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200"
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img: any, idx: number) => (
              <button
                key={img.id || idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-emerald-600 scale-105 shadow-md"
                    : "border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right / Details & Action Column */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            {product.category.nameAr || product.category.name}
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2 leading-relaxed">
            {product.titleAr || product.title}
          </h1>

          {/* Ratings & Stock */}
          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1 text-amber-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-300">4.9</span>
              <span className="text-slate-400">(24 تقييم)</span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> متوفر في المخزون بمصر
            </span>
          </div>
        </div>

        {/* Price Box */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">السعر الحالي:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {currentPrice.toLocaleString("ar-EG")} <span className="text-sm font-bold">ج.م</span>
              </span>
              {product.comparePrice && product.comparePrice > currentPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {product.comparePrice.toLocaleString("ar-EG")} ج.م
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            شامل الضريبة والضمان
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {product.descriptionAr || product.description}
        </p>

        {/* Variants Selector */}
        {product.variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              اختر المواصفة / اللون:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant: any, idx: number) => (
                <button
                  key={variant.id || idx}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedVariantIndex === idx
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">الكمية:</span>
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-xl"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>أضف إلى سلة التسوق</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3.5 px-6 rounded-2xl bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>شراء الآن فوراً</span>
            </button>
          </div>

          {toastMessage && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-bold text-center border border-emerald-300 dark:border-emerald-800 animate-pulse">
              {toastMessage}
            </div>
          )}
        </div>

        {/* Local Delivery Info Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block">التوصيل داخل مصر:</strong>
              القاهرة والجيزة (خلال 24-48 ساعة) - شحن مجاني للطلبات فوق 2000 ج.م
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block">ضمان الفحص قبل الدفع:</strong>
              يمكنك معاينة المنتج عند الاستلام والدفع بالطريقة التي تفضلها.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
