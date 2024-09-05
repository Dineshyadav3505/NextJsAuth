"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const LogOut = () => {
  const [error, setError] = useState(null);
  const [isUserLoggingIn, setIsUserLoggingIn] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("_kodingmonk");
    if (token) {
      setIsUserLoggingIn(true);
    }
  }, []);

  const logOut = async () => {
    try {
      const response = await fetch('/api/user/log-out', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // Clear the access token from cookies
      Cookies.remove('accessToken');
      router.push("/");
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <>
      {isUserLoggingIn && (
        <div
          onClick={logOut}
          role="button"
          aria-label="Log out"
          className="flex fixed justify-center items-center rounded-full z-20 border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px] bottom-10 right-5 px-3 py-1 text-sm gap-1 cursor-pointer hover:bg-[rgba(114,112,112,0.5)] transition"
        >
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5" // Adjusted size for better responsiveness
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
            />
          </svg>
          Log Out
        </div>
      )}
    </>
  );
};

export default LogOut;