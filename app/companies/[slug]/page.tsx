'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  BadgeCheck,
  ChevronRight,
  Building2,
  Calendar,
  ShieldCheck,
  Target,
  Eye,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCompanyBySlug, companyInitials } from '@/lib/companies'

export default function CompanyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const company = getCompanyBySlug(slug)

  if (!company) {
    return (
      <div className="flex min-h-[100dvh] flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md py-20">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary">
              <Building2 className="size-7 text-muted-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">Không tìm thấy doanh nghiệp</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Doanh nghiệp này có thể đã ngừng hoạt động hoặc đường dẫn không đúng.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/companies">Xem tất cả nhà cung cấp</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const requestQuote = () =>
    toast.success('Đã gửi yêu cầu liên hệ', {
      description: `${company.name} sẽ phản hồi bạn trong thời gian sớm nhất.`,
    })

  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary/30">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/companies" className="hover:text-accent">Nhà cung cấp</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-[12rem]">{company.name}</span>
          </div>
        </div>

        {/* Cover */}
        <div className="relative h-48 lg:h-64 bg-primary">
          <Image src={company.cover} alt="" fill priority className="object-cover opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Identity header */}
          <div className="-mt-12 lg:-mt-16 relative flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="flex size-24 lg:size-28 shrink-0 items-center justify-center rounded-2xl border-4 border-background bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
              {companyInitials(company.name)}
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                  {company.name}
                </h1>
                {company.status === 'approved' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Đã xác minh
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{company.type}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{company.rating}</span>
                  <span>({company.reviewCount} đánh giá)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Thành lập {company.yearFounded}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {company.address.split(',').slice(-1)[0].trim()}
                </span>
              </div>
            </div>
            <Button
              onClick={requestQuote}
              size="lg"
              className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Liên hệ báo giá
            </Button>
          </div>

          {/* Body */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                  <TabsTrigger value="services">Dịch vụ</TabsTrigger>
                  <TabsTrigger value="projects">Dự án</TabsTrigger>
                  <TabsTrigger value="certificates">Chứng chỉ</TabsTrigger>
                </TabsList>

                {/* About */}
                <TabsContent value="about" className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {company.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <Eye className="w-5 h-5 text-accent" />
                      <h3 className="mt-3 font-semibold text-foreground">Tầm nhìn</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{company.vision}</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <Target className="w-5 h-5 text-accent" />
                      <h3 className="mt-3 font-semibold text-foreground">Sứ mệnh</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{company.mission}</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Services */}
                <TabsContent value="services" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {company.services.map((s) => (
                      <div key={s.name} className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="font-semibold text-foreground">{s.name}</h3>
                        <p className="mt-1 text-lg font-bold text-accent">{s.price}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Projects */}
                <TabsContent value="projects" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {company.projects.map((p) => (
                      <article
                        key={p.title}
                        className="group overflow-hidden rounded-2xl border border-border bg-card"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
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
                </TabsContent>

                {/* Certificates */}
                <TabsContent value="certificates" className="mt-6">
                  <div className="space-y-3">
                    {company.certificates.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                      >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                          <ShieldCheck className="w-5 h-5 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground">{c.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {c.issuedBy} · Cấp năm {c.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Contact sidebar */}
            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
                <h2 className="font-semibold text-foreground">Thông tin liên hệ</h2>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Điện thoại</p>
                      <p className="font-medium text-foreground">{company.phone}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground break-all">{company.email}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Website</p>
                      <p className="font-medium text-foreground">{company.website}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Địa chỉ</p>
                      <p className="font-medium text-foreground">{company.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Mã số thuế</p>
                      <p className="font-medium text-foreground">{company.taxCode}</p>
                    </div>
                  </li>
                </ul>
                <Button
                  onClick={requestQuote}
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Gửi yêu cầu báo giá
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Đại diện: {company.representativeName}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
