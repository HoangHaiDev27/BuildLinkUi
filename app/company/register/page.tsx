'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Users,
  FileCheck2,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { apiClient } from '@/lib/api-client'
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
} from '@/lib/validation'

const STEPS = ['Tài khoản', 'Doanh nghiệp', 'Hồ sơ pháp lý']

const BENEFITS = [
  { icon: TrendingUp, title: 'Tiếp cận khách hàng', text: 'Hiển thị sản phẩm và dịch vụ tới hàng nghìn chủ đầu tư.' },
  { icon: ShieldCheck, title: 'Hồ sơ được xác minh', text: 'Huy hiệu xác minh giúp tăng độ tin cậy với khách hàng.' },
  { icon: Users, title: 'Nhận yêu cầu báo giá', text: 'Kết nối trực tiếp với khách hàng có nhu cầu thực.' },
  { icon: FileCheck2, title: 'Quản lý tập trung', text: 'Dashboard quản lý sản phẩm, dự án và chứng chỉ.' },
]

export default function CompanyRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
    phone: '',
    companyName: '',
    taxCode: '',
    representative: '',
    address: '',
    website: '',
    description: '',
    license: '',
    profileDoc: '',
    agree: false,
  })
  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (error) setError('')
  }

  function validateStep(s: number): string {
    if (s === 0) {
      const emailErr = validateEmail(form.email)
      if (emailErr) return emailErr
      const pwErr = validatePassword(form.password)
      if (pwErr) return pwErr
      const confirmErr = validateConfirmPassword(form.password, form.confirm)
      if (confirmErr) return confirmErr
      const phoneErr = validatePhone(form.phone)
      if (phoneErr) return phoneErr
    }
    if (s === 1) {
      if (!form.companyName.trim()) return 'Vui lòng nhập tên doanh nghiệp.'
      if (form.taxCode.replace(/\D/g, '').length < 10) return 'Mã số thuế chưa hợp lệ.'
      if (!form.representative.trim()) return 'Vui lòng nhập tên người đại diện.'
      if (!form.address.trim()) return 'Vui lòng nhập địa chỉ.'
    }
    if (s === 2) {
      if (!form.license) return 'Vui lòng tải lên giấy phép kinh doanh.'
      if (!form.agree) return 'Vui lòng đồng ý với điều khoản đối tác.'
    }
    return ''
  }

  function next() {
    const err = validateStep(step)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setStep((s) => Math.min(STEPS.length - 1, s + 1))
  }

  async function handleSubmit() {
    const err = validateStep(2)
    if (err) {
      setError(err)
      return
    }
    setPending(true)
    const response = await apiClient.post('/api/Auth/register', {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirm,
      phoneNumber: form.phone,
      address: form.address,
      roleName: 'Company',
      userName: form.representative,
      companyName: form.companyName,
    })
    setPending(false)

    if (response.success) {
      // Thống nhất với luồng đăng ký cá nhân: xác thực email trước, sau đó
      // hồ sơ doanh nghiệp ở trạng thái chờ duyệt (context=company để trang
      // verify-email hiển thị đúng thông điệp).
      toast.success('Tạo tài khoản thành công', {
        description: 'Vui lòng kiểm tra email để nhận mã xác thực.',
      })
      router.push(
        `/verify-email?email=${encodeURIComponent(form.email)}&context=company`,
      )
    } else {
      setError(response.message || 'Đăng ký thất bại.')
      toast.error('Đăng ký thất bại', { description: response.message })
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary/30">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Benefits */}
          <aside className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
              <Building2 className="w-4 h-4" />
              Đối tác doanh nghiệp
            </span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Trở thành đối tác của VậtLiệu Pro
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Đăng ký gian hàng doanh nghiệp để bán vật liệu, cung cấp dịch vụ thi công và
              tiếp cận khách hàng trên toàn quốc.
            </p>
            <ul className="mt-8 space-y-5">
              {BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card border border-border">
                    <b.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">
                Chỉ cần mua hàng cá nhân?{' '}
                <Link href="/register" className="font-semibold text-accent hover:underline">
                  Đăng ký tài khoản cá nhân
                </Link>
              </p>
            </div>
          </aside>

          {/* Form card */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-6 lg:p-8">
              {/* Stepper */}
              <div className="flex items-center">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          i < step
                            ? 'bg-accent text-accent-foreground'
                            : i === step
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {i < step ? <Check className="w-4 h-4" /> : i + 1}
                      </div>
                      <span
                        className={`hidden sm:block text-sm font-medium ${
                          i <= step ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`mx-2 sm:mx-4 h-px flex-1 ${
                          i < step ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-5">
                {step === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email đăng nhập <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="congty@vidu.com"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="password">
                          Mật khẩu <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          value={form.password}
                          onChange={(e) => set('password', e.target.value)}
                          placeholder="Tối thiểu 6 ký tự"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">
                          Xác nhận mật khẩu <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="confirm"
                          type="password"
                          value={form.confirm}
                          onChange={(e) => set('confirm', e.target.value)}
                          placeholder="Nhập lại mật khẩu"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Số điện thoại <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder="0901 234 567"
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Tên doanh nghiệp <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        value={form.companyName}
                        onChange={(e) => set('companyName', e.target.value)}
                        placeholder="Công ty TNHH ..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="taxCode">
                          Mã số thuế <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="taxCode"
                          value={form.taxCode}
                          onChange={(e) => set('taxCode', e.target.value)}
                          placeholder="0312xxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="representative">
                          Người đại diện <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="representative"
                          value={form.representative}
                          onChange={(e) => set('representative', e.target.value)}
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Địa chỉ <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => set('address', e.target.value)}
                        placeholder="Số nhà, đường, quận, tỉnh/thành"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={form.website}
                        onChange={(e) => set('website', e.target.value)}
                        placeholder="congty.vn (không bắt buộc)"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="description">Giới thiệu doanh nghiệp</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                        placeholder="Lĩnh vực hoạt động, thế mạnh, kinh nghiệm..."
                      />
                    </div>
                    <FileField
                      label="Giấy phép kinh doanh"
                      required
                      value={form.license}
                      onPick={(name) => set('license', name)}
                    />
                    <FileField
                      label="Hồ sơ năng lực (không bắt buộc)"
                      value={form.profileDoc}
                      onPick={(name) => set('profileDoc', name)}
                    />
                    <label className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => set('agree', e.target.checked)}
                        className="mt-0.5 size-4 rounded border-border accent-[oklch(0.70_0.17_55)]"
                      />
                      <span className="text-sm text-muted-foreground">
                        Tôi xác nhận thông tin là chính xác và đồng ý với{' '}
                        <Link href="/contact" className="text-accent hover:underline">
                          điều khoản đối tác
                        </Link>{' '}
                        của VậtLiệu Pro.
                      </span>
                    </label>
                  </>
                )}

                {error && (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Đã có tài khoản?{' '}
                    <Link href="/login" className="text-accent hover:underline">
                      Đăng nhập
                    </Link>
                  </span>
                )}

                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={next}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Tiếp tục
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={pending}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {pending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {pending ? 'Đang gửi...' : 'Gửi hồ sơ đăng ký'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function FileField({
  label,
  value,
  onPick,
  required,
}: {
  label: string
  value: string
  onPick: (name: string) => void
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-3 transition-colors hover:border-accent">
        <Upload className="w-5 h-5 text-muted-foreground" />
        <span className={`text-sm ${value ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          {value || 'Chọn tệp PDF, JPG hoặc PNG (tối đa 10MB)'}
        </span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0]?.name ?? '')}
        />
      </label>
    </div>
  )
}
