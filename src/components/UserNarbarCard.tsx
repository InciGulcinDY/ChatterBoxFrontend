import React from "react";
import { Link } from "react-router-dom";
import { IconComponent } from "../utils/Icons";

type Props = {};

const UserNarbarCard = (props: Props) => {
  return (
    <div className="d-inline-block">
      <Link className="navbar-brand d-flex" to="/">
        <img
          src="/assets/inci.jpg"
          className="img-fluid rounded-circle border border-3 border-secondary me-3"
          alt="profile"
          style={{ width: "35px", height: "35px", objectFit: "cover" }}
        />
        <div className="pb-0">İnci Gülçin</div>
      </Link>
    </div>
  );
};

export default UserNarbarCard;
