// /api/todos/[id]/route.js
import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// Establish database connection
connect();

export async function GET(request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes ID is the last segment in the URL

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json(
        { message: "Task not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, task });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes ID is the last segment in the URL

    const reqBody = await request.json();
    const { heading, description, status, category } = reqBody;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { heading, description, status, category },
      { new: true } // returns the updated document
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task updated successfully",
      success: true,
      updatedTask,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes ID is the last segment in the URL

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
