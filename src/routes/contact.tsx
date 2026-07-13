import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "문의·상담 — 함손건설기계" },
      { name: "description", content: "구매·렌탈·정비 상담을 24시간 내 답변드립니다." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  return (
    <SiteLayout>
      <section className="container-x py-14 md:py-28 grid lg:grid-cols-2 gap-8 md:gap-16">
        <div>
          <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Contact</p>
          <h1 className="mt-2 md:mt-3 text-2xl md:text-7xl font-bold text-balance text-white">
            현장의 이야기를<br />
            <span className="text-primary">들려주세요.</span>
          </h1>
          <div className="mt-6 md:mt-12 space-y-5 md:space-y-8">
            <div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">대표 전화</div>
              <div className="mt-1.5 md:mt-2 text-lg md:text-2xl font-bold">1577-7269</div>
            </div>
            <div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">긴급 정비</div>
              <div className="mt-1.5 md:mt-2 text-lg md:text-2xl font-bold text-primary">010-9999-0000</div>
            </div>
            <div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">이메일</div>
              <div className="mt-1.5 md:mt-2 text-sm md:text-lg">sales@heavyseoul.kr</div>
            </div>
            <div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">본사</div>
              <div className="mt-1.5 md:mt-2 text-sm md:text-lg">전남광주통합특별시 나주시 왕곡면 장산양산길 18</div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!privacyAgreed) {
              alert("개인정보 수집 및 이용에 동의해 주세요.");
              return;
            }
            setSent(true);
          }}
          className="rounded-xl border border-white/10 bg-black/40 p-5 md:p-10 space-y-4 md:space-y-5 shadow-card backdrop-blur-xl"
        >
          <h2 className="font-display text-lg md:text-2xl font-bold">문의하기</h2>
          {[
            { l: "성함", n: "name" },
            { l: "회사명", n: "company" },
            { l: "연락처", n: "phone" },
            { l: "이메일", n: "email", t: "email" },
          ].map((f) => (
            <div key={f.n}>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">{f.l}</label>
              <input
                required
                type={f.t || "text"}
                name={f.n}
                className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] text-white placeholder:text-muted-foreground/60"
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider">문의 종류</label>
            <select
              name="type"
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] text-white"
            >
              <option className="bg-background">제품 구매 견적</option>
              <option className="bg-background">렌탈·리스</option>
              <option className="bg-background">중고 장비</option>
              <option className="bg-background">정비·서비스</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider">상세 내용</label>
            <textarea
              required
              rows={5}
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] text-white placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Privacy consent checkbox */}
          <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <input
              type="checkbox"
              id="privacy-agree-contact"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/10 bg-white/[0.04] text-primary focus:ring-primary/30 cursor-pointer accent-primary"
            />
            <label htmlFor="privacy-agree-contact" className="text-sm text-foreground/85 leading-relaxed cursor-pointer">
              상담을 위한{" "}
              <Link
                to="/privacy"
                target="_blank"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                onClick={(e) => e.stopPropagation()}
              >
                개인정보 수집 및 이용 동의
              </Link>
              에 동의합니다. (필수)
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition cursor-pointer"
          >
            {sent ? "접수되었습니다 — 24시간 내 연락드립니다" : "문의 보내기 →"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
