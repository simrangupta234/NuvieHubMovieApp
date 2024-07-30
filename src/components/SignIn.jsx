import { useState } from "react";
import logo from "../assets/file.png";
import "../style/signin.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEmail } from "./EmailContext";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");

  const { setLoggedInValue, setAuthValue } = useAuth();
  const { setEmailValue } = useEmail();
  var valuesEmail = (document.getElementById("email") || {}).value || "";
  var valuesPassword = (document.getElementById("password") || {}).value || "";

  const validate = () => {
    const errors = {};
    if (!valuesEmail) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valuesEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!valuesPassword) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
        valuesPassword
      )
    ) {
      errors.password =
        "Password should contain at least 8 digits , a capital latter, a small latter and a special character.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      validateSubmit(values);
    },
  });

  const validateSubmit = async (values) => {
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/users/login",
          JSON.stringify({ email: valuesEmail, password: valuesPassword }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("response", response.data.message);
        if (response.data.message === "Email not found") {
          setWarning(
            "Sorry, we can't find an account with this email address. Please try again or create a new account."
          );
        } else if (response.data.message === "incorrect password") {
          setWarning(
            "Incorrect password. Please try again or you can reset your password."
          );
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          setLoggedInValue(true);
          navigate("/user/home");
          localStorage.setItem("UserId", response.data.user._id);

          console.log("User loggedin:", response.data);
        }
      } catch (error) {
        console.error("invalid user data", error);
      }
    } else {
      console.log("Please fill in the email and password");
    }
  };

  const handleChangePassword = (e) => {
    setAuthValue(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  return (
    <div className="signin-main w-100 text-light d-flex flex-column justify-content-center align-items-center">
      <div className="header-signin">
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          <img src={logo} alt="logo" style={{ width: "250px" }} />
        </a>
      </div>

      <div className="signin-card card text-light">
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "500",
            marginBottom: "20px",
          }}
        >
          Sign In
        </h1>
        <span
          className="warning-span"
          style={{
            textAlign: "start",
            color: "white",
            fontSize: "14px",
            marginLeftLeft: "16px",
            marginBottom: "10px",
            backgroundColor: "#e87c03",
            borderRadius: "3px",
            padding: "10px",
          }}
        >
          {warning}
        </span>
        <form
          onSubmit={formik.handleSubmit}
          className="wrapper-input d-flex flex-column align-items-center "
          style={{ width: "100%" }}
        >
          <div className="input-data d-flex flex-column  align-items-center ">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                formik.handleChange(e);
                handleChangeEmail(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              style={{ background: "#333" }}
              placeholder=""
              pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
            />
            {formik.touched.email && formik.errors.email ? (
              <span
                style={{
                  textAlign: "start",
                  color: "rgb(235, 57, 66)",
                  fontSize: "12px",
                  paddingLeft: "16px",
                }}
              >
                {formik.errors.email}
              </span>
            ) : null}
            <label htmlFor="email">Email or Phone number</label>
          </div>

          <div
            className="wrapper-input d-flex  align-items-center mt-5 mb-5"
            style={{ width: "100%" }}
          >
            <div className=" input-data d-flex flex-column  align-items-center ">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChangePassword(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder=""
                style={{ background: "#333" }}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              />
              {formik.touched.password && formik.errors.password ? (
                <span
                  style={{
                    textAlign: "start",
                    color: "rgb(235, 57, 66)",
                    fontSize: "12px",
                    paddingLeft: "16px",
                  }}
                >
                  {formik.errors.password}
                </span>
              ) : null}
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button
            className="btn"
            type="submit"
            style={{
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
              margin: "24px 0px 12px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            Sign In
          </button>
          <div
            className="d-flex justify-content-between w-auto"
            style={{ color: "#b3b3b3", fontSize: "13px", fontWeight: "400" }}
          >
            <label
              className="d-flex align-items-center"
              style={{ width: "75%" }}
            >
              <input
                className=" checkbox"
                type="checkbox"
                name=""
                id=""
                style={{ paddingLeft: "8px", width: "fit-content" }}
              />
              Remember me
            </label>

            <a
              href="/"
              style={{ color: "#b3b3b3", textDecoration: "none", width: "25%" }}
            >
              Need help?
            </a>
          </div>
          <div style={{ color: "#8c8c8c", margin: "50px 0 10px 0" }}>
            New to NuvieHub?
            <a
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "3px",
              }}
            >
              Sign up now.
            </a>
          </div>

          <p
            style={{
              color: "#8c8c8c",
              fontSize: "13px",
              paddingBottom: "70px",
            }}
          >
            This page is protected by Google reCAPTCHA to ensure you&apos;re not
            a bot.
            <a href="" style={{ textDecorationLine: "none" }}>
              Learn more.
            </a>
          </p>
        </form>
      </div>

      <div className="footer-section3 p-5">
        <p>Questions? Call 000-800-919-1694</p>

        <div className="footer3">
          <div className="footer-item">
            <a href="/">FAQ</a>
            <br />
            <a href="/">Cookie Preferences</a>
            <br />
          </div>

          <div className="footer-item">
            <a href="/">Help Center</a>
            <br />
            <a href="/">Corporate Information</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Terms Of Use</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Privacy</a>
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
            style={{ backgroundColor: "black", textDecoration: "none" }}
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
