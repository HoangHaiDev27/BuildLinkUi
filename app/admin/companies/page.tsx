'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Search,
  Check,
  X,
  Ban,
  RotateCcw,
  ExternalLink,
  BadgeCheck,
  Star,
  MapPin,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  COMPANIES,
  companyInitials,
  STATUS_LABEL,
  type CompanyStatus,
} from '@/lib/companies'

const STATUS_CLS: Record<CompanyStatus, string> = {
  pending: 'bg-accent/15 text-accent',
  approved: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  rejected: 'bg-destructive/10 text-destructive',
  suspended: 'bg-secondary text-muted-foreground',
}

const TABS: { id: 'all' | CompanyStatus; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ duyệt' },
  { id: 'approved', label: 'Đã duyệt' },
  { id: 'suspended', label: 'Tạm ngưng' },
  { id: 'rejected', label: 'Từ chối' },
]

export default function AdminCompaniesPage() {
  const [rows, setRows] = useState(COMPANIES.map((c) => ({ ...c })))
  const [tab, setTab] = useState<'all' | CompanyStatus>('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length }
    for (const r of rows) c[r.status] = (c[r.status] ?? 0) + 1
    return c
  }, [rows])

  const list = useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter(
      (r) =>
        (tab === 'all' || r.status === tab) &&
        (r.name.toLowerCase().includes(q) || r.taxCode.includes(q)),
    )
  }, [rows, tab, query])

  const setStatus = (id: number, status: CompanyStatus, msg: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    toast.success(msg)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Doanh nghiệp</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Duyệt hồ sơ và quản lý các nhà cung cấp, nhà thầu trên nền tảng.
        </p>
      </div>

      {/* Tabs + search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
              <span className="ml-1.5 opacity-70">{counts[t.id] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc MST..."
            className="h-9 pl-9 bg-card"
          />
        </div>
      </div>

      {/* List */}
      {list.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card divide-y divide-border">
          {list.map((c) => (
            <div key={c.id} className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {companyInitials(c.name)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-foreground truncate">{c.name}</p>
                    {c.status === 'approved' && <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {c.type} · MST {c.taxCode}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      {c.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {c.address.split(',').slice(-1)[0].trim()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:gap-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLS[c.status]}`}>
                  {STATUS_LABEL[c.status]}
                </span>

                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="icon-sm" aria-label="Xem hồ sơ">
                    <Link href={`/companies/${c.slug}`}>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>

                  {(c.status === 'pending' || c.status === 'rejected') && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 text-white hover:bg-emerald-600/90"
                      onClick={() => setStatus(c.id, 'approved', `Đã duyệt ${c.name}`)}
                    >
                      <Check className="w-3.5 h-3.5" />
                      Duyệt
                    </Button>
                  )}
                  {c.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setStatus(c.id, 'rejected', `Đã từ chối ${c.name}`)}
                    >
                      <X className="w-3.5 h-3.5" />
                      Từ chối
                    </Button>
                  )}
                  {c.status === 'approved' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setStatus(c.id, 'suspended', `Đã tạm ngưng ${c.name}`)}
                    >
                      <Ban className="w-3.5 h-3.5" />
                      Tạm ngưng
                    </Button>
                  )}
                  {c.status === 'suspended' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setStatus(c.id, 'approved', `Đã khôi phục ${c.name}`)}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Khôi phục
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Không có doanh nghiệp phù hợp.
        </div>
      )}
    </div>
  )
}
