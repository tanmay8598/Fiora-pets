import React, { useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";
import LockIcon from "@mui/icons-material/Lock";
import "./UpdatePassword.css";
import useAuth from "../../auth/useAuth";
import apiClient from "../../api/client";
import swal from "sweetalert";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, logIn,  } = useAuth();

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const result = await apiClient.put("/users/profile", {
        id: user.id,
        password: newPassword,
      });
      if (result.ok) {
        logIn(result.data.token);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        swal("Password Updated", "Successfully", "success");
        
      } else {
        swal("Error!", "Occured Retry", "error");
      }
    } else {
      swal("Error!", "Password mismatch retry", "error");
    }
  };

  return (
    <div className="updatePasswordContainer">
      <div className="updatePasswordBox">
        <h2 className="updatePasswordHeading">Update Profile</h2>

        <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
          <div className="loginPassword">
            <VpnKeyIcon />
            <input
              type="password"
              placeholder="Old Password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockIcon />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Change" className="updatePasswordBtn" />
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
