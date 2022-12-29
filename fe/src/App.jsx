import {Route, Routes } from "react-router-dom";
import Index from "./pages/Index";  
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Register />} />
    </Routes>
  );
}

export default App;
