'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Loader2,
  Facebook,
  Youtube,
  MessageCircle,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INFO = [
  { icon: Phone, label: 'Hotline', value: '1800 123 456', sub: 'Miễn phí cuộc gọi' },
  { icon: Mail, label: 'Email', value: 'info@vatlieupro.vn', sub: 'Phản hồi trong 24h' },
  { icon: MapPin, label: 'Showroom', value: '123 Nguyễn Huệ, Q.1', sub: 'TP. Hồ Chí Minh' },
  { icon: Clock, label: 'Giờ làm việc', value: '8:00 - 18:00', sub: 'Thứ 2 đến Chủ nhật' },
]

const SUBJECTS = ['Tư vấn vật liệu', 'Báo giá thi công', 'Hợp tác đại lý', 'Khác']

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  function validate() {
    if (!name.trim()) return 'Vui lòng nhập họ tên.'
    if (!EMAIL_RE.test(email)) return 'Email chưa hợp lệ.'
    if (phone.replace(/\D/g, '').length < 9) return 'Số điện thoại chưa hợp lệ.'
    if (!message.trim()) return 'Vui lòng nhập nội dung cần tư vấn.'
    return ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    setError('')
    setPending(true)
    // Mo phong gui yeu cau - ket noi API lien he khi backend san sang.
    await new Promise((r) => setTimeout(r, 900))
    setPending(false)
    toast.success('Đã gửi yêu cầu', {
      description: 'Đội ngũ VậtLiệu Pro sẽ liên hệ với bạn trong thời gian sớm nhất.',
    })
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setSubject(SUBJECTS[0])
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Liên hệ</span>
          </div>
        </div>

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 lg:pt-14 pb-8">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Liên hệ với VậtLiệu Pro
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Cần tư vấn vật liệu hay báo giá thi công? Để lại thông tin, đội ngũ chuyên gia
            của chúng tôi sẽ đồng hành cùng bạn.
          </p>
        </section>

        {/* Info cards */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFO.map((i) => (
              <div key={i.label} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                  <i.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{i.label}</p>
                <p className="mt-0.5 font-semibold text-foreground">{i.value}</p>
                <p className="text-xs text-muted-foreground">{i.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form + map */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-6 lg:p-8">
              <h2 className="text-xl font-bold text-foreground">Gửi yêu cầu tư vấn</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Các trường có dấu <span className="text-destructive">*</span> là bắt buộc.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Họ và tên <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (error) setError('')
                      }}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Số điện thoại <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (error) setError('')
                      }}
                      placeholder="0901 234 567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="email@vidu.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chủ đề</Label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                          subject === s
                            ? 'border-accent bg-accent text-accent-foreground'
                            : 'border-border text-foreground hover:border-accent'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Nội dung <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="Mô tả nhu cầu vật liệu hoặc công trình của bạn..."
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={pending}
                  className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {pending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {pending ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </Button>
              </form>
            </div>

            {/* Map + socials */}
            <div className="lg:col-span-2 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-border">
                <div className="relative aspect-[4/3] bg-secondary">
                  <Image
                    src="https://picsum.photos/seed/buildlink-map/800/600"
                    alt="Bản đồ showroom VậtLiệu Pro"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-md">
                      <MapPin className="w-4 h-4 text-accent" />
                      123 Nguyễn Huệ, Q.1
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Kết nối với chúng tôi</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Theo dõi để cập nhật sản phẩm và ưu đãi mới nhất.
                </p>
                <div className="mt-4 flex gap-3">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Youtube, label: 'Youtube' },
                    { icon: MessageCircle, label: 'Zalo' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      className="flex size-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
