"use client";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import React from "react";


const MianPage = () => {

  return (
    <>
    <Navbar/>
    <div>
      <HomePage />
    </div>
    <Footer/>
    </>
  );
};

export default MianPage;
