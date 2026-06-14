'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Truck,
  Tag,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  qty: number
  unit: string
  image: string
  slug: string
}

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'Gạch Granite vân đá xám 60x60cm',
    brand: 'Viglacera',
    price: 285000,
    qty: 12,
    unit: 'm²',
    image: '/images/tile-gach-01.jpg',
    slug: 'gach-granite-60x60',
  },
  {
    id: 9,
    name: 'Sơn nội thất Dulux Inspire 18L',
    brand: 'Dulux',
    price: 980000,
    qty: 3,
    unit: 'thùng',
    image: '/images/paint-son-01.jpg',
    slug: 'son-dulux',
  },
]

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const [coupon, setCoupon] = useState('')

  const updateQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    )

  const removeItem = (id: number) => {
    const removed = items.find((i) => i.id === id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    if (removed) toast.success(`Đã xóa "${removed.name}" khỏi giỏ hàng`)
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = items.length > 0 ? 150000 : 0
  const total = subtotal + shipping

  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary/30">
      <Navbar />

      <main className="flex-1">
        <div className="border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Giỏ hàng</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-8">
            Giỏ hàng của bạn
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-20 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="size-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Giỏ hàng đang trống</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Khám phá hàng nghìn sản phẩm vật liệu chính hãng và thêm vào giỏ để bắt đầu.
              </p>
              <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/products">Bắt đầu mua sắm</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-border bg-background p-4"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-xl bg-secondary"
                    >
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-sm font-semibold text-foreground hover:text-accent line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm font-semibold text-accent">
                          {formatPrice(item.price)}
                          <span className="text-xs font-normal text-muted-foreground">/{item.unit}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                            disabled={item.qty <= 1}
                            aria-label="Giảm"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium tabular-nums">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Tăng"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-foreground">
                            {formatPrice(item.price * item.qty)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-border bg-background p-6 lg:sticky lg:top-24">
                  <h2 className="text-lg font-bold text-foreground">Tóm tắt đơn hàng</h2>

                  {/* Coupon */}
                  <div className="mt-5 flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Mã giảm giá"
                        className="pl-9"
                        aria-label="Mã giảm giá"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        toast.info('Mã giảm giá không hợp lệ', {
                          description: 'Vui lòng kiểm tra lại mã khuyến mãi.',
                        })
                      }
                    >
                      Áp dụng
                    </Button>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tạm tính</span>
                      <span className="text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Phí vận chuyển</span>
                      <span className="text-foreground">{formatPrice(shipping)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-foreground">Tổng cộng</span>
                      <span className="text-accent">{formatPrice(total)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Đã bao gồm VAT</p>
                  </div>

                  <Button
                    size="lg"
                    className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() =>
                      toast.success('Đang chuyển đến thanh toán', {
                        description: 'Tính năng thanh toán sẽ sớm ra mắt.',
                      })
                    }
                  >
                    Tiến hành thanh toán
                  </Button>

                  <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      Thanh toán an toàn, bảo mật
                    </p>
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-accent" />
                      Giao hàng tận chân công trình
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
