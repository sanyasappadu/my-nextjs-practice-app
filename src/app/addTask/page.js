"use client";
import { useState } from "react";
import ReactDOM from "react";

export default function page() {
  const [inputs, setInputs] = useState({
    heading: "",
    description: "",
    status: "",
    category: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const createTask = async (task) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    if (data.success) {
      console.log(data);
    }
  };

  const handleSubmit = async (event) => {
    console.log(inputs);
    event.preventDefault();
    createTask(inputs);
    alert(inputs);
  };

  return (
    <div className="text-black flex flex-col dark:text-white bg-gray-200 dark:bg-gray-600 h-screen w-full flex">
      <div className=" max-w-md m-auto border rounded-lg  border-gray-300 dark:border-white shadow-sm">
      <div className="bg-gray-300 dark:bg-gray-700 max-w-md p-6 rounded-lg flex  "><h1 className="justify-center">Add Task Details</h1></div>

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
