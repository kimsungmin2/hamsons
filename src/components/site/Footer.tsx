import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="dark-section border-t border-white/10 bg-[oklch(0.14_0.005_250)]">
      <div className="container-x py-10 md:py-16 grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="HamSon" className="h-9 md:h-10 w-auto object-contain" />
            <span className="font-display text-xl md:text-2xl font-bold text-white">함손건설기계</span>
          </div>
          <p className="mt-3 md:mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
            대한민국 축산 건설 현장의 동반자 스키드로더, 굴착기, 휠로더 등 밥캣 중장비 신차, 렌탈, 정비를 한 곳에서.
          </p>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-white mb-3">본사</h4>
          <p className="text-sm text-white/60 leading-relaxed">
            전남광주통합특별시 나주시 왕곡면 장산양산길 18
            <br />
            평일 08:00 ~ 18:00 (점심시간 11:30 ~ 13:00)
            <br />
            토요일 08:00 ~ 17:00
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">연락처</h4>
          <p className="text-sm text-white/60 leading-relaxed">
            대표전화 1577-7269
            <br />
            seil4.kim@gmail.com
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 함손건설기계 Construction Equipment. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">개인정보 처리방침</Link>
            <span>사업자등록번호 625-87-02114</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
