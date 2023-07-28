import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/HomePage";
import Login from "./Components/Users/Login";
import UserProfile from "./Components/Users/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Profile */}
        <Route path="/user-profile" element={<UserProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
