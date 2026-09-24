"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItemType {
  id: string; // Variant ID or Product ID
  productId: string;
  variantId?: string;
  title: string;
  variantName?: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface CouponType {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  value: number;
}

interface CartContextType {
  cart: CartItemType[];
  isCartOpen: boolean;
  wishlist: string[]; // Product IDs
  appliedCoupon: CouponType | null;
  discountAmount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItemType, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponType | null>(null);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("egy_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("egy_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("egy_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("egy_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }
  }, [wishlist]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (item: Omit<CartItemType, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = item.quantity || 1;
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + qtyToAdd;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, item.stock || 99),
        };
        return updated;
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
    openCart();
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(newQty, item.stock || 99) };
          }
          return item;
        })
        .filter(Boolean) as CartItemType[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "PERCENTAGE") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
    discountAmount = Math.min(discountAmount, subtotal);
  }

  // Free shipping for orders over 2000 EGP
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 50;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === "MASR10") {
      setAppliedCoupon({ code: "MASR10", discountType: "PERCENTAGE", value: 10 });
      return { success: true, message: "تم تطبيق خصم 10% بنجاح!" };
    }
    if (formatted === "WELCOME500") {
      if (subtotal < 3000) {
        return { success: false, message: "الكوبون يتطلب حدا أدنى للطلب 3000 ج.م" };
      }
      setAppliedCoupon({ code: "WELCOME500", discountType: "FIXED", value: 500 });
      return { success: true, message: "تم تطبيق خصم 500 ج.م بنجاح!" };
    }
    if (formatted === "FREE50") {
      setAppliedCoupon({ code: "FREE50", discountType: "FIXED", value: 50 });
      return { success: true, message: "تم تطبيق خصم 50 ج.م بنجاح!" };
    }
    return { success: false, message: "كود الخصم غير صحيح أو منتهي الصلاحية" };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        wishlist,
        appliedCoupon,
        discountAmount,
        subtotal,
        shippingFee,
        total,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
