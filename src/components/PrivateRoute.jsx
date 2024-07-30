import Login from "./Login";
import Home from "./Home";

const PrivateRoute = () => {
  function hasJWT() {
    let flag = false;
    localStorage.getItem("accessToken") ? (flag = true) : (flag = false);
    return flag;
  }

  return (
    <>{hasJWT() ? <Home /> : <Login /> }</>
  );
};
export default PrivateRoute;
