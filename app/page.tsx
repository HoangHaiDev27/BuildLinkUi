import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { apiClient } from "@/lib/api-client";
import {
  Building2,
  Hammer,
  Package,
  Shield,
  ArrowRight,
  Star,
  Check,
  Phone,
} from "lucide-react";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Gạch men lát sàn 60x60cm",
    brand: "Viglacera",
    price: 185000,
    unit: "m²",
    size: "60x60cm",
    image: "/images/tile-gach-01.jpg",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    slug: "gach-men-lat-san-60x60",
  },
  {
    id: 2,
    name: "Gạch granite 80x80cm",
    brand: "Đồng Tâm",
    price: 320000,
    unit: "m²",
    size: "80x80cm",
    image: "/images/tile-gach-02.jpg",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    isNew: true,
    slug: "gach-granite-80x80",
  },
  {
    id: 3,
    name: "Gạch giả gỗ 20x120cm",
    brand: "Prime",
    price: 245000,
    unit: "m²",
    size: "20x120cm",
    image: "/images/tile-gach-03.jpg",
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    slug: "gach-gia-go-20x120",
  },
  {
    id: 4,
    name: "Sơn ngoài nhà Dulux 18L",
    brand: "Dulux",
    price: 1200000,
    originalPrice: 1350000,
    unit: "thùng",
    size: "18 lít",
    image: "/images/paint-son-01.jpg",
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    isSale: true,
    slug: "son-dulux-ngoai-that-18l",
  },
];

const SERVICES = [
  {
    icon: Building2,
    title: "Xây dựng & Sửa chữa",
    description:
      "Xây mới và cải tạo nhà ở với đội thợ có chứng chỉ, giám sát công trình tận nơi.",
    span: "md:col-span-2",
    tone: "image" as const,
    image: "/images/case-study-02.jpg",
  },
  {
    icon: Hammer,
    title: "Hoàn thiện nội thất",
    description:
      "Trang trí và lắp đặt vật liệu hoàn thiện theo đúng bản vẽ thiết kế.",
    span: "md:col-span-1",
    tone: "navy" as const,
  },
  {
    icon: Package,
    title: "Cung cấp vật liệu",
    description: "Gạch, sơn, thiết bị vệ sinh chính hãng, giao tận công trình.",
    span: "md:col-span-1",
    tone: "accent" as const,
  },
  {
    icon: Shield,
    title: "Bảo hành & Hỗ trợ",
    description:
      "Cam kết bảo hành rõ ràng và hỗ trợ kỹ thuật sau khi bàn giao công trình.",
    span: "md:col-span-2",
    tone: "secondary" as const,
  },
];

const WHY_CHOOSE = [
  {
    title: "Kinh nghiệm lâu năm",
    desc: "Hơn 10 năm hoạt động trong lĩnh vực xây dựng và nội thất",
  },
  {
    title: "Đội ngũ chuyên nghiệp",
    desc: "Các thợ lành nghề có chứng chỉ và kinh nghiệm phong phú",
  },
  {
    title: "Vật liệu chất lượng",
    desc: "Sử dụng vật liệu chính hãng từ các thương hiệu uy tín",
  },
  {
    title: "Giá cạnh tranh",
    desc: "Báo giá minh bạch, cạnh tranh nhất trên thị trường",
  },
];

const TESTIMONIALS = [
  {
    name: "Nguyễn Thị Mỹ Duyên",
    role: "Chủ nhà, Quận 7",
    content:
      "Đội thi công đúng hẹn, dọn dẹp sạch sẽ sau mỗi ngày. Nội thất nhà mình hoàn thiện đẹp hơn cả kỳ vọng.",
    rating: 5,
  },
  {
    name: "Trần Quốc Bảo",
    role: "Chủ đầu tư",
    content:
      "Báo giá rõ ràng từng hạng mục, không phát sinh. Tiến độ đúng cam kết, chắc chắn sẽ hợp tác tiếp.",
    rating: 5,
  },
  {
    name: "Lê Hồng Cẩm",
    role: "Kiến trúc sư",
    content:
      "Thợ tay nghề tốt, bám sát bản vẽ. Vài chi tiết cần nhắc lại nhưng đội xử lý rất nhanh.",
    rating: 4,
  },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5 text-balance">
                  Vật liệu xây dựng & hoàn thiện nội thất{" "}
                  <span className="text-accent">trọn gói</span>
                </h1>
                <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-[48ch]">
                  Vật liệu chính hãng và đội thi công chuyên nghiệp cho mọi công
                  trình nhà ở của bạn.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/products">
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Xem sản phẩm
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="#dich-vu">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-white/10"
                    >
                      Xem dịch vụ
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative h-72 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/service-hero.jpg"
                  alt="Dịch vụ hoàn thiện nội thất"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section — bento */}
        <section id="dich-vu" className="py-16 lg:py-20 bg-card scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Dịch vụ của chúng tôi
              </h2>
              <p className="text-muted-foreground">
                Giải pháp toàn diện cho mọi nhu cầu xây dựng và cải tạo nhà ở.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                if (s.tone === "image") {
                  return (
                    <div
                      key={s.title}
                      className={`relative ${s.span} rounded-xl overflow-hidden min-h-[220px] flex`}
                    >
                      <Image
                        src={s.image!}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/70" />
                      <div className="relative z-10 p-6 flex flex-col justify-end text-primary-foreground">
                        <Icon
                          className="w-9 h-9 text-accent mb-3"
                          strokeWidth={1.5}
                        />
                        <h3 className="text-xl font-semibold mb-1">
                          {s.title}
                        </h3>
                        <p className="text-sm text-primary-foreground/85 max-w-md">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  );
                }
                const tone =
                  s.tone === "navy"
                    ? "bg-primary text-primary-foreground"
                    : s.tone === "accent"
                    ? "bg-accent/10 border border-accent/20 text-foreground"
                    : "bg-secondary text-foreground";
                const descColor =
                  s.tone === "navy"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground";
                return (
                  <div
                    key={s.title}
                    className={`${s.span} ${tone} rounded-xl p-6 flex flex-col min-h-[220px]`}
                  >
                    <Icon
                      className="w-9 h-9 text-accent mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className={`text-sm ${descColor}`}>{s.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Sản phẩm nổi bật
                </h2>
                <p className="text-muted-foreground">
                  Những sản phẩm được ưa chuộng nhất của chúng tôi
                </p>
              </div>
              <Link href="/products" className="shrink-0">
                <Button variant="outline" className="gap-2">
                  Xem tất cả
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/case-study-01.jpg"
                  alt="Dự án hoàn thiện nội thất"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Tại sao chọn chúng tôi?
                </h2>

                <div className="space-y-4">
                  {WHY_CHOOSE.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials — featured + stack */}
        <section className="py-16 lg:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Đánh giá từ khách hàng
              </h2>
              <p className="text-muted-foreground">
                Phản hồi thực tế từ các khách hàng đã thi công cùng chúng tôi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Featured */}
              <figure className="lg:col-span-5 bg-secondary rounded-xl p-8 flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(TESTIMONIALS[0].rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 flex-1">
                  “{TESTIMONIALS[0].content}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent/15 text-accent font-semibold flex items-center justify-center">
                    {initialsOf(TESTIMONIALS[0].name)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {TESTIMONIALS[0].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {TESTIMONIALS[0].role}
                    </p>
                  </div>
                </figcaption>
              </figure>

              {/* Stack */}
              <div className="lg:col-span-7 divide-y divide-border">
                {TESTIMONIALS.slice(1).map((t) => (
                  <figure key={t.name} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-4">
                      “{t.content}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/15 text-accent text-sm font-semibold flex items-center justify-center">
                        {initialsOf(t.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Liên hệ ngay hôm nay để nhận tư vấn miễn phí và báo giá chi tiết
              cho công trình của bạn.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Báo giá ngay
                </Button>
              </Link>
              <a href="tel:19001234">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-white/10"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Gọi hotline 1900 1234
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
