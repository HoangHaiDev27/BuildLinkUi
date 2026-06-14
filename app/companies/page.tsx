'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Star,
  MapPin,
  BadgeCheck,
  ChevronRight,
  ArrowUpRight,
  Building2,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { COMPANIES, COMPANY_TYPES, companyInitials } from '@/lib/companies'

export default function CompaniesPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Tất cả')

  const list = useMemo(() => {
    const q = query.toLowerCase()
    return COMPANIES.filter((c) => {
      const matchType = type === 'Tất cả' || c.type === type
      const matchQuery =
        c.name.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q)) ||
        c.address.toLowerCase().includes(q)
      return matchType && matchQuery
    })
  }, [query, type])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Nhà cung cấp</span>
          </div>
        </div>

        {/* Header */}
        <section className="bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight max-w-3xl">
              Nhà cung cấp & nhà thầu uy tín
            </h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/80 leading-relaxed">
              Kết nối với các doanh nghiệp vật liệu và đơn vị thi công đã được xác minh trên
              VậtLiệu Pro.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm theo tên, lĩnh vực hoặc khu vực..."
                  className="h-12 pl-10 bg-background text-foreground"
                  aria-label="Tìm nhà cung cấp"
                />
              </div>
              <Button asChild size="lg" className="h-12 bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                <Link href="/company/register">
                  Trở thành đối tác
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Type filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {['Tất cả', ...COMPANY_TYPES].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  type === t
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="mb-6 text-sm text-muted-foreground">{list.length} doanh nghiệp</p>

          {list.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((c) => (
                <Link
                  key={c.id}
                  href={`/companies/${c.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                        {companyInitials(c.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                            {c.name}
                          </h3>
                          {c.status === 'approved' && (
                            <BadgeCheck className="w-4 h-4 text-accent shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{c.type}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.tagline}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.specialties.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{c.rating}</span>
                        <span className="text-muted-foreground">({c.reviewCount})</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground truncate max-w-[55%]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{c.address.split(',').slice(-1)[0].trim()}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
              <Building2 className="mb-3 size-8 text-muted-foreground" />
              <p className="font-medium text-foreground">Không tìm thấy doanh nghiệp phù hợp</p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => {
                  setQuery('')
                  setType('Tất cả')
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
