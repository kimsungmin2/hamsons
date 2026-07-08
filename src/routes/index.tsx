import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MessageCircle, BookOpen, Youtube, Instagram, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/Layout";
import { SocialBadges } from "@/components/site/SocialBadges";
import hero from "@/assets/hero-bobcat-showroom.png";
import loaderCategoryImg from "@/assets/categories/loader-category.png";
import excavatorCategoryImg from "@/assets/categories/excavator-category.png";
import wheelLoaderCategoryImg from "@/assets/categories/wheel-loader-category.png";
import attachmentCategoryImg from "@/assets/categories/attachment-category.png";
import service from "@/assets/service-section.png";
import rental from "@/assets/rental-section.jpg";
import company from "@/assets/company.jpg";
import shopParts from "@/assets/shop-section.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "함손건설기계 — 소형건설기계의 새로운 기준" },
      {
        name: "description",
        content: "스키드로더 / 미니 굴착기 / 컴팩트 휠 로더 판매·렌탈·정비. 대한민국 축산·건설 현장의 든든한 파트너.",
      },
      { property: "og:title", content: "함손건설기계 — 소형건설기계의 새로운 기준" },
      { property: "og:description", content: "스키드로더 / 미니 굴착기 / 컴팩트 휠 로더 판매·렌탈·정비를 한 곳에서" },
    ],
  }),
  component: Index,
});

const products = [
  {
    name: "밥캣 로더 시리즈 ",
    spec: "1.3t — 5.9t",
    img: loaderCategoryImg,
    code: "Bobcat Loader Series",
    category: "skid-loader" as const,
  },
  {
    name: "밥캣 굴착기 시리즈",
    spec: "1.7t — 3.8t",
    img: excavatorCategoryImg,
    code: "Bobcat MEX Series",
    category: "mini-excavator" as const,
  },
  {
    name: "밥캣 휠로더 시리즈",
    spec: "버킷 0.85㎥급",
    img: wheelLoaderCategoryImg,
    code: "Bobcat Compact Wheel Loaders Series",
    category: "compact-wheel-loader" as const,
  },
  {
    name: "함손 밥캣 어태치먼트",
    spec: "버킷 · 브레이커 · 오거 외",
    img: attachmentCategoryImg,
    code: "Bobcat Attachments Series",
    category: "attachment" as const,
  },
];

function Index() {
  return (
    <SiteLayout>
      <SocialBadges variant="floating" />
      {/* HERO */}
      <section className="relative -mt-16 min-h-[100svh] md:h-[100svh] md:min-h-[640px] w-full overflow-hidden bg-[color:var(--steel)] flex flex-col justify-end">
        <img
          src={hero}
          alt="밥캣 건설장비 전시장"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-center brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90 sm:from-black/60 sm:via-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:from-black/70 sm:via-black/30" />
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 flex h-full flex-col justify-end pt-28 pb-[15vh] md:pb-24 md:pt-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-left"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[9px] sm:text-xs font-semibold tracking-wider text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(242,108,35,0.8)]" />
              KOREA · CONSTRUCTION EQUIPMENT
            </span>
            <h1 className="mt-3.5 sm:mt-6 font-display text-[28px] sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.12] sm:leading-[1.02] md:leading-[0.95] text-balance">
              글로벌 시장을
              <br className="hidden sm:inline" />
              <span className="text-primary"> 움직이는 힘.</span>
            </h1>
            <p className="mt-3 sm:mt-6 max-w-xl text-xs sm:text-base md:text-lg text-white/85 leading-relaxed sm:leading-normal">
              대한민국 축산·건설 현장의 든든한 파트너. 스키드로더 / 미니 굴착기 / 컴팩트 휠 로더까지 밥캣 중장비의
              시작과 끝을 담당하고 있습니다.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-row items-center gap-2 sm:gap-3">
              <Link
                to="/products"
                className="inline-flex h-10 md:h-auto items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 md:px-6 md:py-3.5 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition cursor-pointer text-center"
              >
                제품 보기 →
              </Link>
              <a
                href="tel:+8215777269"
                className="group inline-flex h-10 md:h-auto items-center justify-center gap-2 md:gap-3 rounded-lg border border-white/20 bg-white/5 px-3.5 py-1.5 md:px-5 md:py-3 text-white backdrop-blur transition hover:border-primary/60 hover:bg-white/10"
              >
                <span className="flex h-6 w-6 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-primary/10 text-primary transition group-hover:bg-primary/20">
                  <Phone className="h-3 w-3 md:h-4 md:w-4" />
                </span>
                <span className="flex flex-col text-left leading-none justify-center">
                  <span className="hidden md:inline text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-0.5">대표번호</span>
                  <span className="font-display text-[12px] md:text-lg font-bold tracking-wide">1577-7269</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-14 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-4 md:gap-6 mb-8 md:mb-14">
            <div>
              <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">01 / Products</p>
              <h2 className="mt-1.5 md:mt-2 text-2xl md:text-5xl font-bold text-balance max-w-2xl">
                강력한 성능
                <br />
                밥캣 중장비 라인업
              </h2>
            </div>
            <Link to="/products" className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
              전체 제품 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to="/products"
                  search={{ category: p.category }}
                  preload="intent"
                  className="group relative block overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:border-primary/50 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[color:var(--steel)]">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 md:p-6">
                    <div className="text-[10px] md:text-xs text-primary font-mono">{p.code}</div>
                    <h3 className="mt-0.5 md:mt-1 text-sm md:text-xl font-bold">{p.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">{p.spec}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RENTAL */}
      <section className="py-14 md:py-28 bg-[color:var(--surface)]">
        <div className="container-x grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img src={rental} alt="렌탈 장비" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">02 / Rental & Used</p>
            <h2 className="mt-1.5 md:mt-2 text-2xl md:text-5xl font-bold text-balance">
              강력한 성능을 가진 밥캣을,
              <br />
              필요한 기간만큼.
            </h2>
            <p className="mt-3 md:mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
              단기 1일 렌탈부터 검수를 마친 중고 장비 매매까지. 현장 상황에 맞춘 가장 합리적인 선택을 제공해드립니다.
            </p>
            <ul className="mt-5 md:mt-8 space-y-2 md:space-y-3">
              {["전 장비 완벽 정비 후 출고", "당일 운송·회수 가능 (운송비 별도)", "보험·정비 패키지 포함"].map((t) => (
                <li key={t} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/rental"
              className="mt-6 md:mt-10 inline-flex items-center rounded-md border border-border px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold hover:bg-secondary transition"
            >
              렌탈·중고 라인업 보기
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section className="py-14 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">03 / Service</p>
            <h2 className="mt-1.5 md:mt-2 text-2xl md:text-5xl font-bold text-balance">
              빠르고 정확하게
              <br />
              순정 부품을 활용한 정비.
            </h2>
            <p className="mt-3 md:mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
              순정 부품과 인증 밥캣 정비사가 현장이 멈추지 않도록 빠르고 정확한 서비스를 진행해드립니다.
            </p>
            <ul className="mt-5 md:mt-8 space-y-2 md:space-y-3">
              {["전남 / 영남 정비 거점 운영", "100% 순정 부품 · 서비스 후 일정기간 부품 보증"].map((t) => (
                <li key={t} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/service"
              className="mt-6 md:mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-4 md:px-6 py-2.5 md:py-3.5 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              정비 서비스 자세히 →
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-card">
            <img
              src={service}
              alt="정비"
              loading="lazy"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              24/7 Field Service
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY */}
      <section className="py-14 md:py-28 bg-[color:var(--surface)]">
        <div className="container-x grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* TODO: replace COMPANY_YOUTUBE_ID with the provided YouTube video ID */}
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-card backdrop-blur">
            <iframe
              src="https://www.youtube.com/embed/DvVLthI9WOs"
              title="함손건설기계 회사 소개 영상"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div>
            <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">04 / Company</p>
            <h2 className="mt-1.5 md:mt-2 text-2xl md:text-5xl font-bold text-balance">2005년부터, 한결같이.</h2>
            <p className="mt-3 md:mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
              20년 이상 대한민국 축산·건설 현장과 함께해 온 함손건설기계는 글로벌 소형 건설기계 브랜드 밥캣의 공식
              파트너이자, 국내 스키드로더 최대 규모의 서비스 기업입니다.
            </p>
            <Link
              to="/about"
              className="mt-6 md:mt-10 inline-flex items-center rounded-md bg-primary px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              회사 소개 자세히 →
            </Link>
          </div>
        </div>
      </section>

      {/* SHOP — Bobcat Genuine Parts */}
      <section id="shop" className="py-14 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">05 / Shop</p>
            <h2 className="mt-1.5 md:mt-2 text-2xl md:text-5xl font-bold text-balance">
              밥캣 정품 부품
              <br />
              전문 쇼핑몰.
            </h2>
            <p className="mt-3 md:mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
              빠른 부품 공급과 신뢰할 수 있는 정품 부품 서비스. 다양한 중장비 부품을 온라인으로 간편하게 확인하고,
              검증된 공식 유통망을 통해 안심하고 주문하실 수 있습니다.
            </p>
            <ul className="mt-5 md:mt-8 space-y-2 md:space-y-3">
              {["100% 밥캣 정품 부품 보증", "전국 당일·익일 배송 네트워크", "전문 엔지니어 상담 지원"].map((t) => (
                <li key={t} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="https://hamson.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-4 md:px-6 py-2.5 md:py-3.5 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              쇼핑몰 바로가기 ↗
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-card">
            <img
              src={shopParts}
              alt="밥캣 정품 부품"
              loading="lazy"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Bobcat Genuine Parts
            </div>
          </div>
        </div>
      </section>

      <ContactCTASection />
    </SiteLayout>
  );
}

const contactChannels = [
  {
    label: "대표번호",
    desc: "평일 09:00 – 18:00 상담",
    value: "1577-7269",
    href: "tel:+8215777269",
    icon: Phone,
  },
  {
    label: "네이버 블로그",
    desc: "장비 소식 · 현장 사례",
    value: "bobcat920",
    href: "https://blog.naver.com/bobcat920",
    icon: BookOpen,
  },
  {
    label: "카카오톡 문의",
    desc: "실시간 채팅 상담",
    value: "_JHxmxaK",
    href: "https://pf.kakao.com/_JHxmxaK",
    icon: MessageCircle,
  },
  {
    label: "유튜브",
    desc: "장비 리뷰 · 정비 영상",
    value: "@hamson726",
    href: "https://youtube.com/@hamson726",
    icon: Youtube,
  },
  {
    label: "인스타그램",
    desc: "장비 소식",
    value: "hamson_bobcat",
    href: "https://www.instagram.com/hamson_bobcat",
    icon: Instagram,
  },
] as const;

function ContactCTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "d96bafbb-731c-420f-bc12-086621ba8d2f");
    formData.append("subject", "[함손건설기계] 웹사이트에서 새로운 상담 신청이 접수되었습니다.");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.");
        form.reset();
      } else {
        toast.error("전송에 실패했습니다. 대표번호(1577-7269)로 직접 문의해 주세요.");
      }
    } catch (err) {
      toast.error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-14 md:py-28 bg-[color:var(--surface)] scroll-mt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 md:gap-12 lg:gap-16 items-start">
          {/* LEFT: headline + channels */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Contact
            </span>
            <h2 className="mt-4 md:mt-6 font-display text-2xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              장비 상담이
              <br />
              <span className="text-primary">필요하신가요?</span>
            </h2>
            <p className="mt-3 md:mt-6 max-w-xl text-sm md:text-lg text-muted-foreground leading-relaxed">
              신차, 렌탈, 중고, 정비까지 현장에 맞는 장비 솔루션을 빠르게 안내해드립니다.
            </p>

            <div className="mt-6 md:mt-10 grid sm:grid-cols-2 gap-2.5 md:gap-3">
              {contactChannels.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative flex items-start gap-3 md:gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 md:p-5 backdrop-blur-sm transition hover:border-primary/40 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10 text-primary transition group-hover:bg-primary/20">
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="mt-0.5 md:mt-1 font-display text-sm md:text-base font-bold text-foreground truncate">{c.value}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground truncate">{c.desc}</div>
                    </div>
                    <span className="absolute right-4 top-4 text-muted-foreground transition group-hover:text-primary group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT: inquiry form */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/40 via-white/10 to-transparent opacity-60"
            />
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-white/10 bg-black/40 p-7 md:p-9 backdrop-blur-xl shadow-card space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl md:text-2xl font-bold">상담 신청</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  24h Reply
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="이름" name="name" placeholder="홍길동" required />
                <FormField label="연락처" name="phone" placeholder="010-0000-0000" required />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  문의 유형
                </label>
                <select
                  name="type"
                  className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground transition focus:outline-none focus:border-primary/60 focus:bg-white/[0.07]"
                >
                  <option className="bg-background">신차 구매</option>
                  <option className="bg-background">단기 렌탈</option>
                  <option className="bg-background">중고 매매</option>
                  <option className="bg-background">정비 · 서비스</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  문의 내용
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="장비 모델, 사용 현장, 일정 등을 적어주세요."
                  className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:outline-none focus:border-primary/60 focus:bg-white/[0.07]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-md bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-50 cursor-pointer"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      상담신청
                      <span className="transition group-hover:translate-x-1">→</span>
                    </>
                  )}
                </span>
              </button>

              <p className="text-[11px] text-muted-foreground text-center">
                개인정보는 상담 목적으로만 사용되며 안전하게 보관됩니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:outline-none focus:border-primary/60 focus:bg-white/[0.07]"
      />
    </div>
  );
}
