import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Does OctoCV create or alter my CV automatically?",
    answer:
      "Yes. You can upload an existing CV, choose a career path and language, and OctoCV will generate a stronger version aligned to your goals.",
  },
  {
    question: "What are the career assessments for?",
    answer:
      "They help understand your strengths and interests so the platform can guide you toward the right career opportunities and support tools.",
  },
  {
    question: "Can I use OctoCV without a technical background?",
    answer:
      "Absolutely. The platform is designed for practical, career-building guidance and helps you move through each step in plain language.",
  },
  {
    question: "The service is free, right?",
    answer:
      "You can get started for free, then continue building your profile and career assets as you move through the platform.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 sm:py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">F A Q</p>
          <h2 id="faq-heading" className="text-4xl sm:text-5xl font-black text-white">
            <span class="faq-heading">Questions</span> <span className="text-red-500">answered</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-slate-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-white font-semibold"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} size={28} strokeWidth={2.5} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-400 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
