import Project from "@/model/backendProject";
import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudnery";
import auth from "@/lib/auth";
import User from "@/model/user";

export async function POST(req) {
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

    const user = req.user;
    console.log("user", user);

    const { name, description, projectLink, imageLink } = {
      name: formData.get("name"),
      description: formData.get("description"),
      projectLink: formData.get("projectLink"),
      imageLink: formData.get("imageLink"),
    };

    const technologies = formData.getAll("technologies");

    if (!name || !description || !projectLink || !technologies || !imageLink) {
      return NextResponse.json(
        { message: "Please fill all the fields ajkhsdfb" },
        { status: 400 }
      );
    }

    const img = await uploadOnCloudinary(imageLink, "projectImage");

    const project = await Project.create({
      name,
      description,
      projectLink,
      technologies,
      imageLink: img.secure_url,
    });

    project.save();

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