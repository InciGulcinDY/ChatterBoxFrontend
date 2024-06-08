import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div>
      <div
        className="card mb-3 mx-auto"
        style={{ maxWidth: 1000, marginTop: 70 }}
      >
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src="/assets/homepage.jpg"
              className="img-fluid rounded-start"
              alt="Homeage Image"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h1
                className="card-title font-monospace text-primary-emphasis"
                style={{ fontSize: 100 }}
              >
                Like Chatting Face to Face
              </h1>
              <p className="card-text font-monospace text-primary-emphasis fs-1 ">
                <Link to={"/api/login"}>Start Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
