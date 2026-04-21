import Papa from 'papaparse';
import { Product, ProductPart } from '../data/products';

const SHEET_URLS = {
  PRODUCTS: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKNmcMCDe1XXOzaEAJcQa9-umTU6I8WEAL6a9CSvIc3dYtllD5Z0p6_wbz4MRn7DWYSuKvirU_UYi7/pub?gid=0&single=true&output=csv',
  PARTS: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKNmcMCDe1XXOzaEAJcQa9-umTU6I8WEAL6a9CSvIc3dYtllD5Z0p6_wbz4MRn7DWYSuKvirU_UYi7/pub?gid=1416804522&single=true&output=csv',
  CATEGORIES: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKNmcMCDe1XXOzaEAJcQa9-umTU6I8WEAL6a9CSvIc3dYtllD5Z0p6_wbz4MRn7DWYSuKvirU_UYi7/pub?gid=1730526488&single=true&output=csv'
};

interface RawProduct {
  'Mã Danh Mục': string;
  'Mã Sản Phẩm': string;
  'Tên Sản Phẩm': string;
  'Giới Thiệu Về Sản Phẩm': string;
  'Thành Phần Cầu Tạo': string;
  'Giá': string;
  'Link Ảnh': string;
  'Link Video'?: string;
}

interface RawPart {
  'Mã Sản Phẩm': string;
  'Tên Sản Phẩm': string;
  'Giới Thiệu Về Sản Phẩm': string;
  'Thành Phần Cầu Tạo': string;
  'Giá': string;
  'Link Ảnh': string;
  'Link Video'?: string;
}

interface RawCategory {
  'Mã Danh Mục': string;
  'Tên Danh Mục': string;
}

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  // Remove dots and commas, then parse
  const cleaned = priceStr.replace(/[.,]/g, '');
  return parseInt(cleaned, 10) || 0;
};

export async function fetchSheetData() {
  try {
    const [productsRes, partsRes, categoriesRes] = await Promise.all([
      fetch(SHEET_URLS.PRODUCTS),
      fetch(SHEET_URLS.PARTS),
      fetch(SHEET_URLS.CATEGORIES)
    ]);

    const [productsCsv, partsCsv, categoriesCsv] = await Promise.all([
      productsRes.text(),
      partsRes.text(),
      categoriesRes.text()
    ]);

    const productsData = Papa.parse<RawProduct>(productsCsv, { header: true, skipEmptyLines: true }).data;
    const partsData = Papa.parse<RawPart>(partsCsv, { header: true, skipEmptyLines: true }).data;
    const categoriesData = Papa.parse<RawCategory>(categoriesCsv, { header: true, skipEmptyLines: true }).data;

    // Create category map
    const categoryMap: Record<string, string> = {};
    categoriesData.forEach(cat => {
      categoryMap[cat['Mã Danh Mục']] = cat['Tên Danh Mục'];
    });

    const categoriesList = ["Tất cả", ...categoriesData.map(cat => cat['Tên Danh Mục']).filter(name => !!name)];

    // Group parts by product ID
    const partsByProduct: Record<string, ProductPart[]> = {};
    partsData.forEach((part, index) => {
      const productId = part['Mã Sản Phẩm'];
      if (!partsByProduct[productId]) {
        partsByProduct[productId] = [];
      }
      partsByProduct[productId].push({
        id: `${productId}-P${index}`,
        name: part['Tên Sản Phẩm'],
        composition: part['Thành Phần Cầu Tạo'],
        image: part['Link Ảnh'],
        price: parsePrice(part['Giá']),
        instructions: part['Giới Thiệu Về Sản Phẩm'],
        videoUrl: part['Link Video']
      });
    });

    // Map products
    const products: Product[] = productsData
      .filter(p => p['Mã Sản Phẩm'] && p['Tên Sản Phẩm'])
      .map(p => ({
        id: p['Mã Sản Phẩm'],
        name: p['Tên Sản Phẩm'],
        image: p['Link Ảnh'],
        originalPrice: parsePrice(p['Giá']),
        discountPrice: parsePrice(p['Giá']),
        category: categoryMap[p['Mã Danh Mục']] || "Khác",
        affiliateUrl: "https://shopee.vn", // Default as per previous turns
        badges: ["Bán chạy"], // Default as per previous turns
        composition: p['Thành Phần Cầu Tạo'],
        description: p['Giới Thiệu Về Sản Phẩm'],
        videoUrl: p['Link Video'],
        parts: partsByProduct[p['Mã Sản Phẩm']] || []
      }));

    return {
      products,
      categories: categoriesList
    };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}
