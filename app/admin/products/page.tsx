'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Search, Plus, Trash2, Pencil, ExternalLink } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PRODUCTS } from '@/lib/catalog'
import { CATEGORIES } from '@/lib/catalog'
import { formatPrice } from '@/lib/admin'

export default function AdminProductsPage() {
  const [rows, setRows] = useState(PRODUCTS.map((p) => ({ ...p })))
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')

  const list = useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter(
      (p) =>
        (cat === 'all' || p.categorySlug === cat) &&
        (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)),
    )
  }, [rows, query, cat])

  const remove = (id: number, name: string) => {
    setRows((prev) => prev.filter((p) => p.id !== id))
    toast.success(`Đã xóa "${name}"`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Sản phẩm</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} sản phẩm trong danh mục nền tảng.
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => toast.info('Biểu mẫu thêm sản phẩm sẽ sớm ra mắt')}
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:max-w-xs sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm, thương hiệu..."
            className="h-9 pl-9 bg-card"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat('all')}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              cat === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Tất cả
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                cat === c.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Sản phẩm</th>
                <th className="px-4 py-3 font-medium">Danh mục</th>
                <th className="px-4 py-3 font-medium text-right">Giá</th>
                <th className="px-4 py-3 font-medium text-center">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[16rem]">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground tabular-nums">
                    {formatPrice(p.price)}
                    <span className="text-xs font-normal text-muted-foreground">/{p.unit}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={p.inStock ? 'secondary' : 'destructive'} className="text-xs">
                      {p.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="icon-sm" aria-label="Xem">
                        <Link href={`/products/${p.slug}`}>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Sửa"
                        onClick={() => toast.info('Chỉnh sửa sản phẩm sẽ sớm ra mắt')}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Xóa"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => remove(p.id, p.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <p className="py-14 text-center text-sm text-muted-foreground">Không tìm thấy sản phẩm.</p>
        )}
      </div>
    </div>
  )
}
