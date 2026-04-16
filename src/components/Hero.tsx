import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#EAD5C5] border-b-[3px] border-dashed border-len-primary/30">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <img src="https://images.unsplash.com/photo-1584988756534-7db57530be90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Yarn Background" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border-2 border-dashed border-len-primary/40 shadow-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl md:text-8xl font-heading text-white drop-shadow-md mb-4"
              style={{ textShadow: "2px 2px 4px rgba(91, 58, 41, 0.4)" }}
            >
              Đồ len handmade
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-3xl font-heading text-len-primary font-bold mb-8"
            >
              Ấm áp từ từng sợi chỉ 🧸
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-len-primary text-white font-sans font-bold px-10 py-4 text-xl rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Mua ngay
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
