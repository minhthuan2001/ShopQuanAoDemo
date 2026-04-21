import { useState, useEffect, useCallback } from "react";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import { fetchSheetData } from "./services/sheetService";
import { Product } from "./data/products";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelectedProduct(null);
  };

  const loadData = useCallback(async () => {
    try {
      const { products: fetchedProducts, categories: fetchedCategories } = await fetchSheetData();
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    
    // Set up interval to refresh every 30 minutes (1800000 ms)
    const interval = setInterval(() => {
      console.log("Auto-refreshing data from sheet...");
      loadData();
    }, 1800000);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-len-bg font-sans selection:bg-len-primary/30 selection:text-len-primary text-len-primary">
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: "#EAD5C5",
            color: "#5B3A29",
            border: "1px solid rgba(91, 58, 41, 0.2)",
          }
        }} />
        <Navbar categories={categories} activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
        <main>
          <Hero />
          
          <div className="relative overflow-hidden">
            {/* Main Content Area Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/content-bg.png" 
                alt="Content Background" 
                className="w-full h-full object-cover opacity-100" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1597561841310-949f99277051?auto=format&fit=crop&w=2000&q=80";
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-len-bg via-transparent to-len-bg/50"></div>
            </div>

            <div className="relative z-10">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-len-primary/20 border-t-len-primary rounded-full animate-spin mb-4" />
                  <p className="text-len-primary/60 font-medium">Đang tải dữ liệu trưng bày...</p>
                </div>
              ) : (
                <>
                  <Catalog 
                    products={products} 
                    categories={categories} 
                    activeCategory={activeCategory} 
                    setActiveCategory={handleCategoryChange}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                  <Footer />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
