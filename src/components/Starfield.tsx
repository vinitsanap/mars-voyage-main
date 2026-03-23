import { useMemo } from "react";

const Starfield = ({ count = 120 }: { count?: number }) => {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            "--duration": `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Starfield;
