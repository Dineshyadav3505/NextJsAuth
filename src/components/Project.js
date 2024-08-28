import React from "react";
import { motion } from "framer-motion";

const Project = () => {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y:"350px" }} 
      whileInView={{ opacity: 1, y:"0px",  duration: 2, delay: 0.5 }}
      className=""
    >
      <div
        className={`duration-500 border-[rgba(114,112,112,0.5)] mb-3 bg-[rgba(114,112,112,0.3)] border-[1px] p-2 rounded-xl ${
          isHovered ? "h-[610px] scale-105 " : ""
        }`}
      >
        <div className="h-[500px] bg-slate-700 rounded">

        </div>
      {isHovered && (
        <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1,y: 0 }}
        transition={{ duration: 0.5 }}
        className={` ${isHovered && "scale-105 "} h-[90px] duration-500 p-3 mt-1 rounded border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px]`}>
            <h2>kjabf</h2>
            <p className="text-sm text-[rgba(114,112,112,0.7)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vitae purus nec nunc laoreet ultricies. Nam auctor, justo nec
              ultricies.
            </p>
        </motion.div>
      )}
      </div>
    </motion.div>
  );
};

export default Project;
