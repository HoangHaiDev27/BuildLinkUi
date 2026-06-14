'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, Search } from 'lucide-react'
import { PRODUCTS } from '@/lib/catalog'

const CATEGORIES = ['Tất cả', 'Gạch', 'Sơn', 'Thiết bị vệ sinh', 'Vật liệu xây dựng']
const SORT_OPTIONS = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Giá thấp đến cao', value: 'price-asc' },
  { label: 'Giá cao đến thấp', value: 'price-desc' },
  { label: 'Đánh giá cao nhất', value: 'rating' },
  { label: 'Bán chạy nhất', value: 'popular' },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || product.category === selectedCategory
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })

    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating)
      case 'popular':
        return [...list].sort((a, b) => b.reviewCount - a.reviewCount)
      default:
        return list
    }
  }, [selectedCategory, sortBy, searchQuery])

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Sản phẩm</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="relative mb-8 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm gạch, sơn, thiết bị..."
              className="pl-10 h-11"
              aria-label="Tìm kiếm sản phẩm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Categories */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Danh mục</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-4">Khoảng giá</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded mr-2"
                      defaultChecked
                    />
                    <span className="text-foreground">Dưới 200.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded mr-2"
                      defaultChecked
                    />
                    <span className="text-foreground">200.000 - 500.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded mr-2"
                      defaultChecked
                    />
                    <span className="text-foreground">Trên 500.000đ</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Content - Products */}
            <div className="lg:col-span-3">
              {/* Sorting */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Hiển thị {filteredProducts.length} sản phẩm
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Sắp xếp
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

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-2">Không tìm thấy sản phẩm</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('Tất cả')
                      setSearchQuery('')
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
