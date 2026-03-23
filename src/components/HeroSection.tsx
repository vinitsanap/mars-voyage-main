import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Starfield from "./Starfield";
import rocketImg from "@/assets/rocket-cartoon.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(5);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    } else if (!launched) {
      setLaunched(true);

      const tl = gsap.timeline();

      // Screen shake
      if (shakeRef.current) {
        tl.to(shakeRef.current, {
          x: "random(-4, 4)",
          y: "random(-2, 2)",
          duration: 0.05,
          repeat: 40,
          yoyo: true,
          ease: "none",
        }, 0);
      }

      // Flame grows
      if (flameRef.current) {
        tl.to(flameRef.current, {
          scaleY: 1.8,
          scaleX: 1.2,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, 0);
      }

      // Rocket lifts off
      if (rocketRef.current) {
        tl.to(rocketRef.current, {
          y: "-120vh",
          duration: 2.5,
          ease: "power2.in",
          delay: 0.4,
        }, 0);
      }
    }
  }, [countdown, launched]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div ref={shakeRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-background" />
      </div>
      <Starfield count={80} />

      {/* Rocket with flame */}
      <div ref={rocketRef} className="absolute z-20 flex flex-col items-center" style={{ bottom: "15%" }}>
        <img
          src={rocketImg}
          alt="Rocket with astronaut"
          className="w-28 md:w-40 lg:w-48 drop-shadow-[0_0_30px_hsl(var(--engine-fire)/0.6)]"
        />
        <div
          ref={flameRef}
          className="w-16 md:w-24 -mt-2 opacity-0 origin-top"
          style={{
            background: "radial-gradient(ellipse at top, hsl(var(--engine-fire)), hsl(var(--accent) / 0.8), transparent)",
            height: "80px",
            borderRadius: "0 0 50% 50%",
            filter: "blur(6px)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-6">
          <span className="font-display text-7xl md:text-9xl font-black text-primary glow-text">
            {countdown > 0 ? countdown : "GO!"}
          </span>
        </div>
        <h1 ref={titleRef} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-wider mb-4 opacity-0">
          Journey to <span className="text-primary glow-text">Mars</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          An immersive scroll-based experience through space
        </p>
        <div className="scroll-indicator text-muted-foreground mt-12">
          <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-sm font-body mt-2 block">Scroll to begin</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
