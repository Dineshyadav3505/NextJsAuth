"use client";
import Link from "next/link";
import React, { useState } from "react";

const ButtonOne = ({ label, link }) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(!hover);
  };

  return (
    <Link
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      target="_blank"
      href={link}
      className="text-base capitalize hidden md:flex justify-center px-4 gap-1 py-1 hover:bg-zinc-700/60 duration-500 rounded-full items-center"
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={` ${
          hover === true ? "size-5" : "size-4"
        } duration-500 -rotate-45 `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </Link>
  );
};

export default ButtonOne;
