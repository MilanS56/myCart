

// import dynamic from 'next/dynamic';

//   const CartContent=dynamic(()=>import('@/components/CartContent'),{
//     loading:()=> <p className="text-xl font-semibold text-blue-950">Cart is Loading</p>,
  
//   })
  
// export default function CartPage(){
//   return (console.log("Loading Lazily.."),<CartContent/>);
// }
import CartContent from "@/components/CartContent";
export default function CartPage(){
  return <CartContent/>
}