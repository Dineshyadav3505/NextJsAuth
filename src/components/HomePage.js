"use client";
import Anim from "@/components/Anim";
import { Spotlight } from "@/components/ui/Spotlight";
import ScalingDiv from "@/components/Project";
import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

const HomePage = () => {
  const [inView, setInView] = useState(false);

  setTimeout(() => {
    setInView(true);
  }, 2000);

  return (
    <>
      <Anim />
      {inView && (
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      )}

      <div className="min-h-screen py-28 lg:px-52">
        <div className=" relative p-4 md:p-8 flex flex-col gap-10">
          <HeroSection />
          <motion.div
            initial={{ height: 800 }}
            animate={{ height: 0 }}
            transition={{ duration: 0.5, delay: 5 }}
            className="w-full "
          ></motion.div>
          <ScalingDiv/>
          <ScalingDiv/>
          <ScalingDiv/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
