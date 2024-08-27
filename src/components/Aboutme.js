import React from "react";
import { motion } from "framer-motion";

const Aboutme = () => {
  return (
    <div className=" pb-16">
      {/* about me logo */}

        <motion.h1 
          initial={{ opacity: 0, x:"-70px"}}
          animate={{ opacity: 1, x:"0px"}}
          transition={{ duration: .7, delay: 2.5 }}
        className="font-bold flex items-center gap-5 text-[#9b9a9a] text-sm md:text-base"
        >
          <span className="block w-2 h-2 md:h-3 md:w-3 rounded-full drop-shadow-[0_0px_6px_rgba(255,255,255,1)] bg-[#d6d5d5]"></span>
          About Me
        </motion.h1>

        <p className="overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, y:"70px"}}
            animate={{ opacity: 1, y:"0px"}}
            transition={{ duration: .7, delay: 2.5,  ease: [0.33, 1, 0.68, 1] }}
          className="py-3 md:py-9 inline-block text-3xl md:text-5xl lg:leading-[50px] tracking-tighter drop-shadow-[0_0px_15px_rgba(255,255,255,0.6)]">
            I&#39;m passionate about creating Web Designs that <span className=" font-Gloock tracking-wide">
              empower and engage people.
            </span>
          </motion.span>
        </p>
        {/* about me passage */}


      {/* Imagage and */}

      <div className="my-10 md:flex gap-3 ">
        <motion.div 
          initial={{ opacity: 0, x:"-70px"}}
          animate={{ opacity: 1, x:"0px"}}
          transition={{ duration: .4, delay: 2.5 }}
        className=" border-[1px] border-[rgba(114,112,112,0.5)] w-full md:w-[45%] rounded-xl p-2 bg-[rgba(114,112,112,0.3)]">
          <img
            className=" rounded-md h-[600px] w-full object-cover"
            src={process.env.NEXT_PUBLIC_Image}
            alt="profile image"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x:"100px"}}
          animate={{ opacity: 1, x:"0px"}}
          transition={{ duration: .4, delay: 2.5 }}
         className="md:w-[55%] py-10 flex flex-col justify-center items-center text-center md:text-left md:items-start md:px-4 text-base md:text-xl space-y-6">
          <h2 className="font-bold">My background in Computer Science.</h2>
          <p>
            In June 2024, I graduated from Chandigarh University in Punjab,
            India. There, I became obsessed with web development.
          </p>
          <p>
            I have always been passionate about three things: creating digital
            designs, development, and experimenting with web animation. Through
            my interest in design, I have always wanted to use my skills to make
            others happy and help them enjoy what they see visually.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Aboutme;
