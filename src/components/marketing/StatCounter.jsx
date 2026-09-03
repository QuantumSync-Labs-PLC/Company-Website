import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

export default function StatCounter({
  value = 0,
  label = "",
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const current = Math.floor(progress * value * Math.pow(10, decimals)) / Math.pow(10, decimals);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [isInView, value, duration, decimals]);

  const formattedValue = displayValue.toFixed(decimals).replace(/\.0+$/, "");

  return (
    <div ref={ref} className={`flex flex-col items-center text-center ${className}`}>
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold holo-text font-headline">
        {prefix}{formattedValue}{suffix}
      </div>
      <p className="text-qs-text-section text-base sm:text-lg mt-3 leading-relaxed">
        {label}
      </p>
    </div>
  );
}
