import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "../pages/Home";
import AgeSelection from "../pages/AgeSelection";
import Favorites from "../pages/Favorites";
import Dashboard from "../pages/Dashboard";
import BookReaderContainer from "../pages/Reader";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/age" element={<AgeSelection />} />
        <Route path="/themes" element={<Favorites />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reader" element={<BookReaderContainer />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

