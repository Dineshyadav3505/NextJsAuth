import Project from "@/model/fullstackProject";
import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudnery";
import auth from "@/lib/auth";
import User from "@/model/user";

export async function POST(req) {
  const id = await auth(req);
  await dbConnect();

  try {
    // Check if user is authenticated
    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Fetch user from the database
    const dataBaseUser = await User.findById(id);
    if (!dataBaseUser || dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const { name, description, imageLink, githubLink, liveLink } = {
      name: formData.get("name"),
      description: formData.get("description"),
      imageLink: formData.get("imageLink"),
      githubLink: formData.get("githubLink"),
      liveLink: formData.get("liveLink"),
    };

    const technologies = formData.getAll("technologies");

    // Validate required fields
    if (!name || !description || !technologies.length || !imageLink) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const img = await uploadOnCloudinary(imageLink, "projectImage");

    // Create a new project
    const project = await Project.create({
      name,
      description,
      technologies,
      imageLink: img.secure_url, // Ensure this is the correct property for the URL
      githubLink,
      liveLink,
    });

    // No need to call project.save() after create()
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
  const id = await auth(req);
  await dbConnect();

  try {
    // Check if user is authenticated
    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Fetch user from the database
    const dataBaseUser = await User.findById(id);
    if (!dataBaseUser || dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const { name, description, imageLink, githubLink, liveLink } = {
      name: formData.get("name"),
      description: formData.get("description"),
      imageLink: formData.get("imageLink"),
      githubLink: formData.get("githubLink"),
      liveLink: formData.get("liveLink"),
    };

    const technologies = formData.getAll("technologies");

    // Validate required fields
    if (!name || !description || !technologies.length || !imageLink) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Extract project ID from the request URL
    const url = new URL(req.url);
    const projectId = url.searchParams.get("id");

    // Fetch the project from the database
    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Upload image to Cloudinary
    const img = await uploadOnCloudinary(imageLink, "projectImage");

    // Update project details
    project.name = name;
    project.description = description;
    project.projectLink = projectLink;
    project.technologies = technologies;
    project.imageLink = img.secure_url; // Ensure this is the correct property for the URL
    project.githubLink = githubLink;
    project.liveLink = liveLink;

    // Save the updated project
    await project.save(); // Ensure to await the save operation

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