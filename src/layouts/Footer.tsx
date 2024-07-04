import { Link } from "react-router-dom";
import { IconComponent } from "../utils/Icons";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer
      className="footer text-center fixed-bottom bg-light"
      style={{ fontSize: "11pt"}} 
    >
      <p className="mt-2 mb-0 fs-6">
        Copyright ©{" "}
        <strong className="text-secondary" style={{ fontSize: "11pt" }}>
          Chatter Box Messaging Services
        </strong>
      </p>
      <p className="my-0 mb-1">
        <Link
          className="me-2"
          to="https://github.com/InciGulcinDY"
          target="_blank"
        >
          <IconComponent iconName="GitHub" />
        </Link>
        <small>
          crafted by İnci Gulcin Durak Yolcu at TOBETO Java React Camp
        </small>
      </p>
    </footer>
  );
};

export default Footer;
