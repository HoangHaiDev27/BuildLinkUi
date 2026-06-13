'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingCart,
  Search,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import CartDrawer from './cart-drawer'
import SearchBar from './search-bar'

const materialCategories = [
  { name: 'Gạch ốp lát', sub: ['Gạch nền', 'Gạch tường', 'Gạch mosaic', 'Gạch ngoài trời'] },
  { name: 'Sơn', sub: ['Sơn nội thất', 'Sơn ngoại thất', 'Sơn chống thấm', 'Sơn epoxy'] },
  {
    name: 'Thiết bị vệ sinh',
    sub: ['Bồn cầu', 'Lavabo', 'Sen tắm', 'Bồn tắm'],
  },
  { name: 'Vật liệu xây dựng', sub: ['Xi măng', 'Cát - Đá', 'Thép xây dựng', 'Gỗ ván'] },
]

const serviceCategories = [
  { name: 'Xây nhà phố', href: '/dich-vu/xay-nha-pho' },
  { name: 'Sửa chữa chung cư', href: '/dich-vu/sua-chua-chung-cu' },
  { name: 'Thi công nội thất', href: '/dich-vu/noi-that' },
  { name: 'Chống thấm & Chống nóng', href: '/dich-vu/chong-tham' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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
                <div className="absolute top-full left-0 mt-1 w-[600px] bg-card border border-border rounded-xl shadow-xl p-6 grid grid-cols-2 gap-6">
                  {materialCategories.map((cat) => (
                    <div key={cat.name}>
                      <Link
                        href={`/danh-muc/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                        className="font-semibold text-sm text-primary mb-2 block hover:text-accent"
                      >
                        {cat.name}
                      </Link>
                      <ul className="space-y-1">
                        {cat.sub.map((s) => (
                          <li key={s}>
                            <Link
                              href={`/danh-muc/${s.toLowerCase().replace(/ /g, '-')}`}
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
                <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-xl p-4">
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
              )}
            </div>

            <Link
              href="/du-an"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
            >
              Dự án
            </Link>
            <Link
              href="/tin-tuc"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
            >
              Tin tức
            </Link>
            <Link
              href="/lien-he"
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

            <button
              className="relative p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors hidden sm:flex"
              aria-label="Thông báo"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-destructive text-destructive-foreground">
                3
              </Badge>
            </button>

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

            <Link
              href="/account"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-secondary text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Tài khoản</span>
            </Link>

            <Link href="/login" className="hidden lg:block">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Báo giá ngay
              </Button>
            </Link>

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
                href={`/danh-muc/${cat.name.toLowerCase().replace(/ /g, '-')}`}
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
            <div className="pt-4">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Báo giá ngay
                </Button>
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
