"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  categoryName?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  variantId?: string;
  variantName?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  slug,
  price,
  comparePrice,
  image,
  categoryName,
  rating = 4.8,
  reviewCount = 12,
  stock = 15,
  variantId,
  variantName,
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(id);

  const discountPercent =
    comparePrice && comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: variantId || id,
      productId: id,
      variantId,
      title,
      variantName,
      price,
      image,
      stock,
    });
  };

  return (
    <div className="product-card group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Top Badges & Wishlist Button */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {discountPercent && (
            <span className="absolute top-3 right-3 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
              خصم {discountPercent}%
            </span>
          )}

          {categoryName && (
            <span className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg">
              {categoryName}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(id);
            }}
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isWishlisted
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white"
            }`}
            aria-label="إضافة للمفضلة"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Content details */}
        <div className="p-4 space-y-2">
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              ({reviewCount})
            </span>
          </div>

          <Link href={`/products/${slug}`} className="block">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-relaxed">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      {/* Footer & Price & Quick Add */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/60 mt-2">
        <div>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
            {price.toLocaleString("ar-EG")} <span className="text-xs font-bold">ج.م</span>
          </div>
          {comparePrice && comparePrice > price && (
            <div className="text-xs text-slate-400 line-through">
              {comparePrice.toLocaleString("ar-EG")} ج.م
            </div>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          title="أضف للسلة"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold hidden sm:inline">أضف للسلة</span>
        </button>
      </div>
    </div>
  );
};
