import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { CheckCircle2, PackageCheck, Smartphone, Truck, Home, ArrowLeft } from "lucide-react";

const prisma = new PrismaClient();

export const revalidate = 0;

interface OrderSuccessPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">الطلب غير موجود</h2>
        <Link href="/" className="text-emerald-600 font-bold underline">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-black inline-block">
          تم استلام طلبك بنجاح 🇪🇬
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
          شكراً لثقتك بـ متجر مصر الرقمي!
        </h1>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 inline-block border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">رقم الطلب الخاص بك:</p>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
            {order.orderNumber}
          </p>
        </div>

        {/* Payment specific instructions for Egyptian methods */}
        {order.paymentMethod === "VODAFONE_CASH" && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-right space-y-2">
            <h3 className="text-xs font-black text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> تعليمات تحويل فودافون كاش:
            </h3>
            <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
              يرجى تحويل المبلغ الإجمالي <strong>({order.totalAmount.toLocaleString("ar-EG")} ج.م)</strong> إلى رقم المحفظة:{" "}
              <strong className="font-mono text-sm underline dir-ltr">01099887766</strong> وتقديم صورة التحويل لمندوب الشحن أو على الواتساب عند التواصل.
            </p>
          </div>
        )}

        {order.paymentMethod === "INSTAPAY" && (
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-right space-y-2">
            <h3 className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              ⚡ تعليمات تحويل إنستا باي (InstaPay):
            </h3>
            <p className="text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
              يرجى تحويل المبلغ الإجمالي <strong>({order.totalAmount.toLocaleString("ar-EG")} ج.م)</strong> إلى العنوان اللحظي IPA:{" "}
              <strong className="font-mono text-sm underline">egyptstore@instapay</strong>
            </p>
          </div>
        )}

        {order.paymentMethod === "CASH_ON_DELIVERY" && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right space-y-2">
            <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              💵 الدفع عند الاستلام:
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              يرجى تجهيز المبلغ النظير كاش لمندوب التوصيل عند استلام الشحنة وتفحصها.
            </p>
          </div>
        )}

        {/* Delivery Details */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 text-right space-y-2 text-xs border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <Truck className="w-4 h-4" />
            <span>موعد التوصيل المتوقع: خلال 24 - 48 ساعة</span>
          </div>
          <p className="text-slate-500">
            العنوان: {order.notes || "مصر"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2"
          >
            <span>متابعة التسوق</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>الصفحة الرئيسية</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
