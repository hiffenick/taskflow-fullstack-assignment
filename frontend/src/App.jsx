import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import TaskBoard from "./components/tasks/TaskBoard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/board" element={<TaskBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;