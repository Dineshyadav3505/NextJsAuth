"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

const ButtonThree = ({ label, link }) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(!hover);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full"
    >
      <Link
        target="_blank"
        href={link}
        className="capitalize py-2 px-3 text-sm w-full flex justify-between items-center gap-2 hover:bg-zinc-700/70 rounded-md"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={` ${
            hover === true ? "size-5" : "size-3"
          } duration-500 -rotate-45 `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </motion.div>
  );
};

export default ButtonThree;
