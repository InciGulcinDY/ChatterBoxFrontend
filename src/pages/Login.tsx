import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { LoginUserModel } from "../models/LoginUserModel";
import UserService from "../services/UserService";
import { setIsLogin, setUserId } from "../store/userSlice";
import { toast } from "react-toastify";
import TokenService from "../services/TokenService";
import ProfileService from "../services/ProfileService";
import { AxiosResponse } from "axios";

type Props = {};

interface LoginResponse {
  token: string;
}

interface AuthCResult {
  success: boolean;
  message: string;
  loginResponse: LoginResponse;
}

interface ServerResponse extends AxiosResponse {
  data: AuthCResult;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      loginUsername: "",
      loginPassword: "",
    },
    validationSchema: Yup.object({
      loginUsername: Yup.string().required("Username is required"),
      loginPassword: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      const loginData: LoginUserModel = {
        username: values.loginUsername,
        password: values.loginPassword
      };

      UserService.login(loginData)
        .then((response) => {
          if (response && response.data && response.data.loginResponse) {
            const { token } = response.data.loginResponse;
            TokenService.setToken(token);
            dispatch(setIsLogin(true));

            ProfileService.getProfile(token).then((profileResponse) => {
              dispatch(setUserId(profileResponse.id));
            });

            navigate('/api/login');
            toast.success(response.data.message);
          } else {
            console.error('Invalid response structure:', response);
            toast.error("Invalid username or password.");
          }
        })
        .catch(error => {
          console.error('Login failed:', error);
          toast.error("Login failed. Please try again.");
        });
    },
  });

  return (
    <div className="container">
      <div className="row" style={{ marginTop: 150 }}>
        <div className="col-4"></div>
        <div className="col-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="loginUsername"
                name="loginUsername"
                value={formik.values.loginUsername}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.loginUsername && formik.errors.loginUsername ? (
                <div className="text-danger">{formik.errors.loginUsername}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                name="loginPassword"
                value={formik.values.loginPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.loginPassword && formik.errors.loginPassword ? (
                <div className="text-danger">{formik.errors.loginPassword}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
