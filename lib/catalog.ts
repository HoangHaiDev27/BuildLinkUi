import type { Product } from '@/components/product-card'

// Single source of truth for the storefront catalog. The products page,
// product detail page, category listing and search all read from here so a
// product linked anywhere always resolves (no 404s on slugs).

export interface CatalogProduct extends Product {
  category: string
  categorySlug: string
  description: string
  highlights: string[]
  specs: { label: string; value: string }[]
  gallery: string[]
}

export interface Category {
  slug: string
  name: string
  tagline: string
  description: string
  image: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'gach-op-lat',
    name: 'Gạch ốp lát',
    tagline: 'Gạch nền, gạch tường, mosaic và gạch ngoài trời',
    description:
      'Bộ sưu tập gạch granite, porcelain và gạch men cao cấp từ các thương hiệu hàng đầu, độ bền cao và đa dạng vân màu cho mọi không gian.',
    image: '/images/tile-gach-02.jpg',
  },
  {
    slug: 'son',
    name: 'Sơn',
    tagline: 'Sơn nội thất, ngoại thất, chống thấm và epoxy',
    description:
      'Sơn chính hãng với độ phủ cao, kháng kiềm và chống thấm vượt trội, an toàn cho sức khỏe và bền màu theo thời gian.',
    image: '/images/paint-son-01.jpg',
  },
  {
    slug: 'thiet-bi-ve-sinh',
    name: 'Thiết bị vệ sinh',
    tagline: 'Bồn cầu, lavabo, sen tắm và phụ kiện',
    description:
      'Thiết bị vệ sinh từ các thương hiệu uy tín, thiết kế hiện đại, tiết kiệm nước và dễ vệ sinh.',
    image: 'https://picsum.photos/seed/buildlink-bathroom/1200/800',
  },
  {
    slug: 'vat-lieu-xay-dung',
    name: 'Vật liệu xây dựng',
    tagline: 'Xi măng, cát đá, thép và gỗ ván',
    description:
      'Vật liệu thô đạt chuẩn công trình, nguồn gốc rõ ràng, giao hàng tận chân công trình trên toàn quốc.',
    image: 'https://picsum.photos/seed/buildlink-cement/1200/800',
  },
]

export const PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Gạch men lát sàn 60x60cm',
    brand: 'Viglacera',
    category: 'Gạch',
    categorySlug: 'gach-op-lat',
    price: 185000,
    unit: 'm²',
    size: '60x60cm',
    image: '/images/tile-gach-01.jpg',
    gallery: ['/images/tile-gach-01.jpg', '/images/tile-gach-02.jpg', '/images/tile-gach-03.jpg'],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    slug: 'gach-men-lat-san-60x60',
    description:
      'Gạch men lát sàn 60x60cm bề mặt nhám nhẹ chống trơn, độ hút nước thấp, phù hợp phòng khách, hành lang và khu vực thương mại.',
    highlights: ['Chống trơn trượt', 'Độ hút nước thấp', 'Dễ vệ sinh', 'Bảo hành 10 năm'],
    specs: [
      { label: 'Kích thước', value: '60 x 60 cm' },
      { label: 'Bề mặt', value: 'Nhám mờ' },
      { label: 'Độ dày', value: '9.2 mm' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
    ],
  },
  {
    id: 2,
    name: 'Gạch granite 80x80cm',
    brand: 'Đồng Tâm',
    category: 'Gạch',
    categorySlug: 'gach-op-lat',
    price: 320000,
    unit: 'm²',
    size: '80x80cm',
    image: '/images/tile-gach-02.jpg',
    gallery: ['/images/tile-gach-02.jpg', '/images/tile-gach-03.jpg', '/images/tile-gach-04.jpg'],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    isNew: true,
    slug: 'gach-granite-80x80',
    description:
      'Gạch granite nguyên khối 80x80cm vân đá tự nhiên, độ cứng cao, chịu lực và chịu mài mòn tốt cho không gian sang trọng.',
    highlights: ['Vân đá tự nhiên', 'Chịu lực cao', 'Kháng trầy xước', 'Bề mặt bóng kính'],
    specs: [
      { label: 'Kích thước', value: '80 x 80 cm' },
      { label: 'Bề mặt', value: 'Bóng kính' },
      { label: 'Độ dày', value: '10.5 mm' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
    ],
  },
  {
    id: 3,
    name: 'Gạch giả gỗ 20x120cm',
    brand: 'Prime',
    category: 'Gạch',
    categorySlug: 'gach-op-lat',
    price: 245000,
    unit: 'm²',
    size: '20x120cm',
    image: '/images/tile-gach-03.jpg',
    gallery: ['/images/tile-gach-03.jpg', '/images/tile-gach-01.jpg', '/images/tile-gach-04.jpg'],
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    slug: 'gach-gia-go-20x120',
    description:
      'Gạch giả gỗ 20x120cm mang vẻ ấm áp của gỗ tự nhiên nhưng bền bỉ và chống nước, lý tưởng cho phòng ngủ và không gian nghỉ.',
    highlights: ['Vân gỗ chân thực', 'Chống nước tuyệt đối', 'Không cong vênh', 'Dễ lắp đặt'],
    specs: [
      { label: 'Kích thước', value: '20 x 120 cm' },
      { label: 'Bề mặt', value: 'Vân gỗ matt' },
      { label: 'Độ dày', value: '9.0 mm' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
    ],
  },
  {
    id: 4,
    name: 'Gạch subway trắng 10x20cm',
    brand: 'Mỹ Đức',
    category: 'Gạch',
    categorySlug: 'gach-op-lat',
    price: 95000,
    originalPrice: 119000,
    unit: 'm²',
    size: '10x20cm',
    image: '/images/tile-gach-04.jpg',
    gallery: ['/images/tile-gach-04.jpg', '/images/tile-gach-01.jpg', '/images/tile-gach-02.jpg'],
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    isSale: true,
    slug: 'gach-subway-trang-10x20',
    description:
      'Gạch subway trắng bóng 10x20cm phong cách cổ điển, ốp tường bếp và phòng tắm tạo điểm nhấn tinh tế và sáng sủa.',
    highlights: ['Phong cách subway', 'Men bóng dễ lau', 'Kháng ẩm mốc', 'Dễ phối màu ron'],
    specs: [
      { label: 'Kích thước', value: '10 x 20 cm' },
      { label: 'Bề mặt', value: 'Bóng' },
      { label: 'Độ dày', value: '7.0 mm' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
    ],
  },
  {
    id: 5,
    name: 'Gạch Granite vân đá xám 60x60cm',
    brand: 'Viglacera',
    category: 'Gạch',
    categorySlug: 'gach-op-lat',
    price: 285000,
    unit: 'm²',
    size: '60x60cm',
    image: '/images/tile-gach-01.jpg',
    gallery: ['/images/tile-gach-01.jpg', '/images/tile-gach-02.jpg'],
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    slug: 'gach-granite-60x60',
    description:
      'Gạch granite vân đá xám 60x60cm tông trung tính hiện đại, phù hợp không gian tối giản và mặt tiền showroom.',
    highlights: ['Tông xám trung tính', 'Chống mài mòn', 'Phù hợp ngoài trời', 'Đồng đều màu'],
    specs: [
      { label: 'Kích thước', value: '60 x 60 cm' },
      { label: 'Bề mặt', value: 'Mờ lì' },
      { label: 'Độ dày', value: '9.5 mm' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
    ],
  },
  {
    id: 6,
    name: 'Gạch Porcelain đen mờ 80x80cm',
    brand: 'Taicera',
    category: 'Gạch',
    categorySlug: 'gach-op-lat',
    price: 365000,
    unit: 'm²',
    size: '80x80cm',
    image: '/images/tile-gach-02.jpg',
    gallery: ['/images/tile-gach-02.jpg', '/images/tile-gach-03.jpg'],
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    isNew: true,
    slug: 'gach-porcelain-80x80',
    description:
      'Gạch porcelain đen mờ 80x80cm sang trọng và đầy chiều sâu, tạo nền tảng đẳng cấp cho phòng khách và sảnh lớn.',
    highlights: ['Đen mờ cao cấp', 'Chống bám vân tay', 'Tỷ trọng cao', 'Cạnh mài chuẩn'],
    specs: [
      { label: 'Kích thước', value: '80 x 80 cm' },
      { label: 'Bề mặt', value: 'Mờ siêu mịn' },
      { label: 'Độ dày', value: '10.0 mm' },
      { label: 'Xuất xứ', value: 'Đài Loan' },
    ],
  },
  {
    id: 7,
    name: 'Sơn ngoài nhà Dulux Weathershield 18L',
    brand: 'Dulux',
    category: 'Sơn',
    categorySlug: 'son',
    price: 1200000,
    originalPrice: 1350000,
    unit: 'thùng',
    size: '18 lít',
    image: '/images/paint-son-01.jpg',
    gallery: ['/images/paint-son-01.jpg'],
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    isSale: true,
    slug: 'son-dulux-ngoai-that-18l',
    description:
      'Sơn ngoại thất Dulux Weathershield 18L chống tia UV, chống nấm mốc và bền màu dưới mọi điều kiện thời tiết khắc nghiệt.',
    highlights: ['Chống tia UV', 'Kháng nấm mốc', 'Bền màu 8 năm', 'Phủ rộng tới 16 m²/lít'],
    specs: [
      { label: 'Dung tích', value: '18 lít' },
      { label: 'Bề mặt', value: 'Mờ' },
      { label: 'Độ phủ', value: '12 - 16 m²/lít/lớp' },
      { label: 'Xuất xứ', value: 'AkzoNobel' },
    ],
  },
  {
    id: 8,
    name: 'Sơn lót chống kiềm Dulux 5L',
    brand: 'Dulux',
    category: 'Sơn',
    categorySlug: 'son',
    price: 420000,
    unit: 'thùng',
    size: '5 lít',
    image: '/images/paint-son-01.jpg',
    gallery: ['/images/paint-son-01.jpg'],
    rating: 4.7,
    reviewCount: 67,
    inStock: false,
    slug: 'son-lot-chong-kiem-5l',
    description:
      'Sơn lót kháng kiềm Dulux 5L tạo lớp nền bám dính tốt, ngăn kiềm hóa và tăng độ bền cho lớp sơn phủ.',
    highlights: ['Kháng kiềm mạnh', 'Tăng độ bám', 'Chống loang ố', 'Khô nhanh'],
    specs: [
      { label: 'Dung tích', value: '5 lít' },
      { label: 'Bề mặt', value: 'Trong mờ' },
      { label: 'Độ phủ', value: '10 - 12 m²/lít' },
      { label: 'Xuất xứ', value: 'AkzoNobel' },
    ],
  },
  {
    id: 9,
    name: 'Sơn nội thất Dulux Inspire 18L',
    brand: 'Dulux',
    category: 'Sơn',
    categorySlug: 'son',
    price: 980000,
    unit: 'thùng',
    size: '18 lít',
    image: '/images/paint-son-01.jpg',
    gallery: ['/images/paint-son-01.jpg'],
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
    slug: 'son-dulux',
    description:
      'Sơn nội thất Dulux Inspire 18L lau chùi dễ dàng, màng sơn mịn và bền màu, an toàn cho không gian sống gia đình.',
    highlights: ['Lau chùi vết bẩn', 'Màng mịn cao cấp', 'Ít mùi', 'Hơn 2000 màu pha'],
    specs: [
      { label: 'Dung tích', value: '18 lít' },
      { label: 'Bề mặt', value: 'Mịn mờ' },
      { label: 'Độ phủ', value: '13 - 15 m²/lít/lớp' },
      { label: 'Xuất xứ', value: 'AkzoNobel' },
    ],
  },
  {
    id: 10,
    name: 'Bồn cầu một khối nắp êm',
    brand: 'INAX',
    category: 'Thiết bị vệ sinh',
    categorySlug: 'thiet-bi-ve-sinh',
    price: 4250000,
    originalPrice: 4690000,
    unit: 'bộ',
    image: 'https://picsum.photos/seed/buildlink-toilet/800/800',
    gallery: ['https://picsum.photos/seed/buildlink-toilet/1000/1000'],
    rating: 4.8,
    reviewCount: 52,
    inStock: true,
    isSale: true,
    slug: 'bon-cau-mot-khoi-inax',
    description:
      'Bồn cầu một khối INAX công nghệ xả tiết kiệm nước, men kháng khuẩn Aqua Ceramic chống bám bẩn, nắp đóng êm.',
    highlights: ['Xả 3/4.5 lít', 'Men kháng khuẩn', 'Nắp đóng êm', 'Dễ vệ sinh'],
    specs: [
      { label: 'Kiểu', value: 'Một khối' },
      { label: 'Chế độ xả', value: 'Nhấn 2 chế độ' },
      { label: 'Men', value: 'Aqua Ceramic' },
      { label: 'Xuất xứ', value: 'INAX' },
    ],
  },
  {
    id: 11,
    name: 'Sen tắm nhiệt độ cao cấp',
    brand: 'TOTO',
    category: 'Thiết bị vệ sinh',
    categorySlug: 'thiet-bi-ve-sinh',
    price: 6800000,
    unit: 'bộ',
    image: 'https://picsum.photos/seed/buildlink-shower/800/800',
    gallery: ['https://picsum.photos/seed/buildlink-shower/1000/1000'],
    rating: 4.9,
    reviewCount: 33,
    inStock: true,
    isNew: true,
    slug: 'sen-tam-nhiet-do-toto',
    description:
      'Sen tắm nhiệt độ TOTO giữ nhiệt ổn định, an toàn chống bỏng, tia nước massage thư giãn và lớp mạ chống xước.',
    highlights: ['Giữ nhiệt ổn định', 'Chống bỏng', 'Tia massage', 'Mạ chống xước'],
    specs: [
      { label: 'Loại', value: 'Sen nhiệt độ' },
      { label: 'Vòi sen', value: '3 chế độ' },
      { label: 'Lớp mạ', value: 'Chrome' },
      { label: 'Xuất xứ', value: 'TOTO' },
    ],
  },
  {
    id: 12,
    name: 'Xi măng PCB40 bao 50kg',
    brand: 'INSEE',
    category: 'Vật liệu xây dựng',
    categorySlug: 'vat-lieu-xay-dung',
    price: 92000,
    unit: 'bao',
    image: 'https://picsum.photos/seed/buildlink-cement-bag/800/800',
    gallery: ['https://picsum.photos/seed/buildlink-cement-bag/1000/1000'],
    rating: 4.7,
    reviewCount: 188,
    inStock: true,
    slug: 'xi-mang-pcb40-insee',
    description:
      'Xi măng INSEE PCB40 bao 50kg cường độ ổn định, đông kết đều, phù hợp xây tô và đổ bê tông cho công trình dân dụng.',
    highlights: ['Cường độ PCB40', 'Đông kết đều', 'Ít nứt co ngót', 'Đạt chuẩn TCVN'],
    specs: [
      { label: 'Khối lượng', value: '50 kg/bao' },
      { label: 'Mác', value: 'PCB40' },
      { label: 'Công dụng', value: 'Xây tô, bê tông' },
      { label: 'Xuất xứ', value: 'INSEE Việt Nam' },
    ],
  },
]

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getProductsByCategorySlug(slug: string): CatalogProduct[] {
  return PRODUCTS.filter((p) => p.categorySlug === slug)
}

export function getRelatedProducts(product: CatalogProduct, limit = 4): CatalogProduct[] {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug,
  ).slice(0, limit)
}
