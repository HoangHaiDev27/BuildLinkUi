'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ShoppingCart,
  Search,
  Bell,
  Menu,
  ChevronDown,
  Phone,
  MapPin,
  LogOut,
  Package,
  Heart,
  LayoutDashboard,
  Building2,
  Inbox,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { initialsFrom } from '@/lib/auth'
import CartDrawer from './cart-drawer'
import SearchBar from './search-bar'

const materialCategories = [
  { name: 'Gạch ốp lát', slug: 'gach-op-lat', sub: ['Gạch nền', 'Gạch tường', 'Gạch mosaic', 'Gạch ngoài trời'] },
  { name: 'Sơn', slug: 'son', sub: ['Sơn nội thất', 'Sơn ngoại thất', 'Sơn chống thấm', 'Sơn epoxy'] },
  {
    name: 'Thiết bị vệ sinh',
    slug: 'thiet-bi-ve-sinh',
    sub: ['Bồn cầu', 'Lavabo', 'Sen tắm', 'Bồn tắm'],
  },
  { name: 'Vật liệu xây dựng', slug: 'vat-lieu-xay-dung', sub: ['Xi măng', 'Cát - Đá', 'Thép xây dựng', 'Gỗ ván'] },
]

const serviceCategories = [
  { name: 'Xây nhà phố', href: '/services/xay-nha-pho' },
  { name: 'Sửa chữa chung cư', href: '/services/sua-chua-chung-cu' },
  { name: 'Thi công nội thất', href: '/services/noi-that' },
  { name: 'Chống thấm & Chống nóng', href: '/services/chong-tham' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const router = useRouter()
  const { user, isAuthenticated, ready, logout } = useAuth()
  const isCompany = user?.accountType?.toLowerCase() === 'company'
  const isAdmin = user?.roles?.some((r) => r.toLowerCase() === 'admin') ?? false
  const accountHref = isCompany ? '/company/dashboard' : '/account'

  async function handleLogout() {
    await logout()
    setMobileOpen(false)
    toast.success('Đã đăng xuất', {
      description: 'Hẹn gặp lại bạn tại VậtLiệu Pro.',
    })
    router.push('/')
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            Hotline: 1800 123 456 (Miễn phí)
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Showroom: 123 Nguyễn Huệ, Q.1, TP.HCM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Giao hàng toàn quốc</span>
          <span>|</span>
          <span>Tư vấn 24/7</span>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">VL</span>
            </div>
            <span className="font-bold text-lg text-primary hidden sm:block">
              VậtLiệu<span className="text-accent">Pro</span>
            </span>
          </Link>

          {/* Desktop mega menu */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {/* Vật liệu dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen('vlieu')}
              onMouseLeave={() => setMegaOpen(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors">
                Vật liệu
                <ChevronDown className="w-4 h-4" />
              </button>
              {megaOpen === 'vlieu' && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-[600px] bg-card border border-border rounded-xl shadow-xl p-6 grid grid-cols-2 gap-6">
                    {materialCategories.map((cat) => (
                      <div key={cat.name}>
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="font-semibold text-sm text-primary mb-2 block hover:text-accent"
                        >
                          {cat.name}
                        </Link>
                        <ul className="space-y-1">
                          {cat.sub.map((s) => (
                            <li key={s}>
                              <Link
                                href={`/categories/${cat.slug}`}
                                className="text-sm text-muted-foreground hover:text-accent"
                              >
                                {s}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dịch vụ dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen('dichvu')}
              onMouseLeave={() => setMegaOpen(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors">
                Dịch vụ thi công
                <ChevronDown className="w-4 h-4" />
              </button>
              {megaOpen === 'dichvu' && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-card border border-border rounded-xl shadow-xl p-4">
                    <ul className="space-y-1">
                      {serviceCategories.map((s) => (
                        <li key={s.name}>
                          <Link
                            href={s.href}
                            className="block px-3 py-2 text-sm text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/companies"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
            >
              Nhà cung cấp
            </Link>
            <Link
              href="/projects"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
            >
              Dự án
            </Link>
            <Link
              href="/news"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
            >
              Tin tức
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
            >
              Liên hệ
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications only matter for a signed-in account */}
            {isAuthenticated && (
              <button
                className="relative p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors hidden sm:flex"
                aria-label="Thông báo"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-destructive text-destructive-foreground">
                  3
                </Badge>
              </button>
            )}

            {/* Cart is only meaningful for a signed-in account */}
            {isAuthenticated && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">
                  2
                </Badge>
              </button>
            )}

            {/* Auth zone: keep width stable before the client knows the state */}
            {!ready ? (
              <div className="ml-1 h-9 w-9 rounded-full bg-secondary animate-pulse" aria-hidden />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-2 ring-offset-card focus-visible:ring-2 focus-visible:ring-ring transition-transform active:scale-[0.96]"
                    aria-label="Tài khoản của tôi"
                  >
                    <Avatar className="size-9 border border-border">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                        {initialsFrom(user.displayName, user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {user.displayName}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground truncate">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="text-accent" />
                        Trang quản trị
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isCompany ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/company/dashboard">
                          <LayoutDashboard className="text-muted-foreground" />
                          Trang quản lý
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/company/dashboard">
                          <Building2 className="text-muted-foreground" />
                          Hồ sơ công ty
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/company/dashboard">
                          <Inbox className="text-muted-foreground" />
                          Yêu cầu báo giá
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/account">
                          <LayoutDashboard className="text-muted-foreground" />
                          Tài khoản của tôi
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account">
                          <Package className="text-muted-foreground" />
                          Đơn hàng của tôi
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account">
                          <Heart className="text-muted-foreground" />
                          Sản phẩm yêu thích
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(e) => {
                      e.preventDefault()
                      void handleLogout()
                    }}
                  >
                    <LogOut />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link href="/register">Đăng ký</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Search overlay */}
      <SearchBar open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle className="text-left">
              VậtLiệu<span className="text-accent">Pro</span>
            </SheetTitle>
          </SheetHeader>
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 pt-2 pb-1">
              Vật liệu
            </p>
            {materialCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/categories/${cat.slug}`}
                className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 pt-4 pb-1">
              Dịch vụ
            </p>
            {serviceCategories.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {s.name}
              </Link>
            ))}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 pt-4 pb-1">
              Khác
            </p>
            {[
              { name: 'Nhà cung cấp', href: '/companies' },
              { name: 'Dự án', href: '/projects' },
              { name: 'Tin tức', href: '/news' },
              { name: 'Liên hệ', href: '/contact' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.name}
              </Link>
            ))}
            {ready && isAuthenticated && user ? (
              <div className="pt-4 mt-2 border-t border-border space-y-1">
                <div className="flex items-center gap-3 px-2 py-3">
                  <Avatar className="size-10 border border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {initialsFrom(user.displayName, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                  >
                    <Shield className="w-4 h-4 text-accent" />
                    Trang quản trị
                  </Link>
                )}
                {isCompany ? (
                  <>
                    <Link
                      href="/company/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                      Trang quản lý
                    </Link>
                    <Link
                      href="/company/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Hồ sơ công ty
                    </Link>
                    <Link
                      href="/company/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                    >
                      <Inbox className="w-4 h-4 text-muted-foreground" />
                      Yêu cầu báo giá
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                      Tài khoản của tôi
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                    >
                      <Package className="w-4 h-4 text-muted-foreground" />
                      Đơn hàng của tôi
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
                    >
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      Sản phẩm yêu thích
                    </Link>
                  </>
                )}
                <button
                  onClick={() => void handleLogout()}
                  className="w-full flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-2 border-t border-border grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
