import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../stores";

export const AuthProtected = (props) => {

  const user = useAuth((state) => state.user);
  const accessToken = useAuth((state) => state.accessToken);

  if (!user || !accessToken) {
    return <Navigate to={"/login"} />;
  }
  if (user && user.tempPassword === true) {
    return <Navigate to={"/reset-password"} />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};
