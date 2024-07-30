import { Link } from "react-router-dom";
import logo from "../assets/file.png";
import "../style/signup.css";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

function Signup() {
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
    <div className="signup-main w-100 bg-light">
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
              href="/signin"
              style={{ textDecoration: "none", color: "#333" }}
              onClick={(e) => {
                signOut(e);
              }}
            >
              Sign Out
            </a>
          ) : (
            <a href="/" style={{ textDecoration: "none", color: "#333" }}>
              Sign In
            </a>
          )}
        </div>
        <br />
      </div>

      <div id="animation1" className="signup-box">
        <div className=" p-5 d-flex flex-column justify-content-center align-items-center ">
          <div className="signup-box-img"></div>
          <div className="signup-box-text ">
            <p>STEP 1 OF 3</p>
            <h1>Finish setting up your account</h1>
            <p>
              NuvieHub is personalised for you. Create a password to watch on any
              device at any time.
            </p>
            <Link to="/signupform">
              <button
                className="btn text-light"
                style={{
                  backgroundColor: "red",
                  marginBottom: "100px",
                  borderRadius: "4px",
                  fontSize: "24px",
                  fontWeight: "400",
                  padding: "18px 0px",
                }}
              >
                Next
              </button>
            </Link>
          </div>
        </div>
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
          <select name="lang" id="lang1" style={{ color: "#333" }}>
            <option value="English">English</option>
            <option value="Hindi">हिंदी</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Signup;
