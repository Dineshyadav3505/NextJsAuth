"use client";
import { easeInOut, motion } from 'framer-motion'
import { useTransform, useViewportScroll } from 'framer-motion'

import Link from 'next/link'
import React, { useState } from 'react'

const Project = () => {

  const [hover, setHover] = useState(false)
  const { scrollYProgress } = useViewportScroll()
  console.log(scrollYProgress.prev)
  const scale = useTransform(scrollYProgress, [0, 0.03], [0.8, 1]);

  const handleMouseEnter = () => {
    setHover(!hover)
  }

  return (
    <motion.div 
    style={{ scale , scaleY: scrollYProgress}}

    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseEnter}
    className='border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px] p-2 rounded-lg'>
      <div className="border-[rgba(114,112,112,0.5)] relative overflow-hidden border-[1px] h-[600px] rounded">
        <img className='object-cover h-full' src="https://images.unsplash.com/photo-1723754165998-305df32c501e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        {hover && <motion.div
          initial={{ y: "100%"}}
          animate={{ y: "0%"}}
          transition={{ duration: .7, ease: easeInOut}}
          exit
         className=" absolute bottom-0 w-full p-3 md:flex">
          <div className="md:w-full flex flex-col">
            <h1 className=' text-lg capitalize drop-shadow-[0_0px_10px_rgba(0,0,0,1)]'>project name</h1>
            <div className="flex  gap-2 flex-wrap py-1">
            <p className='px-3 py-1 rounded text-xs border-[1px] inline-block drop-shadow-[0_0px_10px_rgba(0,0,0,1)]'>Express</p>
            <p className='px-3 py-1 rounded text-xs border-[1px] inline-block drop-shadow-[0_0px_10px_rgba(0,0,0,1)]'>Nodesjs</p>
            </div>
          </div>
          <div className="flex justify-end px-3 items-center">
            <Link className=' text-sm  px-4 py-1 bg-[#313030] hover:px-5 duration-500 hover:bg-black rounded-2xl capitalize' target='_blanck' href="#">github</Link>
            <Link className=' text-sm  px-4 py-1 bg-[#313030] hover:px-5 duration-500 hover:bg-black rounded-2xl capitalize' target='_blanck' href="#">live</Link>
          </div>
        </motion.div>}
      </div>
    </motion.div>
  )
}

export default Project;