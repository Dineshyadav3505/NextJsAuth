"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const Resume = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [resumeImage, setResumeImage] = React.useState("");

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      setError(""); 
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
        setResumeImage(data.resume[0].resumeImage); 
        setSuccess("Resume fetched successfully!");
        console.log(data.resume[0].resumeImage);
      } catch (error) {
        setError("Error while fetching resume: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []); // Corrected the dependency array

  return (
    <div className="flex flex-col w-full px-5 items-center justify-center pt-28 lg:pt-36 bgred-900">
      {loading && <p>Loading...</p>}
      {resumeImage && (
        <div className="">
          <img src={resumeImage} className="h-full w-full object-cover" alt="" />
        </div>
      )}
    </div>
  );
};

export default Resume;
