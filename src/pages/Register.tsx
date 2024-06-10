import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { RegisterUserModel } from '../models/RegisterUserModel';
import UserService from '../services/UserService';
import { toast } from 'react-toastify';

type Props = {}

const Register = (props: Props) => {

    const navigate = useNavigate();
    const bcrypt = require('bcryptjs');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
              .min(3, 'Username must be at least 3 characters long')
              .max(30, 'Username cannot be longer than 30 characters')
              .required('Username is required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            firstname: Yup.string()
              .min(3, 'Firstname must be at least 3 characters long')
              .max(30, 'Firstname cannot be longer than 30 characters')
              .required('Firstname is required'),
            lastname: Yup.string()
              .min(3, 'Lastname must be at least 3 characters long')
              .max(40, 'Lastname cannot be longer than 30 characters')
              .required('Lastname is required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters long')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Passwords must match')
              .required('Confirm password is required'),
        }), 
        onSubmit: (values) => {
            console.log('Form submitted:', values);

            const registerData: RegisterUserModel = {
                user: {
                    username: values.username,
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    image: null,
                    password: bcrypt.hash(values.password, 10),
                    roles: ["USER"]
                }
            };
            const hashedPassword = 

            console.log("registerData: ",registerData);
            UserService.register(registerData)
              .then(response => {
                console.log(response);
                toast.success(response.data.message)
                // Redirect to login page after successful registration
                setTimeout(() => {
                  navigate('/api/login');
                }, 3000);
              })
              .catch(error => {
                console.error('Registration failed:', error);
                // Handle error if registration fails
                toast.error(error.data.message);
              });
        },
    });

    return (
      <div className="container">
        <div className="row" style={{ marginTop: 150 }}>
          <div className="col-2"></div>
          <div className="col-8">
            <h2 className='font-monospace text-primary-emphasis mb-5'>Almost There! Join Us to Start Chatting!</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <label className="form-label">Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="text-danger">{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label">Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="text-danger">{formik.errors.lastname}</div>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className="text-danger">{formik.errors.username}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col-8">
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="text-danger">{formik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn btn btn-lg btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Register;
