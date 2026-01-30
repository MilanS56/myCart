"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setCart } from "@/redux/cartSlice";
import { useMemo, useState, useEffect } from "react";
import SimpleModal from "@/components/SimpleModal";

export default function CartContent() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getToken = () => localStorage.getItem("user_token");

  // Load cart from server
  useEffect(() => {
    const token = getToken();
    fetch("http://localhost:5000/cart", {
      headers: { "x-user-token": token || "" }
    })
      .then(res => res.json())
      .then(data => dispatch(setCart(data)));
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, [items]);

  if (items.length === 0)
    return <div className="p-10 text-xl font-semibold">Your cart is empty.</div>;

  const refreshCart = async () => {
    const token = getToken();
    const res = await fetch("http://localhost:5000/cart", {
      headers: { "x-user-token": token || "" }
    });
    const data = await res.json();
    dispatch(setCart(data));
  };

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Empty Cart
        </button>
      </div>

      {items.map(item => (
        <div key={item.id} className="flex gap-6 border-b py-6 items-center">
          <img src={item.image} className="h-24 object-contain" />

          <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-blue-600 font-bold">₹ {item.price}</p>

            <div className="flex items-center gap-3 mt-3">
              <button
                disabled={item.quantity === 1}
                onClick={async () => {
                  const token = getToken();
                  await fetch(`http://localhost:5000/cart/${item.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "x-user-token": token || ""
                    },
                    body: JSON.stringify({ qty: item.quantity - 1 })
                  });
                  refreshCart();
                }}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                disabled={item.quantity === 10}
                onClick={async () => {
                  const token = getToken();
                  await fetch(`http://localhost:5000/cart/${item.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "x-user-token": token || ""
                    },
                    body: JSON.stringify({ qty: item.quantity + 1 })
                  });
                  refreshCart();
                }}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => setRemoveId(item.id)}
            className="text-red-500 font-semibold"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right text-xl font-bold mt-6">
        Total: ₹ {total.toFixed(2)}
      </div>

      {removeId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center w-80">
            <h2 className="text-lg font-semibold mb-4">
              Do you really want to remove this item?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRemoveId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  const token = getToken();
                  await fetch(`http://localhost:5000/cart/${removeId}`, {
                    method: "DELETE",
                    headers: { "x-user-token": token || "" }
                  });
                  refreshCart();
                  setRemoveId(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <SimpleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={async () => {
          const token = getToken();
          await fetch("http://localhost:5000/cart", {
            method: "DELETE",
            headers: { "x-user-token": token || "" }
          });
          dispatch(setCart([]));
          setShowModal(false);
        }}
      />
    </main>
  );
}
