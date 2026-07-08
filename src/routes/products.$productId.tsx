import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { SocialBadges } from "@/components/site/SocialBadges";
import { getProduct, getRelated, products } from "@/data/products";
import loaderCatalog from "@/assets/catalogs/loader-catalog.pdf";
import excavatorCatalog from "@/assets/catalogs/excavator-catalog.pdf";
import wheelLoaderCatalog from "@/assets/catalogs/wheel-loader-catalog.pdf";

const CATALOG_BY_CATEGORY: Record<string, { url: string; filename: string }> = {
  "mini-excavator": { url: excavatorCatalog, filename: "굴착기-카탈로그.pdf" },
  "compact-wheel-loader": { url: wheelLoaderCatalog, filename: "휠로더-카탈로그.pdf" },
};
const DEFAULT_CATALOG = { url: loaderCatalog, filename: "로더-카탈로그.pdf" };

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const p = getProduct(params.productId);
    const title = p ? `${p.name} — 함손건설기계` : "제품 상세 — 함손건설기계";
    const desc = p?.shortDesc ?? "산업용 중장비 상세 정보.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.hero }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="text-4xl font-bold">제품을 찾을 수 없습니다</h1>
        <Link to="/products" className="mt-6 inline-block text-primary">
          ← 전체 라인업으로
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();
  const product = getProduct(productId)!;
  const related = getRelated(product.id);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative -mt-16 h-[80svh] md:h-[88svh] min-h-[500px] md:min-h-[600px] w-full overflow-hidden bg-[color:var(--steel)]">
        <img
          src={product.hero}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/90" />
        <div className="relative z-10 container-x flex h-full flex-col justify-end pb-10 md:pb-20 pt-24 md:pt-32 text-white">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-8"
            >
              <div className="flex items-center gap-3 text-sm">
                <Link to="/products" className="text-white/70 hover:text-white">
                  ← 라인업
                </Link>
                <span className="text-white/40">/</span>
                <span className="font-mono text-primary">{product.code}</span>
                <span className="rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
                  {product.tag}
                </span>
              </div>
              <h1 className="mt-4 md:mt-6 font-display text-3xl md:text-7xl font-bold leading-[1] md:leading-[0.95] text-balance">
                {product.name}
              </h1>
              <p className="mt-3 md:mt-6 max-w-2xl text-sm md:text-lg text-white/85">{product.shortDesc}</p>
              <div className="mt-6 md:mt-10 flex flex-wrap items-center gap-2 md:gap-3">
                <Link
                  to="/"
                  hash="contact"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 md:px-6 py-2.5 md:py-3.5 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                >
                  구매·렌탈 문의 →
                </Link>
                {(() => {
                  const cat = CATALOG_BY_CATEGORY[product.category] ?? DEFAULT_CATALOG;
                  return (
                    <a
                      href={cat.url}
                      download={cat.filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-4 md:px-6 py-2.5 md:py-3.5 text-xs md:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:border-primary/60 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      카탈로그 다운로드
                    </a>
                  );
                })()}
              </div>

            </motion.div>

            {/* PURCHASE PRICE — far right */}
            <motion.aside
              aria-label="구매 가격"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-4 lg:justify-self-end w-full lg:max-w-sm rounded-xl border border-white/15 bg-black/55 p-4 md:p-6 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-widest text-white/60">구매 가격</p>
                <span className="font-mono text-[11px] text-primary">{product.code}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-white">
                {product.name}
              </h3>
              <dl className="mt-5 divide-y divide-white/10 border-y border-white/10">
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-xs text-white/60">판매가</dt>
                  <dd className="font-display text-xl md:text-2xl font-bold text-primary">
                    {product.price}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-[11px] leading-relaxed text-white/55">
                {product.priceNote}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[10px] uppercase tracking-widest text-white/45">
                  바로 문의
                </span>
                <SocialBadges variant="compact" />
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* OVERVIEW + SPECS */}
      <section className="py-14 md:py-24">
        <div className="container-x grid lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-3">
            <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Overview</p>
            <h2 className="mt-1.5 md:mt-2 text-2xl md:text-4xl font-bold text-balance">
              현장의 기준을 다시 쓰다.
            </h2>
            <p className="mt-3 md:mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4 md:p-6 shadow-card">
            <h3 className="font-display text-lg font-bold mb-4">주요 사양</h3>
            <dl className="divide-y divide-border">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between py-3 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-mono font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 md:py-24 bg-[color:var(--surface)]">
        <div className="container-x">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Features</p>
          <h2 className="mt-1.5 md:mt-2 text-2xl md:text-4xl font-bold text-balance max-w-2xl">
            기능과 강점
          </h2>
          <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-6">
            {product.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 md:p-7 shadow-card"
              >
                <div className="font-mono text-[10px] md:text-xs text-primary">0{i + 1}</div>
                <h3 className="mt-1.5 md:mt-2 text-base md:text-xl font-bold">{f.title}</h3>
                <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-14 md:py-24">
        <div className="container-x">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Gallery</p>
          <h2 className="mt-1.5 md:mt-2 text-2xl md:text-4xl font-bold text-balance">장비 갤러리</h2>
          <div className="mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {product.gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-xl bg-[color:var(--steel)] ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-14 md:py-24 bg-[color:var(--surface)]">
        <div className="container-x">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Use Cases</p>
          <h2 className="mt-1.5 md:mt-2 text-2xl md:text-4xl font-bold text-balance">활용 분야</h2>
          <div className="mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {product.useCases.map((u, i) => (
              <div
                key={u}
                className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-card"
              >
                <div className="font-mono text-[10px] md:text-xs text-primary">CASE 0{i + 1}</div>
                <div className="mt-1.5 md:mt-2 font-bold text-sm md:text-lg">{u}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section className="py-10 md:py-16">
        <div className="container-x">
          <div className="rounded-xl md:rounded-2xl border border-border bg-card px-4 py-6 md:px-10 md:py-9 shadow-card flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div>
              <p className="text-primary text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                Quick Contact
              </p>
              <h3 className="mt-1.5 md:mt-2 font-display text-lg md:text-2xl font-bold">
                지금 바로 상담받아 보세요
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                카카오톡으로 가장 빠르게 연결됩니다.
              </p>
            </div>
            <SocialBadges variant="cta" />
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-14 md:py-24 bg-[color:var(--surface)]">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-3 md:gap-4 mb-6 md:mb-10">
            <div>
              <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Related</p>
              <h2 className="mt-1.5 md:mt-2 text-2xl md:text-4xl font-bold">관련 제품</h2>
            </div>
            <Link to="/products" className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
              전체 라인업 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                to="/products/$productId"
                params={{ productId: p.id }}
                className="group block rounded-xl border border-border bg-card overflow-hidden shadow-card"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[color:var(--steel)]">
                  <img
                    src={p.thumb}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 md:p-6">
                  <div className="font-mono text-[10px] md:text-xs text-primary">{p.code}</div>
                  <h3 className="mt-0.5 md:mt-1 text-sm md:text-lg font-bold">{p.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 hidden sm:block">{p.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

void products;
