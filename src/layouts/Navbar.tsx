import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { IconComponent } from "../utils/Icons";
import UserNarbarCard from "../components/UserNarbarCard";

type Props = {};

const Navbar: React.FC<Props> = () => {
  return (
    <div style={{marginBottom:60}}>
      <nav className="navbar navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <div className="d-inline-block">
            <Link className="navbar-brand" to="/">
              <IconComponent iconName="Logo" />
            </Link>

            <Link className="navbar-brand text-align-start fw-bold" to="/">
              Chatter Box
            </Link>
          </div>
          {/*<UserNarbarCard />*/}
          <ProfileCard />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
