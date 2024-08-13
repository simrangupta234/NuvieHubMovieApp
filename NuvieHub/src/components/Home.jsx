import symbol from "../assets/netflix_symbol.png";
import "../style/home.css";
import movieHeist from "../assets/moneyHeist.jpg";
import Footer from "./Footer";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "10",
        position: "absolute",
        right: "40px",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: "10", left: "40px" }}
      onClick={onClick}
    />
  );
}

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("UserId");
  useEffect(() => {
    // tokenValidation();
    axios
      .get("https://nuviehub-movieapp.onrender.com/api/movies")
      .then((response) => {
        setMovies(response.data);
      });

    axios
      .get(`https://nuviehub-movieapp.onrender.com/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      });
  }, [id]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="movie-main w-100 text-light d-flex flex-column justify-content-center align-items-center">
      <div
        className="style"
        style={{
          background: `url(${movieHeist})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div className="homenav">
          <div className="profile">
            <Link to={`/profile/${user._id}`}>
              <img
                src={`https://nuviehub-movieapp.onrender.com${user.profilePic}`}
                alt=""
              />
            </Link>
          </div>
        </div>

        <div className="stylediv2">
          <div style={{ marginTop: "-110px" }}>
            <p>
              <img src={symbol} alt="" style={{ height: "5%", width: "5%" }} />
              Film
            </p>
            <h1>Money Heist</h1>

            <h3>Money Heist</h3>
            <p style={{ color: "#a3a3a3" }}>2000</p>

            <div>
              <button className="play">Play</button>
              <button className="trailer">Watch Trailer</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" calousel d-flex  flex-column justify-content-center align-items-center  pt-4 pb-4">
        <h2>Featured</h2>
        <Slider {...settings} style={{ position: "relative" }}>
          {movies.map((movie, index) => (
            <Link
              className="slider-card"
              key={index}
              to={`/moviehome/${movie._id}`}
            >
              <img
                src={`https://nuviehub-movieapp.onrender.com${movie?.poster}`}
                alt={movie.title}
              />
            </Link>
          ))}
        </Slider>
      </div>

      <div className=" calousel d-flex  flex-column justify-content-center align-items-center pt-4 pb-4">
        <h2>Trending Now</h2>
        <Slider {...settings} style={{ position: "relative" }}>
          {movies.map((movie, index) => (
            <a
              className="slider-card"
              key={index}
              href={`/moviehome/${movie._id}`}
            >
              <img
                src={`https://nuviehub-movieapp.onrender.com${movie?.poster}`}
                alt=""
              />
            </a>
          ))}
        </Slider>
      </div>

      <div className=" calousel d-flex  flex-column justify-content-center align-items-center  pt-4 pb-4">
        <h2>New Releases</h2>
        <Slider {...settings} style={{ position: "relative" }}>
          {movies.map((movie, index) => (
            <Link
              className="slider-card"
              key={index}
              to={`/moviehome/${movie._id}`}
            >
              <img
                src={`https://nuviehub-movieapp.onrender.com${movie?.poster}`}
                alt=""
              />
            </Link>
          ))}
        </Slider>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
