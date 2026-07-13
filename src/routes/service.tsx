import { createFileRoute } from "@tanstack/react-router";
import { ContactButton } from "@/components/site/ContactButton";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import serviceHero from "@/assets/service-section.png";
import {
  Wrench,
  Siren,
  Cog,
  Activity,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  Package,
  Plus,
  Minus,
  PhoneCall,
} from "lucide-react";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "서비스·정비 — 함손건설기계" },
      {
        name: "description",
        content:
          "정기 점검부터 24시간 긴급 출장 정비, 순정 부품 교체, 장비 진단까지 — 현장의 가동률을 책임지는 프리미엄 정비 서비스.",
      },
      { property: "og:title", content: "서비스·정비 — 함손건설기계" },
      {
        property: "og:description",
        content: "전국 12개 거점, 평균 출동 2시간. 멈추지 않는 현장을 위한 프리미엄 정비 서비스.",
      },
      { property: "og:image", content: serviceHero },
    ],
  }),
  component: ServicePage,
});

const coreServices = [
  {
    icon: Wrench,
    title: "순회 서비스",
    desc: "함손건설기계를 이용해주시는 고객님을 위해 1년 1회 순회 서비스를 진행합니다.",
    benefits: ["장비 고장 사전 예방", "체크리스트를 활용한 정밀 점검"],
  },
  {
    icon: Siren,
    title: "출장 정비 서비스",
    desc: "빠르게 부품을 확보하여 고객님이 계신 곳으로 빠른 출장 정비 서비스를 진행합니다.",
    benefits: ["24/365 대응", "평일.토요일 운영"],
  },
  {
    icon: Cog,
    title: "부품 교체",
    desc: "100% 순정 부품으로 신뢰성을 보장합니다. 주요 소모품 24시간 출고 보장.",
    benefits: ["순정 부품 보증 적용", "24h 이내 출고 (지점 재고 있을시)"],
  },
  {
    icon: Activity,
    title: "장비 진단",
    desc: "노트북 진단기를 활용해 장비를 정밀 분석하여 결함을 신속하게 발견합니다.",
    benefits: ["장비 진단기 보유", "오진단으로 생기는 과다 정비 방지", "신속 진단 처리 가능"],
  },
];

// const processSteps = [
//   { n: "01", t: "상담 접수", d: "전화·웹 폼으로 문의를 접수합니다." },
//   { n: "02", t: "장비 상태 확인", d: "현장 또는 원격으로 상태를 점검합니다." },
//   { n: "03", t: "견적 안내", d: "투명한 항목별 견적을 제공합니다." },
//   { n: "04", t: "정비 진행", d: "전문 인력이 신속하게 정비를 수행합니다." },
//   { n: "05", t: "사후 관리", d: "정비 후 보증 및 정기 점검을 지원합니다." },
// ];

// const strengths = [
//   { icon: Users, k: "200+", t: "전문 정비 인력", d: "메이커 공인 자격을 보유한 베테랑 엔지니어" },
//   { icon: Clock, k: "2H", t: "빠른 현장 대응", d: "수도권 평균 출동 시간" },
//   { icon: ShieldCheck, k: "100%", t: "정품 부품 기반", d: "순정 부품만을 사용한 신뢰 정비" },
//   { icon: Package, k: "30+", t: "장비별 맞춤 정비", d: "굴착기·로더·지게차 등 모델별 매뉴얼 적용" },
// ];

const faqs = [
  {
    q: "정비 상담은 어떻게 신청하나요?",
    a: "대표 전화 1577-7269 또는 본 페이지 하단의 ‘정비 상담 신청’ 버튼을 통해 접수 가능합니다. 평일 09-18시 외에는 페이지 상담신청을 이용해 주세요.",
  },
  {
    q: "출장 정비가 가능한가요?",
    a: "전라도, 경상도 출장 정비 가능합니다. 당일 스케줄이 있으면 다음날 이내, 당일 스케줄이 없으면 6시간 이내 도착을 목표로 운영합니다.",
  },
  {
    q: "부품 교체도 가능한가요?",
    a: "100% 순정 부품을 판매하고 있으며, 주요 소모품은 주문시 당일 출고 진행하고 있습니다. 지점 재고가 없을 경우 별도 조달 일정을 안내드립니다. 부품 주문은 함손건설기계 쇼핑몰을 이용해주시면 됩니다.",
  },
  {
    q: "정비 소요 시간은 얼마나 걸리나요?",
    a: "정기 정검은 1-2시간, 출장 정비 서비스는 부품 수급 상황에 따라 당일 ~ 2일 이내 또는 부품 도착시 바로 작업 진행됩니다.",
  },
];

function ServicePage() {
  return (
    <SiteLayout>
      <Hero />
      <CoreCards />
      <Faq />
      <FinalCta />
    </SiteLayout>
  );
}

function CoreCards() {
  return (
    <section className="container-x py-14 md:py-32">
      <div className="max-w-2xl mb-8 md:mb-14">
        {/* <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Core Services</p> */}
        <h2 className="mt-2 md:mt-3 font-display text-2xl md:text-5xl font-bold">핵심 정비 서비스</h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          예방·대응·복원의 전 과정을 아우르는 4대 정비 서비스입니다.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {coreServices.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-4 md:p-7 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1 shadow-card">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl bg-gradient-orange shadow-glow">
                <s.icon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 md:mt-6 font-display text-base md:text-xl font-bold">{s.title}</h3>
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <ul className="mt-4 md:mt-6 space-y-1.5 md:space-y-2 border-t border-border/60 pt-3 md:pt-5">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={serviceHero} alt="" className="h-full w-full object-cover object-center brightness-90 contrast-110" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.70_0.20_45/0.18),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="container-x pt-24 pb-16 md:pt-44 md:pb-40">
        <div className="max-w-3xl animate-fade-in">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/[0.04] px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-medium tracking-widest uppercase text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            Service & Maintenance
          </div> */}
          <h1 className="mt-4 md:mt-6 font-display text-3xl md:text-7xl font-bold text-balance leading-[1.1] md:leading-[1.05]">
            멈추지 않는 현장,
            <br />
            <span className="text-primary">완벽한 정비로 답합니다.</span>
          </h1>
          <p className="mt-3 md:mt-6 max-w-2xl text-sm md:text-lg text-foreground/75 leading-relaxed">
            밥캣 전문 엔지니어, 100% 순정 부품, 전남/영남 담당
            <br className="hidden md:block" />
            함손건설기계의 정비 서비스는 신뢰를 기반으로 정확한 업무 처리를 통해 고객님들의 문제를 해결해드립니다.
          </p>
          <div className="mt-6 md:mt-10 flex flex-wrap items-center gap-3">
            <ContactButton className="group inline-flex items-center gap-2 rounded-md bg-primary px-4 md:px-6 py-2.5 md:py-3.5 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              상담신청
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ContactButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// function CoreCards() {
//   return (
//     <section className="container-x py-24 md:py-32">
//       <div className="max-w-2xl mb-14">
//         <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Core Services</p>
//         <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">핵심 정비 서비스</h2>
//         <p className="mt-4 text-muted-foreground leading-relaxed">
//           예방·대응·복원의 전 과정을 아우르는 4대 정비 서비스입니다.
//         </p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         {coreServices.map((s, i) => (
//           <Reveal key={s.title} delay={i * 80}>
//             <article className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1 shadow-card">
//               <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//               <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-orange shadow-glow">
//                 <s.icon className="h-5 w-5 text-primary-foreground" />
//               </div>
//               <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
//               <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
//               <ul className="mt-6 space-y-2 border-t border-border/60 pt-5">
//                 {s.benefits.map((b) => (
//                   <li key={b} className="flex items-center gap-2 text-xs text-foreground/80">
//                     <span className="h-1 w-1 rounded-full bg-primary" />
//                     {b}
//                   </li>
//                 ))}
//               </ul>
//             </article>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }

// function BrandStory() {
//   return (
//     <section className="container-x pb-24 md:pb-32">
//       <div className="relative overflow-hidden rounded-3xl border border-border/70">
//         <img src={serviceHero} alt="정비 현장" className="h-[420px] md:h-[560px] w-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.70_0.20_45/0.25),transparent_60%)]" />
//         <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
//           <div className="max-w-2xl">
//             <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Our Promise</p>
//             <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
//               정비는 단순한 수리가 아닙니다.
//               <br />
//               <span className="text-foreground/80">현장에 대한 약속입니다.</span>
//             </h2>
//             <p className="mt-5 max-w-xl text-foreground/75 leading-relaxed">
//               한 대의 장비가 멈추는 순간, 현장 전체가 멈춥니다. 함손건설기계의 엔지니어는 그 무게를 알기에, 매 순간
//               최선을 다합니다.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-x pb-14 md:pb-32">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 md:gap-14 items-start">
        <div>
          <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">FAQ</p>
          <h2 className="mt-2 md:mt-3 font-display text-2xl md:text-5xl font-bold leading-[1.1]">
            자주 묻는
            <br />
            질문
          </h2>
          <p className="mt-3 md:mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">
            궁금하신 내용을 확인해 보세요. 추가 문의는 정비 상담을 통해 언제든 답변드립니다.
          </p>
        </div>
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
                >
                  <span
                    className={`font-display text-base md:text-xl font-semibold transition-colors ${
                      active ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/70 bg-card/60 transition-colors group-hover:border-primary/50">
                    {active ? (
                      <Minus className="h-4 w-4 text-primary" />
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    active ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="min-h-0 text-xs md:text-base text-muted-foreground leading-relaxed pr-6 md:pr-12">{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-x pb-16 md:pb-36">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/70 bg-gradient-to-br from-card via-surface to-background p-6 md:p-16">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-10">
          <div className="max-w-2xl">
            {/* <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Get in touch</p> */}
            <h2 className="mt-3 md:mt-4 font-display text-2xl md:text-6xl font-bold leading-[1.1] md:leading-[1.05]">
              장비 상태가
              <br />
              걱정되시나요?
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-lg text-foreground/75 leading-relaxed">
              전문 정비 상담을 받아보세요. 24시간 내 담당 엔지니어가 회신드립니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
            <ContactButton className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              상담신청
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ContactButton>
            <a
              href="tel:01099990000"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border/70 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-foreground/90 backdrop-blur transition hover:bg-white/[0.08]"
            >
              <PhoneCall className="h-4 w-4 text-primary" />
              긴급 1577-7269
            </a>
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
