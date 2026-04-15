import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import { fetchSheetData } from "./services/sheetService";
import { Product } from "./data/products";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-white font-sans selection:bg-shopee/30 selection:text-shopee">
      <Navbar />
      <main>
        <Hero />
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-shopee/20 border-t-shopee rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Đang tải dữ liệu trưng bày...</p>
          </div>
        ) : (
          <Catalog products={products} categories={categories} />
        )}
      </main>
      <Footer />
    </div>
  );
}
