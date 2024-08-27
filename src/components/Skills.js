import Skill from "@/model/skills";
import { motion } from "framer-motion";
import React from "react";

const Skills = () => {

  const skills = [
    {
      domain: "Programming Languages",
      skills: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "TypeScript"],
    },
    {
      domain: "Libraries & Framework",
      skills: ["ReactJs", "Angular", "Redux", "Express", "NextJs", "NodeJs"],
    },
    {
      domain: "Database Technologies",
      skills: ["SQL", "MongoDB"],
    },
    {
      domain: "Additional Skills",
      skills: ["DOM Manipulation", "API Gateway", "ContextAPI", "Front-End Development", "Full-Stack Development", "AWS", "Git", "GitHub"],
    },
  ];

  return (
    <div>
      {/* about me logo */}
      <h1 className="font-bold flex items-center gap-5 text-[#9b9a9a] text-sm md:text-base mb-16">
        <span className="block w-2 h-2 md:h-3 md:w-3 rounded-full drop-shadow-[0_0px_6px_rgba(255,255,255,1)] bg-[#d6d5d5]"></span>
        Skills
      </h1>

      <div className="w-full relative rounded-md border-[1px] p-3 border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] grid md:grid-cols-2 md:grid-rows-2 gap-3 ">
        {skills.map((skill, index) => (
          <div key={index} className="rounded md:flex-row select-none border-[1px] p-3 border-[rgba(114,112,112,0.5)] items-center min-h-36 ">

            <h1 className="py-4 text-lg">{skill.domain}</h1>

            <div className="flex gap-3 p-2  flex-wrap  ">
              {skill.skills.map((subSkill, subIndex) => (
                <h5 className="border-[rgba(114,112,112,0.5)] rounded border-[1px] px-3 py-1 text-sm " key={subIndex}>{subSkill}</h5>
              ))}
            </div>
          </div>
        ))}




      </div>
    </div>
  );
};

export default Skills;
