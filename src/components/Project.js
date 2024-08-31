import Link from "next/link";
import React from "react";

const Project = ({ projects }) => {
  return (
    <div className=" flex flex-col gap-20">
      {projects.map((project, index) => (
        <div
          key={index}
          className="w-full md:h-[510px] rounded-xl bg-black border-[1px] hover:scale-105 duration-300 hover:drop-shadow-[0_0px_40px_rgba(255,255,255,.2)] border-[rgba(114,112,112,0.7)] overflow-hidden"
        >
          {/* Project name  */}
          <h1 className=" text-xl capitalize px-3 md:px-10 py-5 md:py-7">
            <span>{(index + 1).toString().padStart(2, "0")} | </span>
            {project.name}
          </h1>

          {/* IMAGE & other Destils */}
          <div className=" md:flex md:h-[84%] gap-10 px-2 md:px-0">
            <div className=" h-[200px] md:h-full md:w-[50%] ">
              <img
                className="w-full h-[100%] md:h-[100%] rounded md:rounded-none object-cover md:rounded-tr-lg"
                src={project.imageLink}
                alt={project.name}
              />
            </div>

            <div className="md:w-[50%] flex flex-col justify-center">
              {/* Project Description */}
              <h3 className=" text-sm md:text-base capitalize py-3 md:pr-4">
                {project.description}
              </h3>

              {/* Technologies */}
              <div className=" flex gap-3 md:py-3 text-xs md:text-sm flex-wrap">
                {project.technologies.map((tech, index) => (
                  <h5 key={index} className="px-3 py-[1px] capitalize border-[1px] rounded">
                    {tech}
                  </h5>
                ))}
              </div>

              {/* Links */}
              <div className="md:flex gap-4 py-2">
                {/* gitHub-link */}
                {project.githubLink && (
                  <Link
                    className="inline-flex capitalize items-center px-2 py-[1px] md:px-4 md:py-1 text-sm gap-1 rounded-md duration-300 hover:text-black hover:scale-105 bg-violet-500"
                    target="_blank"
                    href={project.githubLink}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 2A2.25 2.25 0 0 0 2 4.25v11.5A2.25 2.25 0 0 0 4.25 18h11.5A2.25 2.25 0 0 0 18 15.75V4.25A2.25 2.25 0 0 0 15.75 2H4.25Zm4.03 6.28a.75.75 0 0 0-1.06-1.06L4.97 9.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06L6.56 10l1.72-1.72Zm4.5-1.06a.75.75 0 1 0-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06l-2.25-2.25Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span>source Code</span>
                  </Link>
                )}
                {/* Website link */}
                {project.liveLink && (
                  <Link
                  className="inline-flex capitalize items-center px-2 py-[1px] md:px-4 md:py-1 text-sm gap-1 rounded-md duration-300 hover:text-black hover:scale-105 bg-violet-500"
                  target="_blank"
                    href={project.liveLink}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                    <span>Web-Site</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
