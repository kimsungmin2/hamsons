import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { ContactButton } from "@/components/site/ContactButton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowRight,
  CalendarClock,
  Sparkles,
  Tag,
  CheckCircle2,
  Layers,
  Headphones,
  ShieldCheck,
  Boxes,
  ClipboardList,
  Search,
  FileText,
  Handshake,
  LifeBuoy,
} from "lucide-react";
import rentalHero from "@/assets/rental-hero.png";
import s590 from "@/assets/products/S590-main.png";
import e17z from "@/assets/products/E17z-main.png";
import e20z from "@/assets/products/E20z-main.png";
import e35z from "@/assets/products/E35z-main.png";
import t86 from "@/assets/products/T86-main.png";

export const Route = createFileRoute("/rental")({
  head: () => ({
    meta: [
      { title: "렌탈·신차·중고 — 함손건설기계" },
      {
        name: "description",
        content:
          "1일 단기 렌탈부터 신차 견적, 검수 완료 중고 매매까지 — 한 번의 상담으로 해결하는 프리미엄 건설장비 통합 서비스.",
      },
      { property: "og:title", content: "렌탈·신차·중고 — 함손건설기계" },
      {
        property: "og:description",
        content: "단기 렌탈 · 신차 문의 · 중고 매매를 한 곳에서. 검증된 장비, 빠른 상담.",
      },
      { property: "og:image", content: rentalHero },
    ],
  }),
  component: RentalPage,
});

// TODO: 각 장비 항목의 image 값을 실제 장비 사진 경로로 교체하세요.
const rentalEquipment = [
  {
    name: "미니 굴착기",
    model: "BOBCAT E17z",
    specs: "운전중량 1,690 kg · 버킷 0.057 ㎥ · 13.9 ps",
    available: true,
    description: "제로 테일 스윙의 1.7톤급 컴팩트 미니 굴착기.",
    image: e17z,
  },
  {
    name: "미니 굴착기",
    model: "BOBCAT E20z",
    specs: "운전중량 1,900 kg · 버킷 0.057 ㎥ · 13.8 ps",
    available: true,
    description: "도심·조경 현장에 최적화된 2톤급 제로 테일 미니 굴착기.",
    image: e20z,
  },
  {
    name: "미니 굴착기",
    model: "BOBCAT E35z",
    specs: "운전중량 3,790 kg · 버킷 0.11 ㎥ · 24.7 ps",
    available: true,
    description: "3.5톤급 제로 테일 스윙 미니 굴착기.",
    image: e35z,
  },
  {
    name: "스키드 스티어 로더",
    model: "BOBCAT S590",
    specs: "정격적재용량 953kg · 69 ps · 타이어 주행",
    available: true,
    description:
      "좁은 공간에서도 강력한 힘과 높은 인양 높이를 제공하는 바퀴형 로더. M-시리즈 대표 수직 리프트 콤팩트 스키드 로더.",
    image: s590,
  },
  {
    name: "트랙 로더",
    model: "BOBCAT T870",
    specs: "정격적재용량 2,285 kg · 101 ps · 트랙주행",
    available: true,
    description: "험지·연약 지반에서도 안정적인 견인력을 제공하는 트랙형 로더. M-시리즈 플래그십 컴팩트 트랙 로더.",
    image: t86,
  },
  {
    name: "트랙 로더",
    model: "BOBCAT T86",
    specs: "정격적재용량 2,397 kg · 106.4 ps · 트랙주행",
    available: true,
    description: "R-시리즈 플래그십 컴팩트 트랙 로더.",
    image: t86,
  },
];

const plans = [
  {
    key: "rental",
    icon: CalendarClock,
    eyebrow: "Short-term Rental",
    name: "단기 렌탈",
    tagline: "1일 단위 즉시 투입 가능한 검증된 장비.",
    points: ["1일 ~ 1개월 유연 운영", "기본 보험·점검 포함"],
  },
  {
    key: "new",
    icon: Sparkles,
    eyebrow: "New Equipment",
    name: "신차 문의",
    tagline: "최신 모델 라인업과 맞춤 견적 상담.",
    points: ["정품 신차 라인업", "맞춤 사양·견적", "전문 상담사 1:1"],
  },
  {
    key: "used",
    icon: Tag,
    eyebrow: "Certified Used",
    name: "중고 매매",
    tagline: "정밀 검수를 거친 신뢰할 수 있는 중고 장비.",
    points: ["6개월 무상 보증", "출고 전 소모품 교환"],
  },
];

const processSteps = [
  { n: "01", t: "상담 접수", d: "전화·웹 폼으로 원하는 장비와 조건을 알려주세요.", icon: ClipboardList },
  { n: "02", t: "장비 확인", d: "재고와 사양을 확인하고 가용 일정을 안내드립니다.", icon: Search },
  { n: "03", t: "조건 안내", d: "투명한 가격, 보험, 운반 조건을 함께 제안합니다.", icon: FileText },
  { n: "04", t: "계약 / 진행", d: "오프라인 계약 후 빠르게 출고 납품을 진행합니다.", icon: Handshake },
  { n: "05", t: "사후 지원", d: "운영 중 발생하는 이슈는 정비팀이 즉시 대응합니다.", icon: LifeBuoy },
];

const strengths = [
  { icon: Boxes, k: "10+", t: "다양한 장비 보유", d: "로더·굴착기·휠로더 등 다양한 모델 라인업" },
  { icon: Headphones, k: "2H", t: "빠른 상담 대응", d: "평일 평균 2시간 이내 1차 회신" },
  { icon: ShieldCheck, k: "100%", t: "신뢰할 수 있는 장비 상태", d: "출고 전 BOBcheck 항목 정밀 점검" },
  { icon: Layers, k: "3 in 1", t: "통합 문의 가능", d: "신차 · 중고 · 렌탈을 한 번의 상담으로" },
];


function RentalPage() {
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  return (
    <SiteLayout>
      <Hero />
      <Plans onOpenEquipment={() => setEquipmentOpen(true)} />
      <Process />
      <Strengths />
      <FinalCta />

      <Dialog open={equipmentOpen} onOpenChange={setEquipmentOpen}>
        <DialogContent className="max-w-3xl border-border bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">단기 렌탈 장비 정보</DialogTitle>
            <DialogDescription>현재 단기 렌탈로 운영 중인 주요 장비 목록과 제원입니다.</DialogDescription>
          </DialogHeader>
          <div className="mt-2 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
            {rentalEquipment.map((eq) => (
              <div
                key={eq.model}
                className="grid gap-4 rounded-xl border border-border/70 bg-background/40 p-5 md:grid-cols-[1fr_200px]"
              >
                <div className="order-2 md:order-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary">{eq.model}</p>
                      <h4 className="mt-1 font-display text-lg font-bold">{eq.name}</h4>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        eq.available ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {eq.available ? "렌탈 가능" : "예약 마감"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/90">{eq.specs}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{eq.description}</p>
                </div>
                <div className="order-1 overflow-hidden rounded-lg border border-border bg-[color:var(--steel)] md:order-2 aspect-[4/3] md:aspect-auto md:h-full">
                  <img
                    src={eq.image}
                    alt={`${eq.name} (${eq.model})`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <ContactButton
              onBeforeNavigate={() => setEquipmentOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 cursor-pointer"
            >
              상담신청
            </ContactButton>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={rentalHero} alt="" className="h-full w-full object-cover brightness-[0.85] contrast-[1.05]" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.70_0.20_45/0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="container-x pt-32 pb-28 md:pt-44 md:pb-40">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            Rental · New · Used
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold text-balance leading-[1.05]">
            <span className="whitespace-nowrap">다양한 현장에 필요한 장비,</span>
            <br />
            <span className="text-primary">한 번의 상담으로.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
            단기 렌탈, 신차 견적, 중고 매매까지
            <br className="hidden md:block" />
            함손건설기계는 다양한 위치에서 현장을 책임지고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function Plans({ onOpenEquipment }: { onOpenEquipment: () => void }) {
  return (
    <section id="plans" className="container-x py-24 md:py-32">
      <div className="max-w-2xl mb-14">
        <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Our Services</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">렌탈 · 신차 · 중고</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          현장에 필요한 장비를 가장 합리적인 방식으로. 세 가지 서비스를 한 번의 상담으로 안내드립니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((p, i) => (
          <Reveal key={p.key} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1 shadow-card flex flex-col">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-orange shadow-glow">
                  <p.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                  {p.eyebrow}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
              <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-5 flex-1">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {p.key === "rental" && (
                  <>
                    <button
                      type="button"
                      onClick={onOpenEquipment}
                      className="inline-flex items-center justify-center rounded-md border-2 border-border/80 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition hover:border-primary/60 hover:bg-white/[0.06]"
                    >
                      장비 정보
                    </button>
                    <ContactButton
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 cursor-pointer"
                    >
                      상담신청
                    </ContactButton>
                  </>
                )}
                {p.key === "new" && (
                  <>
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center rounded-md border-2 border-border/80 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition hover:border-primary/60 hover:bg-white/[0.06]"
                    >
                      신차 정보
                    </Link>
                    <ContactButton
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 cursor-pointer"
                    >
                      상담신청
                    </ContactButton>
                  </>
                )}
                {p.key === "used" && (
                  <>
                    <a
                      href="https://hamson.co.kr/product/list.html?cate_no=205"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border-2 border-border/80 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition hover:border-primary/60 hover:bg-white/[0.06]"
                    >
                      쇼핑몰
                    </a>
                    <ContactButton
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 cursor-pointer"
                    >
                      상담신청
                    </ContactButton>
                  </>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative border-y border-border/60 bg-surface/40">
      <div className="container-x py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">문의 절차</h2>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            상담부터 사후 지원까지, 5단계의 투명한 프로세스로 진행됩니다.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-7 hidden lg:block">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <ol className="grid gap-8 lg:grid-cols-5">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <li className="relative">
                  <div className="relative grid h-14 w-14 place-items-center rounded-full border border-border/70 bg-background font-display text-sm font-bold text-primary shadow-card">
                    {s.n}
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-primary" />
                    <h3 className="font-display text-lg font-bold">{s.t}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Why 함손건설기계</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-[1.1]">
            현장이 선택하는
            <br />
            <span className="text-primary">통합 장비 파트너.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            단순 임대를 넘어, 운영·정비·재구매까지 함께 설계합니다. 한 번의 상담으로 신차·중고·렌탈을 모두 안내받을 수
            있습니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {strengths.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card">
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-bold text-primary">{s.k}</span>
                  <s.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-x pb-28 md:pb-36">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-surface to-background p-10 md:p-16">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Get in touch</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
              원하는 장비를
              <br />
              빠르게 찾고 계신가요?
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed">
              렌탈, 신차, 중고까지 한 번에 상담받아보세요. 24시간 내 담당자가 회신드립니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
            <ContactButton
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 cursor-pointer"
            >
              상담신청
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ContactButton>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border/70 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-foreground/90 backdrop-blur transition hover:bg-white/[0.08]"
            >
              제품 라인업 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}
