"use client"
import {useDispatch} from 'react-redux'
import {addToCart} from '@/redux/cartSlice'
import {useState} from 'react'
import { AppDispatch } from '@/redux/store'
import toast from 'react-hot-toast'
import {Product} from '@/types/Product'

interface Props {
    products:Product;
}
export default function ProductCart({products}:Props){
    const dispatch=useDispatch<AppDispatch>();
    const [added,setAdded]=useState(false);

    const handleAdd=()=>{
        dispatch(addToCart(products));
        toast.success("Added to Cart");
        setAdded(true);

        setTimeout(()=>setAdded(false),3000);
    }

    return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-xl transition">

      <img src={products.image} className="h-40 object-contain mb-4" />

      <h2 className="font-semibold text-sm mb-1 line-clamp-2">
        {products.title}
      </h2>

      <p className="text-blue-600 font-bold mb-3">₹ {products.price}</p>

      <button
        onClick={handleAdd}
        className={`mt-auto py-2 rounded-lg transition ${
          added ? "bg-green-500" : "bg-blue-600"
        } text-white`}
      >
        {added ? "Added ✔" : "Add to Cart"}
      </button>
    </div>
    )
}