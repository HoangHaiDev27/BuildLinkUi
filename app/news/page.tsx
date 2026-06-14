'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Calendar, ChevronRight, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Cách chọn gạch lát nền phù hợp cho từng không gian',
    excerpt:
      'Kích thước, độ chống trượt và tông màu quyết định trải nghiệm sử dụng. Hướng dẫn chi tiết giúp bạn chọn đúng loại gạch cho phòng khách, bếp và sân vườn.',
    category: 'Hướng dẫn',
    author: 'Nguyễn Hoàng Long',
    date: '12/06/2026',
    image: '/images/tile-gach-02.jpg',
  },
  {
    id: 2,
    title: 'Xu hướng màu sơn nội thất nổi bật năm 2026',
    excerpt:
      'Tông trung tính ấm và xanh rêu đang dẫn dắt thị hiếu. Cùng điểm qua những bảng màu được kiến trúc sư ưa chuộng trong năm nay.',
    category: 'Xu hướng',
    author: 'Trần Mai Anh',
    date: '05/06/2026',
    image: '/images/paint-son-01.jpg',
  },
  {
    id: 3,
    title: 'Quy trình chống thấm sân thượng đúng kỹ thuật',
    excerpt:
      'Chống thấm sai cách khiến công trình xuống cấp nhanh. Bài viết tổng hợp các bước thi công và vật liệu nên dùng.',
    category: 'Hướng dẫn',
    author: 'Phạm Quốc Bảo',
    date: '28/05/2026',
    image: '/images/case-study-03.jpg',
  },
  {
    id: 4,
    title: 'VậtLiệu Pro khai trương showroom thứ 5 tại Thủ Đức',
    excerpt:
      'Không gian trưng bày hơn 320m² với đầy đủ mẫu gạch, sơn và thiết bị vệ sinh, sẵn sàng phục vụ khách hàng khu Đông.',
    category: 'Tin công ty',
    author: 'Ban truyền thông',
    date: '20/05/2026',
    image: 'https://picsum.photos/seed/buildlink-news-showroom/1000/700',
  },
  {
    id: 5,
    title: 'So sánh gạch granite và porcelain: nên chọn loại nào?',
    excerpt:
      'Hai dòng gạch cao cấp với đặc tính khác biệt về độ hút nước và độ cứng. Phân tích giúp bạn ra quyết định phù hợp ngân sách.',
    category: 'Hướng dẫn',
    author: 'Nguyễn Hoàng Long',
    date: '14/05/2026',
    image: '/images/tile-gach-03.jpg',
  },
  {
    id: 6,
    title: 'Tối ưu chi phí vật liệu cho nhà phố diện tích nhỏ',
    excerpt:
      'Mẹo bóc tách khối lượng và chọn vật liệu thông minh giúp tiết kiệm đáng kể mà vẫn đảm bảo thẩm mỹ và độ bền.',
    category: 'Xu hướng',
    author: 'Lê Thị Thu Hà',
    date: '02/05/2026',
    image: 'https://picsum.photos/seed/buildlink-news-budget/1000/700',
  },
]

const FILTERS = ['Tất cả', 'Hướng dẫn', 'Xu hướng', 'Tin công ty']

export default function NewsPage() {
  const [filter, setFilter] = useState('Tất cả')
  const [email, setEmail] = useState('')

  const [featured] = ARTICLES
  const list = useMemo(
    () =>
      ARTICLES.filter((a) => a.id !== featured.id).filter(
        (a) => filter === 'Tất cả' || a.category === filter,
      ),
    [filter, featured.id],
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
            <span className="text-foreground font-medium">Tin tức</span>
          </div>
        </div>

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 lg:pt-14 pb-8">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Tin tức & cẩm nang vật liệu
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Kiến thức chọn vật liệu, xu hướng thiết kế và cập nhật mới nhất từ VậtLiệu Pro.
          </p>
        </section>

        {/* Featured article - full-width image with scrim */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
          <article className="group relative overflow-hidden rounded-3xl border border-border">
            <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-secondary">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {featured.category}
              </span>
              <h2 className="mt-3 max-w-3xl text-2xl lg:text-4xl font-bold tracking-tight text-white">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm lg:text-base text-white/85 line-clamp-2">
                {featured.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
                <span>{featured.author}</span>
                <span className="h-1 w-1 rounded-full bg-white/50" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.date}
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* Filter + article grid */}
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
              {list.map((a) => (
                <article
                  key={a.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-medium text-accent">{a.category}</span>
                    <h3 className="mt-2 font-semibold text-foreground leading-snug line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                      <span>{a.author}</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {a.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              Chưa có bài viết trong chuyên mục này.
            </p>
          )}
        </section>

        {/* Newsletter */}
        <section className="bg-secondary/50 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 lg:px-6 py-14 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              Nhận cẩm nang vật liệu hàng tuần
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mẹo chọn vật liệu, ưu đãi và bài viết mới gửi thẳng vào hộp thư của bạn.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!email) return
                toast.success('Đăng ký thành công', {
                  description: 'Cảm ơn bạn đã đăng ký nhận bản tin.',
                })
                setEmail('')
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="h-11 bg-background"
                aria-label="Email nhận bản tin"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
              >
                Đăng ký
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
