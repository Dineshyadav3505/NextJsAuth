"use client";
import React, { Children, useEffect, useState } from "react";
import ButtonOne from "./ButtonOne";
import ButtonSec from "./ButtonSec";
import { motion } from "framer-motion";
import ButtonThree from "./ButtonThree";

const Navbar = () => {
  const [resume, setResume] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/resume", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch resume");
        }

        const data = await response.json();
        setResume(data.resume[0].resumeImage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();
  }, []);

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: "-100px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className=" select-none fixed z-20 top-0 w-full py-5 flex justify-between px-2 md:px-10 items-center"
    >
      {/* logo */}
      <div className="py-2 px-3 flex justify-start items-center gap-3">
        <div className="border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px] px-2 p-1 rounded">
          <p className="font-mono text-sm bprder-[1px] ">35</p>
          <p className="font-mono text-sm">05</p>
        </div>
        <span className="">
          <h2 className="text-lg hidden md:block capitalize font-sans">
            Dinesh Yadav
          </h2>
          <h1 className="text-xs hidden md:block capitalize ">Web developer</h1>
        </span>
      </div>

      {/* page */}
      <div className="py-2 px-4 rounded-full flex items-center gap-4 border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px] ">
        <ButtonSec label={"Work"} link={"/"} />
        <ButtonSec label={"info"} link={"/info"} />
      </div>

      {/* Link */}
      <div className="py-2 px-3 justify-end flex gap-2 lg:w-1/5 ">
        <div
          onClick={handleNav}
          className="h-10 w-10 md:hidden border-[1px] flex justify-center items-center rounded-full bg-[rgba(114,112,112,0.3)]"
        >
          <motion.div
            initial={{
              rotate: 0,
              opacity: 1,
              height: 20,
              width: 20,
            }}
            whileTap={{
              rotate: 360,
              opacity: 0,
              height: 0,
              width: 0,
            }} // Changed onTap to whileTap for better interaction
            transition={{ duration: 0.4 }}
            className="h-10 w-12 flex justify-center items-center"
          >
            {nav === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            )}
          </motion.div>
        </div>
        <ButtonOne
          label={"linkedIn"}
          link={"https://www.linkedin.com/in/dinesh-yadav-6aa877198"}
        />
        <ButtonOne label={"Email"} link={"mailto:dineshydv3505@gmail.com"} />
        <ButtonOne label={"Resume"} link={resume} />
      </div>

      {/* mobile Link */}
      {nav && (
        <motion.div
          layout="true"
          initial={{ opacity: 0, height: 2, width: 2 }}
          animate={{ opacity: 1, height: 160, width: 170 }}
          transition={{ duration: 0.5 }}
          className=" absolute z-10 top-24 flex flex-col justify-center items-center right-3 bg-[rgba(114,112,112,0.6)] border-[1px] rounded-md border-[rgba(114,112,112,0.7)] p-1 "
        >
          <ButtonThree
            label={"linkedIn"}
            link={"https://www.linkedin.com/in/dinesh-yadav-6aa877198"}
          />
          <ButtonThree
            label={"github"}
            link={"https://github.com/Dineshyadav3505"}
          />
          <ButtonThree
            label={"Email"}
            link={"mailto:dineshydv3505@gmail.com"}
          />
          <ButtonThree label={"resume"} link={resume} />
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
