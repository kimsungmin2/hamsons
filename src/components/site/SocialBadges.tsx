import { MessageCircle } from "lucide-react";

type Variant = "compact" | "cta" | "floating" | "hero";

const BADGES = [
  {
    key: "naver",
    label: "네이버 블로그",
    short: "블로그",
    href: "https://blog.naver.com/bobcat920",
    // Naver "N" mark
    icon: <span className="font-display text-[11px] font-extrabold leading-none tracking-tight">N</span>,
  },
  {
    key: "kakao",
    label: "카카오톡 상담",
    short: "카카오톡",
    href: "https://pf.kakao.com/_JHxmxaK",
    icon: <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.4} />,
  },
  {
    key: "youtube",
    label: "유튜브",
    short: "유튜브",
    href: "https://youtube.com/@hamson726/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "인스타그램",
    short: "인스타",
    href: "https://www.instagram.com/hamson_bobcat/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const;

export function SocialBadges({ variant = "compact", className = "" }: { variant?: Variant; className?: string }) {
  if (variant === "cta") {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {BADGES.map((b) => {
          const isKakao = b.key === "kakao";
          return (
            <a
              key={b.key}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.label}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--surface)]">
                {b.icon}
              </span>
              <span>{isKakao ? "카카오톡 상담하기" : b.label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4 backdrop-blur-md ${className}`}
        role="group"
        aria-label="소셜 채널"
      >
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">Connect</span>
        <span className="h-3 w-px bg-white/15" />
        {BADGES.map((b) => (
          <a
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={b.label}
            title={b.label}
            className="group inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/20 hover:text-primary"
          >
            {b.icon}
          </a>
        ))}
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:flex ${className}`} aria-label="빠른 연결">
        <div className="flex flex-col items-stretch gap-3 rounded-full border border-white/12 bg-black/60 p-2.5 backdrop-blur-xl shadow-card">
          {BADGES.map((b) => {
            return (
              <a
                key={b.key}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={b.label}
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/5 text-base text-white/85 transition-all duration-300 hover:-translate-x-1 hover:scale-105 hover:border-primary/55 hover:bg-primary/15 hover:text-primary"
              >
                <span className="[&>svg]:h-5 [&>svg]:w-5 [&>span]:text-[15px]">{b.icon}</span>
                <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                  {b.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // compact — for hero / price box vicinity
  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="소셜 채널">
      {BADGES.map((b) => (
        <a
          key={b.key}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={b.label}
          title={b.label}
          className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
        >
          {b.icon}
        </a>
      ))}
    </div>
  );
}
