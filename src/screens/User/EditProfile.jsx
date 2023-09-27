import React, { useState } from "react";
import "./EditProfile.css";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import apiClient from "./../../api/client";
import useAuth from "../../auth/useAuth";
import swal from "sweetalert";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
  );

  const { user, logIn } = useAuth();

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const result = await apiClient.put("/users/profile", {
      id: user.id,
      name: name,
      email: email,
    });
    if (result.ok) {
      logIn(result.data.token);
      setName("");
      setEmail("");
      swal("Profile Updated", "Successfully", "success");
    } else {
      swal("Error!", "Occured Retry", "error");
    }
  };

  return (
    <div className="editprofile-container">
      <div className="box">
        <h2 className="updateProfileHeading">Update Profile</h2>

        <form
          className="updateProfileForm"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div className="updateProfileName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="updateProfileEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* <div id="updateProfileImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              // onChange={updateProfileDataChange}
            />
          </div> */}
          <input type="submit" value="Update" className="updateProfileBtn" />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
