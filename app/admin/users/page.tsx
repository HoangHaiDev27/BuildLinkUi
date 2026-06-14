'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Search, Building2, User, MoreHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { USERS, type UserType } from '@/lib/admin'

const TABS: { id: 'all' | UserType; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'customer', label: 'Khách hàng' },
  { id: 'company', label: 'Doanh nghiệp' },
]

function initials(name: string) {
  const p = name.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase()
  return (p[0][0] + p[p.length - 1][0]).toUpperCase()
}

export default function AdminUsersPage() {
  const [rows, setRows] = useState(USERS.map((u) => ({ ...u })))
  const [tab, setTab] = useState<'all' | UserType>('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length }
    for (const r of rows) c[r.type] = (c[r.type] ?? 0) + 1
    return c
  }, [rows])

  const list = useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter(
      (r) =>
        (tab === 'all' || r.type === tab) &&
        (r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)),
    )
  }, [rows, tab, query])

  const toggleActive = (id: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        toast.success(r.active ? `Đã khóa ${r.name}` : `Đã mở khóa ${r.name}`)
        return { ...r, active: !r.active }
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Người dùng</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quản lý tài khoản khách hàng và doanh nghiệp.
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
            placeholder="Tìm tên hoặc email..."
            className="h-9 pl-9 bg-card"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Tài khoản</th>
                <th className="px-4 py-3 font-medium">Loại</th>
                <th className="px-4 py-3 font-medium">Điện thoại</th>
                <th className="px-4 py-3 font-medium text-center">Đơn hàng</th>
                <th className="px-4 py-3 font-medium">Tham gia</th>
                <th className="px-4 py-3 font-medium text-center">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((u) => (
                <tr key={u.id} className="hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {initials(u.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{u.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      {u.type === 'company' ? <Building2 className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      {u.type === 'company' ? 'Doanh nghiệp' : 'Khách hàng'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{u.phone}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground tabular-nums">{u.orders}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={u.active ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {u.active ? 'Hoạt động' : 'Đã khóa'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" aria-label="Hành động">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Chi tiết tài khoản sẽ sớm ra mắt')}>
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => toggleActive(u.id)}
                          >
                            {u.active ? 'Khóa tài khoản' : 'Mở khóa'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <p className="py-14 text-center text-sm text-muted-foreground">Không tìm thấy tài khoản.</p>
        )}
      </div>
    </div>
  )
}
