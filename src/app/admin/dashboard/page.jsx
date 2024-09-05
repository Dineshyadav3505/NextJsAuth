"use client";
import LogOut from "@/components/LogOut";
import Link from "next/link";
import React, { useState } from "react";

const Admin = () => {
  const [error, setError] = useState(null);

  

  return (
    <div className="py-28 lg:px-52 relative">
      <LogOut/>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="relative p-4 md:p-8 gap-10">
        <h1 className="text-3xl font-bold text-center block w-full">Admin Dashboard</h1>
        
        <div className=" bg-slate-800 h-screen p-2">
        <Link href={"#"} className=" px-5 py-1 border-[1px] rounded-full border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] ">
          View All Users
        </Link>

        </div>
      </div>
    </div>
  );
};

export default Admin;

const link = [
    {
        name: "fullstack project",
        url: "/admin/fullstack"
    },
    {
        name: "Backend project",
        url: "/admin/backend"
    },
    {
        name: "frontend project",
        url: "/admin/frontend"
    },
    {
        name: "Skill",
        url: "/admin/skill"
    },
    {
        name: "resume",
        url: "/admin/resume"
    }
]