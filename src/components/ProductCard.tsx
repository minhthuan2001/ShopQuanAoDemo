import React from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Product } from "@/src/data/products";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  key?: string;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng! 🧶`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div 
        className="bg-len-card rounded-xl border border-len-primary/20 shadow-md p-3 h-full flex flex-col group overflow-hidden cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <div className="relative aspect-square overflow-hidden rounded-lg border border-len-primary/10 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="p-3 flex-grow flex flex-col items-center justify-center text-center">
          <h3 className="font-heading text-2xl font-bold text-len-primary line-clamp-2 mb-1">
            {product.name}
          </h3>
          <div className="mt-auto">
            <span className="text-len-primary font-bold text-lg">{formatPrice(product.discountPrice)}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-2">
          <button 
            className="w-full bg-len-primary/90 hover:bg-len-primary text-white font-bold py-2.5 rounded-lg shadow-sm transition-all text-sm"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </motion.div>
  );
}
