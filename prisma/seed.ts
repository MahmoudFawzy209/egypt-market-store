import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Egyptian E-Commerce database seeding...");

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shippingMethod.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Create Categories
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics & Tech",
      nameAr: "إلكترونيات وتكنولوجيا",
      slug: "electronics",
      description: "أحدث الموبايلات واللابتوبات والسماعات والساعات الذكية بأفضل الأسعار في مصر",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    },
  });

  const fashion = await prisma.category.create({
    data: {
      name: "Fashion & Apparel",
      nameAr: "أزياء وملابس قطنية",
      slug: "fashion",
      description: "ملابس راقية مصنعة من أجود أنواع القطن المصري والموضة العالمية",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
    },
  });

  const beauty = await prisma.category.create({
    data: {
      name: "Perfumes & Beauty",
      nameAr: "عطور ومنتجات تجميل",
      slug: "perfumes",
      description: "أرقى العطور الشرقية والغربية ومستحضرات العناية الأصلية 100%",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    },
  });

  const homeApp = await prisma.category.create({
    data: {
      name: "Home & Kitchen",
      nameAr: "أجهزة منزلية ومطبخ",
      slug: "home-kitchen",
      description: "أجهزة المطبخ والمنزل الذكي لتسهيل حياتك اليومية",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
    },
  });

  // Create Products
  // 1. iPhone 16 Pro Max
  const iphone = await prisma.product.create({
    data: {
      title: "Apple iPhone 16 Pro Max 256GB - Natural Titanium",
      titleAr: "آبل آيفون 16 بروماكس سعة 256 جيجابايت - تيتانيوم طبيعي",
      slug: "iphone-16-pro-max-256gb",
      description: "أحدث هواتف آبل لشريحة A18 Pro مع كفاءة طاقة استثنائية، شاشة Super Retina XDR مقاس 6.9 بوصة وكاميرا احترافية بدقة 48 ميجابكسل.",
      descriptionAr: "شريحة A18 Pro، تصميم التيتانيوم القوي والخفيف، كاميرا 48 ميجابكسل مع تقريب بصري 5x وبطارية تدوم طوال اليوم. ضمان محلي متوفر.",
      price: 64999,
      comparePrice: 69999,
      isFeatured: true,
      categoryId: electronics.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
            alt: "iPhone 16 Pro Max Natural Titanium",
            isPrimary: true,
            displayOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop",
            alt: "iPhone Back View",
            isPrimary: false,
            displayOrder: 2,
          }
        ]
      },
      variants: {
        create: [
          { sku: "IP16PM-256-NAT", name: "تيتانيوم طبيعي / 256 جيجا", color: "تيتانيوم طبيعي", size: "256GB", stock: 15, price: 64999 },
          { sku: "IP16PM-512-NAT", name: "تيتانيوم أسود / 512 جيجا", color: "تيتانيوم أسود", size: "512GB", stock: 8, price: 74999 },
        ]
      }
    }
  });

  // 2. Samsung Galaxy S25 Ultra
  await prisma.product.create({
    data: {
      title: "Samsung Galaxy S25 Ultra 5G 512GB",
      titleAr: "سامسونج جالاكسي S25 أولترا 5G سعة 512 جيجابايت",
      slug: "samsung-galaxy-s25-ultra",
      description: "الهاتف الرائد من سامسونج مع قلم S-Pen مدمج، شاشة dynamic AMOLED 2X وذكاء اصطناعي Galaxy AI متقدم.",
      descriptionAr: "شاشة 6.8 بوصة 120Hz، معالج Snapdragon 8 Gen 4، كاميرا 200 ميجابكسل وقلم S Pen مدمج مع بطارية 5000 مللي أمبير.",
      price: 57999,
      comparePrice: 62000,
      isFeatured: true,
      categoryId: electronics.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
            alt: "Samsung Galaxy Ultra",
            isPrimary: true,
            displayOrder: 1,
          }
        ]
      },
      variants: {
        create: [
          { sku: "S25U-512-BLK", name: "أسود تيتانيوم / 512 جيجا", color: "أسود تيتانيوم", size: "512GB", stock: 12, price: 57999 },
        ]
      }
    }
  });

  // 3. Premium Egyptian Cotton Shirt
  await prisma.product.create({
    data: {
      title: "Luxury 100% Egyptian Cotton Men's Shirt",
      titleAr: "قميص كلاسيكي رجالي 100% قطن مصري فاخر",
      slug: "egyptian-cotton-mens-shirt",
      description: "مصنوع يدوياً من أجود ألياف القطن المصري طويل التيلة لحرية حركة وملمس ناعم يدوم طويلاً.",
      descriptionAr: "نسيج أكسفورد فائق النعومة، خياطة ممتازة ومقاوم للتجعد، مثالي للمناسبات الرسمية والعملية.",
      price: 950,
      comparePrice: 1250,
      isFeatured: true,
      categoryId: fashion.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
            alt: "Egyptian Cotton Shirt White",
            isPrimary: true,
            displayOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
            alt: "Egyptian Cotton Shirt Blue",
            isPrimary: false,
            displayOrder: 2,
          }
        ]
      },
      variants: {
        create: [
          { sku: "SHIRT-WHT-L", name: "أبيض كلاسيك / مقاس L", color: "أبيض", size: "L", stock: 35, price: 950 },
          { sku: "SHIRT-BLU-M", name: "أزرق سماوي / مقاس M", color: "أزرق", size: "M", stock: 20, price: 950 },
          { sku: "SHIRT-BLU-XL", name: "أزرق سماوي / مقاس XL", color: "أزرق", size: "XL", stock: 18, price: 950 },
        ]
      }
    }
  });

  // 4. Dior Sauvage Perfume
  await prisma.product.create({
    data: {
      title: "Dior Sauvage Parfum Spray 100ml",
      titleAr: "عطر ديور سوڤاج بارفان للرجال - 100 مل (أصلي 100%)",
      slug: "dior-sauvage-parfum-100ml",
      description: "نفحات خشبية وجذابة مع البرغموت والصندل من كاليدونيا الجديدة.",
      descriptionAr: "عطر رجالي أيقوني يتميز بالفوحان العالي والثبات القوي يدوم لأكثر من 24 ساعة.",
      price: 5400,
      comparePrice: 6100,
      isFeatured: true,
      categoryId: beauty.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
            alt: "Dior Sauvage Bottle",
            isPrimary: true,
            displayOrder: 1,
          }
        ]
      },
      variants: {
        create: [
          { sku: "DIOR-SAU-100", name: "عبوة 100 مل - مركز", color: "شفاف", size: "100ml", stock: 25, price: 5400 },
        ]
      }
    }
  });

  // 5. DeLonghi Air Fryer
  await prisma.product.create({
    data: {
      title: "DeLonghi Multifry Extra 5.5L Air Fryer",
      titleAr: "قلاية بدون زيت ديلونجي 5.5 لتر قوة 1800 واط",
      slug: "delonghi-air-fryer-5l",
      description: "قلاية هوائية ذكية بـ 7 برامج طهي مسبقة وشاشة لمس رقمية لإعداد طعام صحي بنسبة 90% دهون أقل.",
      descriptionAr: "سعة كبيرة تكفي للعائلة، وعاء غير لاصق وسهل التنظيف بغسالة الصحون، بتقنية التوزيع السريع للهواء الساخن.",
      price: 4850,
      comparePrice: 5600,
      isFeatured: false,
      categoryId: homeApp.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=1000&auto=format&fit=crop",
            alt: "Air Fryer Kitchen",
            isPrimary: true,
            displayOrder: 1,
          }
        ]
      },
      variants: {
        create: [
          { sku: "DELONG-AF-BLK", name: "أسود مات / 5.5 لتر", color: "أسود", size: "5.5L", stock: 10, price: 4850 },
        ]
      }
    }
  });

  // 6. Anker Soundcore Q45 Headphones
  await prisma.product.create({
    data: {
      title: "Anker Soundcore Space Q45 Wireless ANC Headphones",
      titleAr: "سماعات أنكر ساوند كور سبيس Q45 لإلغاء الضوضاء النشط",
      slug: "anker-soundcore-space-q45",
      description: "تخفيض الضوضاء حتى 98%، بطارية تدوم 50 ساعة، صوت عالي الدقة LDAC وتصميم مريح.",
      descriptionAr: "شحن سريع خلال 5 دقائق يعطي 4 ساعات تشغيل، ميكروفونات مزدوجة للمكالمات الواضحة وتطبيق مخصص لإعداد الصوت.",
      price: 3350,
      comparePrice: 3900,
      isFeatured: true,
      categoryId: electronics.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
            alt: "Anker Soundcore Q45",
            isPrimary: true,
            displayOrder: 1,
          }
        ]
      },
      variants: {
        create: [
          { sku: "ANKER-Q45-BLK", name: "أسود كربوني", color: "أسود", size: "قياسي", stock: 30, price: 3350 },
        ]
      }
    }
  });

  // 7. Oriental Oud & Mastic Luxury Perfume
  await prisma.product.create({
    data: {
      title: "Royal Egyptian Mastic & Aged Oud Extrait de Parfum 100ml",
      titleAr: "عطر نيش الملكي بالمستكة والملاكي والعود المعتق 100 مل",
      slug: "royal-mastic-oud-perfume",
      description: "عطر نيش مصري فاخر يجمع بين نفحات المستكة اليونانية والعود الكامبودي وعنبر الحوت.",
      descriptionAr: "تركيز Extrait de Parfum 30%، يأتي في صندوق خشبي فاخر مبطن بالحرير. إصدار محدود.",
      price: 2950,
      comparePrice: 3600,
      isFeatured: true,
      categoryId: beauty.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
            alt: "Luxury Oud Perfume",
            isPrimary: true,
            displayOrder: 1,
          }
        ]
      },
      variants: {
        create: [
          { sku: "OUD-MASTIC-100", name: "100 مل إصدار فاخر", color: "ذهبي", size: "100ml", stock: 14, price: 2950 },
        ]
      }
    }
  });

  // Shipping Methods
  await prisma.shippingMethod.createMany({
    data: [
      {
        name: "Express Cairo & Giza Delivery",
        nameAr: "شحن سريع - القاهرة والجيزة (خلال 24-48 ساعة)",
        description: "توصيل للمنزل أو مقر العمل داخل القاهرة الكبرى والجيزة",
        price: 50,
        estimatedDays: "1-2 أيام",
        isActive: true,
      },
      {
        name: "Alexandria & Delta Shipping",
        nameAr: "شحن الإسكندرية والدلتا والقناة",
        description: "توصيل محافظات الإسكندرية، المنصورة، طنطا، الإسماعيلية، والسويس",
        price: 75,
        estimatedDays: "2-3 أيام",
        isActive: true,
      },
      {
        name: "Upper Egypt & Frontier Shipping",
        nameAr: "شحن الصعيد والمحافظات النائية",
        description: "توصيل محافظات أسيوط، سوهاج، الأقصر، أسوان، البحر الأحمر، وسيناء",
        price: 100,
        estimatedDays: "3-5 أيام",
        isActive: true,
      }
    ]
  });

  // Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "MASR10",
        discountType: "PERCENTAGE",
        value: 10,
        minSpend: 500,
        maxDiscount: 500,
        isActive: true,
      },
      {
        code: "WELCOME500",
        discountType: "FIXED",
        value: 500,
        minSpend: 5000,
        isActive: true,
      },
      {
        code: "FREE50",
        discountType: "FIXED",
        value: 50,
        minSpend: 300,
        isActive: true,
      }
    ]
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
