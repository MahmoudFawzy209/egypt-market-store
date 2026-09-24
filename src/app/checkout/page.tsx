"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Mail,
  FileText
} from "lucide-react";

const EGYPT_GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية (المنصورة)",
  "الشرقية (الزقازيق)",
  "الغربية (طنطا)",
  "المنوفية (شبين الكوم)",
  "القليوبية (بنها)",
  "البحيرة (دمنهور)",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر (الغردقة)",
  "جنوب سيناء (شرم الشيخ)",
  "مطروح",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingFee, total, appliedCoupon, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    governorate: "القاهرة",
    city: "",
    addressLine: "",
    paymentMethod: "CASH_ON_DELIVERY",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">سلة التسوق فارغة</h2>
        <p className="text-xs text-slate-500">لا يمكنك الذهاب لصفحة الدفع بدون إضافة منتجات للسلة أولاً.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
        >
          تصفح المنتجات الآن
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.addressLine) {
      setErrorMsg("يرجى ملء جميع البيانات الأساسية (الاسم، رقم الهاتف، والعنوان التفصيلي)");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: cart,
          subtotal,
          discountAmount,
          shippingCost: shippingFee,
          totalAmount: total,
          couponCode: appliedCoupon?.code || null,
        }),
      });

      const data = await response.json();

      if (data.success && data.order) {
        clearCart();
        router.push(`/order-success/${data.order.id}`);
      } else {
        setErrorMsg(data.error || "حدث خطأ أثناء معالجة الطلب، حاول مرة أخرى.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("تعذر الاتصال بالخادم، يرجى التأكد من اتصال الإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
          إتمام الطلب والشحن 🇪🇬
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          أدخل بيانات الشحن واختر طريقة الدفع المناسبة لك في مصر
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Shipping & Payment Form Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Address Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              1. بيانات العنوان والتوصيل
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  الاسم بالكامل *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="مثال: أحمد محمد علي"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <User className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    رقم المحمول مصري (واتساب) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="01012345678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <Mail className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    المحافظة *
                  </label>
                  <select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    {EGYPT_GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    المدينة / المنطقة
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="مثال: المعادي / التجمع / سموحة"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  العنوان التفصيلي *
                </label>
                <input
                  type="text"
                  name="addressLine"
                  required
                  placeholder="اسم الشارع، رقم العمارة، رقم الشقة، علامة مميزة"
                  value={formData.addressLine}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  ملاحظات إضافية للتوصيل (اختياري)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="مثال: يرجى الاتصال قبل الوصول بربع ساعة"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              2. اختيار طريقة الدفع المناسبة
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  formData.paymentMethod === "CASH_ON_DELIVERY"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CASH_ON_DELIVERY"
                  checked={formData.paymentMethod === "CASH_ON_DELIVERY"}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    💵 الدفع عند الاستلام (COD)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    ادفع نقداً لمندوب الشحن بعد معاينة وفحص الشحنة.
                  </p>
                </div>
              </label>

              {/* Vodafone Cash */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  formData.paymentMethod === "VODAFONE_CASH"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="VODAFONE_CASH"
                  checked={formData.paymentMethod === "VODAFONE_CASH"}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                    <Smartphone className="w-4 h-4" /> فودافون كاش (Vodafone Cash)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    تحويل مباشر لمحفظة فودافون كاش عند إتمام الطلب.
                  </p>
                </div>
              </label>

              {/* InstaPay */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  formData.paymentMethod === "INSTAPAY"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="INSTAPAY"
                  checked={formData.paymentMethod === "INSTAPAY"}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    ⚡ تطبيق إنستا باي InstaPay
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    تحويل لحي لحظي برقم الحساب أو العنوان اللحظي IPA.
                  </p>
                </div>
              </label>

              {/* Card */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  formData.paymentMethod === "CARD"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={formData.paymentMethod === "CARD"}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    💳 بطاقة بنكية (فيزا / ماستركارد)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    دفع إلكتروني آمن 100% مشفر بدعم البنوك المصرية.
                  </p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right / Order Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              ملخص الطلب ({cart.length} منتجات)
            </h2>

            {/* Cart item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-700">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      الكمية: {item.quantity} × {item.price.toLocaleString("ar-EG")} ج.م
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    {(item.price * item.quantity).toLocaleString("ar-EG")} ج.م
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation summary */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {subtotal.toLocaleString("ar-EG")} ج.م
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>الخصم الكلي:</span>
                  <span>-{discountAmount.toLocaleString("ar-EG")} ج.م</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>مصاريف الشحن ({formData.governorate}):</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600">مجاني 🎉</strong>
                  ) : (
                    `${shippingFee.toLocaleString("ar-EG")} ج.م`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span>المبلغ الإجمالي المطلق:</span>
                <span className="text-lg text-emerald-600 dark:text-emerald-400">
                  {total.toLocaleString("ar-EG")} ج.m
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all transform active:scale-95"
            >
              {loading ? (
                <span>جاري معالجة إرسال الطلب...</span>
              ) : (
                <>
                  <span>تأكيد وإرسال الطلب الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
