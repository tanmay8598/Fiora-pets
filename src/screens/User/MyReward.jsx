import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "./../../api/client";
import useAuth from "./../../auth/useAuth";
import "./MyReward.css";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import logo from "../../assets/reward.jpg";

const MyReward = () => {
  const { user } = useAuth();
  const [data, setData] = useState();

  useEffect(() => {
    fetchMyReward();
  }, [user]);

  const fetchMyReward = async () => {
    if (user) {
      const { data } = await apiClient.get("/rewards/getrewardpoints", {
        userId: user?.id,
      });
      setData(data);
    }
  };

  const points = Number(data?.amount).toFixed(2);

  return (
    <div className="editprofile-container">
      <div className="box">
        <h2 className="updateProfileHeading">My Rewards Point</h2>
        <div className="updateProfileName">
          <h3 style={{ textAlign: "center", marginTop: "50px" }}>
            <EmojiEventsOutlinedIcon />
            {points} points
          </h3>

          <img src={logo} alt="reward" className="reward-img" />
        </div>
      </div>
    </div>
  );
};

export default MyReward;
