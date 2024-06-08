import React from "react";
import { Link } from "react-router-dom";
import { IconComponent } from "../utils/Icons";
import { useDispatch } from "react-redux";

type Props = {};

const ProfileCard = (props: Props) => {

  return (
    <div className="d-inline-block">
      <Link className="navbar-brand d-flex" to="/api/login">
        <IconComponent iconName="Profile"  />
        <div className="pb-0">Login</div>
      </Link>
    </div>
  );
};

export default ProfileCard;
