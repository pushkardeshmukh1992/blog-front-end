import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/HomePage";
import Login from "./Components/Users/Login";
import UserProfile from "./Components/Users/UserProfile";
import PublicNavbar from "./Components/Navbar/PublicNavbar";
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/AuthRoute/ProtectedRoute";
import PublicPosts from "./Components/Posts/PublicPosts";

function App() {
  const { userAuth } = useSelector((state) => state?.users);

  const isLogin = userAuth?.userInfo?.token;

  return (
    <BrowserRouter>
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Public posts */}
        {/* <Route path="/public-posts" element={<PublicPosts />}></Route> */}
        {/* Profile */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
