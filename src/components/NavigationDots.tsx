import { useEffect, useState } from "react";

const sections = ["Launch", "Earth", "Travel", "Landing", "Explore", "End"];

const NavigationDots = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const sectionEls = document.querySelectorAll("section");
      sectionEls.forEach((sec, i) => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          setActive(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (i: number) => {
    const sectionEls = document.querySelectorAll("section");
    sectionEls[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {sections.map((label, i) => (
        <button
          key={label}
          onClick={() => scrollTo(i)}
          className="group flex items-center gap-2 justify-end"
          aria-label={`Go to ${label}`}
        >
          <span className={`text-xs font-display opacity-0 group-hover:opacity-100 transition-opacity ${i === active ? "text-primary" : "text-muted-foreground"}`}>
            {label}
          </span>
          <span className={`w-3 h-3 rounded-full border-2 transition-all ${i === active ? "bg-primary border-primary scale-125 shadow-[0_0_10px_hsl(var(--primary)/0.5)]" : "border-muted-foreground hover:border-foreground"}`} />
        </button>
      ))}
    </nav>
  );
};

export default NavigationDots;
