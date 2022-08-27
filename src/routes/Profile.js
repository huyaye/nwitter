import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { logout, dbService } from "../fbase";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogoutClick = () => {
    logout();
    history.push("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <form></form>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default Profile;
