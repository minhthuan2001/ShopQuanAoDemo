import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/src/data/products";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface CatalogProps {
  products: Product[];
  categories: string[];
}

export default function Catalog({ products, categories }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Tất cả" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedProduct) {
    return (
      <section id="catalog" className="py-20 bg-gray-50 min-h-[600px]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <ProductDetail 
              key={selectedProduct.id}
              product={selectedProduct} 
              onBack={() => {
                setSelectedProduct(null);
                // Optional: scroll back to catalog top
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }} 
            />
          </AnimatePresence>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục sản phẩm</h2>
          <div className="w-20 h-1.5 bg-shopee rounded-full mb-8" />
          
          <div className="w-full max-w-2xl space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-shopee transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-shopee/20 focus:border-shopee transition-all"
              />
            </div>

            <Tabs defaultValue="Tất cả" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto p-1 bg-white shadow-sm rounded-xl border border-gray-100">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="py-2.5 rounded-lg data-[state=active]:bg-shopee data-[state=active]:text-white transition-all"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </section>
  );
}
