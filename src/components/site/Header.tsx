import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

import logo from "@/assets/logo.png";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모바일 메뉴 열려 있을 때 body 스크롤 잠금
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // 경로 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleContactClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMobileOpen(false);
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

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-background/85 border-b border-border shadow-sm"
            : "bg-background/60 backdrop-blur"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logo} alt="HamSon" className="h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-white">
              함손건설기계
            </span>
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop CTA */}
          <a
            href="/#contact"
            onClick={handleContactClick}
            className="hidden md:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition cursor-pointer"
          >
            상담 신청
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-white backdrop-blur transition hover:border-primary/40 hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={closeMobile}
            />

            {/* Menu content */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center h-full px-8 gap-2"
            >
              {nav.map((n, i) => {
                const stagger = { delay: i * 0.04 };
                if ("external" in n && n.external) {
                  return (
                    <motion.a
                      key={n.label}
                      href={n.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobile}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ...stagger }}
                      className="w-full max-w-xs text-center py-3.5 text-xl font-semibold tracking-wide text-white/90 hover:text-primary transition-colors"
                    >
                      {n.label}
                      <span className="ml-1.5 text-xs text-white/40">↗</span>
                    </motion.a>
                  );
                }
                if (n.hash) {
                  return (
                    <motion.a
                      key={n.label}
                      href={`/#${n.hash}`}
                      onClick={handleContactClick}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ...stagger }}
                      className="w-full max-w-xs text-center py-3.5 text-xl font-semibold tracking-wide text-white/90 hover:text-primary transition-colors cursor-pointer"
                    >
                      {n.label}
                    </motion.a>
                  );
                }
                return (
                  <motion.div
                    key={n.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ...stagger }}
                  >
                    <Link
                      to={n.to}
                      onClick={closeMobile}
                      className="block w-full max-w-xs text-center py-3.5 text-xl font-semibold tracking-wide text-white/90 hover:text-primary transition-colors"
                      activeProps={{ className: "block w-full max-w-xs text-center py-3.5 text-xl font-bold tracking-wide text-primary" }}
                      activeOptions={{ exact: true }}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                );
              })}

            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
