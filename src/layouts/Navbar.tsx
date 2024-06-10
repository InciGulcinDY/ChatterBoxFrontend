import React from "react";
import { Link } from "react-router-dom";
import { IconComponent } from "../utils/Icons";
import UserNarbarCard from "../components/UserNarbarCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";

type Props = {};

const Navbar: React.FC<Props> = () => {

  const isLogin = useSelector((state: RootState) => state.user.isLogin);

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

          {/* Profile | Login | Register */
          isLogin ? <UserNarbarCard /> : <div> <LoginCard /> <RegisterCard /> </div>         
          }         
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
