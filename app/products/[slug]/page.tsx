'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Star,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  PackageX,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product-card'
import { getProductBySlug, getRelatedProducts } from '@/lib/catalog'

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)

  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className="flex min-h-[100dvh] flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md py-20">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary">
              <PackageX className="size-7 text-muted-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">
              Không tìm thấy sản phẩm
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Sản phẩm bạn tìm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/products">Xem tất cả sản phẩm</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image]
  const related = getRelatedProducts(product)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const addToCart = () => {
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`, {
      description: `${qty} ${product.unit} × ${formatPrice(product.price)}`,
      action: { label: 'Xem giỏ', onClick: () => {} },
    })
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-accent">Sản phẩm</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-accent">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-[12rem]">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-secondary">
                <Image
                  src={gallery[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                {product.isSale && discount > 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground">
                    -{discount}%
                  </span>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-3 flex gap-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-square w-20 overflow-hidden rounded-lg border transition-all ${
                        activeImage === i
                          ? 'border-accent ring-2 ring-accent/30'
                          : 'border-border hover:border-accent/60'
                      }`}
                      aria-label={`Ảnh ${i + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy box */}
            <div>
              <p className="text-sm font-medium text-muted-foreground">{product.brand}</p>
              <h1 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} đánh giá)</span>
                </div>
                <span className="h-4 w-px bg-border" />
                <Badge variant={product.inStock ? 'secondary' : 'destructive'} className="text-xs">
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
                <span className="pb-1 text-sm text-muted-foreground">/{product.unit}</span>
                {product.originalPrice && (
                  <span className="pb-1 text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-[60ch]">
                {product.description}
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Quantity + actions */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                    disabled={qty <= 1}
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold tabular-nums">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="flex-1 min-w-[12rem] bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.99]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ hàng
                </Button>
              </div>

              <Button asChild variant="outline" size="lg" className="mt-3 w-full">
                <Link href="/contact">Yêu cầu báo giá dự án</Link>
              </Button>

              {/* Trust strip */}
              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-6">
                {[
                  { icon: Truck, label: 'Giao toàn quốc' },
                  { icon: ShieldCheck, label: 'Hàng chính hãng' },
                  { icon: RotateCcw, label: 'Đổi trả 7 ngày' },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-1.5 text-center">
                    <t.icon className="w-5 h-5 text-accent" />
                    <span className="text-xs text-muted-foreground">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specs + long description */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground mb-5">Thông số kỹ thuật</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((s) => (
                  <div key={s.label} className="rounded-xl bg-secondary/50 px-4 py-3">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 h-fit">
              <h3 className="font-semibold text-foreground mb-2">Cam kết của VậtLiệu Pro</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tư vấn khối lượng và bóc tách vật tư miễn phí. Đội ngũ kỹ thuật hỗ trợ
                khảo sát công trình và giao hàng đúng tiến độ trên toàn quốc.
              </p>
              <Button asChild variant="link" className="mt-2 px-0 text-accent">
                <Link href="/contact">Liên hệ tư vấn</Link>
              </Button>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-foreground mb-6">Sản phẩm liên quan</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
