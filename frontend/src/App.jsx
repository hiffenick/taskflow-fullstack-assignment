import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend connection failed ❌"));
  }, []);

  return (
    <div>
      <h1>TaskFlow</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;