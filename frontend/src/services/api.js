const API_URL = "http://127.0.0.1:5000/api";

export async function getBoard() {
  const response = await fetch(`${API_URL}/board`);

  if (!response.ok) {
    throw new Error("Failed to load board.");
  }

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create task.");
  }

  return data;
}