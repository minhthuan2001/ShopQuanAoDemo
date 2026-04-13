import { Facebook, Instagram, Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-shopee rounded-lg flex items-center justify-center font-bold text-xl">S</div>
              <span className="text-2xl font-bold tracking-tight">ShopQuanAo<span className="text-shopee">Demo</span></span>
            </div>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              ShopQuanAoDemo là không gian triển lãm trực tuyến, nơi trưng bày những sản phẩm thời trang và công nghệ với cấu tạo chi tiết và hướng dẫn sử dụng chuyên sâu.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-shopee transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-shopee transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-shopee transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-shopee transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Liên kết</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-shopee transition-colors">Trang chủ</a></li>
              <li><a href="#catalog" className="hover:text-shopee transition-colors">Danh mục sản phẩm</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Về chúng tôi</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chúng tôi đam mê việc khám phá cấu tạo bên trong của các sản phẩm hàng ngày. Website này được tạo ra để chia sẻ những kiến thức đó tới cộng đồng yêu thích kỹ thuật và thiết kế.
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ShopQuanAoDemo. All rights reserved. Không gian triển lãm sản phẩm sáng tạo.</p>
        </div>
      </div>
    </footer>
  );
}
