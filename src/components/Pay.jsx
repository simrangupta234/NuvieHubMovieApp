import logo from "../assets/file.png";
import lock from "../assets/lock.png";
import { Link } from "react-router-dom";
import visa from "../assets/visa.png";
import gpay from "../assets/gpay.png";
import bhim from "../assets/bhim.png";
import amazonpay from "../assets/amazonpay.png";
import diners from "../assets/Diners.png";
import mastercard from "../assets/mastercard.png";
import paytm from "../assets/paytm.png";
import phonepe from "../assets/phonepe.png";
import arrow from "../assets/arrow-point-to-right (1).png";
import "../style/signuppage2.css";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

function Pay() {
  const {
    isLoggedIn,

    setLoggedInValue,
  } = useAuth();

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
        id="animation5"
        className=" d-flex flex-column justify-content-center align-items-center  w-50"
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            margin: "15px 0",
          }}
        >
          <img src={lock} alt="" />
        </div>

        <p>STEP 3 OF 3</p>
        <h2>Choose how to pay</h2>
        <p style={{ fontSize: "18px" }}>
          Your payment is encrypted and you can change your payment method at
          anytime.
        </p>
        <h3 style={{ fontSize: "18px" }}>Secure for peace of mind.</h3>
        <h3 style={{ fontSize: "18px" }}>Cancel easily online.</h3>

        <div className="payment-card  p-3 m-2">
          <div
            className=" d-flex justify-content-center align-items-center"
            style={{ width: "fit-content" }}
          >
            <div style={{ width: "fit-content", padding: "0 10px 0 2px" }}>
              Credit or Debit Card
            </div>
            <div>
              <img src={visa} alt="" />
              <img src={mastercard} alt="" />
              <img src={diners} alt="" />
            </div>
          </div>
          <div style={{ width: "fit-content" }}>
            <img src={arrow} alt="" style={{ height: "15px", width: "auto" }} />
          </div>
        </div>
        <div className="payment-card   p-3 m-2">
          <div
            className=" d-flex justify-content-center align-items-center"
            style={{ width: "fit-content" }}
          >
            <div style={{ width: "fit-content", padding: "0 10px 0 2px" }}>
              UPI Auto Pay
            </div>
            <div>
              <img src={bhim} alt="" />
              <img src={paytm} alt="" />
              <img src={gpay} alt="" />
              <img src={amazonpay} alt="" />
              <img src={phonepe} alt="" />
            </div>
          </div>
          <div style={{ width: "fit-content" }}>
            <img src={arrow} alt="" style={{ height: "15px", width: "auto" }} />
          </div>
        </div>
        <Link to="/user/home">
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
            Start Membership
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

export default Pay;
