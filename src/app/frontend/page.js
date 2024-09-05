"use client";
import Input from "@/components/Input";
import React, { useState } from "react";

function ProjectForm({ mode = "create", existingProject = {} }) {
  const [name, setName] = useState(existingProject.name || "");
  const [description, setDescription] = useState(
    existingProject.description || ""
  );
  const [imageLink, setImageLink] = useState(null);
  const [githubLink, setGithubLink] = useState(
    existingProject.githubLink || ""
  );
  const [liveLink, setLiveLink] = useState(existingProject.liveLink || "");
  const [technologies, setTechnologies] = useState(
    existingProject.technologies || []
  );

  const handleFileChange = (e) => {
    setImageLink(e.target.files[0]);
  };

  const handleTechnologyChange = (e, index) => {
    const updatedTechnologies = [...technologies];
    updatedTechnologies[index] = e.target.value;
    setTechnologies(updatedTechnologies);
  };

  const addTechnologyField = () => {
    setTechnologies([...technologies, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("imageLink", imageLink);
    formData.append("githubLink", githubLink);
    formData.append("liveLink", liveLink);
    technologies.forEach((tech) => formData.append("technologies", tech));

    try {
      const response = await fetch(
        `/api/project/frontend${
          mode === "update" ? `?id=${existingProject._id}` : ""
        }`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center space-y-5">
      <div className="py-24">
      <h1 className="text-2xl font-bold text-center bg-violet-600 my-10 rounded capitalize">frontend</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input
          type="text"
          name="projectName"
          id="projectName"
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="textarea"
          name="description"
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Input
          type="file"
          name="image"
          id="image"
          label="Upload Image"
          onChange={handleFileChange}
          required={mode === "create"}
        />

        <Input
          type="url"
          name="githubLink"
          id="githubLink"
          label="GitHub Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <Input
          type="url"
          name="liveLink"
          id="liveLink"
          label="Live Link"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
        />

        <div>
          <label className="text-base">Technologies</label>
          {technologies.map((tech, index) => (
            <Input
              key={index}
              type="text"
              name={`technology-${index}`}
              id={`technology-${index}`}
              label={`Technology ${index + 1}`}
              value={tech}
              onChange={(e) => handleTechnologyChange(e, index)}
              required
            />
          ))}
          <button type="button" className="text-sm px-4 py-1 bg-violet-600 rounded-md shadow w-full" onClick={addTechnologyField}>
            Add Technology
          </button>
        </div>

        <button type="submit"
        className="text-sm mt-10 px-4 py-1 bg-violet-600 rounded-md shadow w-full"
        >
          
          {mode === "create" ? "Create Project" : "Update Project"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default ProjectForm;