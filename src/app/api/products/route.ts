import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") || "newest";

    let whereClause: any = {};

    if (category) {
      whereClause.category = {
        slug: category,
      };
    }

    if (featured === "true") {
      whereClause.isFeatured = true;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { titleAr: { contains: search } },
        { description: { contains: search } },
        { descriptionAr: { contains: search } },
      ];
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        images: {
          orderBy: { displayOrder: "asc" },
        },
        variants: true,
        reviews: true,
      },
      orderBy,
    });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
