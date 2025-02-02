"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();

        // Ensure the response contains the expected structure
        if (data && data.tasks) {
          setTasks(data.tasks);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const updateTask = async (id, updatedTask) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    if (data.success) {
      setTodos(todos.map((task) => (task._id === id ? data.data : task)));
    }
  };

  const deleteTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-500 h-screen text-black dark:text-white ">
      <div className="flex flex-col justify-center">
        <h1 className="mx-auto text-xl font-bold my-2 p-2">Task List</h1>
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col justify-center mx-16 sm:mx-28 md:mx-48 min-w-md my-2  bg-gray-200 border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-600 dark:border-gray-700"
            >
              <h2 className="bg-gray-300 dark:bg-gray-700 sm:p-2 rounded-lg ">
                <div className="">
                {task.heading}
                </div>

              </h2>
              <div className="flex flex-row sm:p-2 ">
                <div className="flex flex-col ">
                  <p>{task.description}</p>
                  <p>Status: {task.status}</p>
                  <p>Category: {task.category}</p>
                </div>
                <div className="flex flex-col ">
                  <Link href={`/editTask/${task._id}`}>update</Link>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </div>
              {/* <button onClick={() => updateTask(task._id, { status: 'completed' })}>Mark as Completed</button> */}
            </li>
          ))}
        </ul>
        {/* Add your create task form and call createTask on form submit */}
      </div>
    </div>
  );
}
