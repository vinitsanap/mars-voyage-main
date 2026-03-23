import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import marsSurfaceImg from "@/assets/mars-surface.jpg";
import rocketImg from "@/assets/rocket-cartoon.png";

gsap.registerPlugin(ScrollTrigger);

const MarsLandingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rocket descending
      gsap.fromTo(rocketRef.current, { y: -300, rotate: 45 }, {
        y: 0, rotate: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "center center", scrub: 1 }
      });
      // Dust explosion on landing
      gsap.fromTo(dustRef.current, { scale: 0, opacity: 0 }, {
        scale: 1.5, opacity: 0.8, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "center 60%", end: "center 40%", scrub: 1 }
      });
      // Color transition overlay
      gsap.fromTo(overlayRef.current, { opacity: 0 }, {
        opacity: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top top", scrub: 1 }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Mars background */}
      <div className="absolute inset-0">
        <img src={marsSurfaceImg} alt="Mars surface" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background" />
      </div>

      {/* Color transition overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-mars-red/20 opacity-0" />

      {/* Descending rocket */}
      <div ref={rocketRef} className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10">
        <img src={rocketImg} alt="Rocket landing" className="w-24 md:w-36 drop-shadow-[0_0_40px_hsl(var(--engine-fire)/0.8)]" width={512} height={768} />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-14 bg-gradient-to-b from-engine via-primary to-transparent rounded-full blur-lg opacity-90 animate-pulse" />
      </div>

      {/* Dust effect */}
      <div ref={dustRef} className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-64 h-32 bg-mars-orange/40 rounded-full blur-3xl" />

      {/* Text */}
      <div className="relative z-10 text-center pb-20 px-4">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          <span className="text-primary glow-text">Mars</span> Landing
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
          After 7 months of darkness, the red planet fills the viewport. Retro-rockets fire. Dust billows. Touchdown.
        </p>
      </div>
    </section>
  );
};

export default MarsLandingSection;
