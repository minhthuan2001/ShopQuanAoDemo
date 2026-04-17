import { Phone, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-len-primary text-len-primary-text py-16 relative border-t-[6px] border-double border-white/20 mt-20">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6 text-lg md:text-xl font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <a href="tel:0584481685" className="hover:underline transition-all">0584 481 685</a>
          </div>
          
          <span className="hidden md:block text-white/30 text-2xl">|</span>
          
          <div className="flex items-center gap-2">
            <Facebook className="w-5 h-5" />
            <a 
              href="https://www.facebook.com/profile.php?id=61559271711087" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline transition-all"
            >
              Facebook
            </a>
          </div>
          
          <span className="hidden md:block text-white/30 text-2xl">|</span>
          
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-wider">Xâu.craft</span>
        </div>
        
        <div className="text-center pt-8 border-t border-white/10 w-full max-w-lg">
          <p className="opacity-80 font-medium">©2026 Xau.craft - Handmade with love</p>
        </div>
      </div>
    </footer>
  );
}
