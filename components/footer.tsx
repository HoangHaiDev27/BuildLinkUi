import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Youtube, MessageCircle } from 'lucide-react'

const footerLinks = {
  'Vật liệu': ['Gạch ốp lát', 'Sơn', 'Thiết bị vệ sinh', 'Vật liệu xây dựng', 'Phụ kiện'],
  'Dịch vụ': ['Xây nhà phố', 'Sửa chữa chung cư', 'Thi công nội thất', 'Chống thấm'],
  'Hỗ trợ': ['Hướng dẫn mua hàng', 'Chính sách bảo hành', 'Giao hàng & Lắp đặt', 'Câu hỏi thường gặp'],
  'Công ty': ['Giới thiệu', 'Dự án tiêu biểu', 'Tin tức', 'Tuyển dụng'],
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">VL</span>
              </div>
              <span className="font-bold text-xl">
                VậtLiệu<span className="text-accent">Pro</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
              Đơn vị cung cấp vật liệu xây dựng và thi công trọn gói uy tín tại TP.HCM. Chất lượng
              đảm bảo, giá cạnh tranh, giao hàng nhanh toàn quốc.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>1800 123 456 (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@vatlieupro.vn</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>123 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-3 text-primary-foreground">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2025 VậtLiệu Pro. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Zalo"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
