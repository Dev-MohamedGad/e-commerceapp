import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate();

  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  let BaseUrl = "https://ecommerce.routemisr.com";

  async function submitRegister(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/signup`, values)
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setError("");
      setLoading(false);
      navigate("/");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 2 char")
      .max(7, "max is 7")
      .required("name is required"),
    email: Yup.string().required("email is required").email("email not valid"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not match")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword not mtch")
      .required("repassworsd is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0-25][0-9]{8}$/, "not match")
      .required("phone is required"),
  });

  

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <div className="container">
        <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}
          <label htmlFor="name">name:</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : (
            ""
          )}

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
          <label htmlFor="rePassword">rePassword:</label>

          <input
            type="password"
            className="form-control mb-3"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}
          {loading ? (
            <button className="btn form-btn ms-auto d-block">
              <Circles
                color="#4fa94d"
                width="40"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn form-btn ms-auto d-block"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
