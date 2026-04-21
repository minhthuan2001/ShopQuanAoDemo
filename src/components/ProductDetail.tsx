import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Product, ProductPart } from "@/src/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../contexts/CartContext";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  key?: string;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedPart, setSelectedPart] = useState<ProductPart | null>(null);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const currentDisplay = selectedPart ? {
    name: selectedPart.name,
    image: selectedPart.image,
    price: selectedPart.price > 0 ? selectedPart.price : product.discountPrice,
    instructions: selectedPart.instructions
  } : {
    name: product.name,
    image: product.image,
    price: product.discountPrice,
    instructions: product.description || "Đây là sản phẩm nguyên bản. Vui lòng chọn các bộ phận bên dưới để xem chi tiết cấu tạo và hướng dẫn cụ thể."
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-len-card rounded-3xl overflow-hidden border-2 border-dashed border-len-primary/20 shadow-xl"
    >
      <div className="p-6 md:p-10">
        <button 
          onClick={onBack}
          className="mb-8 hover:bg-len-secondary/30 text-len-primary transition-colors rounded-full font-bold flex items-center px-4 py-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Image and Sub-items */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              key={currentDisplay.image}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-dashed border-len-primary/10 max-w-sm mx-auto lg:mx-0 bg-white"
            >
              <img 
                src={currentDisplay.image} 
                alt={currentDisplay.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {product.parts && product.parts.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedPart(null)}
                    className={`px-4 py-2 rounded-xl border-2 border-dashed transition-all font-bold text-sm ${
                      !selectedPart 
                        ? "border-len-primary bg-len-primary text-white shadow-lg" 
                        : "border-len-primary/30 bg-len-card text-len-primary hover:bg-len-secondary/50"
                    }`}
                  >
                    {product.composition || "Nguyên bản"}
                  </button>
                  {product.parts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`px-4 py-2 rounded-xl border-2 border-dashed transition-all font-bold text-sm ${
                        selectedPart?.id === part.id 
                          ? "border-len-primary bg-len-primary text-white shadow-lg" 
                          : "border-len-primary/30 bg-len-card text-len-primary hover:bg-len-secondary/50"
                      }`}
                    >
                      {part.composition || part.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Information */}
          <div className="lg:col-span-7 flex flex-col justify-start pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDisplay.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-len-primary leading-tight">
                    {currentDisplay.name}
                  </h2>
                </div>

                <div className="p-6 bg-[#FDF8F5] rounded-3xl border-2 border-dashed border-len-primary/20 shadow-inner">
                  <p className="text-lg text-len-primary leading-relaxed font-medium">
                    "{currentDisplay.instructions}"
                  </p>
                </div>

                {currentDisplay.price > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-len-primary/70 uppercase tracking-widest">Giá trị</p>
                    <p className="text-4xl md:text-5xl font-bold text-len-primary">
                      {formatPrice(currentDisplay.price)}
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      if (selectedPart && selectedPart.price > 0) {
                        const partProduct: Product = {
                          ...product,
                          id: `${product.id}-${selectedPart.id}`,
                          name: `${product.name} (${selectedPart.name})`,
                          image: selectedPart.image,
                          discountPrice: selectedPart.price,
                          originalPrice: selectedPart.price,
                          parts: []
                        };
                        addToCart(partProduct);
                        toast.success(`Đã thêm ${selectedPart.name} vào giỏ hàng! 🧶`);
                      } else {
                        // If no part is selected OR the part has no price (using main price)
                        // add the main price to cart
                        addToCart(product);
                        toast.success(`Đã thêm ${product.name} vào giỏ hàng! 🧶`);
                      }
                    }}
                    className="w-full md:w-auto bg-len-primary hover:bg-len-primary/90 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-lg border-2 border-dashed border-white/30"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
