import Home from "./Home";
import EditDb from "./EditDb";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Login from "./Login";

const AdminRoute = () => {
  const id = localStorage.getItem("UserId");
  const [user, setUser] = useState([]);
  const { isLoggedIn, setLoggedInValue } = useAuth();

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      setLoggedInValue(true);
    }
  }, [accessToken, setLoggedInValue]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  return (
    <>
      {user.role === "admin" ? <EditDb /> : isLoggedIn ? <Home /> : <Login />}
    </>
  );
};
export default AdminRoute;
