import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#EAD5C5] border-b-[3px] border-dashed border-len-primary/30">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Xâu.craft Background" 
          className="w-full h-full object-cover opacity-80" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1616422238475-b825da95ba9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-7xl md:text-9xl font-bold text-[#FFFDF4] mb-2 tracking-tight"
              style={{ 
                fontFamily: "'Dancing Script', cursive",
                textShadow: "4px 4px 8px rgba(91, 58, 41, 0.7)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              }}
            >
              Xâu.craft
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 text-xl md:text-3xl font-bold text-[#FFFDF4] mb-10"
              style={{ 
                fontFamily: "'Quicksand', sans-serif",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" 
              }}
            >
              <span className="text-2xl">☘</span>
              Handmade với yêu thương
              <span className="text-2xl">☘</span>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#FFFDF4] text-len-primary font-sans font-bold px-10 py-4 text-xl rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-white border-2 border-len-primary"
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
