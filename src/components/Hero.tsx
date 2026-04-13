import { motion } from "motion/react";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-shopee bg-shopee/10 border-shopee/20 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Triển Lãm Sản Phẩm Sáng Tạo
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 max-w-3xl"
          >
            Khám phá chi tiết <span className="text-shopee">từng tuyệt tác thiết kế</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl"
          >
            Nơi trưng bày và giới thiệu chi tiết cấu tạo, quy trình hoàn thiện của những sản phẩm độc đáo nhất.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="bg-shopee hover:bg-shopee-hover text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-shopee/20 transition-all hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Khám phá bộ sưu tập
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-shopee/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-shopee/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
