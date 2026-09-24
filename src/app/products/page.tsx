import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { ProductCard } from "@/components/ui/ProductCard";
import { Filter, SlidersHorizontal, Search, ArrowUpDown, X } from "lucide-react";

const prisma = new PrismaClient();

export const revalidate = 0;

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    featured?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  const searchQuery = params.search;
  const featured = params.featured;
  const sort = params.sort || "newest";

  const categories = await prisma.category.findMany();

  let whereClause: any = {};
  if (categorySlug) {
    whereClause.category = { slug: categorySlug };
  }
  if (featured === "true") {
    whereClause.isFeatured = true;
  }
  if (searchQuery) {
    whereClause.OR = [
      { title: { contains: searchQuery } },
      { titleAr: { contains: searchQuery } },
      { description: { contains: searchQuery } },
      { descriptionAr: { contains: searchQuery } },
    ];
  }

  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };

  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      reviews: true,
    },
    orderBy,
  });

  const selectedCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-3 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {selectedCategory
                ? selectedCategory.nameAr || selectedCategory.name
                : searchQuery
                ? `نتائج البحث عن "${searchQuery}"`
                : featured === "true"
                ? "أحدث العروض والخصومات 🔥"
                : "جميع المنتجات في المتجر"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              تم العثور على {products.length} منتج بدعم الشحن لكافة المحافظات المصرية
            </p>
          </div>

          {(categorySlug || searchQuery || featured) && (
            <Link
              href="/products"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>إلغاء الفلاتر</span>
            </Link>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            !categorySlug
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          الكل ({categories.reduce((a, b) => a + 1, 0)})
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              categorySlug === cat.slug
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {cat.nameAr || cat.name}
          </Link>
        ))}
      </div>

      {/* Main Grid Section */}
      {products.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            لم نجد أي منتجات تطابق بحثك
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            جرب البحث بكلمات أخرى أو اختر تصنيف مختلف
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
          >
            عرض كافة المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
      )}

    </div>
  );
}
