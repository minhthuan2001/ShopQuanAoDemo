import { ShieldCheck, Zap, Heart, RefreshCw } from "lucide-react";

const REASONS = [
  {
    icon: <Heart className="w-8 h-8 text-shopee" />,
    title: "Chọn lọc deal thật",
    description: "Mọi sản phẩm đều được đội ngũ kiểm duyệt kỹ lưỡng về chất lượng và giá trị thực tế."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-shopee" />,
    title: "Link Chính Hãng",
    description: "Cam kết 100% link dẫn trực tiếp tới gian hàng chính hãng hoặc Shop Mall trên Shopee."
  },
  {
    icon: <Zap className="w-8 h-8 text-shopee" />,
    title: "Không tăng giá",
    description: "Chúng tôi chỉ chia sẻ deal giảm giá thật, không bao giờ chia sẻ các sản phẩm nâng giá rồi giảm."
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-shopee" />,
    title: "Cập nhật hằng ngày",
    description: "Hệ thống cập nhật deal mới liên tục mỗi giờ, đảm bảo bạn không bỏ lỡ bất kỳ cơ hội nào."
  }
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Lý do nên mua qua website này</h2>
          <div className="w-20 h-1.5 bg-shopee mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-shopee/30 hover:shadow-lg hover:shadow-shopee/5 transition-all duration-300 group text-center"
            >
              <div className="mb-6 inline-flex p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
