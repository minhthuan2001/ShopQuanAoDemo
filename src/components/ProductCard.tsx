import { motion } from "motion/react";
import { ExternalLink, Tag } from "lucide-react";
import { Product } from "@/src/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  key?: string;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.badges.map((badge) => (
              <Badge 
                key={badge} 
                className={`
                  ${badge === 'Deal hot' ? 'bg-red-500 hover:bg-red-600' : ''}
                  ${badge === 'Bán chạy' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  ${badge === 'Giảm sâu' ? 'bg-shopee hover:bg-shopee-hover' : ''}
                  text-white border-none text-[10px] px-2 py-0.5
                `}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        
        <CardContent className="p-4 flex-grow">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">{product.category}</p>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-shopee transition-colors">
            {product.name}
          </h3>
          <div className="mt-auto">
            <span className="text-shopee font-bold text-lg">{formatPrice(product.discountPrice)}</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-shopee hover:bg-shopee-hover text-white font-bold rounded-lg transition-all group-hover:shadow-lg group-hover:shadow-shopee/20"
            onClick={() => onSelect(product)}
          >
            Xem thêm
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
