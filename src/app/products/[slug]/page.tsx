import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ProductCard } from "@/components/ui/ProductCard";
import ProductDetailClient from "./ProductDetailClient";

const prisma = new PrismaClient();

export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      reviews: true,
    },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      reviews: true,
    },
    take: 4,
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-emerald-600 transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-emerald-600 transition-colors">
          {product.category.nameAr || product.category.name}
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-xs">
          {product.titleAr || product.title}
        </span>
      </nav>

      {/* Main Interactive Product Detail Component */}
      <ProductDetailClient product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2 h-6 rounded-full bg-emerald-600 inline-block" />
            منتجات ذات صلة قد تعجبك
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.titleAr || p.title}
                slug={p.slug}
                price={p.price}
                comparePrice={p.comparePrice}
                image={p.images[0]?.url || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000"}
                categoryName={p.category.nameAr || p.category.name}
                variantId={p.variants[0]?.id}
                variantName={p.variants[0]?.name}
                stock={p.variants[0]?.stock || 10}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
