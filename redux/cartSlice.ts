import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number
}
interface CartState{
    items:CartItem[];
}

const initialState: CartState={items:[]};
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state, action: PayloadAction<CartItem>){
            const item=state.items.find(i=> i.id===action.payload.id);
            if(item){
                if(item.quantity<10) item.quantity++;
            }
            else{
                state.items.push({...action.payload,quantity:1})
            }
        },
        removeFromCart(state,action: PayloadAction<number>){
            state.items=state.items.filter(i=>i.id!==action.payload);
        },
        clearCart(state){
            state.items=[];
        },
        updateQuantity(state,action:PayloadAction<{id:number, qty: number}>){
            const item=state.items.find(i=>i.id===action.payload.id);
            if(item) item.quantity=action.payload.qty;
        }
    }
})
export const {addToCart, removeFromCart, clearCart, updateQuantity}=cartSlice.actions;
export default cartSlice.reducer