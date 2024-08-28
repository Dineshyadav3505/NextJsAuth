"use client";
import Anim from '@/components/Anim';
import { Spotlight } from "@/components/ui/Spotlight";
import Project from '@/components/Project';
import React, { useState } from 'react'
import HeroSection from '@/components/HeroSection';

const MainPage = () => {

  const [inView, setInView] = useState(false);

  setTimeout(() => {
    setInView(true)
  }, 2000);

  return (
    <>
    <Anim/>
    {inView && <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
    />}

    <div className="min-h-screen py-28 lg:px-52">
      <div className="p-4 md:p-8 flex flex-col gap-10">
        <HeroSection/>
        <Project/>
        <Project/>
        <Project/>
        <Project/>
      </div>
    </div>
    </>
  )
}

export default MainPage;