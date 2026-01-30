"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";


export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const productsState= useSelector((state: RootState) => state.product);

  if(!productsState) return null;
  const {items,status}=productsState;

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput]=useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //Debouncing Logic
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setSearch(searchInput);
    },400);

    return ()=>clearTimeout(timer);
  },[searchInput])

  // Main filter engine
  useEffect(() => {
    let data = [...items];

    if (search)
      data = data.filter(p =>
        p?.title.toLowerCase().includes(search.toLowerCase())
      );

    if (category !== "all")
      data = data?.filter(p => p.category === category);
    if (sort === "low") 
      data?.sort((a, b) => a.price - b.price);
    if (sort === "high") 
      data?.sort((a, b) => b.price - a.price);

    setPage(1);
    setVisibleProducts(data);
  }, [items, search, category, sort]);

  // Pagination
  const start = (page - 1) * itemsPerPage;
  const paginated = visibleProducts.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);

  if (status === "loading") return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10">

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-60"
          value={searchInput}
        
          onChange={e => {
            const value=e.target.value;
            const cleaned=value.replace(/[^a-zA-Z0-9 ]/g, "")
              setSearchInput(cleaned)}}
            
        />

        <select
          className="border px-4 py-2 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map(product => (
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
  );
}
