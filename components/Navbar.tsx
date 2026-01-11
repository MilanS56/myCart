"use client"
import Link from 'next/link'
import { useSelector } from 'react-redux'
import {RootState} from '@/redux/store'
import {FaShoppingCart} from 'react-icons/fa'

export default function Navbar(){
    const totalItems=useSelector((state:RootState)=>
        state.cart.items.reduce((sum,item)=>sum + item.quantity,0)
    )
    return (
        <nav className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MyStore</h1>

        <div className="flex items-center gap-8 text-lg font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>

          <Link href="/cart" className="relative flex items-center gap-2 hover:text-blue-600">
            <FaShoppingCart size={22} />
            <span>Cart</span>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}