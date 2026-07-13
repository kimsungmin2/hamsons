import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "개인정보처리방침 — 함손건설기계" },
      { name: "description", content: "함손건설기계의 개인정보 수집 및 이용 동의 안내 페이지입니다." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="container-x py-24 md:py-36 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">개인정보 수집 및 이용 동의</h1>
        <div className="rounded-xl border border-border bg-card p-6 md:p-10 space-y-6 text-sm md:text-base leading-relaxed text-foreground/80">
          <p>
            유한회사 함손건설기계(이하 "회사")는 고객님의 개인정보를 중요시하며, "개인정보보호법" 등 관련 법령을 준수하고 있습니다. 회사는 상담 신청 서비스를 제공하기 위해 아래와 같이 개인정보를 수집 및 이용하고자 합니다.
          </p>

          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-lg font-bold text-foreground">1. 수집하는 개인정보 항목</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>필수항목: 이름(성함), 연락처(전화번호)</li>
              <li>선택항목: 문의 유형, 문의 내용</li>
            </ul>
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-lg font-bold text-foreground">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>고객 문의 및 상담 신청에 대한 답변 및 안내 제공</li>
              <li>장비 구매 견적, 렌탈·리스 조건 상담, 중고 매매 및 정비 서비스 관련 소통</li>
            </ul>
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-lg font-bold text-foreground">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정 기간 동안 개인정보를 보관합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li>상담 이력 관리 및 단순 문의 보관: 목적 달성 후 1년 또는 고객 요청 시 즉시 파기</li>
            </ul>
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-lg font-bold text-foreground">4. 동의 거부 권리 및 불이익 안내</h2>
            <p>
              고객님은 본 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부하실 경우 상담 신청 및 관련 서비스 이용이 제한될 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
