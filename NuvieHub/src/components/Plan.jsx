import "../style/plan.css";
import logo from "../assets/file.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

function Plan() {
  const { isLoggedIn, setLoggedInValue } = useAuth();

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      setLoggedInValue(true);
    }
  }, [accessToken, setLoggedInValue]);

  const signOut = () => {
    localStorage.clear();
    setLoggedInValue(false);
  };

  return (
    <div className="bg-light d-flex flex-column justify-content-center align-items-center">
      <div
        className="header d-flex justify-content-center align-items-center  "
        style={{ height: "100wh" }}
      >
        <div
          className="logo col-10"
          style={{
            color: "red",
            fontSize: "50px",
            fontWeight: "700",
          }}
        >
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="signin col-2">
          {isLoggedIn ? (
            <a
              href="/"
              style={{ textDecoration: "none", color: "#333" }}
              onClick={(e) => {
                signOut(e);
              }}
            >
              Sign out
            </a>
          ) : (
            <a href="/signin" style={{ textDecoration: "none", color: "#333" }}>
              Sign In
            </a>
          )}
        </div>
        <br />
      </div>

      <div
        id="animation3"
        className="plan d-flex flex-column justify-content-center align-items-center"
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            margin: "15px 0",
          }}
        >
          <i
            className="fa-regular fa-circle-check fa-3x"
            style={{ color: "#e50914" }}
          ></i>
        </div>

        <p>STEP 2 OF 3</p>
        <h2>Choose your plan.</h2>
        <ul className="fa-ul">
          <li>
            <i
              className="fa-li fa-solid fa-check"
              style={{ color: "#e50914" }}
            ></i>
            No commitments, cancel anytime.
          </li>
          <li>
            <i
              className="fa-li fa-solid fa-check"
              style={{ color: "#e50914" }}
            ></i>
            Everything on NuvieHub for one low price.
          </li>
          <li>
            <i
              className="fa-li fa-solid fa-check"
              style={{ color: "#e50914" }}
            ></i>
            No ads and no extra fees. Ever
          </li>
        </ul>

        <Link to="/planform">
          <button
            className="btn text-light"
            style={{
              backgroundColor: "red",
              marginBottom: "100px",
              borderRadius: "4px",
              fontSize: "24px",
              fontWeight: "400",
              padding: "18px 40px",
              width: "100%",
            }}
          >
            Next
          </button>
        </Link>
        <div />
      </div>
      <div className="footer-section2 p-5">
        <p>Questions? Call 000-800-919-1694</p>

        <div className="footer2">
          <div className="footer-item">
            <a href="/">FAQ</a>
            <br />
            <a href="/">Privacy</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Help Center</a>
            <br />

            <a href="/">Cookie Preferences</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">NuvieHub Shop</a>
            <br />
            <a href="/">Corporate Information</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Term of use</a>
            <br />
          </div>
        </div>
        <div
          className="language"
          style={{
            borderRadius: "4px",
            border: "1px solid #737373",
            padding: "2px",
            width: "fit-content",
          }}
        >
          <select
            name="lang"
            id="lang1"
            style={{ color: "#333", textDecoration: "none" }}
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Plan;
