import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function About() {
  return (
    <div className="p-20 bg-slate-400 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">關於此頁面 (About This Page)</h1>
      <p className="mb-8">這是一個轉場測試的頁面。</p>

      <Link href="/" className="text-blue-600 underline text-xl">
        <ArrowLeftIcon/> 回到首頁
      </Link>
    </div>
  )
}