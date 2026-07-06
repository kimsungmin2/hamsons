import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

type NavItem =
  | { to: string; label: string; external?: false; hash?: string }
  | { to: string; label: string; external: true };

const nav: ReadonlyArray<NavItem> = [
  { to: "/", label: "홈" },
  { to: "/products", label: "제품" },
  { to: "/rental", label: "렌탈·중고" },
  { to: "/service", label: "서비스" },
  { to: "/about", label: "회사소개" },
  { to: "https://hamson.co.kr/", label: "쇼핑몰", external: true },
  { to: "/", hash: "contact", label: "문의" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleContactClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (pathname === "/") {
        scrollToContact();
        history.replaceState(null, "", "/#contact");
      } else {
        navigate({ to: "/", hash: "contact" }).then(() => {
          // wait for next frame so the section is mounted
          requestAnimationFrame(() => setTimeout(scrollToContact, 50));
        });
      }
    },
    [pathname, navigate, scrollToContact],
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/85 border-b border-border shadow-sm"
          : "bg-background/60 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-orange shadow-glow">
            <span className="h-2 w-2 rounded-sm bg-primary-foreground" />
          </span>
          <span
            className="font-display text-lg font-black tracking-tighter text-white"
            style={{ textShadow: "0 0 18px rgba(255,255,255,0.12)" }}
          >
            함손건설기계
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            if ("external" in n && n.external) {
              return (
                <a
                  key={n.label}
                  href={n.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-primary transition-colors"
                >
                  {n.label}
                </a>
              );
            }
            if (n.hash) {
              return (
                <a
                  key={n.label}
                  href={`/#${n.hash}`}
                  onClick={handleContactClick}
                  className="px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-primary transition-colors cursor-pointer"
                >
                  {n.label}
                </a>
              );
            }
            return (
              <Link
                key={n.label}
                to={n.to}
                className="px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-primary transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm font-semibold tracking-wide text-primary" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <a
          href="/#contact"
          onClick={handleContactClick}
          className="hidden md:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition cursor-pointer"
        >
          상담 신청
        </a>
      </div>
    </header>
  );
}
