import Skill from "@/model/skills";
import User from "@/model/user";
import auth from "@/lib/auth";
import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";

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

    const { domain, skills } = {
      domain: formData.get("domain"),
      skills: formData.getAll("skills"),
    };

    if (!domain || !skills) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const skill = await Skill.create({
      domain,
      skills,
    });
    skill.save();
    return NextResponse.json(
      { message: "Skills created successfully", skill },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while creating skills.", error);
    return NextResponse.json(
      { message: "Error while creating skills." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const skills = await Skill.find();
    return NextResponse.json(
      { message: "Skills fetched successfully", skills },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching skills.", error);
    return NextResponse.json(
      { message: "Error while fetching skills." },
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
    if (!formData) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const { domain, skills } = {
      domain: formData.get("domain"),
      skills: formData.getAll("skills"),
    };

    if (!domain || !skills) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const skillId = searchParams.get("id");

    const skill = await Skill.findById(skillId);

    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }
    skill.domain = domain;
    skill.skills = skills;
    skill.save();
    return NextResponse.json(
      { message: "Skills updated successfully", skill },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating skills.", error);
    return NextResponse.json(
      { message: "Error while updating skills." },
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
    const skillId = searchParams.get("id");

    const skill = await Skill.findByIdAndDelete(skillId);

    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Skill deleted successfully", skill },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while deleting skills.", error);
    return NextResponse.json(
      { message: "Error while deleting skills." },
      { status: 500 }
    );
  }
}
