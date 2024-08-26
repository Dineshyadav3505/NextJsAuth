import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudnery";
import User from "@/model/user";
import Resume from "@/model/resume";
import auth from "@/lib/auth";

export async function POST(req) {
  const id = await auth(req);
  await dbConnect();
  try {
    const dataBaseUser = await User.findById(id);
    if (!dataBaseUser) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }
    if (dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const { resumeImage } = {
      resumeImage: formData.get("resumeImage"),
    };

    if (!resumeImage) {
      return NextResponse.json(
        { message: "Image is requires" },
        { status: 400 }
      );
    }

    const img = await uploadOnCloudinary(resumeImage, "projectImage");

    if (!img) {
      return NextResponse.json(
        { message: "Error while uploading image" },
        { status: 500 }
      );
    }

    const resume = await Resume.create({
      resumeImage: img.secure_url,
    });

    return NextResponse.json(
      { message: "Resume created successfully", resume },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while creating resume.", error);
    return NextResponse.json(
      { message: "Error while creating resume." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const resume = await Resume.find();
    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching resume.", error);
    return NextResponse.json(
      { message: "Error while fetching resume." },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const id = await auth(req);
  await dbConnect();
  try {
    const dataBaseUser = await User.findById(id);

    if (!dataBaseUser) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    if (dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const { resumeImage } = {
      resumeImage: formData.get("resumeImage"),
    };

    if (!resumeImage) {
      return NextResponse.json(
        { message: "Image is requires" },
        { status: 400 }
      );
    }

    const img = await uploadOnCloudinary(resumeImage, "projectImage");

    if (!img) {
      return NextResponse.json(
        { message: "Error while uploading image" },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const resumeId = searchParams.get("id");

    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      {
        resumeImage: img.secure_url,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Resume updated successfully", resume },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating resume.", error);
    return NextResponse.json(
      { message: "Error while updating resume." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const id = await auth(req);
  await dbConnect();
  try {
    const dataBaseUser = await User.findById(id);

    if (!dataBaseUser) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    if (dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const resumeId = searchParams.get("id");

    const resume = await Resume.findByIdAndDelete(resumeId);

    return NextResponse.json(
      { message: "Resume deleted successfully", resume },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while deleting resume.", error);
    return NextResponse.json(
      { message: "Error while deleting resume." },
      { status: 500 }
    );
  }
}
