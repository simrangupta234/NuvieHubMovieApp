// import React from 'react'
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.png";
import "../style/loginpage2.css";
import { useEmail } from "./EmailContext";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

export default function Loginpage2() {
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();

  const { email } = useEmail();
  const { isLoggedIn, setLoggedInValue, setAuthValue } = useAuth();
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

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
        values.password
      )
    ) {
      errors.password =
        "Password should contain at least 8 digits , a capital latter, a small latter and a special character.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // console.log("Form submitted with values:", values);
      validateSubmit(values);
    },
  });

  const validateSubmit = async (values) => {
    const errors = validate(values);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://nuviehub-movieapp.onrender.com/api/users/login",
          JSON.stringify({ email: email, password: values.password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.message === "incorrect password") {
          setWarning(
            "Incorrect password. Please try again or you can reset your password."
          );
        } else {
          navigate("/plans");
          localStorage.setItem("accessToken", response.data.accessToken);
          setLoggedInValue(true);
          localStorage.setItem("UserId", response.data.user._id);
        }
      } catch (error) {
        console.error("invalid user data", error);
      }
    } else {
      console.log("Please fill in the password");
    }
  };

  const handleChange = (e) => {
    setAuthValue(e.target.value);
  };

  return (
    <div className="main w-100 bg-light  ">
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

      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <div style={{ textAlign: "start", maxWidth: "440px", padding: "20px" }}>
          <form onSubmit={formik.handleSubmit}>
            <p>STEP 1 OF 3</p>
            <p style={{ fontSize: "32px", fontWeight: "500" }}>Welcome back!</p>
            <p style={{ fontSize: "32px", fontWeight: "500" }}>
              Joining NuvieHub is easy.
            </p>
            <p style={{ fontSize: "18px" }}>
              Enter your password and you&apos;ll be watching in no time.{" "}
            </p>
            <p> Email </p>
            <p>{email}</p>
            <div className="wrapper-input2 d-flex align-items-center w-100">
              <div className="input-data d-flex flex-column  align-items-center ">
                <input
                  className="psw"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder=""
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
                <span
                  style={{
                    textAlign: "start",
                    color: "rgb(235, 57, 66)",
                    fontSize: "12px",
                    paddingLeft: "16px",
                  }}
                >
                  {warning}
                </span>
                <label htmlFor="password" style={{ color: "#333" }}>
                  Enter your password
                </label>
              </div>
            </div>
            <div className="mt-3 mb-3">
              <a href="/" style={{ textDecoration: "none", color: "#0071eb" }}>
                Forgot your password?
              </a>
            </div>
            <button
              className="btn text-light"
              type="submit"
              style={{
                backgroundColor: "red",
                marginBottom: "100px",
                borderRadius: "4px",
                fontSize: "24px",
                fontWeight: "400",
                padding: "18px 40px",
              }}
            >
              Submit
            </button>
          </form>
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
