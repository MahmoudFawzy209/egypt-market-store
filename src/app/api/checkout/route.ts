import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      governorate,
      city,
      addressLine,
      paymentMethod,
      items,
      subtotal,
      discountAmount,
      shippingCost,
      totalAmount,
      couponCode,
      notes,
    } = body;

    if (!fullName || !phone || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "جميع البيانات الأساسية ورقم الهاتف والمنتجات مطلوبة" },
        { status: 400 }
      );
    }

    const orderNumber = `EGY-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: email || null,
        paymentMethod: paymentMethod || "CASH_ON_DELIVERY",
        paymentStatus: paymentMethod === "CASH_ON_DELIVERY" ? "PENDING" : "PAID",
        status: "PROCESSING",
        subtotal: parseFloat(subtotal),
        discountAmount: parseFloat(discountAmount || 0),
        shippingCost: parseFloat(shippingCost || 0),
        totalAmount: parseFloat(totalAmount),
        couponCode: couponCode || null,
        notes: notes ? `${notes} - المحافظة: ${governorate}, العنوان: ${addressLine}` : `المحافظة: ${governorate}, المدينة: ${city}, العنوان: ${addressLine}`,
        items: {
          create: items.map((item: any) => ({
            productVariantId: item.variantId || item.id,
            productTitle: item.title,
            variantName: item.variantName || "الأساسي",
            productImage: item.image,
            unitPrice: parseFloat(item.price),
            quantity: item.quantity,
            subtotal: parseFloat(item.price) * item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء معالجة الطلب، يرجى المحاولة لاحقاً" },
      { status: 500 }
    );
  }
}
