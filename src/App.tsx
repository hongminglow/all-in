import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import BettingPage from "./pages/Bet";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/bet" element={<BettingPage />} />
    </Routes>
  );
}

export default App;
