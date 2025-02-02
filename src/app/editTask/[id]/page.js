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
    <form onSubmit={handleSubmit} className="text-blue-400">
      <label>Task Title:
        <input 
          type="text" 
          name="heading" 
          value={inputs.heading} 
          onChange={handleChange} 
        />
      </label>
      <label>Task Description:
        <input 
          type="text" 
          name="description" 
          value={inputs.description} 
          onChange={handleChange} 
        />
      </label>
      <label>Task Status:
        <input 
          type="text" 
          name="status" 
          value={inputs.status} 
          onChange={handleChange} 
        />
      </label>
      <label>Task Category:
        <input 
          type="text" 
          name="category" 
          value={inputs.category} 
          onChange={handleChange} 
        />
      </label>
      <input type="submit" value="Update Task" />
    </form>
  );
}
