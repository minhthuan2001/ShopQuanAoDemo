import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-shopee rounded flex items-center justify-center font-bold text-white">S</div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-gray-900" : "text-gray-900"}`}>
            ShopQuanAo<span className="text-shopee">Demo</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-shopee transition-colors">Trang chủ</a>
          <a href="#catalog" className="text-sm font-medium hover:text-shopee transition-colors">Danh mục</a>
          <a href="#footer" className="text-sm font-medium hover:text-shopee transition-colors">Về chúng tôi</a>
        </div>
        
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <a href="#" className="text-lg font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</a>
          <a href="#catalog" className="text-lg font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Danh mục</a>
          <a href="#footer" className="text-lg font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Về chúng tôi</a>
        </div>
      )}
    </nav>
  );
}
