"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {fetchProducts} from '@/redux/productSlice'
import {RootState, AppDispatch} from '@/redux/store'
import ProductCard from '@/components/ProductCard'
import { Product } from "@/types/Product";

export default function Home(){
  const dispatch=useDispatch<AppDispatch>();
  const {items,status}=useSelector((state:RootState)=>state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [page, setPage]=useState(1)
  const itemsPerPage=8;

  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]);

  const filtered=items
  .filter((item:Product)=>
    item.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((items:Product)=>
    category==="All"?true: items.category===category
  )
  .sort((a:Product,b:Product)=>{
    if (sort==="low") return a.price - b.price;
    if (sort==="high") return b.price - a.price;
    return 0;
  })
  const start=(page-1)* itemsPerPage;
  const paginated = filtered.slice(start,start + itemsPerPage);
  const totalPages= Math.ceil(filtered.length/itemsPerPage);

  if(status==='loading...') return <p className="p-10 font-black text-2xl text-blue-950">Loading...</p>

  return (
    <main className="p-10">
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-60"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />

        <select
          className="border px-4 py-2 rounded"
          value={category}
          onChange={e => { setCategory(e.target.value); setPage(1); }}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="default">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((product: Product) => (
          <ProductCard key={product.id} products={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 border rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  )
}