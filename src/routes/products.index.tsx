import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { products, PRODUCT_CATEGORIES, type ProductCategory } from "@/data/products";
import loaderCategoryImg from "@/assets/categories/loader-category.png";
import excavatorCategoryImg from "@/assets/categories/excavator-category.png";
import wheelLoaderCategoryImg from "@/assets/categories/wheel-loader-category.png";
import attachmentCategoryImg from "@/assets/categories/attachment-category.png";

type CategoryFilter = Exclude<ProductCategory, "parts"> | "all";

const CATEGORY_IDS: string[] = ["all", "skid-loader", "mini-excavator", "compact-wheel-loader", "attachment"];

const CATEGORY_COPY: Record<CategoryFilter, { title: string; desc: string }> = {
  all: {
    title: "전체 제품 라인업",
    desc: "글로벌 표준의 안전성과 내구성을 바탕으로, 모든 규모의 현장에 최적화된 밥캣 중장비를 제공합니다.",
  },
  "skid-loader": {
    title: "밥캣 로더 시리즈",
    desc: "다양한 어태치먼트를 지원하는 다목적 스키드 스티어 라인업으로 현장의 생산성을 끌어올립니다.",
  },
  "mini-excavator": {
    title: "밥캣 굴착기 시리즈",
    desc: "협소 지역부터 일반 토목까지, 정밀한 컨트롤과 강력한 굴삭력을 갖춘 미니 굴착기 라인업입니다.",
  },
  "compact-wheel-loader": {
    title: "밥캣 휠로더 시리즈",
    desc: "기동성과 적재력을 모두 갖춘 컴팩트 휠 로더로 축산·자재·물류 현장을 빠르게 처리합니다.",
  },
  attachment: {
    title: "함손 어태치먼트",
    desc: "현장의 작업 효율을 끌어올리는 다양한 어태치먼트 라인업을 소개합니다.",
  },
};

const CATEGORY_CARDS: { id: ProductCategory; name: string; tagline: string; img: string }[] = [
  { id: "skid-loader", name: "밥캣 로더 시리즈", tagline: "1.3t — 5.9t · 다목적 로더", img: loaderCategoryImg },
  { id: "mini-excavator", name: "밥캣 굴착기 시리즈", tagline: "1.7t — 3.8t · 정밀 굴삭", img: excavatorCategoryImg },
  { id: "compact-wheel-loader", name: "밥캣 휠로더 시리즈", tagline: "버킷 0.85㎥급 · 기동성", img: wheelLoaderCategoryImg },
  { id: "attachment", name: "함손 밥캣 어태치먼트", tagline: "버킷 · 브레이커 · 오거 외", img: attachmentCategoryImg },
  // { id: "parts", name: "부품", tagline: "정품 · 호환 부품 공급", img: shopParts },
];

export const Route = createFileRoute("/products/")({
  validateSearch: (raw: Record<string, unknown>): { category: CategoryFilter } => {
    const c = raw.category;
    if (typeof c === "string" && CATEGORY_IDS.includes(c)) {
      return { category: c as CategoryFilter };
    }
    return { category: "all" };
  },
  head: ({ match }) => {
    const cat = (match.search as { category: CategoryFilter }).category;
    const copy = CATEGORY_COPY[cat];
    return {
      meta: [{ title: `${copy.title} — HEAVY.SEOUL` }, { name: "description", content: copy.desc }],
    };
  },
  component: ProductsPage,
});

function ProductsPage() {
  const search = Route.useSearch();
  const category = search.category as CategoryFilter;
  const copy = CATEGORY_COPY[category];
  const isCategoryView = category === "all";
  const visible = isCategoryView ? [] : products.filter((p) => p.category === category);

  return (
    <SiteLayout>
      <section className="container-x py-14 md:py-28">
        <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Products</p>
        <h1 className="mt-2 md:mt-3 text-2xl md:text-7xl font-bold text-balance max-w-3xl">{copy.title}</h1>
        <p className="mt-3 md:mt-6 text-muted-foreground text-sm md:text-lg max-w-2xl">{copy.desc}</p>
        {!isCategoryView && (
          <Link
            to="/products"
            search={{ category: "all" }}
            className="mt-5 md:mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold hover:border-primary/50 hover:text-primary transition"
          >
            ← 전체 카테고리로 돌아가기
          </Link>
        )}
      </section>

      <section className="container-x pb-14 md:pb-28">
        {isCategoryView ? (
          <div key="cats" className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 animate-in fade-in duration-300">
            {CATEGORY_CARDS.map((c) => {
              const count = products.filter((p) => p.category === c.id).length;
              return (
                <Link
                  key={c.id}
                  to="/products"
                  search={{ category: c.id }}
                  preload="intent"
                  className="group relative block overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:border-primary/60 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[color:var(--steel)]">
                    <img
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 flex items-end justify-between gap-2 md:gap-4">
                    <div>
                      <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                        Category · {count}종
                      </div>
                      <h3 className="mt-1 md:mt-2 text-sm md:text-2xl font-bold text-white">{c.name}</h3>
                      <p className="mt-0.5 md:mt-1 text-[10px] md:text-sm text-white/70 hidden sm:block">{c.tagline}</p>
                    </div>
                    <span className="shrink-0 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition group-hover:bg-primary group-hover:border-primary">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/30 py-24 text-center">
            <p className="text-lg font-semibold">해당 카테고리 제품 준비중</p>
            <p className="mt-2 text-sm text-muted-foreground">곧 새로운 라인업이 업데이트될 예정입니다.</p>
            <Link
              to="/products"
              search={{ category: "all" }}
              className="mt-6 inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary transition"
            >
              전체 카테고리로 돌아가기
            </Link>
          </div>
        ) : (
          <div key={category} className="grid md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in duration-300">
            {visible.map((p) => (
              <Link
                key={p.id}
                to="/products/$productId"
                params={{ productId: p.id }}
                preload="intent"
                className="group rounded-xl border border-border bg-card overflow-hidden shadow-card block transition hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[color:var(--steel)]">
                  <img
                    src={p.thumb}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-6 flex items-start justify-between gap-3 md:gap-4">
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] md:text-xs text-primary">{p.code}</div>
                    <h3 className="mt-0.5 md:mt-1 text-base md:text-xl font-bold truncate">{p.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">{p.shortDesc}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary">
                    {p.tag}
                  </span>
                </div>
                <div className="px-4 md:px-6 pb-3 md:pb-5 grid grid-cols-3 gap-2 md:gap-3 border-t border-border/60 pt-3 md:pt-4">
                  {p.specs.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                      <div className="mt-0.5 md:mt-1 text-xs md:text-sm font-semibold">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="px-4 md:px-6 pb-4 md:pb-6 flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">모델 {p.code}</span>
                  <span className="text-primary font-semibold transition group-hover:translate-x-1">상세 보기 →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
