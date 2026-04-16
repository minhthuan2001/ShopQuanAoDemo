import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#4E342E] text-white py-12 relative border-t-[6px] border-double border-len-secondary/30 mt-20">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 text-lg md:text-xl font-medium tracking-wide">
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
          <a href="tel:0934791937" className="hover:text-len-secondary transition-colors hover:underline">0934 791 937</a>
          <span className="text-len-secondary/50 mx-2">|</span>
          <span className="font-heading text-2xl md:text-3xl font-bold">Len Nhà Tú</span>
        </div>
      </div>
    </footer>
  );
}
