import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rocketImg from "@/assets/rocket-cartoon.png";
import Starfield from "./Starfield";

gsap.registerPlugin(ScrollTrigger);

const SpaceTravelSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLImageElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers
      gsap.to(layer1Ref.current, {
        y: -200,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.5 }
      });
      gsap.to(layer2Ref.current, {
        y: -400,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.5 }
      });

      // Sticky rocket
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: rocketRef.current,
        pinSpacing: false,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] overflow-hidden">
      {/* Parallax star layers */}
      <div ref={layer1Ref} className="absolute inset-0">
        <Starfield count={100} />
      </div>
      <div ref={layer2Ref} className="absolute inset-0">
        <Starfield count={50} />
      </div>

      {/* Floating planets */}
      <div className="absolute top-[20%] right-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary to-secondary/50 shadow-[0_0_40px_10px_hsl(var(--secondary)/0.3)] animate-float" />
      <div className="absolute top-[50%] left-[8%] w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-accent to-accent/50 shadow-[0_0_30px_8px_hsl(var(--accent)/0.3)] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[75%] right-[20%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-mars-red to-mars-orange shadow-[0_0_20px_5px_hsl(var(--mars-red)/0.3)] animate-float" style={{ animationDelay: "4s" }} />

      {/* Rocket with astronaut */}
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <img ref={rocketRef} src={rocketImg} alt="Rocket with astronaut" className="w-40 md:w-56 drop-shadow-[0_0_30px_hsl(var(--engine-fire)/0.6)]" width={512} height={768} />
          {/* Engine fire effect */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-engine via-accent to-transparent rounded-full blur-md opacity-80 animate-pulse" />
        </div>
      </div>

      {/* Journey text */}
      <div className="absolute bottom-[20%] left-0 right-0 text-center z-10 px-4">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Crossing the <span className="text-accent glow-accent">Void</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
          225 million kilometers of emptiness. Stars drift past the window as the astronaut floats weightlessly inside the cockpit.
        </p>
      </div>
    </section>
  );
};

export default SpaceTravelSection;
