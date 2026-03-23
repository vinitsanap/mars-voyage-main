import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import astronautImg from "@/assets/astronaut-mars.jpg";

gsap.registerPlugin(ScrollTrigger);

const marsFactsData = [
  { id: 1, title: "Olympus Mons", desc: "The tallest volcano in the solar system — 21.9 km high, nearly 3× Mount Everest.", x: 20, y: 30 },
  { id: 2, title: "Valles Marineris", desc: "A canyon system stretching 4,000 km — visible from orbit.", x: 55, y: 25 },
  { id: 3, title: "Polar Ice Caps", desc: "Mars has frozen CO₂ and water ice caps at both poles.", x: 75, y: 45 },
  { id: 4, title: "Thin Atmosphere", desc: "Mars atmosphere is 95% CO₂ and only 1% as thick as Earth's.", x: 35, y: 65 },
];

interface CompareSliderProps {
  leftLabel: string;
  rightLabel: string;
  items: Array<{ label: string; earth: string; mars: string }>;
}

const CompareSlider = ({ leftLabel, rightLabel, items }: CompareSliderProps) => {
  const [value, setValue] = useState(50);
  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex justify-between text-sm font-display">
        <span className="text-secondary">{leftLabel}</span>
        <span className="text-primary">{rightLabel}</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={e => setValue(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.label} className="flex justify-between text-sm font-body">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="text-foreground font-medium">
              {value < 50 ? item.earth : item.mars}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExplorationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fact-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          delay: i * 0.15,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-mars-red/5 to-background" />

      <div className="container mx-auto px-4 relative z-10 space-y-16">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Explore the <span className="text-primary glow-text">Red Planet</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            The astronaut steps onto Mars. Click the hotspots to discover this alien world.
          </p>
        </div>

        {/* Interactive hotspot map */}
        <div className="relative rounded-xl overflow-hidden max-w-4xl mx-auto">
          <img src={astronautImg} alt="Astronaut on Mars" className="w-full rounded-xl" loading="lazy" width={1024} height={1024} />
          <div className="absolute inset-0">
            {marsFactsData.map(fact => (
              <button
                key={fact.id}
                onClick={() => setActiveHotspot(activeHotspot === fact.id ? null : fact.id)}
                className="absolute w-8 h-8 rounded-full bg-primary/80 border-2 border-primary-foreground hotspot-pulse cursor-pointer hover:scale-125 transition-transform"
                style={{ left: `${fact.x}%`, top: `${fact.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <span className="text-primary-foreground font-display text-xs font-bold">{fact.id}</span>
              </button>
            ))}
            {activeHotspot && (() => {
              const fact = marsFactsData.find(f => f.id === activeHotspot)!;
              return (
                <div
                  className="absolute glass-panel p-4 max-w-xs z-20"
                  style={{ left: `${Math.min(fact.x + 5, 60)}%`, top: `${fact.y}%` }}
                >
                  <h4 className="font-display text-sm font-bold text-accent mb-1">{fact.title}</h4>
                  <p className="text-xs text-muted-foreground font-body">{fact.desc}</p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Mars fact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { icon: "🌡️", title: "Temperature", value: "-63°C avg" },
            { icon: "⚖️", title: "Gravity", value: "38% of Earth" },
            { icon: "🕐", title: "Day Length", value: "24h 37min" },
            { icon: "🌍", title: "Diameter", value: "6,779 km" },
          ].map(card => (
            <div key={card.title} className="fact-card glass-panel p-6 text-center hover:scale-105 transition-transform cursor-default">
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="font-display text-sm font-semibold text-foreground mb-1">{card.title}</div>
              <div className="text-accent font-display text-lg font-bold glow-accent">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Earth vs Mars comparison */}
        <div className="max-w-md mx-auto">
          <CompareSlider
            leftLabel="Earth"
            rightLabel="Mars"
            items={[
              { label: "Gravity", earth: "9.8 m/s²", mars: "3.7 m/s²" },
              { label: "Atmosphere", earth: "Nitrogen/Oxygen", mars: "95% CO₂" },
              { label: "Surface Temp", earth: "15°C avg", mars: "-63°C avg" },
              { label: "Moons", earth: "1 (Moon)", mars: "2 (Phobos, Deimos)" },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default ExplorationSection;
