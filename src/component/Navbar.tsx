import Link from "next/link";
import { Camera } from "lucide-react";

/* interface NavbarProps {
  totalLikes: number;
} */

export default function Navbar(/* { totalLikes }:NavbarProps */) {
  return (
    <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <Camera className="w-6 h-6"/>
        <span>PhotoFolio</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
            Total Likes : <span className="text-blue-600">{/* totalLikes */}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}