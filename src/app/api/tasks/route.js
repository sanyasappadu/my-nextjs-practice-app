//api/todos/route.js
import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// Establish database connection
connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { heading, description, status, category } = reqBody;

    console.log("reqBody", reqBody);

    const newTask = new Task({ heading, description, status, category });

    const savedTask = await newTask.save();
    console.log("savedTask", savedTask);

    return NextResponse.json({
      message: "Task created successfully",
      success: true,
      savedTask,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await Task.find();
    return NextResponse.json({
      success: true,
      tasks,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
