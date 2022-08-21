import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../fbase";

const Profile = () => {
  const history = useHistory();
  const onLogoutClick = () => {
    logout();
    history.push("/");
  };
  return <button onClick={onLogoutClick}>Log Out</button>;
};

export default Profile;
