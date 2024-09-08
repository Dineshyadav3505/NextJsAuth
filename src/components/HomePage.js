"use client";
import Anim from "@/components/Anim";
import { Spotlight } from "@/components/ui/Spotlight";
import ScalingDiv from "@/components/Project";
import React, { useEffect, useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

const HomePage = () => {
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInView(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fetchProject = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("api/project/allproject");
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProject(data);
    } catch (err) {
      setError({
        code: err.name,
        message: "An error occurred while fetching project data.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (project.length === 0) {
      fetchProject();
    }
  }, [project, fetchProject]);

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
          {error ? (
            <div className="text-red-500">{error.message}</div>
          ) : (
            <ScalingDiv projects={project} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;