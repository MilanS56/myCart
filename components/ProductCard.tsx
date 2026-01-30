"use client";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/cartSlice";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import { Product } from "@/types/Product";
import withErrorBoundary from "./ErrorBoundary";

interface Props {
  products: Product;
}

function ProductCart({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [added, setAdded] = useState(false);

  const getToken = () => localStorage.getItem("user_token");

  const handleAdd = async () => {
    if (added) return;

    const token = getToken();

    await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-token": token || ""
      },
      body: JSON.stringify(products)
    });

    // Refresh cart from server
    const res = await fetch("http://localhost:5000/cart", {
      headers: { "x-user-token": token || "" }
    });
    const data = await res.json();
    dispatch(setCart(data));

    toast.success("Added to Cart");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main>
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-xl transition">
        <img
          src={products?.image}
          loading="lazy"
          className="h-40 object-contain mb-4"
        />

        <h2 className="font-semibold text-sm mb-1 line-clamp-2">
          {products?.title}
        </h2>

        <p className="text-blue-600 font-bold mb-3">
          ₹ {products?.price}
        </p>

        <button
          onClick={handleAdd}
          className={`mt-auto py-2 rounded-lg transition ${
            added ? "bg-gray-800" : "bg-blue-600"
          } text-white`}
        >
          {added ? "Added ✔" : "Add to Cart"}
        </button>
      </div>
    </main>
  );
}

export default withErrorBoundary(ProductCart);
