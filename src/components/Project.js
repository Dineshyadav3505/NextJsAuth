"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ScalingDiv = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px", once: false });
  const [ isHovered, setIsHovered ] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(!isHovered);
  }


  useEffect(() => {
    if (isInView) {
      controls.start({ scale: 1, transition: { duration: 0.5 } });
    } else {
      controls.start({ scale: 0.8, transition: { duration: 0.5 } });
    }
  }, [controls, isInView]); 

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      ref={ref}
      initial={{ scale: 0.8 }}
      animate={controls}
      className="rounded-lg select-none w-full p-2 border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px]"
    >
      <div className=" h-[500px] relative rounded-sm border-[rgba(114,112,112,0.5)] border-[1px]">
        <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        {isHovered && <div className=" absolute bottom-0 w-full flex p-2">
          <div className=" w-full">
            <p className="text-xl drop-shadow-[0_0px_15px_rgba(0,0,0,1)] py-2 ">Project Name  </p>
            <div className=" flex items-center gap-2">
            <p className="text-sm drop-shadow-[0_0px_15px_rgba(0,0,0,1)] px-3 py-1 border-[1px] inline-block rounded-md capitalize "> react.js</p>
            <p className="text-sm drop-shadow-[0_0px_15px_rgba(0,0,0,1)] px-3 py-1 border-[1px] inline-block rounded-md capitalize "> react.js</p>
            </div>

          </div>
         <div className=" flex flex-col justify-center items-end px-3 w-1/3">
           <Link className=" px-4 hover:px-5 duration-300 capitalize py-1 drop-shadow-[0_0px_15px_rgba(0,0,0,1)] hover:bg-black bg-[rgba(114,112,112,0.3)] text-sm rounded-full " href="/" target="_blanck">Live link</Link>
           <Link className=" px-4 hover:px-5 duration-300 capitalize py-1 drop-shadow-[0_0px_15px_rgba(0,0,0,1)] hover:bg-black bg-[rgba(114,112,112,0.3)] text-sm rounded-full " href="/" target="_blanck">github link </Link>
         </div>

        </div>}
      </div>
    </motion.div>
  );
};

export default ScalingDiv;