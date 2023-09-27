import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Fragment>
      <Fragment>
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img
              src={
                "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
              }
              alt="img"
            />
            <Link to="/edit-profile">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user?.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user?.email}</p>
            </div>

            <div>
              <Link to="/myorders">My Orders</Link>
              <Link to="/update-password">Change Password</Link>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default ProfileScreen;
