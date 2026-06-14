'use client'

import Link from 'next/link'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { COMPANIES, companyInitials } from '@/lib/companies'
import { PRODUCTS } from '@/lib/catalog'
import {
  ORDERS,
  USERS,
  ORDER_STATUS,
  REVENUE_SERIES,
  CATEGORY_SHARE,
  formatPrice,
} from '@/lib/admin'

const ACCENT = '#e0892f'
const PRIMARY = '#26405f'

const STATS = [
  { label: 'Doanh thu tháng', value: '690 triệu', delta: '+12.4%', up: true, icon: DollarSign },
  { label: 'Đơn hàng', value: '312', delta: '+8.1%', up: true, icon: ShoppingCart },
  { label: 'Người dùng', value: String(USERS.length * 184), delta: '+5.2%', up: true, icon: Users },
  { label: 'DN chờ duyệt', value: '1', delta: '-2', up: false, icon: Building2 },
]

export default function AdminDashboard() {
  const pending = COMPANIES.filter((c) => c.status === 'pending')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tổng quan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bảng điều khiển nền tảng VậtLiệu Pro · cập nhật hôm nay
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10">
                <s.icon className="w-4 h-4 text-accent" />
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  s.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                }`}
              >
                {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {s.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Doanh thu 6 tháng</h2>
            <span className="text-xs text-muted-foreground">đơn vị: triệu đồng</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={REVENUE_SERIES} margin={{ left: -16, right: 8, top: 4 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,0.15)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="currentColor" className="text-muted-foreground" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="currentColor" className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgba(120,120,120,0.2)',
                  fontSize: 13,
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold text-foreground">Cơ cấu danh mục</h2>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={CATEGORY_SHARE} layout="vertical" margin={{ left: 8, right: 16 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="currentColor"
                className="text-muted-foreground"
              />
              <Tooltip
                cursor={{ fill: 'rgba(120,120,120,0.08)' }}
                contentStyle={{ borderRadius: 12, border: '1px solid rgba(120,120,120,0.2)', fontSize: 13 }}
                formatter={(v: number) => [`${v}%`, 'Tỷ trọng']}
              />
              <Bar dataKey="value" fill={PRIMARY} radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs text-muted-foreground">
            {PRODUCTS.length} sản phẩm đang hoạt động
          </p>
        </div>
      </div>

      {/* Recent orders + pending approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Đơn hàng gần đây</h2>
            <Button asChild variant="ghost" size="sm" className="text-accent">
              <Link href="/admin/orders">Xem tất cả</Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Mã đơn</th>
                  <th className="pb-2 font-medium">Khách hàng</th>
                  <th className="pb-2 font-medium text-right">Giá trị</th>
                  <th className="pb-2 font-medium text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ORDERS.slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 font-medium text-foreground">{o.id}</td>
                    <td className="py-3 text-muted-foreground">{o.customer}</td>
                    <td className="py-3 text-right font-medium text-foreground tabular-nums">
                      {formatPrice(o.total)}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS[o.status].cls}`}>
                        {ORDER_STATUS[o.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Chờ duyệt</h2>
            <Button asChild variant="ghost" size="sm" className="text-accent">
              <Link href="/admin/companies">Tất cả</Link>
            </Button>
          </div>
          {pending.length > 0 ? (
            <ul className="space-y-3">
              {pending.map((c) => (
                <li key={c.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                      {companyInitials(c.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.type}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/admin/companies">
                        <Check className="w-3.5 h-3.5" />
                        Duyệt
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link href="/admin/companies">
                        <X className="w-3.5 h-3.5" />
                        Từ chối
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Không có hồ sơ chờ duyệt.</p>
          )}
        </div>
      </div>
    </div>
  )
}
