import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import earthImg from "@/assets/earth.jpg";
import Starfield from "./Starfield";

gsap.registerPlugin(ScrollTrigger);

const EarthSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(earthRef.current, { scale: 0.6, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 20%", scrub: 1 }
      });
      gsap.fromTo(textRef.current, { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "top 20%", scrub: 1 }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <Starfield count={80} />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex justify-center">
          <img ref={earthRef} src={earthImg} alt="Earth from space" className="w-64 md:w-96 rounded-full shadow-[0_0_80px_20px_hsl(var(--secondary)/0.3)] animate-float" loading="lazy" width={1024} height={1024} />
        </div>
        <div ref={textRef} className="space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Mission <span className="text-secondary">Briefing</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            Year 2035. Humanity's first crewed mission to Mars is about to launch. You are the astronaut selected for this historic journey — 225 million kilometers from home.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Distance", value: "225M km" },
              { label: "Duration", value: "7 months" },
              { label: "Crew", value: "1 Astronaut" },
              { label: "Speed", value: "40,000 km/h" },
            ].map(stat => (
              <div key={stat.label} className="glass-panel p-4 text-center">
                <div className="font-display text-xl font-bold text-accent glow-accent">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarthSection;
