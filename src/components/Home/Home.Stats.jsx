import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const STATS = [
  { value: "3", label: "career assessments" },
  { value: "2", label: "career maps" },
  { value: "5", label: "career journeys" },
  { value: "150+", label: "users" },
];

const useCountUp = (target, active, duration = 700) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target === 0) {
      setValue(0);
      return undefined;
    }

    let rafId;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, active, duration]);

  return value;
};

const StatItem = ({ value, label, index }) => {
  const statRef = useRef(null);
  const isInView = useInView(statRef, { once: true, amount: 0.1 });
  const numericMatch = value.match(/(\d+)/);
  const target = numericMatch ? Number(numericMatch[1]) : null;
  const animatedValue = useCountUp(target ?? 0, isInView, 800);
  const displayValue = target === null ? value : value.replace(String(target), String(animatedValue));
  const isPlusValue = value.includes("+");

  return (
    <motion.div ref={statRef} variants={fadeUp} className="text-center">
      <dt className="sr-only">{label}</dt>
      <dd className={`text-4xl sm:text-6xl font-semibold leading-none ${index === 0 ? "text-[#FA7A68]" : index === 3 ? "text-[#E85D5D]" : "text-red-500"}`} aria-label={`${value} ${label}`}>
        <span className="inline-flex items-center align-middle gap-0">
          <span>{displayValue.replace("+", "")}</span>
          {isPlusValue && (
            <span className="inline-flex items-center justify-center text-[0.72em] leading-none relative -top-[0.01em] ml-0.5 align-middle">+</span>
          )}
        </span>
        <span className="block text-sm text-gray-400 font-normal mt-1" aria-hidden="true">{label}</span>
      </dd>
    </motion.div>
  );
};

const Stats = () => (
  <section aria-label="Platform statistics" className="bg-slate-900 border-y border-white/5 py-10 sm:py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.dl
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {STATS.map(({ value, label }, index) => (
          <StatItem key={label} value={value} label={label} index={index} />
        ))}
      </motion.dl>
    </div>
  </section>
);

export default Stats;
