'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Badge as BadgeIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  unit: string
  image: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
  slug: string
  size?: string
}

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export function ProductCard({ product, view = 'grid' }: { product: Product; view?: 'grid' | 'list' }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`, {
      description: `1 ${product.unit} × ${formatPrice(product.price)}`,
      action: {
        label: 'Xem giỏ',
        onClick: () => {},
      },
    })
  }

  if (view === 'list') {
    return (
      <Link href={`/san-pham/${product.slug}`} className="group">
        <article className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent hover:shadow-md transition-all">
          <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-secondary shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.isSale && (
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                SALE
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
              <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-accent transition-colors line-clamp-2">
                {product.name}
              </h3>
              {product.size && (
                <p className="text-xs text-muted-foreground mt-1">Kích thước: {product.size}</p>
              )}
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="font-bold text-accent text-base">{formatPrice(product.price)}<span className="text-xs font-normal text-muted-foreground">/{product.unit}</span></p>
                {product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={product.inStock ? 'secondary' : 'destructive'} className="text-xs">
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
                <Button
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/san-pham/${product.slug}`} className="group">
      <article className="bg-card rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all overflow-hidden">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded">
              MỚI
            </span>
          )}
          {product.isSale && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
              SALE
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground bg-card px-3 py-1 rounded-full border border-border">
                Hết hàng
              </span>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="absolute bottom-2 right-2 w-9 h-9 bg-card rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-accent hover:text-accent-foreground disabled:opacity-40 text-foreground"
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
          <h3 className="font-medium text-foreground text-sm leading-tight group-hover:text-accent transition-colors line-clamp-2 mb-1.5">
            {product.name}
          </h3>
          {product.size && (
            <p className="text-xs text-muted-foreground mb-1.5">{product.size}</p>
          )}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-bold text-accent leading-none">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-muted-foreground">/{product.unit}</p>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>
            <Badge variant={product.inStock ? 'secondary' : 'outline'} className="text-xs shrink-0">
              {product.inStock ? 'Còn hàng' : 'Hết'}
            </Badge>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function ProductCardSkeleton({ view = 'grid' }: { view?: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <div className="flex gap-4 p-4 bg-card rounded-xl border border-border animate-pulse">
        <div className="w-28 h-28 rounded-lg bg-muted shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-muted rounded w-1/4" />
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-5 bg-muted rounded w-1/3 mt-4" />
        </div>
      </div>
    )
  }
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-4/5" />
        <div className="h-5 bg-muted rounded w-1/2 mt-3" />
      </div>
    </div>
  )
}
