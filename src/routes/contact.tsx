import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <SiteLayout>
      <section className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance">
            현장의 이야기를<br />
            <span className="text-primary">들려주세요.</span>
          </h1>
          <div className="mt-12 space-y-8">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">대표 전화</div>
              <div className="mt-2 text-2xl font-bold">02-1234-5678</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">긴급 정비</div>
              <div className="mt-2 text-2xl font-bold text-primary">010-9999-0000</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">이메일</div>
              <div className="mt-2 text-lg">sales@heavyseoul.kr</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">본사</div>
              <div className="mt-2 text-lg">서울특별시 강남구 테헤란로 123</div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-xl border border-border bg-card p-8 md:p-10 space-y-5"
        >
          <h2 className="font-display text-2xl font-bold">문의하기</h2>
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
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider">문의 종류</label>
            <select
              name="type"
              className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>제품 구매 견적</option>
              <option>렌탈·리스</option>
              <option>중고 장비</option>
              <option>정비·서비스</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider">상세 내용</label>
            <textarea
              required
              rows={5}
              className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
          >
            {sent ? "접수되었습니다 — 24시간 내 연락드립니다" : "문의 보내기 →"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
