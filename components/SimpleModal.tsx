'use client'
import { api } from '@/lib/axios';
import { useEffect } from 'react';
 import {createPortal} from 'react-dom'

 type Props={
    open:boolean;
    onClose():void;
    onConfirm():void
 }
 export default function SimpleModal({open, onClose, onConfirm}: Props){
    if(!open) return null;
    const modalRoot=document.getElementById("modal-root");
    if(!modalRoot) return null;
useEffect(()=>{

  const fetchApi = async() =>{
const resp = await api.get("/products");
console.log("inside api",resp.data)
  }
  fetchApi();
},[])
    return createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-xl text-center w-80">
                    <h2 className="text-lg font-semibold mb-4">
                      Do you really want to Empty Cart?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button onClick={onClose}
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>
        
                      <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                        Remove
                      </button>
                    </div>
                  </div>
        </div>,
        modalRoot
    );
 }