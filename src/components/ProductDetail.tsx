import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Info, Package, Wrench } from "lucide-react";
import { Product, ProductPart } from "@/src/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  key?: string;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedPart, setSelectedPart] = useState<ProductPart | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const currentDisplay = selectedPart || {
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
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
    >
      <div className="p-6 md:p-10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 hover:bg-shopee/10 hover:text-shopee transition-colors rounded-full font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Image and Sub-items */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              key={currentDisplay.image}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-50 max-w-sm mx-auto lg:mx-0"
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
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Thành phần cấu tạo
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedPart(null)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all font-bold text-sm ${
                      !selectedPart 
                        ? "border-shopee bg-shopee text-white shadow-lg shadow-shopee/20" 
                        : "border-gray-100 bg-white text-gray-600 hover:border-shopee/30"
                    }`}
                  >
                    {product.composition || "Nguyên bản"}
                  </button>
                  {product.parts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`px-4 py-2 rounded-xl border-2 transition-all font-bold text-sm ${
                        selectedPart?.id === part.id 
                          ? "border-shopee bg-shopee text-white shadow-lg shadow-shopee/20" 
                          : "border-gray-100 bg-white text-gray-600 hover:border-shopee/30"
                      }`}
                    >
                      {part.name}
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
                  <Badge className="bg-shopee/10 text-shopee border-none mb-4 px-4 py-1 rounded-full">
                    {selectedPart ? "Chi tiết bộ phận" : "Thông tin sản phẩm"}
                  </Badge>
                  <h2 className="text-4xl font-black text-gray-900 leading-tight">
                    {currentDisplay.name}
                  </h2>
                </div>

                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Hướng dẫn & Đặc điểm
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    "{currentDisplay.instructions}"
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Giá trị</p>
                  <p className="text-5xl font-black text-shopee">
                    {formatPrice(currentDisplay.price)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
