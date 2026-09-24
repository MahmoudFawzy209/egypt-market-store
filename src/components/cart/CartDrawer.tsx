"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Check, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) setCouponCode("");
  };

  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">سلة التسوق</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cart.length === 0 ? "السلة فارغة" : `${cart.reduce((a, b) => a + b.quantity, 0)} منتج`}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {cart.length > 0 && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 px-5 border-b border-emerald-100 dark:border-emerald-900/40">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  {subtotal >= freeShippingThreshold
                    ? "تهانينا! حصلت على شحن مجاني لكل مصر 🎉"
                    : `أضف ${remainingForFreeShipping.toLocaleString("ar-EG")} ج.م للحصول على شحن مجاني`}
                </span>
                <span>{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-2 bg-emerald-200/60 dark:bg-emerald-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">سلة التسوق فارغة حالياً</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  استكشف أحدث المنتجات والعروض الحصرية وأضف ما يعجبك إلى السلة!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-700">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-relaxed">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.variantName && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        {(item.price * item.quantity).toLocaleString("ar-EG")} ج.م
                      </span>

                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-3">
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      كوبون الخصم: <strong className="uppercase">{appliedCoupon.code}</strong> (-{discountAmount.toLocaleString("ar-EG")} ج.م)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 dark:text-rose-400 text-[11px] underline hover:no-underline"
                    >
                      إلغاء
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="أدخل كود الخصم (جرّب MASR10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-colors"
                    >
                      تطبيق
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <p className={`text-[11px] mt-1 font-medium ${couponFeedback.success ? "text-emerald-600" : "text-rose-500"}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {subtotal.toLocaleString("ar-EG")} ج.م
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>الخصم:</span>
                    <span>-{discountAmount.toLocaleString("ar-EG")} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>رسوم الشحن:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="font-bold text-emerald-600">مجاناني 🎉</span>
                    ) : (
                      `${shippingFee.toLocaleString("ar-EG")} ج.م`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-base text-emerald-600 dark:text-emerald-400">
                    {total.toLocaleString("ar-EG")} ج.م
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform active:scale-[0.99]"
              >
                <span>متابعة الشراء وإنهاء الطلب</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
