'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, TrendingUp } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Link from 'next/link'
import Image from 'next/image'

const suggestions = [
  { type: 'product', name: 'Gạch Granite 60x60 Vân Đá Xám', href: '/san-pham/gach-granite-60x60', image: '/images/tile-gach-01.jpg' },
  { type: 'product', name: 'Gạch Porcelain Đen Mờ 80x80cm', href: '/san-pham/gach-porcelain-80x80', image: '/images/tile-gach-02.jpg' },
  { type: 'service', name: 'Thi công ốp lát toàn bộ nhà', href: '/dich-vu/op-lat', image: '/images/service-hero.jpg' },
  { type: 'product', name: 'Sơn Dulux Chống Thấm 5L', href: '/san-pham/son-dulux', image: '/images/paint-son-01.jpg' },
]

const trending = ['Gạch 60x60', 'Sơn nội thất', 'Thi công chung cư', 'Thiết bị vệ sinh TOTO']

export default function SearchBar({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [open])

  const filtered = query.length > 1
    ? suggestions.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm vật liệu, dịch vụ thi công..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {query.length <= 1 ? (
            <>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Tìm kiếm phổ biến
              </p>
              <div className="flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground hover:bg-secondary hover:border-accent transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          ) : filtered.length > 0 ? (
            <ul className="space-y-1">
              {filtered.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded bg-muted overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.type === 'product' ? 'Sản phẩm' : 'Dịch vụ'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Không tìm thấy kết quả cho &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
