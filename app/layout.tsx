import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/src/component/Navbar";
import "./globals.css";
import localFont from "next/font/local";

//import { ThemeProvider } from "@/src/context/ThemeContext";
import StoreInitializer from "@/src/component/StoreInitializer";
//import { LikesProvider } from "@/src/context/LikesContext";
/* import Navbar from "@/src/component/Navbar";
 */
import CartDrawer from "@/src/component/CartDrawer";
import AmbientBackground from "@/src/component/AmbientBackground";
import ContactForm from "@/src/component/ContactForm";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://photo-portfolio-nine-theta.vercel.app/"),//網址部署Vercel後要改回

  title: {
    default: "Magic Portfolio | Immersive E-commerce Experience",
    template: "%s | Magic Portfolio", // 子標題為 "Checkout | Magic Portfolio"
  },
  description: "A high-performance, immersive photography portfolio featuring virtualization, state management, and dark mode.",
  keywords: ["Next.js", "React", "Portfolio", "Photography", "Virtualization", "Web Development"],
  authors: [{ name: "Alvin Chen" }],
  creator: "Alvin Chen",

  // Open Graph: 這是分享到 FB/Line/discord 時顯示的圖片
  openGraph: {
    title: "Magic Portfolio - The Art of Code & Photography",
    description: "Experience the fusion of high-performance web tech and visual art.",
    url: "/",
    siteName: "Magic Portfolio",
    locale: "en_US",
    type: "website",
  },
};

const themeScript = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('app_theme');
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        }
    } catch (e) {}
  })();
`;

const myCustomFont = localFont({
  src: "./fonts/RINGW.woff2",
  variable: "--font-custom",
  display: "swap",  
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //因為layout 是父層，資料 Props 只能向下走不能往回逆流，所以父層無從得知page.tsx的按讚數量!
  /* const totalLikes = 0; */

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${myCustomFont.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 
          `}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AmbientBackground />
        <StoreInitializer /> {/* 初始化元件 */}
        <Navbar /* totalLikes={totalLikes} */ />
        <CartDrawer />
        {children} {/* Component Composition (元件組合)的關鍵 */}
        {/* <Footer /> */}
        <ContactForm/>
        <footer className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} My Magic Shop. Built for educational
            purposes.
          </p>
          <p>Image assets are property of their respective owners.</p>
        </footer>
      </body>
    </html>
  );
}
