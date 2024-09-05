"use client";
import Aboutme from "@/components/Aboutme";
import Skills from "@/components/Skills";
import React, { useEffect } from "react";
import Anim from "@/components/Anim";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const page = () => {

  return (
    <>
    <Navbar/>
    <Anim/>
    <div className="min-h-screen py-28 lg:px-52">
      <div className="p-4 md:p-8">
        <Aboutme/>
        <span className="block border-t-[1px] pb-16 border-[rgba(114,112,112,0.7)] "></span>
        <Skills/>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default page;
