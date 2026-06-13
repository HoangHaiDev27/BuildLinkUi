'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const initialItems = [
  {
    id: 1,
    name: 'Gạch Granite Vân Đá 60x60cm',
    brand: 'Viglacera',
    price: 285000,
    qty: 12,
    unit: 'viên',
    image: '/images/tile-gach-01.jpg',
  },
  {
    id: 2,
    name: 'Sơn Nội Thất Cao Cấp 5L',
    brand: 'Dulux',
    price: 520000,
    qty: 3,
    unit: 'thùng',
    image: '/images/paint-son-01.jpg',
  },
]

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [items, setItems] = useState(initialItems)

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = 150000
  const total = subtotal + shipping

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            Giỏ hàng ({items.length} sản phẩm)
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-sm">Giỏ hàng trống</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.brand}</p>
                  <p className="text-sm font-semibold text-accent mt-1">
                    {formatPrice(item.price)}/{item.unit}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary text-sm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary text-sm"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <p className="text-sm font-semibold text-foreground">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="flex-col p-4 border-t border-border gap-3">
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Tạm tính</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Phí vận chuyển (hàng cồng kềnh)</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base text-foreground">
              <span>Tổng cộng</span>
              <span className="text-accent">{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/gio-hang" className="w-full">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Tiến hành thanh toán
            </Button>
          </Link>
          <button
            onClick={() => onOpenChange(false)}
            className="text-xs text-muted-foreground hover:text-accent text-center"
          >
            Tiếp tục mua sắm
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
