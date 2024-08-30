import Project from "@/model/forntendProject";
import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudnery";
import auth from "@/lib/auth";
import User from "@/model/user";

export async function POST(req) {
  const id = await auth(req);
  await dbConnect();

  try {
    // Check if the user is authenticated
    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Fetch the user from the database
    const dataBaseUser = await User.findById(id);
    if (!dataBaseUser || dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const projectLink = formData.get("projectLink");
    const imageLink = formData.get("imageLink");
    const githubLink = formData.get("githubLink");
    const liveLink = formData.get("liveLink");
    const technologies = formData.getAll("technologies");

    // Log the received data for debugging
    console.log("technologies", technologies);
    console.log(name, description, projectLink, imageLink, technologies, githubLink, liveLink);

    // Validate required fields
    if (!name || !description || !projectLink || !technologies.length || !imageLink) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const img = await uploadOnCloudinary(imageLink, "projectImage");

    // Create a new project in the database
    const project = await Project.create({
      name,
      description,
      projectLink,
      technologies,
      imageLink: img.secure_url, // Use the secure URL from Cloudinary
      githubLink,
      liveLink,
    });

    return NextResponse.json(
      {
        message: "Project created successfully",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while trying to create project", error);
    return NextResponse.json(
      { message: "Error while trying to create project" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const projects = await Project.find({});

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error while trying to get projects", error);
    return NextResponse.json(
      { message: "Error while trying to get projects" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const id = await auth(req);
  await dbConnect();

  try {
    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }
    const dataBaseUser = await User.findById(id);

    if (dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const projectId = searchParams.get("id");

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while trying to delete project", error);
    return NextResponse.json(
      { message: "Error while trying to delete project" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  console.log("PUT request");
  const id = await auth(req);
  await dbConnect();
   try {

    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }
    
    const dataBaseUser = await User.findById(id);

    if (dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const { name, description, projectLink, imageLink } = {
      name: formData.get("name"),
      description: formData.get("description"),
      projectLink: formData.get("projectLink"),
      imageLink: formData.get("imageLink"),
      githubLink: formData.get("githubLink"),
      liveLink: formData.get("liveLink"),
    };

    const technologies = formData.getAll("technologies");

    if (!name || !description || !projectLink || !technologies || !imageLink) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const projectId = searchParams.get("id");

    const project = await Project.findById(projectId);  

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    const img = await uploadOnCloudinary(imageLink, "projectImage");

    project.name = name;
    project.description = description;
    project.projectLink = projectLink;
    project.technologies = technologies;
    project.imageLink = img.secure_url;
    project.githubLink = githubLink;
    project.liveLink = liveLink;

    project.save();

    return NextResponse.json(
      {
        message: "Project updated successfully",
        project,
      },
      { status: 200 }
    );
    
    

   } catch (error) {
    console.error("Error while trying to update project", error);
    return NextResponse.json(
      { message: "Error while trying to update project" },
      { status: 500 }
    );
   }
}