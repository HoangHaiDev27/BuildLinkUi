// Admin-side mock data. Frontend-first until admin endpoints exist on the API.
// Shapes are aligned with the domain (accounts of type Customer/Company,
// company approval workflow, orders, products).

export function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export function formatCompact(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace('.0', '') + ' tỷ'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + ' triệu'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'k'
  return String(n)
}

/* --------------------------------- Orders --------------------------------- */

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled'

export interface AdminOrder {
  id: string
  customer: string
  items: number
  total: number
  date: string
  status: OrderStatus
}

export const ORDER_STATUS: Record<OrderStatus, { label: string; cls: string }> = {
  pending: { label: 'Chờ xử lý', cls: 'bg-accent/15 text-accent' },
  processing: { label: 'Đang xử lý', cls: 'bg-primary/10 text-primary' },
  shipping: { label: 'Đang giao', cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
  completed: { label: 'Hoàn thành', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  cancelled: { label: 'Đã hủy', cls: 'bg-destructive/10 text-destructive' },
}

export const ORDERS: AdminOrder[] = [
  { id: 'DH-2841', customer: 'Trần Minh Khoa', items: 4, total: 4820000, date: '14/06/2026', status: 'pending' },
  { id: 'DH-2840', customer: 'Công ty TNHH Đại An', items: 18, total: 32400000, date: '14/06/2026', status: 'processing' },
  { id: 'DH-2839', customer: 'Lê Thị Hồng', items: 2, total: 1180000, date: '13/06/2026', status: 'shipping' },
  { id: 'DH-2838', customer: 'Phạm Quốc Huy', items: 7, total: 9650000, date: '13/06/2026', status: 'completed' },
  { id: 'DH-2837', customer: 'Nguyễn Thị Lan', items: 1, total: 285000, date: '12/06/2026', status: 'completed' },
  { id: 'DH-2836', customer: 'Võ Thành Trung', items: 5, total: 6120000, date: '12/06/2026', status: 'cancelled' },
  { id: 'DH-2835', customer: 'Đặng Văn Phúc', items: 12, total: 14700000, date: '11/06/2026', status: 'completed' },
  { id: 'DH-2834', customer: 'Bùi Mỹ Duyên', items: 3, total: 2340000, date: '11/06/2026', status: 'processing' },
]

/* --------------------------------- Users ---------------------------------- */

export type UserType = 'customer' | 'company'

export interface AdminUser {
  id: number
  name: string
  email: string
  type: UserType
  phone: string
  orders: number
  joined: string
  active: boolean
}

export const USERS: AdminUser[] = [
  { id: 1, name: 'Trần Minh Khoa', email: 'khoa.tran@gmail.com', type: 'customer', phone: '0901 284 119', orders: 12, joined: '02/2025', active: true },
  { id: 2, name: 'Vật Liệu Minh Long', email: 'lienhe@minhlong.vn', type: 'company', phone: '028 3756 1290', orders: 86, joined: '11/2024', active: true },
  { id: 3, name: 'Lê Thị Hồng', email: 'hong.le@gmail.com', type: 'customer', phone: '0938 552 740', orders: 5, joined: '06/2025', active: true },
  { id: 4, name: 'Xây Dựng Tân Phát', email: 'info@tanphat.com.vn', type: 'company', phone: '028 6285 4410', orders: 41, joined: '03/2025', active: true },
  { id: 5, name: 'Phạm Quốc Huy', email: 'huy.pham@outlook.com', type: 'customer', phone: '0976 118 203', orders: 3, joined: '01/2026', active: false },
  { id: 6, name: 'Nội Thất Gỗ Việt', email: 'xuong@goviet.vn', type: 'company', phone: '028 3993 1177', orders: 22, joined: '04/2025', active: true },
  { id: 7, name: 'Nguyễn Thị Lan', email: 'lan.nguyen@gmail.com', type: 'customer', phone: '0912 667 845', orders: 1, joined: '05/2026', active: true },
]

/* ------------------------------ Chart series ------------------------------ */

export const REVENUE_SERIES = [
  { month: 'T1', revenue: 412, orders: 184 },
  { month: 'T2', revenue: 389, orders: 167 },
  { month: 'T3', revenue: 504, orders: 221 },
  { month: 'T4', revenue: 478, orders: 205 },
  { month: 'T5', revenue: 612, orders: 268 },
  { month: 'T6', revenue: 690, orders: 312 },
]

export const CATEGORY_SHARE = [
  { name: 'Gạch ốp lát', value: 46 },
  { name: 'Sơn', value: 24 },
  { name: 'Thiết bị vệ sinh', value: 18 },
  { name: 'Vật liệu xây dựng', value: 12 },
]
