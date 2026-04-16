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
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export default function Catalog({ 
  products, 
  categories, 
  activeCategory, 
  setActiveCategory,
  selectedProduct,
  setSelectedProduct
}: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => {
    const productName = p.name || "";
    const matchesCategory = activeCategory === "Tất cả" || p.category === activeCategory;
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryEmoji = (cat: string) => {
    const lower = (cat || "").toLowerCase();
    if (lower.includes("hoa")) return "🌸";
    if (lower.includes("gấu")) return "🐻";
    if (lower.includes("khóa")) return "🔑";
    if (lower.includes("tất cả")) return "✨";
    return "🎁";
  };

  if (selectedProduct) {
    return (
      <section id="catalog" className="py-20 min-h-[600px] border-b-2 border-dashed border-len-primary/20">
        <div className="container mx-auto px-4 z-10 relative">
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
    <section id="catalog" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Categories row styled like badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 pb-12 border-b-2 border-dashed border-len-primary/20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-bold transition-all
                ${activeCategory === category 
                  ? "bg-len-secondary border-len-primary text-len-primary shadow-inner" 
                  : "bg-len-card border-len-primary/40 text-len-primary hover:bg-len-secondary/50"
                }
              `}
            >
              <span className="text-xl">{getCategoryEmoji(category)}</span>
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 md:w-24 bg-len-primary"></div>
            <h2 className="text-4xl md:text-5xl font-heading text-len-primary">Sản phẩm nổi bật</h2>
            <div className="h-px w-16 md:w-24 bg-len-primary"></div>
          </div>
          
          <div className="w-full max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-len-primary/50 group-focus-within:text-len-primary transition-colors" />
              <input
                id="search-input"
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-len-card rounded-xl border border-len-primary/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-len-primary/20 focus:border-len-primary transition-all text-len-primary placeholder:text-len-primary/50"
              />
            </div>
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
            <p className="text-len-primary/60 text-lg">Chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </section>
  );
}
