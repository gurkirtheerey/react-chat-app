import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../features/auth/authSlice";
import { NavItem } from "./NavItem";

export const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const goToProfile = () => {
    history.push("/profile");
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-background-light w-48 text-xs flex flex-col">
      <NavItem onClick={goToProfile} title="Profile" />
      <NavItem title="Theme Switch" />
      <NavItem title="Buy me a Coffee!" />
      <NavItem onClick={() => logoutUser()} title="Logout" />
    </div>
  );
};
