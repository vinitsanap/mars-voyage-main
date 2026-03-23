import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "./Starfield";

gsap.registerPlugin(ScrollTrigger);

const ConclusionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const restart = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Starfield count={100} />
      <div className="absolute inset-0 bg-gradient-to-t from-mars-red/10 via-background to-background" />
      <div ref={contentRef} className="relative z-10 text-center px-4 max-w-2xl mx-auto space-y-8">
        <div className="text-6xl">🧑‍🚀</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
          One Giant <span className="text-primary glow-text">Leap</span>
        </h2>
        <p className="text-muted-foreground text-lg font-body leading-relaxed">
          You made it. Standing on the rust-colored plains of Mars, 225 million kilometers from everything you've ever known. This is humanity's next chapter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={restart}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            Restart Journey
          </button>
          <a
            href="https://mars.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-border text-foreground font-display font-semibold tracking-wider hover:bg-muted transition-colors"
          >
            Explore More
          </a>
        </div>
        <p className="text-muted-foreground text-sm font-body pt-8">
          Built with ❤️ for the cosmos
        </p>
      </div>
    </section>
  );
};

export default ConclusionSection;
