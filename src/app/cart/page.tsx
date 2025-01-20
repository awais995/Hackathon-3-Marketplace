"use client";

import React, { useEffect, useState } from "react";
import CartItem from "./cartitems";
import OrderSummary from "./ordersummary";
import Link from "next/link";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    } catch (err: any) {
      setError("Error fetching cart data.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (cart.length === 0) return <div>Your cart is empty!</div>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:px-20">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link> &gt;{" "}
        <Link href="/shop" className="hover:text-gray-700">
          Shop
        </Link>{" "}
        &gt; <span className="text-black font-semibold">Cart</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">YOUR CART</h1>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-4 md:p-6">
          <CartItem products={cart} />
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4 md:p-6">
          <OrderSummary products={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;