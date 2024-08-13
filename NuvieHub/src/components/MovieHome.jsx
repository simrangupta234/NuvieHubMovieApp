import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import symbol from "../assets/netflix_symbol.png";
import logo from "../assets/file.png";
import Footer from "./Footer";
import "../style/moviehome.css";
import { useAuth } from "./AuthContext";
import { Link, useParams } from "react-router-dom";

const MovieHome = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
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

  // const tokenValidation = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://nuviehub-movieapp.onrender.com/api/users/login",
  //       JSON.stringify({ email: email, password: password }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(response.data.message);
  //     if (response.data.message === "User is not authorized") {
  //       setLoggedInValue(false);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("invalid user data", error);
  //   }
  // };

  const idformovie = async () => {
    await axios
      .get(`https://nuviehub-movieapp.onrender.com/api/movies/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setMovies(response.data);
        } else {
          return;
        }
      });
  };

  useEffect(() => {
    idformovie();
  }, []);

  const myStyle = {
    backgroundImage: `url(https://nuviehub-movieapp.onrender.com${movies.thumbnail})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "530px",
    position: "relative",
  };

  return (
    <div className="movie-main w-100 text-light d-flex flex-column justify-content-center align-items-center">
      <div className="header-movie d-flex flex-row justify-content-between align-items-center bg-black text-light  ">
        <a
          className="logom"
          href="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          <img
            src={logo}
            style={{ height: "55px", width: "220px" }}
            alt="logo"
          />
        </a>
        <a
          className="symbolm"
          href="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          <img
            src={symbol}
            style={{ height: "55px", width: "auto" }}
            alt="logo"
          />
        </a>

        <div className="header-movie-right d-flex justify-content-center align-items-center w-auto">
          <div className="textm" style={{ fontSize: "13px" }}>
            UNLIMITED TV SHOWS & MOVIES
          </div>
          {isLoggedIn ? (
            <button className="btnm" style={{ display: "none" }}>
              <a href="/" style={{ textDecoration: "none", color: "white" }}>
                JOIN NOW
              </a>
            </button>
          ) : (
            <button className="btnm">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                JOIN NOW
              </Link>
            </button>
          )}

          {isLoggedIn ? (
            <button
              className="btnm"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #888",
              }}
            >
              <a
                href="/"
                style={{ textDecoration: "none", color: "white" }}
                onClick={(e) => {
                  signOut(e);
                }}
              >
                Sign out
              </a>
            </button>
          ) : (
            <button
              className="btnm"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #888",
              }}
            >
              <a
                href="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign In
              </a>
            </button>
          )}
        </div>
      </div>

      <div className="style" style={myStyle}>
        <div className="stylediv">
          <div style={{ marginTop: "-40px" }}>
            <p>
              <img src={symbol} alt="" style={{ height: "5%", width: "5%" }} />
              Film
            </p>
            <h1>{movies.title}</h1>

            <h3>{movies.title}</h3>
            <p style={{ color: "#a3a3a3", paddingBottom: "10px" }}>
              {movies.release_year} | {movies.duration} | {movies.genre}
            </p>
            <p>{movies.overview}</p>
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <div
          style={{
            marginTop: "-100px",
            zIndex: "10",
            paddingLeft: "4%",
            marginBottom: "40px",
          }}
        >
          <button className="play">Play</button>
          <button className="trailer">Watch Trailer</button>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center justify-content-between align-items-center w "
          style={{
            position: "relative",
            height: "60px",
            width: "90%",
          }}
        >
          <div className="joinnowbox ">
            <img src={symbol} alt="" />
            <div className="joinnowm">
              <div>Watch all you want.</div>

              <button className="btnm">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  JOIN NOW
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row movieList-all p-4 ">
        <h2>Previews</h2>
        {movies.preview &&
          movies.preview.map((previews, index) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 p-3 text-decoration-none"
              key={index}
            >
              <img
                className="img-fluid object-fit-cover"
                alt={`Preview ${index + 1}`}
                src={`https://nuviehub-movieapp.onrender.com${previews}`}
              />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};
export default MovieHome;
