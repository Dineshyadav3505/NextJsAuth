"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skill");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSkills(data.skills);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  let ref = useRef(null);


  return (
    <motion.div 
      initial={{ opacity: 0, y:"350px" }} 
      whileInView={{ opacity: 1, y:"0px",  duration: 2, delay: 0.5 }}
    >
      {/* about me logo */}
      <h1 className="font-bold flex items-center gap-5 text-[#9b9a9a] text-sm md:text-base mb-16">
        <span className="block w-2 h-2 md:h-3 md:w-3 rounded-full drop-shadow-[0_0px_6px_rgba(255,255,255,1)] bg-[#d6d5d5]"></span>
        Skills
      </h1>

      <div ref={ref} 

      className="w-full relative rounded-md border-[1px] p-3 border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] grid md:grid-cols-2 md:grid-rows-2 gap-3 ">

        {skills?.map((skill, index) => (
          <motion.div
            drag
            dragConstraints={ref}
            key={index}
            
            className="rounded md:flex-row select-none border-[1px] p-3 border-[rgba(114,112,112,0.5)] items-center min-h-36 "
          >
            <h1 className="py-4 text-lg">{skill.domain}</h1>

            <div className="flex gap-3 p-2  flex-wrap  ">
              {skill.skills.map((subSkill, subIndex) => (
                <h5
                  className="border-[rgba(114,112,112,0.5)] rounded border-[1px] px-3 py-1 text-sm "
                  key={subIndex}
                >
                  {subSkill}
                </h5>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
