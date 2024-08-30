import backendProject from "@/model/backendProject";
import frontendProject from "@/model/forntendProject"; // Fixed typo
import fullstackProject from "@/model/fullstackProject";
import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const [backendProjects, frontendProjects, fullstackProjects] = await Promise.all([
      backendProject.find(),
      frontendProject.find(),
      fullstackProject.find(),
    ]);

    const projects = [...backendProjects, ...frontendProjects, ...fullstackProjects];


    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}