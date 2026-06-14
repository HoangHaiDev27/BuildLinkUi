'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Plus, Trash2, Pencil, ExternalLink, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES, PRODUCTS } from '@/lib/catalog'

function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState(CATEGORIES.map((c) => ({ ...c })))
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')

  const count = (slug: string) => PRODUCTS.filter((p) => p.categorySlug === slug).length

  const add = () => {
    if (!name.trim() || !tagline.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    setRows((prev) => [
      {
        slug: slugify(name),
        name,
        tagline,
        description: tagline,
        image: `https://picsum.photos/seed/buildlink-cat-${Date.now()}/1200/800`,
      },
      ...prev,
    ])
    setName('')
    setTagline('')
    setOpen(false)
    toast.success('Đã thêm danh mục')
  }

  const remove = (slug: string, label: string) => {
    setRows((prev) => prev.filter((c) => c.slug !== slug))
    toast.success(`Đã xóa danh mục "${label}"`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Danh mục</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý các nhóm vật liệu hiển thị trên cửa hàng.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4" />
              Thêm danh mục
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm danh mục</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vật liệu cách nhiệt" />
                {name && (
                  <p className="text-xs text-muted-foreground">
                    Đường dẫn: /categories/{slugify(name)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Mô tả ngắn</Label>
                <Textarea
                  id="tagline"
                  rows={3}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Mô tả nhóm sản phẩm"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Hủy</Button>
              </DialogClose>
              <Button onClick={add} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Lưu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rows.map((c) => (
          <div key={c.slug} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
              <Image src={c.image} alt={c.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">
                <Package className="w-3.5 h-3.5 text-accent" />
                {count(c.slug)} sản phẩm
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-foreground">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.tagline}</p>
              <div className="mt-4 flex items-center gap-1">
                <Button asChild variant="ghost" size="icon-sm" aria-label="Xem">
                  <Link href={`/categories/${c.slug}`}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Sửa"
                  onClick={() => toast.info('Chỉnh sửa danh mục sẽ sớm ra mắt')}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Xóa"
                  className="ml-auto text-muted-foreground hover:text-destructive"
                  onClick={() => remove(c.slug, c.name)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
