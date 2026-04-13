export interface ProductPart {
  id: string;
  name: string;
  image: string;
  price: number;
  instructions: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  category: string;
  affiliateUrl: string;
  badges: string[];
  composition?: string;
  description?: string;
  parts?: ProductPart[];
}

export const CATEGORIES = ["Tất cả", "Áo Quần", "Giày", "Túi", "Dép"];

export const PRODUCTS: Product[] = [
  {
    id: "SP01",
    name: "Áo quần bóng đá nam",
    image: "https://i.postimg.cc/5NrgBJ1z/aoquannam.webp",
    originalPrice: 100000,
    discountPrice: 100000,
    category: "Áo Quần",
    affiliateUrl: "https://shopee.vn",
    badges: ["Bán chạy"],
    composition: "Cả bộ",
    description: "Áo quần bóng đá nam là trang phục chuyên dụng được thiết kế để tối ưu hóa hiệu suất thi đấu trên sân cỏ, đồng thời cũng là biểu tượng cho niềm đam mê và bản sắc của các đội bóng",
    parts: [
      { id: "SP01-P1", name: "Áo", image: "https://i.postimg.cc/76bbMFqz/aonam.webp", price: 50000, instructions: "Áo bóng đá nam không chỉ là trang phục thi đấu mà còn là món đồ thời trang thể hiện tinh thần đồng đội và niềm đam mê sân cỏ." },
      { id: "SP01-P2", name: "Quần", image: "https://i.postimg.cc/3NvRz24K/quannam.jpg", price: 50000, instructions: "Quần bóng đá nam không chỉ là trang phục thi đấu mà còn là món đồ thời trang thể hiện tinh thần đồng đội và niềm đam mê sân cỏ." }
    ]
  },
  {
    id: "SP02",
    name: "Áo quần bóng đá nữ",
    image: "https://i.postimg.cc/nLGqPfbF/aoquannu.jpg",
    originalPrice: 100000,
    discountPrice: 100000,
    category: "Áo Quần",
    affiliateUrl: "https://shopee.vn",
    badges: ["Bán chạy"],
    composition: "Cả bộ",
    description: "Áo quần bóng đá nữ là trang phục chuyên dụng được thiết kế để tối ưu hóa hiệu suất thi đấu trên sân cỏ, đồng thời cũng là biểu tượng cho niềm đam mê và bản sắc của các đội bóng",
    parts: [
      { id: "SP02-P1", name: "Áo", image: "https://i.postimg.cc/HkC3xgg6/aonu.jpg", price: 50000, instructions: "Áo bóng đá nữ không chỉ là trang phục thi đấu mà còn là món đồ thời trang thể hiện tinh thần đồng đội và niềm đam mê sân cỏ." },
      { id: "SP02-P2", name: "Quần", image: "https://i.postimg.cc/bvmR3S24/quannu.jpg", price: 50000, instructions: "Quần bóng đá nữ không chỉ là trang phục thi đấu mà còn là món đồ thời trang thể hiện tinh thần đồng đội và niềm đam mê sân cỏ." }
    ]
  },
  {
    id: "SP03",
    name: "Giày Nike",
    image: "https://i.postimg.cc/zGmWDG8t/giaynike.webp",
    originalPrice: 300000,
    discountPrice: 300000,
    category: "Giày",
    affiliateUrl: "https://shopee.vn",
    badges: ["Bán chạy"],
    description: "Giày Nike là thương hiệu thể thao số 1 thế giới đến từ Mỹ, nổi tiếng với sự kết hợp hoàn hảo giữa công nghệ hiệu suất và phong cách thời trang đường phố."
  },
  {
    id: "SP04",
    name: "Giày Adidas",
    image: "https://i.postimg.cc/s2shSHBp/giayadidas.webp",
    originalPrice: 400000,
    discountPrice: 400000,
    category: "Giày",
    affiliateUrl: "https://shopee.vn",
    badges: ["Bán chạy"],
    description: "Nếu Nike nổi tiếng với sự phá cách, thì adidas (đến từ Đức) lại chinh phục người dùng bởi sự bền bỉ, tính di sản và những công nghệ đệm giày mang tính cách mạng."
  },
  {
    id: "SP05",
    name: "Túi đeo chéo",
    image: "https://i.postimg.cc/sX2GHB4p/tuideocheo.webp",
    originalPrice: 150000,
    discountPrice: 150000,
    category: "Túi",
    affiliateUrl: "https://shopee.vn",
    badges: ["Bán chạy"],
    description: "Túi đeo chéo (Crossbody Bag) là món phụ kiện \"quốc dân\" nhờ sự tiện lợi, giúp bạn rảnh tay khi di chuyển mà vẫn giữ được phong cách năng động."
  },
  {
    id: "SP06",
    name: "Dép crocs",
    image: "https://i.postimg.cc/3Nsywt52/depcrocs.jpg",
    originalPrice: 200000,
    discountPrice: 200000,
    category: "Dép",
    affiliateUrl: "https://shopee.vn",
    badges: ["Bán chạy"],
    description: "Dép Crocs là dòng giày dép \"độc nhất vô nhị\" đến từ Mỹ, nổi tiếng với thiết kế hình đầu cá sấu đặc trưng và sự thoải mái tối đa cho bàn chân. Dù từng gây tranh cãi về ngoại hình, Crocs hiện đã trở thành biểu tượng thời trang toàn cầu."
  }
];
