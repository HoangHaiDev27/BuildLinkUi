'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Search, Eye, MoreHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ORDERS,
  ORDER_STATUS,
  formatPrice,
  type OrderStatus,
} from '@/lib/admin'

const TABS: { id: 'all' | OrderStatus; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ xử lý' },
  { id: 'processing', label: 'Đang xử lý' },
  { id: 'shipping', label: 'Đang giao' },
  { id: 'completed', label: 'Hoàn thành' },
  { id: 'cancelled', label: 'Đã hủy' },
]

const NEXT_STATUS: OrderStatus[] = ['pending', 'processing', 'shipping', 'completed', 'cancelled']

export default function AdminOrdersPage() {
  const [rows, setRows] = useState(ORDERS.map((o) => ({ ...o })))
  const [tab, setTab] = useState<'all' | OrderStatus>('all')
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
        (r.id.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q)),
    )
  }, [rows, tab, query])

  const revenue = rows
    .filter((r) => r.status !== 'cancelled')
    .reduce((sum, r) => sum + r.total, 0)

  const setStatus = (id: string, status: OrderStatus) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    toast.success(`Đơn ${id}: ${ORDER_STATUS[status].label}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Đơn hàng</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} đơn · Tổng giá trị {formatPrice(revenue)}
          </p>
        </div>
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
            placeholder="Tìm mã đơn, khách hàng..."
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
                <th className="px-4 py-3 font-medium">Mã đơn</th>
                <th className="px-4 py-3 font-medium">Khách hàng</th>
                <th className="px-4 py-3 font-medium text-center">SL</th>
                <th className="px-4 py-3 font-medium text-right">Giá trị</th>
                <th className="px-4 py-3 font-medium">Ngày</th>
                <th className="px-4 py-3 font-medium text-center">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((o) => (
                <tr key={o.id} className="hover:bg-secondary/30">
                  <td className="px-4 py-3 font-medium text-foreground">{o.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.customer}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground tabular-nums">{o.items}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground tabular-nums">
                    {formatPrice(o.total)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{o.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS[o.status].cls}`}>
                      {ORDER_STATUS[o.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Xem"
                        onClick={() => toast.info(`Chi tiết đơn ${o.id} sẽ sớm ra mắt`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" aria-label="Đổi trạng thái">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {NEXT_STATUS.map((s) => (
                            <DropdownMenuItem
                              key={s}
                              onClick={() => setStatus(o.id, s)}
                              className={o.status === s ? 'bg-secondary' : ''}
                            >
                              {ORDER_STATUS[s].label}
                            </DropdownMenuItem>
                          ))}
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
          <p className="py-14 text-center text-sm text-muted-foreground">Không có đơn hàng phù hợp.</p>
        )}
      </div>
    </div>
  )
}
