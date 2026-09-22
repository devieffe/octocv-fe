import React from "react";
import Navbar from "./Home/Home.Navbar";
import Hero from "./Home/Home.Hero";
import Stats from "./Home/Home.Stats";
import Features from "./Home/Home.Features";
import HowItWorks from "./Home/Home.HowItWorks";
import About from "./Home/Home.About";
import FAQ from "./Home/Home.FAQ";
import Partnership from "./Home/Home.Partnership";
import CTA from "./Home/Home.CTA";
import Footer from "./Home/Home.Footer";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-900"}>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        {/* <DashboardToolkit /> */}
        <About />
        <FAQ />
        <Partnership />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
