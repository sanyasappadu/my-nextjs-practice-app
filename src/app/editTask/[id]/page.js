"use client"
import { useState, useEffect } from 'react';

export default function Page({ params }) {
  const [inputs, setInputs] = useState({
    heading: "",
    description: "",
    status: "",
    category: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();

        // Ensure the response contains the expected structure
        if (data && data.task) {
          console.log("Fetched Data:", data.task);
          setInputs({
            heading: data.task.heading || "",
            description: data.task.description || "",
            status: data.task.status || "",
            category: data.task.category || "",
          });
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [params.id]); // Depend on params.id so it runs when the ID changes

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const updatedTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    const data = await res.json();
    if (data.success) {
      console.log("Updated Task:", data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Updated Inputs:", inputs);
    await updatedTask();
    alert("Task updated successfully!");
  };

  return (
    <div className="text-black flex flex-col dark:text-white bg-gray-200 dark:bg-gray-600 h-screen w-full flex">
      <div className=" max-w-md m-auto border rounded-lg  border-gray-300 dark:border-white shadow-sm">
      <div className="bg-gray-300 dark:bg-gray-700 max-w-md p-6 rounded-lg flex  "><h1 className="justify-center">Update Task Details</h1></div>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col p-6 "
      >
        <div className="flex flex-row ">
          <label
            for="message"
            class="block mb-2 w-full text-sm font-medium"
          > 
            Task Title:
          </label>
          <textarea
            id="message"
            rows="1"
            class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white "
            type="text"
            name="heading"
            value={inputs.heading || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex flex-row mt-2">
          <label
            for="message"
            class="block mb-2 w-full text-sm font-medium"
          >
            Task Status:
          </label>
          <textarea
            id="message"
            rows="1"
            class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white "
            type="text"
            name="status"
            value={inputs.status || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex flex-row mt-2">
          <label
            for="message"
            class="block mb-2 w-full text-sm font-medium"
          >
            Task Category:
          </label>
          <textarea
            id="message"
            rows="1"
            class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white "
            type="text"
            name="category"
            value={inputs.category || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex flex-row mt-2">
          <label
            for="message"
            class="block mb-2 w-full text-sm font-medium"
          >
            Task Description:
          </label>
          <textarea
            id="message"
            rows="2"
            class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white "
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <input
          className="bg-gray-400 dark:bg-gray-300 text-white dark:text-black p-2 mt-2 w-full rounded-md"
          type="submit"
        />
      </form>
      </div>
    </div>
  );
}
