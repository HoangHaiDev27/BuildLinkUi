'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'

interface Project {
  id: number
  title: string
  category: string
  location: string
  year: string
  scope: string
  image: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Nhà phố 3 tầng hoàn thiện nội thất',
    category: 'Nhà phố',
    location: 'Quận 7, TP.HCM',
    year: '2025',
    scope: 'Thi công trọn gói',
    image: '/images/case-study-01.jpg',
  },
  {
    id: 2,
    title: 'Căn hộ 100m² cải tạo toàn bộ',
    category: 'Căn hộ',
    location: 'Quận 2, TP.HCM',
    year: '2025',
    scope: 'Cải tạo & nội thất',
    image: '/images/case-study-02.jpg',
  },
  {
    id: 3,
    title: 'Phòng tắm cao cấp ốp đá tự nhiên',
    category: 'Nội thất',
    location: 'Quận 3, TP.HCM',
    year: '2024',
    scope: 'Ốp lát & thiết bị',
    image: '/images/case-study-03.jpg',
  },
  {
    id: 4,
    title: 'Showroom vật liệu 320m²',
    category: 'Thương mại',
    location: 'Thủ Đức, TP.HCM',
    year: '2024',
    scope: 'Thiết kế & thi công',
    image: 'https://picsum.photos/seed/buildlink-showroom/1000/750',
  },
  {
    id: 5,
    title: 'Biệt thự vườn ốp gạch ngoài trời',
    category: 'Nhà phố',
    location: 'Long An',
    year: '2024',
    scope: 'Vật liệu & ốp lát',
    image: 'https://picsum.photos/seed/buildlink-villa/1000/750',
  },
  {
    id: 6,
    title: 'Văn phòng làm việc 450m²',
    category: 'Thương mại',
    location: 'Quận 1, TP.HCM',
    year: '2023',
    scope: 'Thi công nội thất',
    image: 'https://picsum.photos/seed/buildlink-office/1000/750',
  },
]

const FILTERS = ['Tất cả', 'Nhà phố', 'Căn hộ', 'Thương mại', 'Nội thất']

// mock - so lieu minh hoa
const STATS = [
  { value: '350+', label: 'Công trình bàn giao' },
  { value: '12', label: 'Năm kinh nghiệm' },
  { value: '1.200+', label: 'Khách hàng tin tưởng' },
  { value: '63', label: 'Tỉnh thành phục vụ' },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Tất cả')

  const [featured, ...rest] = PROJECTS
  const list = useMemo(
    () => (filter === 'Tất cả' ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest],
  )

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Dự án</span>
          </div>
        </div>

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 lg:pt-14 pb-8">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Những công trình chúng tôi đã hoàn thiện
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Từ nhà phố, căn hộ đến không gian thương mại, mỗi dự án là cam kết về chất
            lượng vật liệu và tay nghề thi công của VậtLiệu Pro.
          </p>
        </section>

        {/* Featured project - asymmetric split */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
          <Link
            href="/contact"
            className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl border border-border bg-card p-5 lg:p-8"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <span className="text-sm font-medium text-accent">Dự án tiêu biểu</span>
              <h2 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {featured.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" />
                  {featured.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent" />
                  {featured.year}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-[55ch]">
                {featured.scope}. Đội ngũ kiến trúc sư và kỹ thuật của chúng tôi đồng hành từ
                khâu chọn vật liệu đến nghiệm thu, đảm bảo đúng tiến độ và ngân sách.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-accent">
                Trao đổi về dự án của bạn
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </section>

        {/* Filter + grid */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {list.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {p.location}
                      </span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              Chưa có dự án trong hạng mục này.
            </p>
          )}
        </section>

        {/* Stats band */}
        <section className="bg-secondary/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-accent">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Bạn đang ấp ủ một công trình?
              </h2>
              <p className="mt-2 max-w-xl text-primary-foreground/80">
                Nhận tư vấn vật liệu và báo giá thi công miễn phí từ đội ngũ chuyên gia.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
              <Link href="/contact">Yêu cầu báo giá</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
