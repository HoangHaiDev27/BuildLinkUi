'use client'

import { use, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  LayoutGrid,
  List as ListIcon,
  ChevronDown,
  SearchX,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategorySlug,
} from '@/lib/catalog'

const SORT_OPTIONS = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Giá thấp đến cao', value: 'price-asc' },
  { label: 'Giá cao đến thấp', value: 'price-desc' },
  { label: 'Đánh giá cao nhất', value: 'rating' },
]

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const category = getCategoryBySlug(slug)
  const [sortBy, setSortBy] = useState('newest')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const products = useMemo(() => {
    const list = getProductsByCategorySlug(slug)
    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [slug, sortBy])

  const title = category?.name ?? 'Danh mục'

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Category hero */}
        <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
          {category && (
            <Image
              src={category.image}
              alt=""
              fill
              priority
              className="object-cover opacity-20"
            />
          )}
          <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
            <div className="flex items-center gap-1.5 text-sm text-primary-foreground/70 mb-4">
              <Link href="/" className="hover:text-accent">Trang chủ</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/products" className="hover:text-accent">Sản phẩm</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary-foreground font-medium">{title}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight max-w-2xl">{title}</h1>
            {category && (
              <p className="mt-3 max-w-2xl text-sm lg:text-base text-primary-foreground/80 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Other categories quick nav */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  c.slug === slug
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {products.length} sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setView('grid')}
                  className={`flex size-9 items-center justify-center rounded-l-md transition-colors ${
                    view === 'grid' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Dạng lưới"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`flex size-9 items-center justify-center rounded-r-md transition-colors ${
                    view === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Dạng danh sách"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={sortBy === option.value ? 'bg-secondary' : ''}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product grid / list */}
          {products.length > 0 ? (
            <div
              className={
                view === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} view={view} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
              <SearchX className="mb-3 size-8 text-muted-foreground" />
              <p className="text-foreground font-medium">Chưa có sản phẩm trong danh mục này</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Vui lòng quay lại sau hoặc xem các danh mục khác.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link href="/products">Xem tất cả sản phẩm</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
