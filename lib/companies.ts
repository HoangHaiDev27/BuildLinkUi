// Shared company directory data. Mirrors the backend Company entity
// (name, slug, tax code, representative, contact, description/vision/mission,
// status, certificates, projects, products, service packages). Frontend-first
// mock data until the company endpoints exist on the API.

export type CompanyStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export interface CompanyCertificate {
  name: string
  issuedBy: string
  year: string
}

export interface CompanyProject {
  title: string
  image: string
  location: string
  year: string
}

export interface CompanyService {
  name: string
  price: string
  description: string
}

export interface Company {
  id: number
  slug: string
  name: string
  type: string
  cover: string
  tagline: string
  taxCode: string
  representativeName: string
  phone: string
  email: string
  address: string
  website: string
  description: string
  vision: string
  mission: string
  status: CompanyStatus
  rating: number
  reviewCount: number
  yearFounded: string
  specialties: string[]
  services: CompanyService[]
  projects: CompanyProject[]
  certificates: CompanyCertificate[]
}

export const COMPANY_TYPES = [
  'Nhà cung cấp vật liệu',
  'Nhà thầu thi công',
  'Thiết kế nội thất',
  'Thiết bị vệ sinh',
]

export const COMPANIES: Company[] = [
  {
    id: 1,
    slug: 'vat-lieu-minh-long',
    name: 'Vật Liệu Minh Long',
    type: 'Nhà cung cấp vật liệu',
    cover: 'https://picsum.photos/seed/buildlink-minhlong/1600/900',
    tagline: 'Nhà phân phối gạch ốp lát và đá tự nhiên hàng đầu khu vực phía Nam.',
    taxCode: '0312456789',
    representativeName: 'Nguyễn Minh Long',
    phone: '028 3756 1290',
    email: 'lienhe@minhlong.vn',
    address: '45 Tô Hiến Thành, Quận 10, TP.HCM',
    website: 'minhlong.vn',
    description:
      'Hơn 15 năm phân phối gạch ốp lát, đá granite và vật liệu hoàn thiện cho các công trình dân dụng và thương mại. Kho hàng 4.000m² luôn sẵn số lượng lớn.',
    vision: 'Trở thành nhà phân phối vật liệu hoàn thiện được tin cậy nhất Việt Nam.',
    mission: 'Mang vật liệu chính hãng, giá hợp lý đến mọi công trình.',
    status: 'approved',
    rating: 4.8,
    reviewCount: 212,
    yearFounded: '2009',
    specialties: ['Gạch ốp lát', 'Đá granite', 'Đá marble', 'Gạch ngoại thất'],
    services: [
      { name: 'Giao hàng công trình', price: 'Theo khối lượng', description: 'Giao tận chân công trình toàn miền Nam trong 48h.' },
      { name: 'Tư vấn bóc tách vật tư', price: 'Miễn phí', description: 'Kỹ thuật viên hỗ trợ tính toán khối lượng và phối màu.' },
    ],
    projects: [
      { title: 'Cung cấp gạch cho khu căn hộ Riverside', image: '/images/case-study-01.jpg', location: 'Quận 9, TP.HCM', year: '2025' },
      { title: 'Ốp đá sảnh tòa nhà văn phòng', image: '/images/case-study-02.jpg', location: 'Quận 1, TP.HCM', year: '2024' },
    ],
    certificates: [
      { name: 'Đại lý ủy quyền Viglacera', issuedBy: 'Viglacera', year: '2020' },
      { name: 'ISO 9001:2015', issuedBy: 'Bureau Veritas', year: '2021' },
    ],
  },
  {
    id: 2,
    slug: 'xay-dung-tan-phat',
    name: 'Xây Dựng Tân Phát',
    type: 'Nhà thầu thi công',
    cover: 'https://picsum.photos/seed/buildlink-tanphat/1600/900',
    tagline: 'Tổng thầu thi công nhà phố, biệt thự và công trình thương mại.',
    taxCode: '0309887765',
    representativeName: 'Trần Tấn Phát',
    phone: '028 6285 4410',
    email: 'info@tanphat.com.vn',
    address: '210 Phan Văn Trị, Gò Vấp, TP.HCM',
    website: 'tanphatcons.vn',
    description:
      'Đơn vị tổng thầu với đội ngũ kỹ sư và hơn 200 thợ lành nghề, thi công trọn gói từ phần thô đến hoàn thiện, cam kết đúng tiến độ và ngân sách.',
    vision: 'Kiến tạo những công trình bền vững cho cộng đồng.',
    mission: 'Thi công minh bạch, an toàn và đúng cam kết.',
    status: 'approved',
    rating: 4.9,
    reviewCount: 156,
    yearFounded: '2012',
    specialties: ['Xây nhà phố', 'Biệt thự', 'Cải tạo', 'Kết cấu'],
    services: [
      { name: 'Xây dựng trọn gói', price: 'Từ 5.500.000đ/m²', description: 'Thi công từ phần thô đến hoàn thiện chìa khóa trao tay.' },
      { name: 'Cải tạo nhà', price: 'Khảo sát báo giá', description: 'Cải tạo, nâng tầng và sửa chữa kết cấu.' },
    ],
    projects: [
      { title: 'Nhà phố 3 tầng hiện đại', image: '/images/case-study-01.jpg', location: 'Thủ Đức, TP.HCM', year: '2025' },
      { title: 'Biệt thự vườn 2 mặt tiền', image: 'https://picsum.photos/seed/buildlink-villa/1000/750', location: 'Long An', year: '2024' },
    ],
    certificates: [
      { name: 'Chứng chỉ năng lực hạng II', issuedBy: 'Bộ Xây dựng', year: '2019' },
      { name: 'An toàn lao động', issuedBy: 'Sở LĐTBXH', year: '2023' },
    ],
  },
  {
    id: 3,
    slug: 'noi-that-go-viet',
    name: 'Nội Thất Gỗ Việt',
    type: 'Thiết kế nội thất',
    cover: 'https://picsum.photos/seed/buildlink-goviet/1600/900',
    tagline: 'Thiết kế và thi công nội thất gỗ cao cấp theo yêu cầu.',
    taxCode: '0314550021',
    representativeName: 'Lê Quốc Việt',
    phone: '028 3993 1177',
    email: 'xuong@goviet.vn',
    address: '88 Cộng Hòa, Tân Bình, TP.HCM',
    website: 'goviet.vn',
    description:
      'Xưởng sản xuất nội thất gỗ công nghiệp và gỗ tự nhiên, kết hợp đội ngũ thiết kế 3D giàu kinh nghiệm cho căn hộ, nhà phố và văn phòng.',
    vision: 'Đưa nội thất gỗ Việt vươn tầm khu vực.',
    mission: 'Tối ưu công năng và thẩm mỹ cho từng không gian sống.',
    status: 'approved',
    rating: 4.7,
    reviewCount: 98,
    yearFounded: '2015',
    specialties: ['Tủ bếp', 'Nội thất căn hộ', 'Văn phòng', 'Gỗ tự nhiên'],
    services: [
      { name: 'Thiết kế 3D', price: 'Từ 150.000đ/m²', description: 'Phối cảnh 3D chi tiết trước khi sản xuất.' },
      { name: 'Thi công nội thất', price: 'Theo hạng mục', description: 'Sản xuất tại xưởng và lắp đặt trọn gói.' },
    ],
    projects: [
      { title: 'Nội thất căn hộ 2 phòng ngủ', image: '/images/case-study-02.jpg', location: 'Quận 2, TP.HCM', year: '2025' },
      { title: 'Tủ bếp gỗ óc chó', image: '/images/case-study-03.jpg', location: 'Quận 7, TP.HCM', year: '2024' },
    ],
    certificates: [
      { name: 'Chứng nhận gỗ hợp pháp FSC', issuedBy: 'FSC Việt Nam', year: '2022' },
    ],
  },
  {
    id: 4,
    slug: 'son-hoang-gia',
    name: 'Sơn Hoàng Gia',
    type: 'Nhà cung cấp vật liệu',
    cover: 'https://picsum.photos/seed/buildlink-hoanggia/1600/900',
    tagline: 'Đại lý sơn chính hãng và dịch vụ thi công sơn chuyên nghiệp.',
    taxCode: '0316778812',
    representativeName: 'Phạm Hoàng Gia',
    phone: '028 3868 2255',
    email: 'cskh@sonhoanggia.vn',
    address: '154 Lê Văn Sỹ, Quận 3, TP.HCM',
    website: 'sonhoanggia.vn',
    description:
      'Phân phối các thương hiệu sơn lớn cùng đội thi công sơn nước, sơn hiệu ứng và chống thấm, bảo hành màng sơn dài hạn.',
    vision: 'Phủ màu cho mọi công trình Việt.',
    mission: 'Sơn chính hãng, thi công chuẩn kỹ thuật.',
    status: 'pending',
    rating: 4.6,
    reviewCount: 64,
    yearFounded: '2017',
    specialties: ['Sơn nội thất', 'Sơn ngoại thất', 'Chống thấm', 'Sơn hiệu ứng'],
    services: [
      { name: 'Thi công sơn nước', price: 'Từ 25.000đ/m²', description: 'Sơn lại nhà cũ và công trình mới.' },
      { name: 'Sơn hiệu ứng', price: 'Từ 180.000đ/m²', description: 'Sơn giả bê tông, giả đá nghệ thuật.' },
    ],
    projects: [
      { title: 'Sơn ngoại thất khu nhà phố', image: 'https://picsum.photos/seed/buildlink-paintjob/1000/750', location: 'Bình Dương', year: '2024' },
    ],
    certificates: [
      { name: 'Nhà thầu sơn ủy quyền', issuedBy: 'Jotun', year: '2021' },
    ],
  },
  {
    id: 5,
    slug: 'thiet-bi-ve-sinh-hai-linh',
    name: 'Thiết Bị Vệ Sinh Hải Linh',
    type: 'Thiết bị vệ sinh',
    cover: 'https://picsum.photos/seed/buildlink-hailinh/1600/900',
    tagline: 'Showroom thiết bị vệ sinh và phụ kiện phòng tắm cao cấp.',
    taxCode: '0108992233',
    representativeName: 'Đỗ Thị Hải Linh',
    phone: '024 3556 7788',
    email: 'sale@hailinh.vn',
    address: '768 Đường Láng, Đống Đa, Hà Nội',
    website: 'hailinh.com.vn',
    description:
      'Hệ thống showroom trưng bày đầy đủ bồn cầu, lavabo, sen tắm và phụ kiện từ các thương hiệu hàng đầu, hỗ trợ lắp đặt tận nơi.',
    vision: 'Nâng tầm không gian phòng tắm Việt.',
    mission: 'Thiết bị chính hãng, dịch vụ tận tâm.',
    status: 'approved',
    rating: 4.8,
    reviewCount: 187,
    yearFounded: '2010',
    specialties: ['Bồn cầu', 'Sen tắm', 'Lavabo', 'Phụ kiện'],
    services: [
      { name: 'Lắp đặt tận nơi', price: 'Từ 300.000đ', description: 'Đội kỹ thuật lắp đặt và bảo hành.' },
      { name: 'Tư vấn trọn bộ', price: 'Miễn phí', description: 'Tư vấn combo thiết bị theo phòng tắm.' },
    ],
    projects: [
      { title: 'Phòng tắm khách sạn 4 sao', image: '/images/case-study-03.jpg', location: 'Hà Nội', year: '2025' },
    ],
    certificates: [
      { name: 'Đại lý cấp 1 TOTO', issuedBy: 'TOTO Việt Nam', year: '2018' },
    ],
  },
  {
    id: 6,
    slug: 'gach-granite-phuong-nam',
    name: 'Gạch Granite Phương Nam',
    type: 'Nhà cung cấp vật liệu',
    cover: 'https://picsum.photos/seed/buildlink-phuongnam/1600/900',
    tagline: 'Sản xuất và phân phối gạch granite khổ lớn.',
    taxCode: '0311220099',
    representativeName: 'Võ Thành Nam',
    phone: '0274 3722 110',
    email: 'kinhdoanh@gachphuongnam.vn',
    address: 'KCN Mỹ Phước, Bến Cát, Bình Dương',
    website: 'gachphuongnam.vn',
    description:
      'Nhà máy sản xuất gạch granite khổ lớn công nghệ Ý, cung cấp sỉ và lẻ cho đại lý và công trình trên toàn quốc.',
    vision: 'Dẫn đầu công nghệ gạch khổ lớn tại Việt Nam.',
    mission: 'Chất lượng đồng đều, nguồn cung ổn định.',
    status: 'approved',
    rating: 4.7,
    reviewCount: 73,
    yearFounded: '2014',
    specialties: ['Gạch khổ lớn', 'Granite', 'Porcelain', 'Gạch kỹ thuật'],
    services: [
      { name: 'Bán sỉ đại lý', price: 'Giá nhà máy', description: 'Chiết khấu theo sản lượng cho đại lý.' },
      { name: 'Cắt gạch theo yêu cầu', price: 'Theo đơn', description: 'Gia công cắt khổ theo bản vẽ.' },
    ],
    projects: [
      { title: 'Cung cấp gạch trung tâm thương mại', image: 'https://picsum.photos/seed/buildlink-mall/1000/750', location: 'Bình Dương', year: '2024' },
    ],
    certificates: [
      { name: 'ISO 13006 (gạch ốp lát)', issuedBy: 'QUACERT', year: '2020' },
    ],
  },
]

export function getCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((c) => c.slug === slug)
}

export function companyInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const STATUS_LABEL: Record<CompanyStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã xác minh',
  rejected: 'Bị từ chối',
  suspended: 'Tạm ngưng',
}
