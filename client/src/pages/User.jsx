import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/user/${id}`).then(res => {
      return res.json()
    }).then((jsonRes) => {
      console.log(jsonRes.user)
      setUser(jsonRes.user);
    }).catch((err) => {
      console.log(err);
    });

  }, [id])

  return (
    <div>
      <ul>
        <li>Username: {user.username}</li>
        <li>Name: {user.name}</li>
      </ul>
    </div>
  )
}

export default User;