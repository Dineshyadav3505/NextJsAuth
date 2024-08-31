"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ScalingDiv = ({ projects }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px", once: false });
  const [isHovered, setIsHovered] = useState(false); // Set default to false

  // Handle mouse enter and leave events
  const handleMouseEnter = () => {
    setIsHovered(true); // Set to true on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Reset on mouse leave
  };

  // Animation control based on view and hover state
  useEffect(() => {
    if (isInView) {
      controls.start({ scale: 1.1, transition: { duration: 0.5 } }); // Scale up when in view
    } else {
      controls.start({ scale: 1, transition: { duration: 0.5 } }); // Scale back to normal when out of view
    }
  }, [controls, isInView]);

  // Animation control based on hover state
  useEffect(() => {
    if (isHovered) {
      controls.start({ scale: 1.05, transition: { duration: 0.3 } }); // Scale slightly when hovered
    } else {
      controls.start({ scale: 1, transition: { duration: 0.3 } }); // Scale back to normal when not hovered
    }
  }, [controls, isHovered]);

  return (
    <>
      {projects.map((proj) => (
        <motion.div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={ref}
          initial={{ scale: 1 }} // Initial scale
          animate={controls} // Use animation controls
          key={proj._id} // Use unique ID for key
          className="rounded-lg select-none w-full mb-16 p-2 border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px]"
        >
          <div className="h-[500px] relative rounded-sm border-[rgba(114,112,112,0.5)] border-[1px]">
            <img
              className="h-full w-full object-cover"
              src={proj.imageLink} // Use dynamic image link
              alt={proj.name}
            />

            {isHovered && (
              <div className="absolute bottom-0 w-full md:flex p-2">
                <div className="w-full">
                  <p className="text-xl drop-shadow-[0_0px_15px_rgba(0,0,0,1)] py-2">{proj.name}</p>
                  <div className="flex items-center gap-2">
                    {proj.technologies.map((tech, techIndex) => (
                      <p
                        key={techIndex}
                        className="text-sm drop-shadow-[0_0px_15px_rgba(0,0,0,1)] px-3 py-1 border-[1px] inline-block rounded-md capitalize"
                      >
                        {tech}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end py-3 md:py-0 md:w-1/3">
                  {proj.githubLink && (
                    <Link
                      className="w-full px-3 py-1 border-[1px] inline-block rounded-md duration-300 capitalize drop-shadow-[0_0px_15px_rgba(0,0,0,1)] hover:bg-black bg-[rgba(114,112,112,0.3)] text-sm"
                      href={proj.githubLink} // Use dynamic link
                      target="_blank"
                    >
                      GitHub Link
                    </Link>
                  )}
                  {proj.liveLink && (
                    <Link
                      className="w-full px-3 py-1 border-[1px] inline-block rounded-md duration-300 capitalize drop-shadow-[0_0px_15px_rgba(0,0,0,1)] hover:bg-black bg-[rgba(114,112,112,0.3)] text-sm"
                      href={proj.liveLink} // Use dynamic link
                      target="_blank"
                    >
                      Live Link
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default ScalingDiv;