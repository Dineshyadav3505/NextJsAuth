import React from 'react'
import { motion } from "framer-motion";

const Anim = () => {
  return (
    <motion.div 
    initial={{ opacity: 1, width:"100vw", height:"100vh" }}
    animate={{ opacity: 0, width:"100vw", height:0, y:"-100vh" }}
    transition={{ duration: 1 , delay: 1.7 }}
    className=' fixed top-0 font-Anton z-50 h-screen w-screen bg-black flex justify-center items-center gap-2'
    >
        <div 
        className='text-white text-[150px] md:text-[300px] lg:text-[500px] flex justify-center items-center h-36 md:h-72 lg:h-[460px] overflow-hidden'
        >
            <motion.span 
                initial={{ opacity: 0, y:"-400px" }}
                animate={{ opacity: 1, y:"0px" }}
                transition={{ duration: .3 }}
            className='flex justify-center items-center w-full h-full'
            > 
            3 
            </motion.span>
        </div>
        <div 
        className='text-white text-[150px] md:text-[300px] lg:text-[500px] flex justify-center items-center h-36 md:h-72 lg:h-[460px] overflow-hidden'
        >
            <motion.span 
                initial={{ opacity: 0, y:"-400px" }}
                animate={{ opacity: 1, y:"0px" }}
                transition={{ duration: .3, delay: .3 }}
            className='flex justify-center items-center w-full h-full'
            > 
            5 
            </motion.span>
        </div>
        <div 
        className='text-white text-[150px] md:text-[300px] lg:text-[500px] flex justify-center items-center h-36 md:h-72 lg:h-[460px] overflow-hidden'
        >
            <motion.span 
                initial={{ opacity: 0, y:"-400px" }}
                animate={{ opacity: 1, y:"0px" }}
                transition={{ duration: .3, delay: .6 }}
            className='flex justify-center items-center w-full h-full'
            > 
            0 
            </motion.span>
        </div>
        <div 
        className='text-white text-[150px] md:text-[300px] lg:text-[500px] flex justify-center items-center h-36 md:h-72 lg:h-[460px] overflow-hidden'
        >
            <motion.span 
                initial={{ opacity: 0, y:"-400px" }}
                animate={{ opacity: 1, y:"0px" }}
                transition={{ duration: .3, delay: .9 }}
            className='flex justify-center items-center w-full h-full'
            > 
            5 
            </motion.span>
        </div>

    </motion.div>
  )
}

export default Anim;
