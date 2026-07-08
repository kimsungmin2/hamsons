import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { MapPin, Phone, Printer, Briefcase, ArrowUpRight } from "lucide-react";
import hqImg from "@/assets/companies/hamson-hq.jpg";
import yeongnamImg from "@/assets/companies/bobcat-yeongnam.jpg";
import gyeongbukImg from "@/assets/companies/bobcat-gyeongbuk.jpg";
import rndImg from "@/assets/companies/hamson-rnd.jpg";
import academyImg from "@/assets/companies/jeonnam-academy.jpg";
import hqMap from "@/assets/maps/hq-map.png";
import yeongnamMap from "@/assets/maps/yeongnam-map.png";
import gyeongbukMap from "@/assets/maps/gyeongbuk-map.png";
import rndMap from "@/assets/maps/rnd-map.png";
import academyMap from "@/assets/maps/academy-map.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "회사소개 — 함손건설기계" },
      { name: "description", content: "함손건설기계 계열사 및 사업 부문 소개." },
    ],
  }),
  component: AboutPage,
});

// TODO: 각 계열사/지점 정보를 실제 데이터로 교체하세요.
// image: 회사 외관 사진 또는 로고 이미지 URL
// mapEmbedUrl: 구글 지도 embed iframe src URL
type Affiliate = {
  name: string;
  intro: string;
  address: string;
  phone: string;
  fax?: string;
  business: string[];
  image: string;
  imagePosition?: string;
  mapEmbedUrl: string;
  mapImage: string;
  mapPosition?: string;
};

const affiliates: Affiliate[] = [
  {
    name: "유한회사 함손건설기계(본사)",
    intro:
      "2005년 설립 이래 20여 년간, 차별화된 전문성을 바탕으로 전남 지역 소형 건설기계 산업을 확고히 선도하고 있습니다.",
    address: "전라남도 나주시 왕곡면 장산양산길 18 (함손건설기계)",
    phone: "1577-7269 / 061-336-6114",
    fax: "061-331-5111",
    business: ["신차 판매 / 부품 판매 ", "그룹 총괄", "건설기계 렌탈", "밥캣 전남지역 담당"],
    image: hqImg,
    mapImage: hqMap,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("전라남도 나주시 왕곡면 장산양산길 18")}&hl=ko&z=16&output=embed`,
  },
  {
    name: "유한회사 밥캣영남판매",
    intro:
      "2016년 경남, 2025년 영남으로 — 쉼 없는 도전으로 완성한 영남권 No.1 지속적인 사업 영역 확장을 통해 현재 영남 지역 소형 건설기계 산업의 확고한 선두 주자로 자리매김하고 있습니다.",
    address: "경상남도 밀양시 상남면 상남로 1074, 1076 (밥캣영남판매)",
    phone: "1577-7269 / 055-353-6114",
    fax: "055-352-6117",
    business: ["신차 판매 / 부품 판매", "건설기계 렌탈", "밥캣 영남지역 담당"],
    image: yeongnamImg,
    mapImage: yeongnamMap,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("경상남도 밀양시 상남면 상남로 1074")}&hl=ko&z=16&output=embed`,
  },
  {
    name: "함손건설기계 밥캣경북지사",
    intro:
      "경북지역의 원활한 영업 지원과 신속한 부품 공급을 담당하는 핵심 거점입니다. 현장 중심의 신속한 서비스로 경북 지역 고객의 비즈니스를 지원합니다.",
    address: "경상북도 경산시 하양읍 지식산업로 4길 56 (함손건설기계 밥캣경북지사 1F)",
    phone: "1577-7269 / 010-2711-7182",
    business: ["신차 판매 / 부품 판매", "건설기계 렌탈", "경북 지역 영업 거점"],
    image: gyeongbukImg,
    mapImage: gyeongbukMap,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("경상북도 경산시 하양읍 지식산업로4길 56")}&hl=ko&z=16&output=embed`,
  },
  {
    name: "함손제품개발센터 (R&D)",
    intro: "2024년 첫걸음을 내딛은 이래, 밥캣의 명성에 걸맞은 고품질 함손 어태치먼트를 선보이고 있습니다.",
    address: "광주광역시 광산구 지로길 37-85 (함손제품개발센터)",
    phone: "1577-7269 / 010-7182-4114",
    business: ["스키드로더 어태치먼트 제작", "스키드로더 개조"],
    image: rndImg,
    mapImage: rndMap,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("광주광역시 광산구 지로길 37-85")}&hl=ko&z=16&output=embed`,
  },
  {
    name: "전남건설기계운전학원",
    intro:
      "10년이 넘는 시간 동안 800명 이상의 수강생과 다수의 지게차운전기능사 합격생을 배출한 베테랑 교육 기관입니다.",
    address: "전라남도 나주시 노안면 금산로 76 (전남건설기계운전학원)",
    phone: "061-331-6114 / 010-4882-6114 ",
    fax: "061-331-6112",
    business: ["3톤/5톤 미만 스키드로더 조종사 교육", "3톤 미만 굴착기 조종사 교육", "3톤 미만 지게차 조종사 교육"],
    image: academyImg,
    mapImage: academyMap,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("전라남도 나주시 노안면 금산로 76")}&hl=ko&z=16&output=embed`,
  },
];

function AboutPage() {
  const navItems = [
    { id: "aff-0", label: "유한회사 함손건설기계(본사) " },
    { id: "aff-1", label: "유한회사 밥캣영남판매" },
    { id: "aff-2", label: "함손건설기계 밥캣경북지사" },
    { id: "aff-3", label: "함손제품개발센터 (R&D)" },
    { id: "aff-4", label: "전남건설기계운전학원" },
  ];
  const [activeId, setActiveId] = useState(navItems[0].id);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    const HEADER_OFFSET = 140; // sticky header (64) + tab bar + breathing room
    const computeActive = () => {
      if (Date.now() < lockUntilRef.current) return;
      let current = navItems[0].id;
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - HEADER_OFFSET <= 0) current = n.id;
        else break;
      }
      // Force last item when scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = navItems[navItems.length - 1].id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const smoothScrollTo = (targetY: number, duration = 380) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    let start: number | null = null;
    // easeOutQuart - quick start, smooth settle
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo({ top: startY + diff * ease(progress), behavior: "instant" as ScrollBehavior });
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      // Lock observer briefly so it doesn't fight the click selection
      lockUntilRef.current = Date.now() + 600;
      setActiveId(id);
      smoothScrollTo(top, 380);
    }
  };

  return (
    <SiteLayout>
      {/* Group network */}
      <section className="container-x pt-20 md:pt-28 pb-16 md:pb-32">
        <div className="max-w-3xl mb-6 md:mb-10">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">Group Network</p>
          <h2 className="mt-2 md:mt-3 text-2xl md:text-5xl font-bold tracking-tight">계열사 · 사업 부문</h2>
          <p className="mt-3 md:mt-5 text-muted-foreground text-sm md:text-lg leading-relaxed">
            신차 판매부터 렌탈 정비까지 — 각 사업 부문이 유기적으로 연결되어 고객의 신뢰를 완성합니다.
          </p>
        </div>

        {/* Glass pill tabs */}
        <nav
          aria-label="계열사 카테고리"
          className="sticky top-16 z-30 -mx-6 px-6 mb-8 md:mb-12 py-2.5 md:py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 bg-background/85 border-y border-border/70 overflow-x-auto"
        >
          <ul className="flex justify-start gap-1.5 md:gap-3">
            {navItems.map((n, i) => {
              const isActive = activeId === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => handleNavClick(e, n.id)}
                    className={`inline-flex items-center gap-1.5 md:gap-2 rounded-full border px-3 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-semibold whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      isActive
                        ? "border-primary/70 bg-primary text-primary-foreground shadow-glow"
                        : "border-border/70 bg-white/[0.03] text-foreground/80 backdrop-blur hover:border-primary/40 hover:text-foreground hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono tracking-widest ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      0{i + 1}
                    </span>
                    {n.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-10 md:space-y-24">
          {affiliates.map((co, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article key={co.name} id={`aff-${idx}`} className="scroll-mt-32 group animate-fade-in">
                {/* Group label + accent line */}
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-primary">
                    GROUP {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-primary/60 via-border to-transparent" />
                </div>

                <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-glow">
                  {/* Subtle inner glow */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

                  <div className="relative grid lg:grid-cols-12 gap-0">
                    {/* Info column */}
                    <div
                      className={`lg:col-span-5 p-5 md:p-12 flex flex-col justify-between ${
                        reverse ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div>
                        <h3 className="font-display text-xl md:text-4xl font-bold tracking-tight leading-tight">
                          {co.name}
                        </h3>
                        <p className="mt-3 md:mt-5 text-muted-foreground text-sm md:text-base leading-relaxed">{co.intro}</p>

                        {/* Meta */}
                        <dl className="mt-5 md:mt-8 space-y-4 md:space-y-5">
                          <div className="flex items-start gap-3 md:gap-4">
                            <span className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60">
                              <MapPin className="h-4 w-4 text-primary" />
                            </span>
                            <div className="flex-1">
                              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">주소</dt>
                              <dd className="mt-1 text-xs md:text-[15px] text-foreground">
                                <a
                                  href={`https://map.naver.com/p/search/${encodeURIComponent(co.address)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors"
                                >
                                  {(() => {
                                    const i = co.address.indexOf("(");
                                    if (i === -1) return co.address;
                                    const main = co.address.slice(0, i).trim();
                                    const paren = co.address.slice(i).trim();
                                    return (
                                      <>
                                        {main}
                                        <br />
                                        {paren}
                                      </>
                                    );
                                  })()}
                                </a>
                              </dd>
                              <a
                                href={`https://map.naver.com/p/search/${encodeURIComponent(co.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                <MapPin className="h-3 w-3" />
                                네이버 지도 보기
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 md:gap-4">
                            <span className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60">
                              <Phone className="h-4 w-4 text-primary" />
                            </span>
                            <div>
                              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                대표번호
                              </dt>
                              <dd className="mt-1">
                                <a
                                  href={`tel:${co.phone.replace(/-/g, "")}`}
                                  className="text-xs md:text-[15px] font-semibold tracking-wide hover:text-primary transition-colors"
                                >
                                  {co.phone}
                                </a>
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:gap-4">
                            <span className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60">
                              <Printer className="h-4 w-4 text-primary" />
                            </span>
                            <div>
                              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">FAX</dt>
                              <dd className="mt-1 text-xs md:text-[15px] font-semibold tracking-wide text-foreground">
                                {co.fax && co.fax.trim() ? co.fax : "준비중"}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:gap-4">
                            <span className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60">
                              <Briefcase className="h-4 w-4 text-primary" />
                            </span>
                            <div>
                              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                주요 사업 분야
                              </dt>
                              <dd className="mt-2 flex flex-wrap gap-1.5">
                                {co.business.map((b) => (
                                  <span
                                    key={b}
                                    className="inline-flex items-center rounded-full border border-border/70 bg-background/40 px-2.5 py-1 text-xs font-medium text-foreground/90"
                                  >
                                    {b}
                                  </span>
                                ))}
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Visual column */}
                    <div
                      className={`lg:col-span-7 grid gap-2 md:gap-3 p-2 md:p-4 bg-[color:var(--steel)]/40 ${
                        reverse ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-border/70 aspect-[16/9] lg:aspect-auto lg:min-h-[320px]">
                        <img
                          src={co.image}
                          alt={`${co.name} 전경`}
                          loading="lazy"
                          style={{ objectPosition: co.imagePosition || "center" }}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/60 px-3 py-1 text-[11px] font-mono tracking-widest text-foreground/90 backdrop-blur">
                          0{idx + 1} / 0{affiliates.length}
                        </span>
                      </div>
                      <a
                        href={`https://map.naver.com/p/search/${encodeURIComponent(co.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${co.name} 네이버 지도 보기`}
                        className="relative block overflow-hidden rounded-xl border border-border/70 aspect-[16/9] lg:aspect-[16/7] group/map"
                      >
                        <img
                          src={co.mapImage}
                          alt={`${co.name} 위치 지도`}
                          loading="lazy"
                          style={{ objectPosition: co.mapPosition || "center" }}
                          className="h-full w-full object-cover brightness-95 contrast-105 transition-transform duration-700 group-hover/map:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
