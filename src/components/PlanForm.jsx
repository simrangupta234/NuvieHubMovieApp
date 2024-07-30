import { Link } from "react-router-dom";
import logo from "../assets/file.png";
import phone from "../assets/phone.svg";
import tablet from "../assets/tablet.svg";
import computer from "../assets/computer.svg";
import tv from "../assets/tv.svg";
import "../style/plan.css";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
function PlanForm() {
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

  const planClick = (event) => {
    const buttons = document.getElementsByClassName("plansbtn");
    for (const button of buttons) {
      button.style.backgroundColor = "";
      button.style.opacity = ".6";
    }

    const clickedButton = event.currentTarget;
    clickedButton.style.backgroundColor = "red";
    clickedButton.style.opacity = "1";
  };

  const planbtn = (event) => {
    planClick(event);
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
      <div id="animation4" className="p-5">
        <div>
          <p style={{ textAlign: "start" }}>STEP 2 OF 3</p>
          <h2 style={{ textAlign: "start" }}>
            Choose the plan that’s right for you
          </h2>
          <ul className="fa-ul">
            <li>
              <i
                className="fa-li fa-solid fa-check"
                style={{ color: "#e50914" }}
              ></i>
              Watch all you want. Ad-free.
            </li>
            <li>
              <i
                className="fa-li fa-solid fa-check"
                style={{ color: "#e50914" }}
              ></i>
              Recommendations just for you.
            </li>
            <li>
              <i
                className="fa-li fa-solid fa-check"
                style={{ color: "#e50914" }}
              ></i>
              Change or cancel your plan anytime.
            </li>
          </ul>
        </div>

        <div className="planlist ">
          <div className="planlist-header"></div>
          <table
            className="planlist-table"
            style={{
              tableLayout: "fixed",
              overflow: "scroll",
              color: "#737373",
            }}
          >
            <thead>
              <tr>
                <th className="width"></th>
                <th>
                  <button className="plansbtn" onClick={planbtn}>Mobile</button>
                </th>
                <th>
                  <button className="plansbtn" onClick={planbtn}>Basic</button>
                </th>
                <th>
                  <button className="plansbtn" onClick={planbtn}>Standard</button>
                </th>
                <th>
                  <button className="plansbtn" onClick={planbtn}>Premium</button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly price</td>
                <td>₹ 149</td>
                <td>₹199</td>
                <td>₹ 499</td>
                <td>₹ 649</td>
              </tr>
              <tr>
                <td>Video Quality</td>
                <td>Good</td>
                <td>Good</td>
                <td>Better</td>
                <td>Best</td>
              </tr>
              <tr>
                <td>Resolution</td>
                <td>480p</td>
                <td>720p</td>
                <td>1080p</td>
                <td>4k+HDR</td>
              </tr>

              <tr>
                <td style={{ fontSize: "inherit" }}>
                  Devices you can use to watch
                </td>
                <td>
                  <img className="icons" src={phone} alt="" />
                  <br />
                  Phone
                  <br />
                  <img className="icons" src={tablet} alt="" />
                  <br />
                  Tablet
                </td>
                <td>
                  <img className="icons" src={phone} alt="" />
                  <br />
                  Phone
                  <br />
                  <img className="icons" src={tablet} alt="" />
                  <br />
                  Tablet
                  <br />
                  <img className="icons" src={computer} alt="" />
                  <br />
                  Computer
                  <br />
                  <img className="icons" src={tv} alt="" />
                  <br />
                  TV
                </td>
                <td>
                  <img className="icons" src={phone} alt="" />
                  <br />
                  Phone
                  <br />
                  <img className="icons" src={tablet} alt="" />
                  <br />
                  Tablet
                  <br />
                  <img className="icons" src={computer} alt="" />
                  <br />
                  Computer
                  <br />
                  <img className="icons" src={tv} alt="" />
                  <br />
                  TV
                </td>
                <td>
                  <img className="icons" src={phone} alt="" />
                  <br /> Phone
                  <br />
                  <img className="icons" src={tablet} alt="" />
                  <br />
                  Tablet
                  <br />
                  <img className="icons" src={computer} alt="" />
                  <br />
                  Computer
                  <br />
                  <img className="icons" src={tv} alt="" />
                  <br />
                  TV
                </td>
              </tr>
            </tbody>
          </table>

          <p style={{ color: "#737373", fontSize: "13px", textAlign: "start" }}>
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
            subject to your internet service and device capabilities. Not all
            content is available in all resolutions. See our Terms of Use for
            more details.
          </p>
          <p style={{ color: "#737373", fontSize: "13px", textAlign: "start" }}>
            Only people who live with you may use your account. Watch on 4
            different devices at the same time with Premium, 2 with Standard,
            and 1 with Basic and Mobile.
          </p>
          <Link to="/payment">
            <button
              className="btn text-light"
              style={{
                backgroundColor: "red",
                marginBottom: "100px",
                borderRadius: "4px",
                fontSize: "24px",
                fontWeight: "400",
                padding: "18px 0px",
                width: "50%",
              }}
            >
              Next
            </button>
          </Link>
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

export default PlanForm;
