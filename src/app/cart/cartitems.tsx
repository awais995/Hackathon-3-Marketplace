"use client";

import React, { useEffect, useState } from "react";

interface CartItemProps {
  products: any[];
}

const CartItem: React.FC<CartItemProps> = ({ products }) => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Fetch cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return <div className="text-center text-xl">Your cart is empty!</div>;
  }

  return (
    <div>
      {cart.map((cartItem) => {
        const product = products.find((item) => item._id === cartItem.id);

        if (!product) {
          return <div key={cartItem.id}>Product not found</div>;
        }

        return (
          <div key={cartItem.id} className="flex items-center justify-between border-b py-4">
            {/* Product Image */}
            <div className="flex items-center gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
              />
              <div>
                <h2 className="text-md md:text-lg font-semibold leading-tight">{product.name}</h2>
                <p className="text-sm text-gray-500">
                  Size: <span className="text-black">{cartItem.size}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Color: <span className="text-black">{cartItem.color}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: <span className="text-black">{cartItem.quantity}</span>
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="text-md md:text-lg font-bold">
              ${(product.price * cartItem.quantity).toFixed(2)}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(cartItem.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
