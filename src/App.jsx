import {Route, Routes } from "react-router-dom";
import Index from "./pages/Index";  
import Register from "./pages/Register";
import SendVerification from "./pages/SendVerification";
import Web from "./pages/Web";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/web" element={<Web />} />
      <Route path="/auth" element={<Register />} />
      <Route path="/verify" element={<SendVerification />} />
    </Routes>
  );
}

export default App;
