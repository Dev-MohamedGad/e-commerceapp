import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Circles } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { UserToken } from "../../Context/UserToken";

export default function Login() {
  let navigate = useNavigate();

  let { setIsLogin } = useContext(UserToken);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  let BaseUrl = "https://ecommerce.routemisr.com";
  async function submitLogin(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setError("");
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setIsLogin(data.token);
      navigate("/");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email not valid"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not match")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <div className="container">
        <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}
          <label htmlFor="email">email:</label>

          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>

          <input
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}
          <NavLink
            className="cursor-pointer shadow-sm bg-transparent"
            to={"/forgetpassword"}
          >
            {" "}
            Have you forgotten your password?{" "}
          </NavLink>
          {loading ? (
            <Circles
              color="white"
              className="bg-success"
              width="20"
              visible={true}
            />
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn form-btn ms-auto d-block"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
