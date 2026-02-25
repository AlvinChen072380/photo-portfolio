// src/app/admin/page.tsx
import { supabaseAdmin } from "@/src/lib/supabase"; // 確保路徑正確
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// 🚀 關鍵設定：強制 Next.js 每次有人訪問這頁時，都去資料庫抓最新資料，不要用舊的庫存畫面
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. 安全檢查：確保我們有拿到老闆鑰匙
  if (!supabaseAdmin) {
    return <div className="p-8 text-red-500">System Error: Admin client not initialized.</div>;
  }

  // 2. 伺服器端直接去資料庫拿訂單，並且按照時間「由新到舊」排序
  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Failed to load orders: {error.message}</div>;
  }

  // 3. 渲染漂亮的後台表格
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 頭部導覽 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
            <p className="text-gray-500">View and manage all incoming orders.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-500">Total Orders: </span>
            <span className="font-bold text-lg">{orders?.length || 0}</span>
          </div>
        </div>

        {/* 訂單資料表 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Order Number</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Total</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-mono text-sm font-bold text-gray-900 dark:text-white">
                      {order.order_number || 'N/A'}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString('zh-TW', {
                        timeZone: 'Asia/Taipei', // 強制轉換為台灣時區
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true // 使用 24 小時制
                      })}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">
                      ${order.total_amount}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                          order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}

                {orders?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}