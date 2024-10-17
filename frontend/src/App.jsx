import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";
import Navbar from "./components/Navbar";
import PinPage from "./pages/PinPage";
import Create from "./pages/Create";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const { isAuth, user, loading } = UserData();

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      {isAuth && <Navbar user={user} />}
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/"
          element={!isAuth ? <Navigate to="/login" /> : <Home />}
        />

        <Route
          path="/create"
          element={!isAuth ? <Navigate to="/login" /> : <Create />}
        />
        <Route
          path="/account"
          element={!isAuth ? <Navigate to="/login" /> : <Account user={user} />}
        />
        <Route
          path="/user/:id"
          element={!isAuth ? <Navigate to="/login" /> : <UserProfile user={user} />}
        />
        <Route
          path="/pin/:id"
          element={!isAuth ? <Navigate to="/login" /> : <PinPage user={user} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
