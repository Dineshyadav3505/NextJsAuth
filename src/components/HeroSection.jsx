"use client";
import { motion } from "framer-motion";
import React from "react";

const HeroSection = () => {
    
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 4 }}
    className=" h-[400px] flex flex-col pt-10 md:pt-36 text-left items-center ">
      <div className="">
        <h6 className="text-xl md:text-5xl">👋Hello,</h6>
        <h3 className="text-xl md:text-5xl md:py-3 md:pl-24  capitalize">I&#39;m Dinesh yadav,</h3>  
      </div>
    </motion.div>
  );
};

export default HeroSection;
