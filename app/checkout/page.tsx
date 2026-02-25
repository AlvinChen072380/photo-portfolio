'use client'

import { useAppStore } from "@/src/store/useAppStore";
import { CheckCircle, ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation"; // 'next/router' 是*舊版引用方式
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/src/lib/supabase";




export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart, 
    increaseQuantity, 
    decreaseQuantity,
    removeFromCart, 
    clearCart 
  } = useAppStore();

  // 處理 Hydration
  const [mounted, setMounted] = useState(false);
  // 處理結帳狀態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  useEffect(() => setMounted(true), []);

  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * 50, 0 );

  // 訂單編號函式
  const generateOrderNumber = () => {
    const prefix = "ORD-";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${timestamp}-${random}`;
  }


  // 模擬結帳送出
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    /* console.log("網址 URL 測試:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("通行證 KEY 測試:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); */

    // 模擬 API 請求延遲 (2秒)
   /*  await new Promise((resolve) => setTimeout(resolve, 2000)); */
   try {
    // 組合姓名
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const newOrderNum = generateOrderNumber();
    setOrderNumber(newOrderNum);

    // 建立 Supabase 訂單物件
    const orderData = {
      order_number: newOrderNum,
      customer_name: fullName,
      customer_email: formData.email,
      total_amount: totalPrice,
      status: 'pending',
      items: cart,
    };

    // 發送至 Supabase
    const { error } = await supabase
      .from('orders') // 資料表名稱
      .insert([orderData]); //資料為陣列格式

    if (error) throw error;

    // 成功: 顯示成功畫面並清空購物車
    setIsSuccess(true);    
    clearCart();
   } catch (error) {
    console.error('Checkout failed', error);
    alert('Sorry, something went wrong with your order. Please try again.')
   } finally {
    setIsSubmitting(false);    
   }    
  };

  // 如果還沒 Mount，顯示 Loading 避免畫面閃爍
  if (!mounted) return <div className="min-h-screen bg-gray-50 dark:bg-black"/>;

  // 結長畫面成功
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100 dark:border-gray-800">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
          </p>

          {/* 訂單編號顯示 */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-8 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Order Number</p>
            <p className="font-mono font-bold text-xl text-gray-900 dark:text-white tracking-wider">
              {orderNumber}
            </p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold hover:opacity-70 transition-opacity cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // 空購物車擋路 (如果使用者直接輸入網址進來)
if (cart.length === 0) {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4 ">Your art is empty</h1>
      <Link href="/" className="text-blue-600 hover:underline flex items-center gap-2">
        <ArrowLeft className="w-4 h-4"/> Back to Gallery
      </Link>
    </div>
  );
}

return (
  <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white inline-flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4"/> Back to Shopping
        </Link>
        <h1 className="text-3xl font-bold mt-4 text-gray-300">Checkout</h1>
      </div>

        <div className="grid gird-cols-1 lg:grid-cols-2 gap-12">

          {/* 左側: 表單區域 */}
          <div className="space-y-8">
            <section className="bg-white/80 dark:bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-gray dark:text-white">Shipping Information</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input 
                      required type="text" 
                      placeholder="First Name" 
                      value={formData.firstName} 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-black-700 dark:focus:ring-white outline-none transition-all
                    "/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input 
                      required type="text" 
                      placeholder="Last Name" 
                      value={formData.lastName} 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    required type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <input 
                    required type="text" 
                    placeholder="Address" 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                </div>
              </form>
            </section>
          </div>  

          {/* 右側:訂單摘要 */}
          <div>
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>

              <div className="space-y-4 max-h-100 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {cart.map((item) => (
                  <div key={item.photo.id} className="flex gap-4 py-4 border-b dark:border-gray-800 last:border-0">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.photo.url}
                        alt={item.photo.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium line-clamp-1">{item.photo.title}</h3>
                        <p className="font-bold">${50 * item.quantity}</p>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded px-2 py-1">
                          <button 
                            type="button"
                            onClick={() => decreaseQuantity(item.photo.id)}
                            className="hover:text-black dark:hover:text-white"
                            aria-label="Decrease quantity"
                          ><Minus className="w-3 h-3"/></button>
                          <span className="w-4 text-center font-medium text-black dark:text-white">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => increaseQuantity(item.photo.id)}
                            className="hover:text-black dark:hover:text-white"
                            aria-label="Increase quantity"
                          ><Plus className="w-3 h-3"/></button>
                        </div>

                        <button 
                          type="button"
                          onClick={() => removeFromCart(item.photo.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

                <div className="mt-6 pt-6 border-t dark:border-gray-800 space-y-2">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t dark:border-gray-800">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form" // 連結到左側的 form
                  disabled={isSubmitting}
                  className="w-full mt-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
            </div>
          </div>

      </div>         
    </div>
  </div>
)
}

