import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ShoppingCart, Trash2, Plus, Minus, Package } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface NavbarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function Navbar({ categories, activeCategory, setActiveCategory }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, cartCount, cartTotal, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Use .cart-area class on both cart instances to allow them to handle their own clicks
      if (!(event.target as Element).closest('.cart-area')) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCategoryClick = (cat: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveCategory(cat);
    setIsMobileMenuOpen(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
      // Small timeout to allow scrolling before focusing
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 500);
    }
  };

  const CartDropdown = () => (
    <div className="absolute top-12 right-0 w-80 md:w-96 bg-len-card border-2 border-dashed border-len-primary/20 shadow-2xl rounded-2xl p-4 flex flex-col gap-4 z-50 cursor-default" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center border-b-2 border-dashed border-len-primary/10 pb-2">
        <h3 className="font-heading text-2xl font-bold text-len-primary">Giỏ hàng của bạn</h3>
        <button onClick={() => setIsCartOpen(false)} className="text-len-primary/50 hover:text-len-primary"><X className="w-5 h-5" /></button>
      </div>
      
      {cart.length === 0 ? (
        <p className="text-len-primary/60 text-center py-6">Giỏ hàng trống</p>
      ) : (
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-3 items-center bg-white p-3 rounded-xl border-2 border-dashed border-len-primary/10 relative">
              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg border-2 border-dashed border-len-primary/10" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm font-bold text-len-primary truncate mb-1">{item.product.name}</p>
                <p className="text-sm text-len-primary/90 font-semibold">{formatPrice(item.product.discountPrice)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={(e) => { e.stopPropagation(); decreaseQuantity(item.product.id); }} className="w-7 h-7 rounded-full bg-len-secondary/30 text-len-primary font-bold flex items-center justify-center hover:bg-len-secondary/80 transition-colors"><Minus className="w-3 h-3" /></button>
                  <span className="text-sm font-bold w-4 text-center text-len-primary">{item.quantity}</span>
                  <button onClick={(e) => { e.stopPropagation(); addToCart(item.product); }} className="w-7 h-7 rounded-full bg-len-primary text-white font-bold flex items-center justify-center hover:bg-len-primary/90 transition-colors"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeFromCart(item.product.id); }}
                className="absolute top-2 right-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="border-t border-len-primary/10 pt-4 mt-2">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-len-primary font-heading text-xl">Tổng cộng:</span>
            <span className="font-bold text-len-primary text-xl">{formatPrice(cartTotal)}</span>
          </div>
          <button className="w-full bg-len-primary text-white font-bold py-3.5 rounded-xl hover:bg-len-primary/90 transition-colors shadow-md text-lg border-2 border-dashed border-white/30">
            Thanh toán ngay
          </button>
        </div>
      )}
    </div>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-dashed border-white/10 ${
        isScrolled ? "bg-len-primary/95 backdrop-blur-md shadow-lg py-4" : "bg-len-primary py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <img 
            src="/logo-navbar.png" 
            alt="Xâu.craft Logo" 
            className="w-10 h-10 object-contain invert-0 brightness-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const nextSibling = (e.target as HTMLImageElement).nextElementSibling;
              if (nextSibling) {
                (nextSibling as HTMLElement).style.display = 'block';
              }
            }}
          />
          <Package className="w-8 h-8 text-len-primary-text hidden" />
          <span className="font-heading text-3xl font-bold text-len-primary-text tracking-wide">
            Xâu.craft
          </span>
        </a>
        
        {/* Desktop Links - Limited to avoid breaking layout */}
        <div className="hidden md:flex flex-1 mx-8 items-center justify-center gap-4 flex-wrap max-h-16 overflow-hidden">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="font-bold text-len-primary-text hover:text-len-primary-text/70 transition-colors whitespace-nowrap">Trang chủ</a>
          {categories.filter(cat => cat !== "Tất cả").slice(0, 4).map((cat) => (
            <React.Fragment key={cat}>
              <span className="text-len-primary-text/30">|</span>
              <button 
                onClick={(e) => handleCategoryClick(cat, e)}
                className={`font-bold transition-colors whitespace-nowrap ${activeCategory === cat ? 'text-len-primary-text border-b-2 border-len-primary-text' : 'text-len-primary-text hover:text-len-primary-text/70'}`}
              >
                {cat}
              </button>
            </React.Fragment>
          ))}
          {categories.length > 5 && (
            <>
              <span className="text-len-primary-text/30">|</span>
              <button 
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-bold text-len-primary-text/80 hover:text-len-primary-text transition-colors whitespace-nowrap italic"
              >
                Xem thêm...
              </button>
            </>
          )}
        </div>
        
        {/* Icons */}
        <div className="hidden md:flex items-center gap-5 text-len-primary-text cart-area">
          <button 
            onClick={handleSearchClick}
            className="text-len-primary-text hover:text-len-primary-text/70 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <div className="relative">
            <button 
              className="text-len-primary-text hover:text-len-primary-text/70 transition-colors relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            {isCartOpen && <CartDropdown />}
          </div>
        </div>
        
        {/* Mobile Toggle & Cart */}
        <div className="flex items-center gap-4 md:hidden cart-area">
          <button 
            onClick={handleSearchClick}
            className="text-len-primary-text hover:text-len-primary-text/70 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <div className="relative">
            <button 
              className="text-len-primary-text relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            {isCartOpen && <CartDropdown />}
          </div>
          <button 
            className="p-1 text-len-primary-text transition-colors hover:text-len-primary-text/70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-len-primary shadow-xl border-t-2 border-dashed border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300 z-50">
          <a href="#" className="text-lg font-bold py-2 border-b border-white/10 text-len-primary-text" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Trang chủ</a>
          {categories.filter(cat => cat !== "Tất cả").map((cat) => (
            <button 
              key={cat}
              className={`text-lg font-bold py-2 border-b border-white/10 text-left ${activeCategory === cat ? 'text-len-primary-text' : 'text-len-primary-text hover:text-len-primary-text/70'}`} 
              onClick={(e) => handleCategoryClick(cat, e)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
