import "../../src/App.css";
import "../../src/components/Loginpage2";
import { useEffect, useState } from "react";
import logo from "../assets/file.png";
import tv from "../assets/tv.png";
import tv2 from "../assets/device-pile-in.png";
import mobile from "../assets/mobile.jpg";
import children from "../assets/children.png";
import video from "../assets/video.mp4";
import boxShot from "../assets/boxshot.png";
import "../style/login.css";
import arrow from "../assets/arrow-point-to-right.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEmail } from "./EmailContext";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const { email, setEmailValue } = useEmail();
  const [loading] = useState(false);
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

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
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
          "https://nuviehub-movieapp.onrender.com/api/users/login2",
          JSON.stringify({ email: email }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // console.log("User signedup:", response.data);
        if (response.data.email) {
          navigate("/login");
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.error("invalid user data", error);
      }
    } else {
      console.log("Please fill in the email");
    }
  };

  const handleChange = (e) => {
    setEmailValue(e.target.value);
  };

  useEffect(() => {
    var btn = document.getElementsByClassName("faxbtn");
    var i;

    for (i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.parentElement.classList.toggle("active");
        var ans = this.nextElementSibling;
        if (ans.style.display === "block") {
          ans.style.display = "none";
        } else {
          ans.style.display = "block";
        }
      });
    }
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <div className="background-main">
        <div className="Navbar">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>

          <div className="nav-right">
            <div className="language">
              <select name="lang" id="lang1">
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
              </select>
            </div>

            {isLoggedIn ? (
              <button
                className="signin"
                onClick={(e) => {
                  signOut(e);
                }}
              >
                Sign out
              </button>
            ) : (
              <button className="signin">
                <a href="/signin">Sign In</a>
              </button>
            )}
          </div>
        </div>

        <div className="home">
          <p className="child1">
            The biggest Indian hits. Ready to watch here from ₹ 149.
          </p>
          <p className="child2">Join today. Cancel anytime.</p>
          <p
            className="child3"
            style={{ fontSize: "20px", fontWeight: "normal" }}
          >
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="wrapper-input d-flex align-items-center"
          >
            <div className="col-8 input-data d-flex flex-column align-items-center">
              <input
                className="emailId"
                type="email"
                name="email"
                id="email1"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder=""
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
              />

              {formik.touched.email && formik.errors.email ? (
                <span
                  style={{
                    textAlign: "start",
                    color: "rgb(235, 57, 66)",
                    fontSize: "12px",
                    paddingLeft: "16px",
                    width: "100%",
                  }}
                >
                  {formik.errors.email}
                </span>
              ) : null}

              <label htmlFor="email1">Email address</label>
            </div>
            <div className="col-4" style={{ marginLeft: "20px" }}>
              <button type="submit" className="getStartedbtn">
                {loading ? (
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  <>
                    <p style={{ marginTop: "14px", width: "fit-content" }}>
                      Get Started
                    </p>
                    <img src={arrow} alt="" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="seperation"></div>

      <div className="section1">
        <div className="secText">
          <p>Enjoy on your TV</p>
          <p>
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players and more.
          </p>
        </div>
        <div className="secVideo ">
          <img src={tv} alt="" />
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="seperation"></div>

      <div className="section2 d-flex justify-content-center align-items-center">
        <div className="sec2Video d-flex flex-column justify-content-center align-items-center">
          <img className="z-0" src={mobile} alt="mobile" />
          <div className="gif-box">
            <img src={boxShot} alt="" />

            <div className="gif-text">
              <div>Stranger Things</div>
              <div>Downloading...</div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="secText">
          <p>Download your shows to watch offline</p>
          <p>Save your favourites easily and always have something to watch.</p>
        </div>
      </div>

      <div className="seperation"></div>

      <div className="section3">
        <div className="secText">
          <p>Watch everywhere</p>
          <p>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        <div className="secVideo">
          <img src={tv2} alt="" />
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="seperation"></div>

      <div className="section4 ">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={children}
            alt="tv"
            style={{ height: "70%", width: "70%" }}
          />
        </div>
        <div className="secText">
          <p>Create profiles for kids</p>
          <p>
            Send children on adventures with their favourite characters in a
            space made just for them—free with your membership.
          </p>
        </div>
      </div>

      <div className="seperation"></div>

      <div className="fax">
        <h2>Frequently Asked Questions</h2>

        <div className="faxQues ">
          <button className="faxbtn d-flex  justify-content-between align-items-center  w-100 pointer-event ">
            What is NuvieHub?
            <i className="fa-solid fa-plus w-auto"></i>
          </button>
          <div className="ans">
            <p>
              NuvieHub is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries and more on
              thousands of internet-connected devices.
            </p>
            <p>
              You can watch as much as you want, whenever you want, without a
              single ad – all for one low monthly price. There&apos;s always
              something new to discover, and new TV shows and movies are added
              every week!
            </p>
          </div>
        </div>

        <div className="faxQues ">
          <button className="faxbtn d-flex  justify-content-between align-items-center  w-100 pointer-event ">
            How muchh NuvieHub cost?
            <i className="fa-solid fa-plus w-auto"></i>
          </button>
          <div className="ans">
            <p>
              Watch NuvieHub on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              ₹ 149 to ₹ 649 a month. No extra costs, no contracts.
            </p>
          </div>
        </div>

        <div className="faxQues ">
          <button className="faxbtn d-flex  justify-content-between align-items-center  w-100 pointer-event ">
            Where can I watch?
            <i className="fa-solid fa-plus w-auto"></i>
          </button>
          <div className="ans">
            <p>
              Watch anywhere, anytime. Sign in with your NuvieHub account to
              watch instantly on the web at NuvieHub.com from your personal
              computer or on any internet-connected device that offers the
              NuvieHub app, including smart TVs, smartphones, tablets, streaming
              media players and game consoles.
            </p>
            <p>
              You can also download your favourite shows with the iOS, Android,
              or Windows 10 app. Use downloads to watch while you&apos;re on the
              go and without an internet connection. Take NuvieHub with you
              anywhere.
            </p>
          </div>
        </div>

        <div className="faxQues ">
          <button className="faxbtn d-flex  justify-content-between align-items-center  w-100 pointer-event ">
            How do I cancel?
            <i className="fa-solid fa-plus w-auto"></i>
          </button>
          <div className="ans">
            <p>
              NuvieHub is flexible. There are no annoying contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees start or stop your account
              anytime.
            </p>
          </div>
        </div>

        <div className="faxQues ">
          <button className="faxbtn d-flex  justify-content-between align-items-center  w-100 pointer-event ">
            What can I watch on NuvieHub?
            <i className="fa-solid fa-plus w-auto"></i>
          </button>
          <div className="ans">
            <p>
              NuvieHub has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning NuvieHub originals, and more. Watch
              as much as you want, anytime you want.
            </p>
          </div>
        </div>

        <div className="faxQues ">
          <button className="faxbtn d-flex  justify-content-between align-items-center  w-100 pointer-event ">
            Is it good for kids?
            <i className="fa-solid fa-plus w-auto"></i>
          </button>
          <div className="ans">
            <p>
              The NuvieHub Kids experience is included in your membership to
              give parents control while kids enjoy family-friendly TV shows and
              films in their own space.
            </p>
            <p>
              Kids profiles come with PIN-protected parental controls that let
              you restrict the maturity rating of content kids can watch and
              block specific titles you dont want kids to see.
            </p>
          </div>
        </div>
      </div>

      <div
        className=" input-wrapper2 text-light bg-black d-flex flex-column justify-content-center align-items-center text-center pt-5 pb-5 w-100"
        style={{ marginBottom: "10px" }}
      >
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="wrapper-input d-flex  align-items-center"
        >
          <div className="input-data col-8 d-flex flex-column  align-items-center ">
            <input
              className="emailId"
              type="email"
              name="email"
              id="email2"
              onChange={(e) => {
                formik.handleChange(e);
                handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder=""
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            />

            {formik.touched.email && formik.errors.email ? (
              <span
                style={{
                  textAlign: "start",
                  color: "rgb(235, 57, 66)",
                  fontSize: "12px",
                  paddingLeft: "16px",
                  width: "100%",
                }}
              >
                {formik.errors.email}
              </span>
            ) : null}
            <label htmlFor="email2">Email address</label>
          </div>

          <div className="col-4" style={{ marginLeft: "10px" }}>
            <button type="submit" className="getStartedbtn">
              Get Started
              <img src={arrow} alt="" />
            </button>
          </div>
        </form>
      </div>

      <div className="seperation"></div>

      <div
        className="footer-section p-5 bg-black w-100"
        style={{ color: "white" }}
      >
        <p>Questions? Call 000-800-919-1694</p>

        <div className="footer">
          <div className="footer-item">
            <a href="/">FAQ</a>
            <br />
            <a href="/">Help Centre</a>
            <br />
            <a href="/">Account</a>
            <br />
            <a href="/">Media Centre</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Investor Relations</a>
            <br />
            <a href="/">Jobs</a>
            <br />
            <a href="/">
              Ways to Watch
              <br />
            </a>
            <a href="/">Terms of Use</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Privacy</a>
            <br />
            <a href="/">Cookie Preferences</a>
            <br />
            <a href="/">Corporate Information</a>
            <br />
            <a href="/">Contact Us</a>
            <br />
          </div>
          <div className="footer-item">
            <a href="/">Speed Test</a>
            <br />
            <a href="/">Legal Notices</a>
            <br />
            <a href="/">Only on NuvieHub</a>
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
        <p className="pt-3">NuvieHub India</p>
      </div>
    </div>
  );
}
