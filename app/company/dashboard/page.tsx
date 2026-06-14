'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  LayoutDashboard,
  Building2,
  Package,
  Wrench,
  FolderKanban,
  ShieldCheck,
  Inbox,
  Star,
  Eye,
  TrendingUp,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  X,
  BadgeCheck,
  MapPin,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { COMPANIES, companyInitials } from '@/lib/companies'
import { PRODUCTS } from '@/lib/catalog'

const COMPANY = COMPANIES[0]

type SectionId =
  | 'overview'
  | 'profile'
  | 'products'
  | 'services'
  | 'projects'
  | 'certificates'
  | 'quotes'

const NAV: { id: SectionId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'profile', label: 'Hồ sơ công ty', icon: Building2 },
  { id: 'products', label: 'Sản phẩm', icon: Package },
  { id: 'services', label: 'Gói dịch vụ', icon: Wrench },
  { id: 'projects', label: 'Dự án', icon: FolderKanban },
  { id: 'certificates', label: 'Chứng chỉ', icon: ShieldCheck },
  { id: 'quotes', label: 'Yêu cầu báo giá', icon: Inbox },
]

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

interface QuoteRequest {
  id: number
  customer: string
  subject: string
  date: string
  status: 'new' | 'replied' | 'closed'
}

const INITIAL_QUOTES: QuoteRequest[] = [
  { id: 1, customer: 'Trần Minh Khoa', subject: 'Báo giá gạch granite 80x80 cho biệt thự', date: '14/06/2026', status: 'new' },
  { id: 2, customer: 'Công ty TNHH Đại An', subject: 'Cung cấp 500m² gạch lát sàn', date: '12/06/2026', status: 'new' },
  { id: 3, customer: 'Lê Thị Hồng', subject: 'Tư vấn ốp lát phòng tắm', date: '09/06/2026', status: 'replied' },
  { id: 4, customer: 'Phạm Quốc Huy', subject: 'Đặt đá marble cầu thang', date: '02/06/2026', status: 'closed' },
]

const QUOTE_STATUS: Record<QuoteRequest['status'], { label: string; cls: string }> = {
  new: { label: 'Mới', cls: 'bg-accent/15 text-accent' },
  replied: { label: 'Đã phản hồi', cls: 'bg-primary/10 text-primary' },
  closed: { label: 'Đã đóng', cls: 'bg-secondary text-muted-foreground' },
}

export default function CompanyDashboardPage() {
  const [section, setSection] = useState<SectionId>('overview')

  // Stateful collections (mock-backed, local edits)
  const [products, setProducts] = useState(
    PRODUCTS.filter((p) => p.categorySlug === 'gach-op-lat').slice(0, 4),
  )
  const [services, setServices] = useState(COMPANY.services)
  const [projects, setProjects] = useState(COMPANY.projects)
  const [certificates, setCertificates] = useState(COMPANY.certificates)
  const [quotes, setQuotes] = useState(INITIAL_QUOTES)

  const newQuotes = quotes.filter((q) => q.status === 'new').length

  const stats = [
    { icon: Package, label: 'Sản phẩm', value: products.length },
    { icon: Inbox, label: 'Yêu cầu mới', value: newQuotes },
    { icon: Eye, label: 'Lượt xem hồ sơ', value: '3.482' },
    { icon: Star, label: 'Đánh giá', value: COMPANY.rating },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary/30">
      <Navbar />

      <main className="flex-1">
        {/* Dashboard header */}
        <div className="border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                {companyInitials(COMPANY.name)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-bold text-foreground">{COMPANY.name}</h1>
                  {COMPANY.status === 'approved' && (
                    <BadgeCheck className="w-4 h-4 text-accent" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{COMPANY.type}</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href={`/companies/${COMPANY.slug}`}>
                Xem trang công khai
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8">
          {/* Sidebar / mobile tabs */}
          <nav className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
              {NAV.map((n) => {
                const active = section === n.id
                return (
                  <li key={n.id} className="shrink-0">
                    <button
                      onClick={() => setSection(n.id)}
                      className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <n.icon className="w-4 h-4 shrink-0" />
                      {n.label}
                      {n.id === 'quotes' && newQuotes > 0 && (
                        <span
                          className={`ml-auto hidden lg:flex size-5 items-center justify-center rounded-full text-[11px] font-bold ${
                            active ? 'bg-primary-foreground text-primary' : 'bg-accent text-accent-foreground'
                          }`}
                        >
                          {newQuotes}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Content */}
          <div className="min-w-0">
            {section === 'overview' && (
              <Overview
                stats={stats}
                quotes={quotes}
                onGo={setSection}
              />
            )}
            {section === 'profile' && <ProfileForm />}
            {section === 'products' && (
              <ProductsSection products={products} setProducts={setProducts} />
            )}
            {section === 'services' && (
              <ServicesSection services={services} setServices={setServices} />
            )}
            {section === 'projects' && (
              <ProjectsSection projects={projects} setProjects={setProjects} />
            )}
            {section === 'certificates' && (
              <CertificatesSection certificates={certificates} setCertificates={setCertificates} />
            )}
            {section === 'quotes' && <QuotesSection quotes={quotes} setQuotes={setQuotes} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ----------------------------- Section header ----------------------------- */

function SectionHead({
  title,
  desc,
  action,
}: {
  title: string
  desc: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      {action}
    </div>
  )
}

/* -------------------------------- Overview -------------------------------- */

function Overview({
  stats,
  quotes,
  onGo,
}: {
  stats: { icon: typeof LayoutDashboard; label: string; value: string | number }[]
  quotes: QuoteRequest[]
  onGo: (s: SectionId) => void
}) {
  return (
    <div className="space-y-6">
      {COMPANY.status === 'approved' ? (
        <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
          <BadgeCheck className="w-5 h-5 text-accent shrink-0" />
          <p className="text-sm text-foreground">
            Hồ sơ doanh nghiệp đã được xác minh. Gian hàng của bạn đang hiển thị công khai.
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="size-2 rounded-full bg-accent" />
          <p className="text-sm text-foreground">Hồ sơ đang chờ duyệt. Chúng tôi sẽ phản hồi sớm.</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <s.icon className="w-5 h-5 text-accent" />
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent quotes */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Yêu cầu báo giá gần đây</h3>
            <button
              onClick={() => onGo('quotes')}
              className="text-sm font-medium text-accent hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {quotes.slice(0, 3).map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{q.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {q.customer} · {q.date}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${QUOTE_STATUS[q.status].cls}`}
                >
                  {QUOTE_STATUS[q.status].label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile completion */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Hoàn thiện hồ sơ</h3>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">80%</p>
          <Progress value={80} className="mt-2" />
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" /> Thông tin cơ bản
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" /> Giấy phép kinh doanh
            </li>
            <li className="flex items-center gap-2">
              <span className="size-4 rounded-full border border-border" /> Thêm logo công ty
            </li>
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => onGo('profile')}
          >
            Cập nhật hồ sơ
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- Profile form ------------------------------ */

function ProfileForm() {
  const [form, setForm] = useState({
    name: COMPANY.name,
    taxCode: COMPANY.taxCode,
    representative: COMPANY.representativeName,
    phone: COMPANY.phone,
    email: COMPANY.email,
    website: COMPANY.website,
    address: COMPANY.address,
    description: COMPANY.description,
    vision: COMPANY.vision,
    mission: COMPANY.mission,
  })
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div>
      <SectionHead title="Hồ sơ công ty" desc="Thông tin hiển thị trên trang công khai của bạn." />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.success('Đã lưu hồ sơ', { description: 'Thông tin công ty đã được cập nhật.' })
        }}
        className="space-y-6"
      >
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h3 className="font-semibold text-foreground">Thông tin doanh nghiệp</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Tên công ty" value={form.name} onChange={(v) => set('name', v)} />
            <Field label="Mã số thuế" value={form.taxCode} onChange={(v) => set('taxCode', v)} />
            <Field label="Người đại diện" value={form.representative} onChange={(v) => set('representative', v)} />
            <Field label="Điện thoại" value={form.phone} onChange={(v) => set('phone', v)} />
            <Field label="Email" value={form.email} onChange={(v) => set('email', v)} />
            <Field label="Website" value={form.website} onChange={(v) => set('website', v)} />
          </div>
          <Field label="Địa chỉ" value={form.address} onChange={(v) => set('address', v)} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h3 className="font-semibold text-foreground">Giới thiệu</h3>
          <div className="space-y-2">
            <Label htmlFor="desc">Mô tả công ty</Label>
            <Textarea
              id="desc"
              rows={4}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="vision">Tầm nhìn</Label>
              <Textarea id="vision" rows={3} value={form.vision} onChange={(e) => set('vision', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission">Sứ mệnh</Label>
              <Textarea id="mission" rows={3} value={form.mission} onChange={(e) => set('mission', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

/* --------------------------- Generic add dialog --------------------------- */

interface FieldDef {
  key: string
  label: string
  placeholder?: string
  type?: 'text' | 'textarea'
}

function AddItemDialog({
  title,
  fields,
  onAdd,
}: {
  title: string
  fields: FieldDef[]
  onAdd: (values: Record<string, string>) => void
}) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})

  const submit = () => {
    if (fields.some((f) => !values[f.key]?.trim())) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    onAdd(values)
    setValues({})
    setOpen(false)
    toast.success('Đã thêm thành công')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="w-4 h-4" />
          Thêm mới
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              {f.type === 'textarea' ? (
                <Textarea
                  id={f.key}
                  rows={3}
                  placeholder={f.placeholder}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              ) : (
                <Input
                  id={f.key}
                  placeholder={f.placeholder}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Hủy</Button>
          </DialogClose>
          <Button onClick={submit} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------- Products -------------------------------- */

function ProductsSection({
  products,
  setProducts,
}: {
  products: typeof PRODUCTS
  setProducts: React.Dispatch<React.SetStateAction<typeof PRODUCTS>>
}) {
  const remove = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast.success('Đã xóa sản phẩm')
  }

  return (
    <div>
      <SectionHead
        title="Sản phẩm"
        desc="Quản lý các sản phẩm doanh nghiệp đang kinh doanh."
        action={
          <AddItemDialog
            title="Thêm sản phẩm"
            fields={[
              { key: 'name', label: 'Tên sản phẩm', placeholder: 'Gạch granite 60x60' },
              { key: 'price', label: 'Giá', placeholder: '285000' },
              { key: 'unit', label: 'Đơn vị', placeholder: 'm²' },
            ]}
            onAdd={(v) =>
              setProducts((prev) => [
                {
                  ...prev[0],
                  id: Date.now(),
                  name: v.name,
                  price: Number(v.price.replace(/\D/g, '')) || 0,
                  unit: v.unit,
                  slug: `san-pham-${Date.now()}`,
                },
                ...prev,
              ])
            }
          />
        }
      />
      {products.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="divide-y divide-border">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                </div>
                <div className="hidden sm:block text-sm font-semibold text-accent">
                  {formatPrice(p.price)}/{p.unit}
                </div>
                <Badge variant={p.inStock ? 'secondary' : 'destructive'} className="hidden sm:inline-flex text-xs">
                  {p.inStock ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
                <button
                  onClick={() => remove(p.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState text="Chưa có sản phẩm nào. Thêm sản phẩm đầu tiên của bạn." />
      )}
    </div>
  )
}

/* -------------------------------- Services -------------------------------- */

function ServicesSection({
  services,
  setServices,
}: {
  services: typeof COMPANY.services
  setServices: React.Dispatch<React.SetStateAction<typeof COMPANY.services>>
}) {
  const remove = (name: string) => {
    setServices((prev) => prev.filter((s) => s.name !== name))
    toast.success('Đã xóa gói dịch vụ')
  }
  return (
    <div>
      <SectionHead
        title="Gói dịch vụ"
        desc="Các gói dịch vụ doanh nghiệp cung cấp cho khách hàng."
        action={
          <AddItemDialog
            title="Thêm gói dịch vụ"
            fields={[
              { key: 'name', label: 'Tên gói', placeholder: 'Thi công trọn gói' },
              { key: 'price', label: 'Giá', placeholder: 'Từ 5.000.000đ' },
              { key: 'description', label: 'Mô tả', type: 'textarea', placeholder: 'Mô tả ngắn về gói dịch vụ' },
            ]}
            onAdd={(v) => setServices((prev) => [{ name: v.name, price: v.price, description: v.description }, ...prev])}
          />
        }
      />
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.name} className="relative rounded-2xl border border-border bg-card p-6">
              <button
                onClick={() => remove(s.name)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-destructive"
                aria-label="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <h3 className="font-semibold text-foreground pr-6">{s.name}</h3>
              <p className="mt-1 text-lg font-bold text-accent">{s.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="Chưa có gói dịch vụ nào." />
      )}
    </div>
  )
}

/* -------------------------------- Projects -------------------------------- */

function ProjectsSection({
  projects,
  setProjects,
}: {
  projects: typeof COMPANY.projects
  setProjects: React.Dispatch<React.SetStateAction<typeof COMPANY.projects>>
}) {
  const remove = (title: string) => {
    setProjects((prev) => prev.filter((p) => p.title !== title))
    toast.success('Đã xóa dự án')
  }
  return (
    <div>
      <SectionHead
        title="Dự án"
        desc="Portfolio các công trình tiêu biểu đã thực hiện."
        action={
          <AddItemDialog
            title="Thêm dự án"
            fields={[
              { key: 'title', label: 'Tên dự án', placeholder: 'Nhà phố 3 tầng' },
              { key: 'location', label: 'Địa điểm', placeholder: 'Quận 7, TP.HCM' },
              { key: 'year', label: 'Năm', placeholder: '2026' },
            ]}
            onAdd={(v) =>
              setProjects((prev) => [
                {
                  title: v.title,
                  location: v.location,
                  year: v.year,
                  image: `https://picsum.photos/seed/buildlink-proj-${Date.now()}/1000/750`,
                },
                ...prev,
              ])
            }
          />
        }
      />
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
                <button
                  onClick={() => remove(p.title)}
                  className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground hover:text-destructive"
                  aria-label="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.location}
                  </span>
                  <span>{p.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState text="Chưa có dự án nào trong portfolio." />
      )}
    </div>
  )
}

/* ------------------------------ Certificates ------------------------------ */

function CertificatesSection({
  certificates,
  setCertificates,
}: {
  certificates: typeof COMPANY.certificates
  setCertificates: React.Dispatch<React.SetStateAction<typeof COMPANY.certificates>>
}) {
  const remove = (name: string) => {
    setCertificates((prev) => prev.filter((c) => c.name !== name))
    toast.success('Đã xóa chứng chỉ')
  }
  return (
    <div>
      <SectionHead
        title="Chứng chỉ"
        desc="Giấy chứng nhận và năng lực giúp tăng độ tin cậy."
        action={
          <AddItemDialog
            title="Thêm chứng chỉ"
            fields={[
              { key: 'name', label: 'Tên chứng chỉ', placeholder: 'ISO 9001:2015' },
              { key: 'issuedBy', label: 'Đơn vị cấp', placeholder: 'Bureau Veritas' },
              { key: 'year', label: 'Năm cấp', placeholder: '2024' },
            ]}
            onAdd={(v) =>
              setCertificates((prev) => [
                { name: v.name, issuedBy: v.issuedBy, year: v.year },
                ...prev,
              ])
            }
          />
        }
      />
      {certificates.length > 0 ? (
        <div className="space-y-3">
          {certificates.map((c) => (
            <div key={c.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">{c.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.issuedBy} · Cấp năm {c.year}
                </p>
              </div>
              <button
                onClick={() => remove(c.name)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="Chưa có chứng chỉ nào." />
      )}
    </div>
  )
}

/* -------------------------------- Quotes ---------------------------------- */

function QuotesSection({
  quotes,
  setQuotes,
}: {
  quotes: QuoteRequest[]
  setQuotes: React.Dispatch<React.SetStateAction<QuoteRequest[]>>
}) {
  const setStatus = (id: number, status: QuoteRequest['status'], msg: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))
    toast.success(msg)
  }

  return (
    <div>
      <SectionHead title="Yêu cầu báo giá" desc="Các yêu cầu khách hàng gửi đến doanh nghiệp." />
      {quotes.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card divide-y divide-border">
          {quotes.map((q) => (
            <div key={q.id} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{q.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {q.customer} · {q.date}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${QUOTE_STATUS[q.status].cls}`}
              >
                {QUOTE_STATUS[q.status].label}
              </span>
              {q.status === 'new' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setStatus(q.id, 'replied', 'Đã phản hồi yêu cầu')}
                  >
                    <Check className="w-3.5 h-3.5" />
                    Phản hồi
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatus(q.id, 'closed', 'Đã đóng yêu cầu')}
                  >
                    <X className="w-3.5 h-3.5" />
                    Đóng
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="Chưa có yêu cầu báo giá nào." />
      )}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-14 text-center">
      <Inbox className="mb-3 size-7 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
