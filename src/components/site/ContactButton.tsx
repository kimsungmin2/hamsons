import { useNavigate, useRouterState } from "@tanstack/react-router";

export function ContactButton({
  className,
  children,
  onBeforeNavigate,
}: {
  className?: string;
  children: React.ReactNode;
  onBeforeNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onBeforeNavigate?.();
    if (pathname === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "/#contact");
    } else {
      navigate({ to: "/", hash: "contact" }).then(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        });
      });
    }
  };

  return (
    <a href="/#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
