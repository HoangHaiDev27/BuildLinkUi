'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Star, MapPin, Calendar, Users, CheckCircle, Phone } from 'lucide-react'
import { use, useState } from 'react'

const CASE_STUDIES = [
  {
    id: 1,
    image: '/images/case-study-01.jpg',
    title: 'Nhà phố 3 tầng - Hoàn thiện nội thất',
    location: 'Quận 1, TPHCM',
    duration: '4 tháng',
  },
  {
    id: 2,
    image: '/images/case-study-02.jpg',
    title: 'Căn hộ 100m2 - Cải tạo toàn bộ',
    location: 'Quận 2, TPHCM',
    duration: '3 tháng',
  },
  {
    id: 3,
    image: '/images/case-study-03.jpg',
    title: 'Phòng tắm cao cấp - Cải tạo',
    location: 'Quận 3, TPHCM',
    duration: '2 tuần',
  },
]

const SERVICES: Record<
  string,
  { title: string; image: string; description: string }
> = {
  'xay-nha-pho': {
    title: 'Xây nhà phố trọn gói',
    image: '/images/case-study-01.jpg',
    description:
      'Thi công xây dựng nhà phố từ phần thô đến hoàn thiện, tối ưu công năng và chi phí cho từng diện tích đất.',
  },
  'sua-chua-chung-cu': {
    title: 'Sửa chữa & cải tạo chung cư',
    image: '/images/case-study-02.jpg',
    description:
      'Cải tạo căn hộ chung cư nhanh gọn, ít ảnh hưởng hàng xóm, đảm bảo đúng quy định tòa nhà và tiến độ cam kết.',
  },
  'noi-that': {
    title: 'Thi công nội thất',
    image: '/images/service-hero.jpg',
    description:
      'Thiết kế và thi công nội thất theo phong cách riêng, vật liệu chuẩn và đội thợ lành nghề cho không gian sống hoàn hảo.',
  },
  'chong-tham': {
    title: 'Chống thấm & chống nóng',
    image: '/images/case-study-03.jpg',
    description:
      'Xử lý chống thấm sân thượng, nhà vệ sinh, tường ngoài và chống nóng mái, bảo hành dài hạn cho công trình.',
  },
  'op-lat': {
    title: 'Thi công ốp lát toàn bộ nhà',
    image: '/images/tile-gach-02.jpg',
    description:
      'Ốp lát gạch nền, tường và khu vực ẩm ướt với kỹ thuật chuẩn, mạch ron đều và bề mặt phẳng đẹp.',
  },
}

const DEFAULT_SERVICE = {
  title: 'Dịch vụ sửa chữa & hoàn thiện nội thất',
  image: '/images/service-hero.jpg',
  description:
    'Với hơn 10 năm kinh nghiệm trong lĩnh vực xây dựng và trang trí nội thất, chúng tôi cam kết mang đến những giải pháp tối ưu cho mọi dự án của bạn.',
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const service = SERVICES[id] ?? DEFAULT_SERVICE
  const [selectedOption, setSelectedOption] = useState('standard')

  const servicePackages = [
    {
      id: 'standard',
      name: 'Gói Tiêu Chuẩn',
      price: '5,000,000',
      description: 'Phù hợp cho dự án nhỏ đến vừa',
      features: [
        'Tư vấn thiết kế miễn phí',
        'Vật liệu cơ bản',
        'Lao động chuyên nghiệp',
        'Bảo hành 6 tháng',
      ],
    },
    {
      id: 'premium',
      name: 'Gói Premium',
      price: '10,000,000',
      description: 'Vật liệu cao cấp, chi tiết hoàn hảo',
      features: [
        'Tư vấn thiết kế 3D',
        'Vật liệu cao cấp',
        'Quản lý dự án chuyên biệt',
        'Bảo hành 12 tháng',
        'Hỗ trợ sau bán hàng',
      ],
    },
    {
      id: 'luxury',
      name: 'Gói Cao Cấp',
      price: 'Liên hệ',
      description: 'Toàn bộ dự án từ A-Z',
      features: [
        'Tư vấn kiến trúc sư',
        'Vật liệu nhập khẩu',
        'Giám sát công trình 24/7',
        'Bảo hành 24 tháng',
        'Thay thế miễn phí',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative w-full h-96 bg-muted">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center px-4">
            <h1 className="max-w-3xl text-3xl lg:text-4xl font-bold text-white text-center">
              {service.title}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Service Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Về dịch vụ của chúng tôi
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Đội ngũ các thợ lành nghề, kiến trúc sư giàu kinh nghiệm sẽ giúp bạn
                biến những ý tưởng thành hiện thực với chất lượng tốt nhất.
              </p>

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Users, label: 'Đội ngũ chuyên nghiệp' },
                  { icon: Calendar, label: 'Đúng tiến độ' },
                  { icon: CheckCircle, label: 'Chất lượng đảm bảo' },
                  { icon: MapPin, label: 'Phục vụ toàn TPHCM' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-accent" />
                    <span className="text-sm text-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Tại sao chọn chúng tôi?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Tư vấn miễn phí, thiết kế theo yêu cầu',
                    'Vật liệu xây dựng chất lượng cao',
                    'Đội thợ lành nghề, có chứng chỉ',
                    'Giá cả cạnh tranh, minh bạch',
                    'Hỗ trợ khách hàng 24/7',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-primary-foreground h-fit sticky top-4">
              <h3 className="text-xl font-bold mb-4">Liên hệ ngay</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm opacity-90">Hotline</p>
                    <p className="font-bold text-lg">1900 1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm opacity-90">Địa chỉ</p>
                    <p className="text-sm">123 Nguyễn Huệ, Q.1, TPHCM</p>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full bg-primary-foreground text-primary hover:bg-white">
                <Link href="/contact">Yêu cầu báo giá</Link>
              </Button>
            </div>
          </div>

          {/* Service Packages */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Các gói dịch vụ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicePackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`transition-all cursor-pointer ${
                    selectedOption === pkg.id
                      ? 'border-accent shadow-lg ring-2 ring-accent/20'
                      : 'hover:border-accent'
                  }`}
                  onClick={() => setSelectedOption(pkg.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-accent font-bold text-2xl mb-2">{pkg.price}</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={
                        selectedOption === pkg.id
                          ? 'w-full bg-accent text-accent-foreground'
                          : 'w-full'
                      }
                      variant={selectedOption === pkg.id ? 'default' : 'outline'}
                    >
                      Chọn gói
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Các dự án đã thực hiện
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  className="group rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-48 bg-muted overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {study.title}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {study.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {study.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
