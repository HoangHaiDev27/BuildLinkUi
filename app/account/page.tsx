"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  LayoutDashboard,
  Package,
  FileText,
  MapPin,
  Heart,
  ShieldCheck,
  Bell,
  LogOut,
  ChevronRight,
  Camera,
  Pencil,
  Plus,
  Star,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Home,
  Building2,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  ShoppingCart,
  BadgeCheck,
  Gift,
  Monitor,
  Smartphone,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/*  Mock data - swap for real API once account endpoints exist on the backend  */
/* -------------------------------------------------------------------------- */

const USER = {
  fullName: "Trần Minh Khoa",
  firstName: "Khoa",
  email: "khoa.tran@gmail.com",
  phone: "0903 271 845",
  birthday: "1990-07-14",
  gender: "nam",
  tier: "Thành viên Vàng",
  joined: "Tháng 3, 2023",
  points: 2450,
  nextTier: "Bạch Kim",
  pointsToNext: 3000,
  initials: "MK",
};

type OrderStatus = "processing" | "shipping" | "completed" | "cancelled";

const ORDER_STATUS: Record<
  OrderStatus,
  { label: string; cls: string; Icon: typeof Clock }
> = {
  processing: {
    label: "Đang xử lý",
    cls: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20",
    Icon: Clock,
  },
  shipping: {
    label: "Đang giao",
    cls: "bg-accent/15 text-accent border-accent/30 dark:bg-accent/15 dark:text-accent",
    Icon: Truck,
  },
  completed: {
    label: "Hoàn thành",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    Icon: CheckCircle2,
  },
  cancelled: {
    label: "Đã hủy",
    cls: "bg-destructive/10 text-destructive border-destructive/20",
    Icon: XCircle,
  },
};

const ORDERS: {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { name: string; brand: string; qty: string; seed: string }[];
}[] = [
  {
    id: "VL-2406-0847",
    date: "08/06/2026",
    status: "shipping",
    total: 12450000,
    items: [
      { name: "Gạch granite 80x80cm", brand: "Đồng Tâm", qty: "40 m²", seed: "granite-tile" },
      { name: "Keo dán gạch cao cấp", brand: "Weber", qty: "12 bao", seed: "tile-adhesive" },
    ],
  },
  {
    id: "VL-2405-0712",
    date: "21/05/2026",
    status: "completed",
    total: 3280000,
    items: [
      { name: "Sơn nội thất Maxilite 18L", brand: "Dulux", qty: "2 thùng", seed: "paint-bucket" },
    ],
  },
  {
    id: "VL-2404-0588",
    date: "03/04/2026",
    status: "completed",
    total: 28900000,
    items: [
      { name: "Bộ thiết bị vệ sinh AC-959", brand: "INAX", qty: "1 bộ", seed: "bathroom-set" },
      { name: "Sen cây nóng lạnh", brand: "INAX", qty: "2 cái", seed: "shower-head" },
    ],
  },
  {
    id: "VL-2403-0421",
    date: "12/03/2026",
    status: "cancelled",
    total: 1150000,
    items: [
      { name: "Xi măng PCB40", brand: "Hà Tiên", qty: "20 bao", seed: "cement-bag" },
    ],
  },
];

type QuoteStatus = "surveying" | "quoted" | "completed";

const QUOTE_STATUS: Record<QuoteStatus, { label: string; cls: string }> = {
  surveying: {
    label: "Đang khảo sát",
    cls: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20",
  },
  quoted: {
    label: "Đã báo giá",
    cls: "bg-accent/15 text-accent border-accent/30",
  },
  completed: {
    label: "Hoàn thành",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
};

const QUOTES: {
  id: string;
  service: string;
  location: string;
  date: string;
  status: QuoteStatus;
  amount?: number;
}[] = [
  {
    id: "BG-2406-031",
    service: "Xây nhà phố 3 tầng, diện tích 4x18m",
    location: "P. Long Thạnh Mỹ, TP. Thủ Đức",
    date: "06/06/2026",
    status: "surveying",
  },
  {
    id: "BG-2405-018",
    service: "Chống thấm sân thượng 62m²",
    location: "Chung cư Sunrise, Q.7, TP.HCM",
    date: "19/05/2026",
    status: "quoted",
    amount: 24500000,
  },
  {
    id: "BG-2404-009",
    service: "Thi công nội thất căn hộ 75m²",
    location: "Vinhomes Grand Park, TP. Thủ Đức",
    date: "02/04/2026",
    status: "completed",
    amount: 186000000,
  },
];

const ADDRESSES: {
  id: number;
  label: string;
  kind: "home" | "site";
  name: string;
  phone: string;
  detail: string;
  isDefault: boolean;
}[] = [
  {
    id: 1,
    label: "Nhà riêng",
    kind: "home",
    name: "Trần Minh Khoa",
    phone: "0903 271 845",
    detail: "245/12 Lê Văn Việt, P. Tăng Nhơn Phú A, TP. Thủ Đức, TP.HCM",
    isDefault: true,
  },
  {
    id: 2,
    label: "Công trình",
    kind: "site",
    name: "Trần Minh Khoa",
    phone: "0938 540 192",
    detail: "Lô B12, KDC Hưng Phú, P. Phước Long B, TP. Thủ Đức, TP.HCM",
    isDefault: false,
  },
];

const WISHLIST: {
  id: number;
  name: string;
  brand: string;
  price: number;
  unit: string;
  seed: string;
  inStock: boolean;
}[] = [
  { id: 1, name: "Gạch men lát sàn 60x60cm", brand: "Viglacera", price: 185000, unit: "m²", seed: "matte-tile", inStock: true },
  { id: 2, name: "Sơn ngoại thất Weathershield 18L", brand: "Dulux", price: 2150000, unit: "thùng", seed: "exterior-paint", inStock: true },
  { id: 3, name: "Bồn cầu hai khối AC-602", brand: "INAX", price: 3490000, unit: "bộ", seed: "toilet-unit", inStock: false },
  { id: 4, name: "Thép hộp mạ kẽm 40x80", brand: "Hòa Phát", price: 92000, unit: "cây", seed: "steel-box", inStock: true },
];

const SESSIONS = [
  { id: 1, device: "Chrome trên Windows", place: "TP. Hồ Chí Minh", time: "Đang hoạt động", current: true, Icon: Monitor },
  { id: 2, device: "Safari trên iPhone 15", place: "TP. Hồ Chí Minh", time: "2 ngày trước", current: false, Icon: Smartphone },
];

const SECTIONS = [
  { id: "overview", label: "Tổng quan", Icon: LayoutDashboard },
  { id: "profile", label: "Hồ sơ của tôi", Icon: User },
  { id: "orders", label: "Đơn hàng", Icon: Package, count: ORDERS.length },
  { id: "quotes", label: "Yêu cầu báo giá", Icon: FileText, count: QUOTES.length },
  { id: "addresses", label: "Địa chỉ", Icon: MapPin },
  { id: "wishlist", label: "Sản phẩm yêu thích", Icon: Heart, count: WISHLIST.length },
  { id: "security", label: "Bảo mật", Icon: ShieldCheck },
  { id: "notifications", label: "Thông báo", Icon: Bell },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const vnd = (n: number) => n.toLocaleString("vi-VN") + "₫";
const thumb = (seed: string, s = 96) =>
  `https://picsum.photos/seed/buildlink-${seed}/${s}/${s}`;

function SectionTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

const Panel = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-xl border border-border bg-card text-card-foreground ${className}`}
  >
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AccountPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [active, setActive] = useState<SectionId>("overview");

  async function handleLogout() {
    await logout();
    toast.success("Đã đăng xuất", {
      description: "Hẹn gặp lại bạn tại VậtLiệu Pro.",
    });
    router.push("/login");
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary/30">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-medium text-foreground">Tài khoản của tôi</span>
          </nav>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
            {/* ---------------------------- Sidebar ---------------------------- */}
            <aside className="space-y-4">
              {/* User card */}
              <Panel className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 ring-2 ring-accent/30">
                    <AvatarFallback className="bg-primary text-base font-bold text-primary-foreground">
                      {USER.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {USER.fullName}
                    </p>
                    <Badge className="mt-1 gap-1 bg-accent text-accent-foreground">
                      <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                      {USER.tier}
                    </Badge>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Điểm tích lũy</span>
                  <span className="font-semibold text-foreground">
                    {USER.points.toLocaleString("vi-VN")} điểm
                  </span>
                </div>
              </Panel>

              {/* Nav */}
              <Panel className="p-2">
                <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
                  {SECTIONS.map((s) => {
                    const isActive = active === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActive(s.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors lg:w-full ${
                          isActive
                            ? "bg-accent/10 font-semibold text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <s.Icon
                          className={`h-[18px] w-[18px] ${
                            isActive ? "text-accent" : ""
                          }`}
                          strokeWidth={1.75}
                        />
                        <span className="whitespace-nowrap">{s.label}</span>
                        {"count" in s && s.count ? (
                          <span
                            className={`ml-auto hidden rounded-full px-2 py-0.5 text-xs lg:inline ${
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {s.count}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </nav>
                <Separator className="my-1.5" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  Đăng xuất
                </button>
              </Panel>
            </aside>

            {/* ---------------------------- Content ---------------------------- */}
            <section className="min-w-0">
              {active === "overview" && <OverviewPanel onJump={setActive} />}
              {active === "profile" && <ProfilePanel />}
              {active === "orders" && <OrdersPanel />}
              {active === "quotes" && <QuotesPanel />}
              {active === "addresses" && <AddressesPanel />}
              {active === "wishlist" && <WishlistPanel />}
              {active === "security" && <SecurityPanel onLogout={handleLogout} />}
              {active === "notifications" && <NotificationsPanel />}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Overview                                                                   */
/* -------------------------------------------------------------------------- */

function OverviewPanel({ onJump }: { onJump: (id: SectionId) => void }) {
  const stats = [
    { label: "Tổng đơn hàng", value: ORDERS.length, Icon: Package, target: "orders" as const },
    { label: "Đang giao", value: ORDERS.filter((o) => o.status === "shipping").length, Icon: Truck, target: "orders" as const },
    { label: "Yêu cầu báo giá", value: QUOTES.length, Icon: FileText, target: "quotes" as const },
    { label: "Sản phẩm yêu thích", value: WISHLIST.length, Icon: Heart, target: "wishlist" as const },
  ];
  const pct = Math.round((USER.points / USER.pointsToNext) * 100);
  const remaining = USER.pointsToNext - USER.points;

  return (
    <div className="space-y-6">
      <SectionTitle
        title={`Xin chào, ${USER.firstName}`}
        description={`Thành viên từ ${USER.joined}. Cảm ơn bạn đã đồng hành cùng VậtLiệu Pro.`}
        action={
          <Button variant="outline" onClick={() => onJump("profile")}>
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
            Chỉnh sửa hồ sơ
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onJump(s.target)}
            className="group rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-accent/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <s.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Loyalty */}
      <Panel className="overflow-hidden">
        <div className="flex items-start gap-4 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Gift className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <p className="font-semibold text-foreground">
                Hạng {USER.tier.replace("Thành viên ", "")}
              </p>
              <p className="text-sm text-muted-foreground">
                {USER.points.toLocaleString("vi-VN")} / {USER.pointsToNext.toLocaleString("vi-VN")} điểm
              </p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Còn {remaining.toLocaleString("vi-VN")} điểm để lên hạng{" "}
              <span className="font-medium text-foreground">{USER.nextTier}</span>.
            </p>
          </div>
        </div>
      </Panel>

      {/* Recent orders */}
      <Panel>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-semibold text-foreground">Đơn hàng gần đây</h3>
          <button
            type="button"
            onClick={() => onJump("orders")}
            className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <ul className="divide-y divide-border">
          {ORDERS.slice(0, 3).map((o) => {
            const st = ORDER_STATUS[o.status];
            return (
              <li key={o.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Package className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    #{o.id}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {o.date} · {o.items.length} sản phẩm
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {vnd(o.total)}
                  </p>
                  <Badge variant="outline" className={`mt-0.5 gap-1 ${st.cls}`}>
                    <st.Icon className="h-3 w-3" strokeWidth={2} />
                    {st.label}
                  </Badge>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Profile (Hồ sơ)                                                            */
/* -------------------------------------------------------------------------- */

function ProfilePanel() {
  const [form, setForm] = useState({
    fullName: USER.fullName,
    phone: USER.phone,
    birthday: USER.birthday,
    gender: USER.gender,
  });
  const [pending, setPending] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      toast.success("Đã lưu hồ sơ", {
        description: "Thông tin cá nhân của bạn đã được cập nhật.",
      });
    }, 900);
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Hồ sơ của tôi"
        description="Quản lý thông tin cá nhân để bảo mật tài khoản."
      />

      <Panel className="p-5 sm:p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-2 ring-accent/30">
              <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">
                {USER.initials}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              aria-label="Đổi ảnh đại diện"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-accent text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
            >
              <Camera className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          <div>
            <p className="font-semibold text-foreground">{USER.fullName}</p>
            <p className="text-sm text-muted-foreground">
              JPG hoặc PNG, tối đa 2MB.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={USER.email}
                readOnly
                className="cursor-not-allowed bg-secondary/50 pr-28 text-muted-foreground"
              />
              <Badge
                variant="outline"
                className="absolute right-2 top-1/2 -translate-y-1/2 gap-1 border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
              >
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                Đã xác minh
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday">Ngày sinh</Label>
            <Input
              id="birthday"
              type="date"
              value={form.birthday}
              onChange={(e) => set("birthday", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính</Label>
            <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
              <SelectTrigger id="gender" className="w-full">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nam">Nam</SelectItem>
                <SelectItem value="nu">Nữ</SelectItem>
                <SelectItem value="khac">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <p className="text-sm text-muted-foreground">
              Thành viên từ{" "}
              <span className="font-medium text-foreground">{USER.joined}</span>
            </p>
          </div>

          <div className="flex gap-3 pt-1 sm:col-span-2">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setForm({
                  fullName: USER.fullName,
                  phone: USER.phone,
                  birthday: USER.birthday,
                  gender: USER.gender,
                })
              }
            >
              Hủy
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Orders                                                                     */
/* -------------------------------------------------------------------------- */

const ORDER_FILTERS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "processing", label: "Đang xử lý" },
  { id: "shipping", label: "Đang giao" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã hủy" },
];

function OrdersPanel() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const list =
    filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Đơn hàng của tôi"
        description="Theo dõi tình trạng và lịch sử mua hàng của bạn."
      />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ORDER_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              filter === f.id
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          Icon={Package}
          title="Không có đơn hàng nào"
          desc="Bạn chưa có đơn hàng ở trạng thái này."
        />
      ) : (
        <div className="space-y-4">
          {list.map((o) => {
            const st = ORDER_STATUS[o.status];
            return (
              <Panel key={o.id}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      #{o.id}
                    </span>
                    <span className="text-xs text-muted-foreground">{o.date}</span>
                  </div>
                  <Badge variant="outline" className={`gap-1 ${st.cls}`}>
                    <st.Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    {st.label}
                  </Badge>
                </div>

                <ul className="divide-y divide-border">
                  {o.items.map((it) => (
                    <li key={it.name} className="flex items-center gap-4 px-5 py-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb(it.seed)}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {it.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{it.brand}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{it.qty}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
                  <div className="text-sm text-muted-foreground">
                    Tổng cộng:{" "}
                    <span className="text-base font-bold text-foreground">
                      {vnd(o.total)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                    {o.status === "completed" ? (
                      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Star className="h-4 w-4" strokeWidth={1.75} />
                        Đánh giá
                      </Button>
                    ) : o.status === "cancelled" ? (
                      <Button size="sm" variant="secondary">
                        Mua lại
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Truck className="h-4 w-4" strokeWidth={1.75} />
                        Theo dõi
                      </Button>
                    )}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quotes (Yêu cầu báo giá)                                                   */
/* -------------------------------------------------------------------------- */

function QuotesPanel() {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Yêu cầu báo giá"
        description="Các yêu cầu thi công và báo giá dịch vụ của bạn."
        action={
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4" strokeWidth={2} />
            Tạo yêu cầu mới
          </Button>
        }
      />

      <div className="space-y-4">
        {QUOTES.map((q) => {
          const st = QUOTE_STATUS[q.status];
          return (
            <Panel key={q.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      #{q.id}
                    </span>
                    <span className="text-xs text-muted-foreground">{q.date}</span>
                  </div>
                  <p className="font-semibold text-foreground">{q.service}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {q.location}
                  </p>
                </div>
                <Badge variant="outline" className={st.cls}>
                  {st.label}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                {q.amount ? (
                  <div className="text-sm text-muted-foreground">
                    Mức báo giá:{" "}
                    <span className="text-base font-bold text-accent">
                      {vnd(q.amount)}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Đội ngũ đang khảo sát và sẽ liên hệ trong 24 giờ.
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Xem chi tiết
                  </Button>
                  {q.status === "quoted" && (
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Chấp nhận báo giá
                    </Button>
                  )}
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Addresses                                                                  */
/* -------------------------------------------------------------------------- */

function AddressesPanel() {
  const [defaultId, setDefaultId] = useState(
    ADDRESSES.find((a) => a.isDefault)?.id ?? ADDRESSES[0].id,
  );

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Địa chỉ giao hàng"
        description="Quản lý địa chỉ nhận hàng và công trình của bạn."
        action={
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4" strokeWidth={2} />
            Thêm địa chỉ
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ADDRESSES.map((a) => {
          const isDefault = a.id === defaultId;
          return (
            <Panel key={a.id} className="flex flex-col p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  {a.kind === "home" ? (
                    <Home className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Building2 className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </span>
                <span className="font-semibold text-foreground">{a.label}</span>
                {isDefault && (
                  <Badge variant="outline" className="gap-1 border-accent/30 bg-accent/15 text-accent">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                    Mặc định
                  </Badge>
                )}
              </div>

              <p className="text-sm font-medium text-foreground">{a.name}</p>
              <p className="text-sm text-muted-foreground">{a.phone}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {a.detail}
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Pencil className="h-4 w-4" strokeWidth={1.75} />
                  Sửa
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                  Xóa
                </Button>
                {!isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDefaultId(a.id);
                      toast.success("Đã đặt làm địa chỉ mặc định");
                    }}
                    className="ml-auto text-accent hover:bg-accent/10 hover:text-accent"
                  >
                    Đặt mặc định
                  </Button>
                )}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Wishlist                                                                   */
/* -------------------------------------------------------------------------- */

function WishlistPanel() {
  const [items, setItems] = useState(WISHLIST);

  function remove(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Đã xóa khỏi danh sách yêu thích");
  }

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Sản phẩm yêu thích"
        description="Những sản phẩm bạn đã lưu để mua sau."
      />

      {items.length === 0 ? (
        <EmptyState
          Icon={Heart}
          title="Danh sách trống"
          desc="Hãy lưu lại những sản phẩm bạn quan tâm để xem lại nhanh hơn."
          action={
            <Link href="/products">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Khám phá sản phẩm
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <Panel key={p.id} className="group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb(p.seed, 480)}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  aria-label="Bỏ yêu thích"
                  className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-destructive shadow-sm backdrop-blur transition-colors hover:bg-card"
                >
                  <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                </button>
                {!p.inStock && (
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-foreground/80 px-2 py-0.5 text-xs font-medium text-background">
                    Tạm hết hàng
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-muted-foreground">{p.brand}</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-medium text-foreground">
                  {p.name}
                </p>
                <p className="mt-2 text-base font-bold text-foreground">
                  {vnd(p.price)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}/ {p.unit}
                  </span>
                </p>
                <Button
                  size="sm"
                  disabled={!p.inStock}
                  className="mt-3 w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
                  {p.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                </Button>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Security                                                                   */
/* -------------------------------------------------------------------------- */

function SecurityPanel({ onLogout }: { onLogout: () => void }) {
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.next.length < 8) {
      setError("Mật khẩu mới cần tối thiểu 8 ký tự.");
      return;
    }
    if (pw.next !== pw.confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setError("");
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setPw({ current: "", next: "", confirm: "" });
      toast.success("Đã cập nhật mật khẩu", {
        description: "Lần đăng nhập tới hãy dùng mật khẩu mới.",
      });
    }, 900);
  }

  const fields: { key: keyof typeof pw; label: string }[] = [
    { key: "current", label: "Mật khẩu hiện tại" },
    { key: "next", label: "Mật khẩu mới" },
    { key: "confirm", label: "Xác nhận mật khẩu mới" },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Bảo mật tài khoản"
        description="Cập nhật mật khẩu và quản lý các thiết bị đăng nhập."
      />

      {/* Change password */}
      <Panel className="p-5 sm:p-6">
        <h3 className="font-semibold text-foreground">Đổi mật khẩu</h3>
        <form onSubmit={submit} className="mt-4 max-w-md space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              <div className="relative">
                <Input
                  id={f.key}
                  type={show[f.key] ? "text" : "password"}
                  value={pw[f.key]}
                  placeholder="••••••••"
                  className="pr-10"
                  onChange={(e) => {
                    setPw((p) => ({ ...p, [f.key]: e.target.value }));
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, [f.key]: !s[f.key] }))}
                  aria-label={show[f.key] ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {show[f.key] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              "Cập nhật mật khẩu"
            )}
          </Button>
        </form>
      </Panel>

      {/* Sessions */}
      <Panel>
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h3 className="font-semibold text-foreground">Thiết bị đăng nhập</h3>
        </div>
        <ul className="divide-y divide-border">
          {SESSIONS.map((s) => (
            <li key={s.id} className="flex items-center gap-4 px-5 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <s.Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{s.device}</p>
                <p className="text-xs text-muted-foreground">
                  {s.place} · {s.time}
                </p>
              </div>
              {s.current ? (
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Thiết bị này
                </Badge>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Đăng xuất
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Notifications                                                              */
/* -------------------------------------------------------------------------- */

const NOTI_DEFAULTS = [
  { id: "orders", title: "Cập nhật đơn hàng", desc: "Trạng thái giao hàng và xác nhận đơn.", on: true },
  { id: "quotes", title: "Báo giá & tư vấn", desc: "Phản hồi yêu cầu báo giá thi công.", on: true },
  { id: "promo", title: "Khuyến mãi qua email", desc: "Ưu đãi, voucher và sản phẩm mới.", on: false },
  { id: "sms", title: "Thông báo qua SMS", desc: "Tin nhắn nhắc lịch và giao hàng.", on: true },
];

function NotificationsPanel() {
  const [prefs, setPrefs] = useState(NOTI_DEFAULTS);

  function toggle(id: string) {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, on: !p.on } : p)),
    );
  }

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Cài đặt thông báo"
        description="Chọn loại thông báo bạn muốn nhận từ VậtLiệu Pro."
      />

      <Panel>
        <ul className="divide-y divide-border">
          {prefs.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
              <Switch checked={p.on} onCheckedChange={() => toggle(p.id)} />
            </li>
          ))}
        </ul>
      </Panel>

      <div>
        <Button
          onClick={() => toast.success("Đã lưu cài đặt thông báo")}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared: Empty state                                                        */
/* -------------------------------------------------------------------------- */

function EmptyState({
  Icon,
  title,
  desc,
  action,
}: {
  Icon: typeof Package;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <Panel className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <p className="mt-4 font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{desc}</p>
      {action && <div className="mt-5">{action}</div>}
    </Panel>
  );
}
