import Link from "next/link";
import React from "react";

const Footer = () => {
  const link = [
    {
      title: "MAIN",
      items: [
        { name: "work", url: "/" },
        { name: "info", url: "/info" },
      ],
    },
  ];

  const social = [
    {
      title: "Contact",
      items: [
        {
          name: "linkedin",
          url: "https://www.linkedin.com/in/dinesh-yadav-6aa877198",
        },
        { name: "resume", url: "/resume" },
      ],
    },
  ];
  return (
    <footer className="">
      <div className="py-10 lg:py-16 md:grid md:grid-flow-col md:grid-cols-5 ">
        <div className="hidden md:flex items-center md:col-span-3 pl-36">
          <div className="border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px] px-2 p-1 rounded">
            <p className="font-mono text-3xl ">35</p>
            <p className="font-mono text-3xl ">05</p>
          </div>
        </div>

        {/* link */}
        <div className=" md:col-span-2 flex gap-24 md:gap-36 px-5">
          <div className="">
            {link.map((item, index) => (
              <div key={index}>
                <h1 className="text-xs py-4 text-zinc-600 uppercase ">
                  {item.title}
                </h1>
                <ul>
                  {item.items.map((item, index) => (
                    <li key={index}>
                      {" "}
                      <Link
                        href={item.url}
                        className="text-base capitalize inline-block py-2 "
                      >
                        {item.name}
                      </Link>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="">
            {social.map((item, index) => (
              <div key={index}>
                <h1 className="text-xs py-4 text-zinc-600 uppercase">
                  {item.title}
                </h1>
                <ul>
                  {item.items.map((item, index) => (
                    <li key={index}>
                      {" "}
                      <Link
                        target="_blanck"
                        className="text-base capitalize inline-block py-2 "
                        href={item.url}
                      >
                        {item.name}
                      </Link>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <p className="text-center py-3 text-zinc-500 text-sm ">
          &copy; 2024 Dinesh Yadav. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
