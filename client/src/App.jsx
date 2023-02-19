import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import Certificate from "./routes/Certificate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/certificate/:id" element={<Certificate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
