import "../style/profile.css";
import logo from "../assets/file.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ColorRing } from "react-loader-spinner";

const Profile = () => {
  const id = localStorage.getItem("UserId");
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    role: "",
    email: "",
    name: "",
    dob: "",
    address: "",
    no: "",
    gender: "",
    profilePic: "",
  });
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://nuviehub-movieapp.onrender.com/api/users/${id}`)
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          role: response.data.role,
          email: response.data.email,
          name: response.data.name,
          dob: response.data.dob,
          address: response.data.address,
          no: response.data.no,
          gender: response.data.gender,
          profilePic: response.data.profilePic,
        }));
        setIsLoading(false);
      });

    axios
      .get("https://nuviehub-movieapp.onrender.com/api/users")
      .then((response) => {
        setUserCount(response.data.length);
        setIsLoading(false);
      });
  }, [id]);

  const handleProfileImg = (e) => {
    if (e.target.files) {
      user.profilePic = e.target.files[0];
    }
    let profilePic = document.getElementById("profile-pic");
    let inputpic = document.getElementById("photo");

    profilePic.src = URL.createObjectURL(inputpic.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profile", user.profilePic);
    formData.append("name", user.name);
    formData.append("dob", user.dob);
    formData.append("no", user.no);
    formData.append("address", user.address);
    formData.append("gender", user.gender);
    try {
      const response = await axios.patch(
        `https://nuviehub-movieapp.onrender.com/api/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("formData", ...formData);

      Swal.fire({
        title: "Changes Saved!",
        icon: "success",
        background: "black",
        confirmButtonColor: "red",
        iconColor: "red",
      });
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p style={{ color: "white" }}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["red", "red", "red", "red", "red"]}
            />
          </p>
        </div>
      ) : (
        <div className="profile-page d-flex flex-column">
          <div className="profile-nav">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            action="/profiles"
            method="PATCH"
            encType="multipart/form-data"
          >
            <div className="card-div text-light justify-content-center align-items-center w-100">
              <div className="profileCard m-lg-3 m-md-1  m-sm-1  p-lg-2 p-md-2 p-sm-0">
                <img
                  src={`https://nuviehub-movieapp.onrender.com${user.profilePic}`}
                  alt=""
                  id="profile-pic"
                />
                <label htmlFor="photo">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  onChange={(e) => {
                    handleProfileImg(e);
                  }}
                />

                <hr />
                <div className="d-flex flex-column  justify-content-center align-items-center ">
                  <p className=" w-auto pe-2 fw-light lh-base">Email:</p>
                  <p className="w-auto text-break">{user.email}</p>
                </div>
              </div>

              <div className="infoCard d-flex flex-column m-lg-3 m-md-1  m-sm-1  p-lg-2 p-md-2 p-sm-0">
                <h2>General Information</h2>

                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={user.name || " "}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div>
                  <label htmlFor="dob">Date Of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={user.dob || " "}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div>
                  <label htmlFor="gender">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={user.gender || " "}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="no">Contact Number</label>
                  <input
                    type="text"
                    name="no"
                    id="no"
                    value={user.no || " "}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={user.address || " "}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </div>

            <button type="submit">Save Changes</button>
          </form>

          {user.role === "admin" ? (
            <div className="admin mt-5 text-light p-5">
              <div>
                <p>Number of User: </p>
                <p>{userCount}</p>
              </div>

              <Link to="/admin/editdb">
                <button>Update Database</button>
              </Link>
            </div>
          ) : (
            <div className="admin mt-5 text-light p-5 d-none">
              <div>
                <p>Number of User: </p>
                <p>20</p>
              </div>

              <Link to="/editdb">
                <button>Update Database</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
