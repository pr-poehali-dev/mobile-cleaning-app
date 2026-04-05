import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4311a980-3a92-4d92-b9c5-fc5498ba346b/files/00a565cd-b6c0-4d70-8626-65bac2df9775.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "orders", label: "Заказы" },
  { id: "masters", label: "Мастера" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Building2", title: "Офисный клининг", desc: "Ежедневная и генеральная уборка офисных помещений любой площади", price: "от 3 500 ₽", tag: "Популярное" },
  { icon: "Home", title: "Жилые помещения", desc: "Квартиры, дома, коттеджи. Разовая или регулярная уборка", price: "от 2 000 ₽", tag: "" },
  { icon: "Factory", title: "Промышленный клининг", desc: "Уборка складов, производственных цехов, технических помещений", price: "от 8 000 ₽", tag: "" },
  { icon: "Wrench", title: "После ремонта", desc: "Профессиональное удаление строительного мусора и пыли", price: "от 5 000 ₽", tag: "Хит" },
  { icon: "Droplets", title: "Мойка окон", desc: "Промышленный альпинизм и промывка фасадного остекления", price: "от 1 500 ₽", tag: "" },
  { icon: "Sparkles", title: "Химчистка мебели", desc: "Глубокая чистка диванов, кресел, матрасов и ковров", price: "от 1 200 ₽", tag: "" },
];

const KITCHEN_ITEMS = [
  { id: "stove", icon: "Flame", title: "Помыть плиту", desc: "Чистка конфорок, решёток, поверхности и ручек плиты", price: 800, unit: "₽" },
  { id: "oven", icon: "Square", title: "Помыть духовку", desc: "Удаление нагара с духовки, противней и стекла дверцы", price: 1200, unit: "₽" },
  { id: "microwave", icon: "Zap", title: "Помыть микроволновку", desc: "Чистка камеры, поддона и наружных поверхностей", price: 500, unit: "₽" },
];

const ORDERS = [
  { id: "ORD-2841", service: "Офисный клининг", address: "ул. Тверская, 18", date: "05 апр 2026", status: "active", master: "Елена К." },
  { id: "ORD-2835", service: "Мойка окон", address: "Ленинский пр., 45", date: "03 апр 2026", status: "done", master: "Михаил П." },
  { id: "ORD-2820", service: "После ремонта", address: "ул. Арбат, 7", date: "28 мар 2026", status: "done", master: "Ольга С." },
];

const MASTERS = [
  { name: "Елена Кузнецова", role: "Старший мастер", rating: 4.9, orders: 312, emoji: "👩" },
  { name: "Михаил Петров", role: "Мастер по окнам", rating: 4.8, orders: 241, emoji: "👨" },
  { name: "Ольга Смирнова", role: "Специалист", rating: 4.9, orders: 198, emoji: "👩‍🦱" },
  { name: "Дмитрий Волков", role: "Промышленный клининг", rating: 4.7, orders: 175, emoji: "👨‍🦲" },
];

const REVIEWS = [
  { author: "Анна Белова", company: "ООО «Техносфера»", text: "Сотрудничаем с CleanPro более двух лет. Всегда чисто, пунктуально и без лишних вопросов. Рекомендуем.", rating: 5, date: "01 апр 2026" },
  { author: "Игорь Соколов", company: "ИП Соколов", text: "Заказывал уборку после ремонта. Результат превзошёл ожидания — квартира блестит. Особую благодарность Ольге.", rating: 5, date: "25 мар 2026" },
  { author: "Марина Козлова", company: "БЦ «Меридиан»", text: "Ежедневный клининг офиса 800 м². Команда профессионалов, ответственный подход к работе.", rating: 5, date: "18 мар 2026" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "В работе", color: "bg-cyan-50 text-cyan-700 border border-cyan-200" },
  done: { label: "Выполнен", color: "bg-green-50 text-green-700 border border-green-200" },
  pending: { label: "Ожидает", color: "bg-amber-50 text-amber-700 border border-amber-200" },
};

type Section = "home" | "services" | "orders" | "masters" | "reviews" | "contacts" | "profile" | "booking";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [selectedKitchen, setSelectedKitchen] = useState<string[]>([]);

  const toggleKitchen = (id: string) => {
    setSelectedKitchen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const kitchenTotal = KITCHEN_ITEMS.filter((i) => selectedKitchen.includes(i.id))
    .reduce((sum, i) => sum + i.price, 0);

  const openKitchenBooking = () => {
    if (selectedKitchen.length === 0) return;
    const names = KITCHEN_ITEMS.filter((i) => selectedKitchen.includes(i.id)).map((i) => i.title).join(", ");
    setSelectedService(names);
    setBookingStep(2);
    setBookingSubmitted(false);
    navigate("booking");
  };

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBooking = (service = "") => {
    setSelectedService(service);
    setBookingStep(1);
    setBookingSubmitted(false);
    navigate("booking");
  };

  const handleBookingNext = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
    else setBookingSubmitted(true);
  };

  const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  return (
    <div className="min-h-screen bg-background font-ibm">
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <button onClick={() => navigate("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-navy rounded flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-teal" />
            </div>
            <span className="font-montserrat font-extrabold text-lg text-navy tracking-tight">
              Clean<span className="text-teal">Pro</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Section)}
                className={`px-4 py-2 text-sm font-montserrat font-semibold rounded transition-colors ${
                  activeSection === item.id
                    ? "text-teal bg-teal/8"
                    : "text-foreground/60 hover:text-navy hover:bg-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("profile")}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-navy border border-border rounded hover:border-navy/30 transition-all"
            >
              <Icon name="User" size={15} />
              Профиль
            </button>
            <button
              onClick={() => openBooking()}
              className="bg-navy text-white text-sm font-montserrat font-bold px-5 py-2 rounded hover:bg-navy-light transition-colors"
            >
              Заказать
            </button>
            <button className="md:hidden p-2 rounded hover:bg-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            {[...NAV_ITEMS, { id: "profile", label: "Профиль" }].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Section)}
                className="w-full text-left px-6 py-3.5 text-sm font-medium border-b border-border/40 last:border-0 hover:bg-secondary"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ═══════════════════════════════ HOME ═══════════════════════════════ */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section className="relative h-[88vh] min-h-[540px] overflow-hidden">
              <img src={HERO_IMAGE} alt="CleanPro" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,65%,10%)/95] via-[hsl(220,60%,15%)/75] to-transparent" style={{ background: "linear-gradient(90deg, rgba(10,18,40,0.93) 0%, rgba(15,28,62,0.72) 50%, transparent 100%)" }} />
              <div className="relative container mx-auto h-full flex flex-col justify-center px-4 lg:px-8">
                <div className="max-w-xl animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-0.5 bg-teal" />
                    <span className="text-teal text-xs font-montserrat font-bold uppercase tracking-[0.2em]">Профессиональный клининг</span>
                  </div>
                  <h1 className="text-white font-montserrat font-extrabold text-5xl lg:text-7xl leading-[1.05] mb-6">
                    Чистота,<br />которой<br /><span className="text-teal">доверяют</span>
                  </h1>
                  <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-sm">
                    Корпоративный и частный клининг в Москве. Более 1 200 выполненных заказов.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => openBooking()} className="bg-teal hover:bg-teal-light text-white font-montserrat font-bold px-8 py-4 rounded transition-colors">
                      Заказать уборку
                    </button>
                    <button onClick={() => navigate("services")} className="border border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 py-4 rounded transition-colors">
                      Услуги и цены
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats bar */}
            <section className="bg-navy text-white py-8">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
                  {[
                    { value: "1 200+", label: "Заказов выполнено" },
                    { value: "8 лет", label: "На рынке клининга" },
                    { value: "96%", label: "Повторных клиентов" },
                    { value: "47", label: "Специалистов в штате" },
                  ].map((s) => (
                    <div key={s.label} className="px-4">
                      <div className="font-montserrat font-extrabold text-3xl text-teal mb-1">{s.value}</div>
                      <div className="text-white/50 text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why us */}
            <section className="py-20 container mx-auto px-4 lg:px-8">
              <div className="mb-12">
                <div className="w-12 h-0.5 bg-teal mb-4" />
                <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-3">Почему выбирают нас</h2>
                <p className="text-muted-foreground">Надёжный партнёр для вашего бизнеса и дома</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: "ShieldCheck", title: "Гарантия результата", desc: "Если что-то не устраивает — возвращаемся бесплатно в течение 24 часов" },
                  { icon: "Clock", title: "Точно в срок", desc: "Приезжаем вовремя. Опоздание компенсируется скидкой на следующий заказ" },
                  { icon: "BadgeCheck", title: "Сертифицированный персонал", desc: "Все сотрудники прошли проверку и обучение по международным стандартам" },
                  { icon: "Leaf", title: "Экобезопасные средства", desc: "Сертифицированная химия, безопасная для детей и аллергиков" },
                  { icon: "Lock", title: "Договор и ответственность", desc: "Работаем официально. Несём материальную ответственность за имущество" },
                  { icon: "BarChart2", title: "Онлайн-отчётность", desc: "Фотоотчёт до и после уборки. Контролируйте качество удалённо" },
                ].map((f) => (
                  <div key={f.title} className="p-6 bg-card border border-border rounded hover:shadow-md hover:border-teal/30 transition-all group">
                    <div className="w-10 h-10 bg-navy rounded flex items-center justify-center mb-4">
                      <Icon name={f.icon} size={19} className="text-teal" />
                    </div>
                    <h3 className="font-montserrat font-bold text-navy text-base mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-navy text-white py-16">
              <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="font-montserrat font-extrabold text-2xl lg:text-3xl mb-2">Готовы к идеальной чистоте?</h2>
                  <p className="text-white/60">Рассчитаем стоимость в течение 15 минут</p>
                </div>
                <button onClick={() => openBooking()} className="bg-teal hover:bg-teal-light text-white font-montserrat font-bold px-10 py-4 rounded whitespace-nowrap transition-colors">
                  Рассчитать стоимость
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ═══════════════════════════ SERVICES ══════════════════════════════ */}
        {activeSection === "services" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in">
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-3">Наши услуги</h2>
              <p className="text-muted-foreground">Полный спектр клининговых услуг для корпоративных и частных клиентов</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s) => (
                <div key={s.title} className="bg-card border border-border rounded overflow-hidden group hover:shadow-lg hover:border-teal/30 transition-all flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-navy rounded flex items-center justify-center">
                        <Icon name={s.icon} size={22} className="text-teal" />
                      </div>
                      {s.tag && (
                        <span className="text-xs font-montserrat font-bold text-teal bg-teal/10 border border-teal/20 px-2.5 py-1 rounded-full">
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-montserrat font-bold text-navy text-lg mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-secondary/40">
                    <span className="font-montserrat font-extrabold text-navy text-lg">{s.price}</span>
                    <button onClick={() => openBooking(s.title)} className="bg-navy text-white text-sm font-montserrat font-bold px-5 py-2 rounded hover:bg-navy-light transition-colors">
                      Заказать
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Kitchen cleaning block */}
            <div className="mt-10 bg-card border border-border rounded overflow-hidden">
              <div className="bg-navy px-6 py-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal/20 rounded flex items-center justify-center">
                  <Icon name="Utensils" size={20} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-white text-lg">Кухонная техника</h3>
                  <p className="text-white/50 text-sm">Выберите одно или несколько — оплата только за выбранное</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {KITCHEN_ITEMS.map((item) => {
                    const active = selectedKitchen.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleKitchen(item.id)}
                        className={`p-5 border-2 rounded text-left transition-all relative ${
                          active
                            ? "border-teal bg-teal/5 ring-1 ring-teal"
                            : "border-border hover:border-navy/30 bg-white"
                        }`}
                      >
                        {active && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-teal rounded-full flex items-center justify-center">
                            <Icon name="Check" size={12} className="text-white" />
                          </div>
                        )}
                        <div className={`w-10 h-10 rounded flex items-center justify-center mb-3 ${active ? "bg-teal" : "bg-navy"}`}>
                          <Icon name={item.icon} size={18} className="text-white" />
                        </div>
                        <div className="font-montserrat font-bold text-navy text-sm mb-1">{item.title}</div>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3">{item.desc}</p>
                        <div className={`font-montserrat font-extrabold text-lg ${active ? "text-teal" : "text-navy"}`}>
                          {item.price} ₽
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-border">
                  <div>
                    {selectedKitchen.length > 0 ? (
                      <div>
                        <span className="text-sm text-muted-foreground">Итого за выбранное: </span>
                        <span className="font-montserrat font-extrabold text-navy text-xl">{kitchenTotal} ₽</span>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {KITCHEN_ITEMS.filter((i) => selectedKitchen.includes(i.id)).map((i) => i.title).join(" + ")}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Выберите хотя бы одну позицию</span>
                    )}
                  </div>
                  <button
                    onClick={openKitchenBooking}
                    disabled={selectedKitchen.length === 0}
                    className="bg-teal hover:bg-teal-light text-white font-montserrat font-bold px-8 py-3 rounded disabled:opacity-40 transition-colors whitespace-nowrap"
                  >
                    Заказать за {kitchenTotal > 0 ? `${kitchenTotal} ₽` : "..."}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════ ORDERS ═══════════════════════════════ */}
        {activeSection === "orders" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in">
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-3">Мои заказы</h2>
              <p className="text-muted-foreground">История и статус ваших заказов</p>
            </div>
            <div className="flex gap-3 mb-6 flex-wrap">
              {["Все заказы", "В работе", "Выполненные"].map((tab, i) => (
                <button key={tab} className={`px-4 py-2 text-sm font-montserrat font-semibold border rounded transition-all ${i === 0 ? "bg-navy text-white border-navy" : "border-border text-foreground/70 hover:border-navy/30 hover:text-navy"}`}>
                  {tab}
                </button>
              ))}
              <button onClick={() => openBooking()} className="ml-auto bg-teal text-white text-sm font-montserrat font-bold px-4 py-2 rounded hover:bg-teal-light transition-colors flex items-center gap-1.5">
                <Icon name="Plus" size={15} />
                Новый заказ
              </button>
            </div>
            <div className="space-y-3">
              {ORDERS.map((order) => {
                const st = STATUS_CONFIG[order.status];
                return (
                  <div key={order.id} className="bg-card border border-border rounded p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-sm hover:border-teal/20 transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-montserrat font-bold text-navy">{order.service}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Icon name="MapPin" size={13} />{order.address}</span>
                        <span className="flex items-center gap-1"><Icon name="Calendar" size={13} />{order.date}</span>
                        <span className="flex items-center gap-1"><Icon name="User" size={13} />{order.master}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">{order.id}</span>
                      <button className="text-sm font-semibold text-teal hover:underline">Подробнее</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ════════════════════════════ MASTERS ══════════════════════════════ */}
        {activeSection === "masters" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in">
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-3">Наши мастера</h2>
              <p className="text-muted-foreground">Сертифицированные специалисты с опытом работы</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MASTERS.map((m) => (
                <div key={m.name} className="bg-card border border-border rounded overflow-hidden text-center group hover:shadow-md hover:border-teal/30 transition-all">
                  <div className="bg-navy/5 py-8 px-4">
                    <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                      {m.emoji}
                    </div>
                    <h3 className="font-montserrat font-bold text-navy">{m.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{m.role}</p>
                  </div>
                  <div className="px-5 py-4 border-t border-border">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} name="Star" size={13} className={i < Math.floor(m.rating) ? "text-gold fill-gold" : "text-border"} />
                        ))}
                        <span className="text-navy font-montserrat font-bold text-sm ml-1.5">{m.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{m.orders} зак.</span>
                    </div>
                    <button onClick={() => openBooking()} className="w-full bg-navy text-white text-sm font-montserrat font-bold py-2 rounded hover:bg-navy-light transition-colors">
                      Выбрать мастера
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════ REVIEWS ══════════════════════════════ */}
        {activeSection === "reviews" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in">
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-3">Отзывы клиентов</h2>
              <p className="text-muted-foreground">Что говорят о нас корпоративные и частные клиенты</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {REVIEWS.map((r) => (
                <div key={r.author} className="bg-card border border-border rounded p-6 flex flex-col hover:shadow-md hover:border-teal/20 transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-foreground/75 text-sm leading-relaxed flex-1 mb-5 italic">«{r.text}»</p>
                  <div className="border-t border-border pt-4 flex justify-between items-end">
                    <div>
                      <div className="font-montserrat font-bold text-navy text-sm">{r.author}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{r.company}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-navy rounded-lg p-8 text-white text-center">
              <h3 className="font-montserrat font-bold text-xl mb-1">Общий рейтинг</h3>
              <div className="text-6xl font-montserrat font-extrabold text-teal my-3">4.9</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={22} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/50 text-sm">На основе 847 отзывов</p>
            </div>
          </section>
        )}

        {/* ═══════════════════════════ CONTACTS ══════════════════════════════ */}
        {activeSection === "contacts" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in">
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-3">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь удобным для вас способом</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00", sub: "Пн–Пт: 8:00–20:00, Сб–Вс: 9:00–18:00" },
                  { icon: "Mail", label: "Email", value: "info@cleanpro.ru", sub: "Ответим в течение 2 часов" },
                  { icon: "MapPin", label: "Офис", value: "Москва, ул. Тверская, 1", sub: "БЦ «Столица», офис 401" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-5 bg-card border border-border rounded hover:border-teal/30 transition-colors">
                    <div className="w-11 h-11 bg-navy rounded flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-teal" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5 font-montserrat font-semibold">{c.label}</div>
                      <div className="font-montserrat font-bold text-navy">{c.value}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded p-6">
                <h3 className="font-montserrat font-bold text-navy text-lg mb-5">Оставить заявку</h3>
                <div className="space-y-4">
                  {[
                    { label: "Ваше имя", type: "text", placeholder: "Иван Иванов" },
                    { label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-sm font-medium text-foreground/70 block mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-medium text-foreground/70 block mb-1.5">Сообщение</label>
                    <textarea rows={4} placeholder="Опишите вашу задачу..." className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors resize-none" />
                  </div>
                  <button className="w-full bg-navy text-white font-montserrat font-bold py-3 rounded hover:bg-navy-light transition-colors">
                    Отправить заявку
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════ PROFILE ══════════════════════════════ */}
        {activeSection === "profile" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in max-w-3xl">
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy">Личный кабинет</h2>
            </div>
            <div className="bg-card border border-border rounded p-6 mb-5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center text-3xl flex-shrink-0">👤</div>
                <div className="flex-1 min-w-0">
                  <div className="font-montserrat font-bold text-navy text-xl">Александр Новиков</div>
                  <div className="text-muted-foreground text-sm">a.novikov@company.ru</div>
                  <span className="inline-block mt-1 text-xs font-montserrat font-semibold text-teal bg-teal/10 border border-teal/20 px-2.5 py-0.5 rounded-full">Корпоративный клиент</span>
                </div>
                <button className="border border-border rounded px-3 py-1.5 text-sm flex items-center gap-1.5 hover:border-navy/40 transition-colors flex-shrink-0">
                  <Icon name="Pencil" size={13} />
                  Изменить
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label: "Всего заказов", value: "23" },
                { label: "В этом году", value: "8" },
                { label: "Бонусов", value: "1 240" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded p-4 text-center">
                  <div className="font-montserrat font-extrabold text-2xl text-teal mb-1">{s.value}</div>
                  <div className="text-muted-foreground text-sm">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded divide-y divide-border">
              {[
                { icon: "ClipboardList", label: "Мои заказы", action: () => navigate("orders") },
                { icon: "Bell", label: "Уведомления", action: () => {} },
                { icon: "CreditCard", label: "Способы оплаты", action: () => {} },
                { icon: "Settings", label: "Настройки аккаунта", action: () => {} },
              ].map((item) => (
                <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary transition-colors">
                  <Icon name={item.icon} size={17} className="text-muted-foreground" />
                  <span className="font-medium text-navy">{item.label}</span>
                  <Icon name="ChevronRight" size={16} className="ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════ BOOKING ══════════════════════════════ */}
        {activeSection === "booking" && (
          <section className="container mx-auto px-4 lg:px-8 py-14 animate-fade-in max-w-2xl">
            <button onClick={() => navigate("services")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy mb-6 transition-colors">
              <Icon name="ArrowLeft" size={16} />
              Назад к услугам
            </button>

            <div className="mb-8">
              <div className="w-12 h-0.5 bg-teal mb-4" />
              <h2 className="font-montserrat font-extrabold text-3xl text-navy mb-1">Онлайн-бронирование</h2>
              <p className="text-muted-foreground">Оформите заявку за 3 простых шага</p>
            </div>

            {/* Progress steps */}
            <div className="flex items-center mb-8">
              {["Услуга", "Дата и время", "Контакты"].map((step, i) => (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-montserrat font-bold border-2 transition-all ${
                      bookingStep > i + 1 ? "bg-teal border-teal text-white" :
                      bookingStep === i + 1 ? "bg-navy border-navy text-white" :
                      "border-border text-muted-foreground bg-white"
                    }`}>
                      {bookingStep > i + 1 ? <Icon name="Check" size={14} /> : i + 1}
                    </div>
                    <span className={`text-sm font-montserrat font-semibold hidden sm:inline ${bookingStep === i + 1 ? "text-navy" : "text-muted-foreground"}`}>
                      {step}
                    </span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-px mx-3 transition-colors ${bookingStep > i + 1 ? "bg-teal" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            {!bookingSubmitted ? (
              <div className="bg-card border border-border rounded p-6">
                {/* Step 1 — choose service */}
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-montserrat font-bold text-navy text-lg">Выберите услугу</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES.map((s) => (
                        <button
                          key={s.title}
                          onClick={() => setSelectedService(s.title)}
                          className={`p-4 border rounded text-left transition-all ${
                            selectedService === s.title
                              ? "border-teal bg-teal/5 ring-1 ring-teal"
                              : "border-border hover:border-navy/30"
                          }`}
                        >
                          <div className="font-montserrat font-bold text-navy text-sm mb-0.5">{s.title}</div>
                          <div className="text-teal font-semibold text-sm">{s.price}</div>
                        </button>
                      ))}
                    </div>
                    <button onClick={handleBookingNext} disabled={!selectedService} className="w-full bg-navy text-white font-montserrat font-bold py-3 rounded disabled:opacity-40 hover:bg-navy-light transition-colors">
                      Далее →
                    </button>
                  </div>
                )}

                {/* Step 2 — date & time */}
                {bookingStep === 2 && (
                  <div className="space-y-5">
                    <h3 className="font-montserrat font-bold text-navy text-lg">Выберите дату и время</h3>
                    <div>
                      <label className="text-sm font-medium text-foreground/70 block mb-2">Дата</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70 block mb-2">Удобное время</label>
                      <div className="grid grid-cols-3 gap-2">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`py-2.5 border rounded text-sm font-montserrat font-bold transition-all ${
                              selectedTime === t
                                ? "border-teal bg-teal/5 text-teal ring-1 ring-teal"
                                : "border-border hover:border-navy/30 text-navy"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(1)} className="flex-1 border border-border text-navy font-montserrat font-semibold py-3 rounded hover:border-navy/40 transition-colors">
                        ← Назад
                      </button>
                      <button onClick={handleBookingNext} disabled={!selectedDate || !selectedTime} className="flex-1 bg-navy text-white font-montserrat font-bold py-3 rounded disabled:opacity-40 hover:bg-navy-light transition-colors">
                        Далее →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 — contacts */}
                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-montserrat font-bold text-navy text-lg">Контактные данные</h3>
                    <div className="bg-secondary rounded p-4 text-sm space-y-1">
                      <div className="font-montserrat font-semibold text-navy mb-1">Ваш заказ</div>
                      <div className="text-muted-foreground">Услуга: <span className="text-foreground font-medium">{selectedService}</span></div>
                      <div className="text-muted-foreground">Дата: <span className="text-foreground font-medium">{selectedDate}</span></div>
                      <div className="text-muted-foreground">Время: <span className="text-foreground font-medium">{selectedTime}</span></div>
                    </div>
                    {[
                      { label: "Имя", type: "text", placeholder: "Иван Иванов" },
                      { label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                      { label: "Адрес объекта", type: "text", placeholder: "ул. Тверская, 1, кв. 10" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-sm font-medium text-foreground/70 block mb-1.5">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors" />
                      </div>
                    ))}
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setBookingStep(2)} className="flex-1 border border-border text-navy font-montserrat font-semibold py-3 rounded hover:border-navy/40 transition-colors">
                        ← Назад
                      </button>
                      <button onClick={handleBookingNext} className="flex-1 bg-teal hover:bg-teal-light text-white font-montserrat font-bold py-3 rounded transition-colors">
                        Оформить заказ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card border border-teal/30 rounded p-12 text-center">
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-teal" />
                </div>
                <h3 className="font-montserrat font-extrabold text-navy text-2xl mb-2">Заявка принята!</h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Наш менеджер свяжется с вами в течение 15 минут для подтверждения деталей.</p>
                <button onClick={() => navigate("orders")} className="bg-navy text-white font-montserrat font-bold px-8 py-3 rounded hover:bg-navy-light transition-colors">
                  Перейти к заказам
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-navy text-white mt-16 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 justify-between pb-8 border-b border-white/10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-teal/20 rounded flex items-center justify-center">
                  <Icon name="Sparkles" size={16} className="text-teal" />
                </div>
                <span className="font-montserrat font-extrabold text-lg">Clean<span className="text-teal">Pro</span></span>
              </div>
              <p className="text-white/45 text-sm leading-relaxed">Профессиональный клининг для бизнеса и частных лиц. Москва и область.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {[
                { title: "Услуги", links: ["Офисный клининг", "Жилые помещения", "После ремонта", "Мойка окон"] },
                { title: "Компания", links: ["О нас", "Мастера", "Отзывы", "Контакты"] },
                { title: "Контакты", links: ["+7 (495) 000-00-00", "info@cleanpro.ru", "Пн–Вс: 8:00–20:00", "Москва"] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="font-montserrat font-bold text-white/70 uppercase tracking-widest text-xs mb-3">{col.title}</div>
                  {col.links.map((l) => (
                    <div key={l} className="text-white/45 hover:text-teal transition-colors py-0.5 cursor-pointer">{l}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
            <span>© 2026 CleanPro. Все права защищены.</span>
            <span>Политика конфиденциальности · Договор оферты</span>
          </div>
        </div>
      </footer>
    </div>
  );
}