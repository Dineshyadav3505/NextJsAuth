import { dbConnect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user";
import { generateToken } from "@/lib/gernateToken";
import { options } from "@/lib/gernateToken";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
    dbConnect();

    try {

        const {email, password} = await req.json();

        if (!email || !password) {
            return NextResponse.json({message: "Please provide Email & Password"}, {status: 400});
        }

        console.log("Email", email);
        console.log("Password", password);

        const databaseUser  = await User.findOne({email})
        console.log("Database User0", databaseUser);

        if (!databaseUser) {
            return NextResponse.json({message: "Please provide a valid Email & Password"}, {status: 404});
        }

        console.log("Database User 1", databaseUser);   
        console.log("Database User 1", databaseUser.password);

        const hashPassword = await bcrypt.compare(password, databaseUser.password);

        console.log(hashPassword)

        if(!hashPassword) {
            return NextResponse.json({message: "Please provide a valid Email & Password"}, {status: 400});
        }

        console.log("Database User 2", databaseUser);
   
        const token = generateToken(databaseUser._id);

        console.log("Token", token);
        console.log("Database User 3", databaseUser);

        const response = NextResponse.json({
            message: "User logged in successfully",
            user: {
                email: databaseUser.email,
                name: databaseUser.name,
                _id: databaseUser._id,
                role: databaseUser.role
            },
            token
        }, {status: 200});

        response.cookies.set("accessToken", token, options);

        return response;


        
    } catch (error) {
        console.log("Error while try to login user",error);
        return NextResponse.json({message: "Error while try to login user"}, {status: 500});
    }
}