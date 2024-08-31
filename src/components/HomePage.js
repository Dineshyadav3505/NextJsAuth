"use client";
import Anim from "@/components/Anim";
import { Spotlight } from "@/components/ui/Spotlight";
import ScalingDiv from "@/components/Project";
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

const HomePage = () => {
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [error, setError] = useState(null);

  // Use useEffect to set inView after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setInView(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch("api/project/allproject");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProject(data); // Set the project data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

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
        <div className="relative p-4 md:p-8 flex flex-col gap-10">
          <HeroSection />
          <motion.div
            initial={{ height: 800 }}
            animate={{ height: 0 }}
            transition={{ duration: 0.5, delay: 5 }}
            className="w-full"
          ></motion.div>
          <ScalingDiv projects={project} /> {/* Pass projects to ScalingDiv */}
        </div>
      </div>
    </>
  );
};

export default HomePage;