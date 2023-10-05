import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [isconfiremed, setisconfiremed] = useState(false);
  const [isloading, setisloading] = useState(false);
  const initialValues = {
    email: "",
    code: "",
  };

  const validationSchema =
    isconfiremed == false
      ? Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })
      : Yup.object().shape({
          code: Yup.string()
            .matches(/^[0-9]+$/, "Code must consist of numbers only")
            .required("Code is required"),
        });

  // postemail function
  async function postEmail(val) {
    return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: `${val}`,
      })
      .then((result) => {
        console.log(result);
        toast.success(result.data.message);
        setisconfiremed(true);
      });
  }

  // POST Verify Reset Code
  async function postreset(val) {
    return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: `${val}`,
      })
      .then((result) => {
        setisconfiremed(false);

        console.log(result);
        toast.success(result.data.status);

        // navigate("/updatepassword");
      });
  }

  //Submit function
  const onSubmit = async (values) => {
    if (isconfiremed == false) {
      await postEmail(values.email);
    } else {
      await postreset(values.code);
      navigate("/resetpassword");
    }
  };

  return (
    <>
      {isconfiremed == true ? (
        <div className="container vh-100 d-flex justify-content-center align-items-center ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <div className="container  w-50 bg-body-tertiary rounded-3 shadow-lg border-2 p-5">
              <h2> Reset Code</h2>

              <Toaster position="top-center" reverseOrder={false} />
              <Form>
                <div className="form-group ">
                  <label htmlFor="code">Confirm Code</label>
                  <Field
                    type="numbers"
                    id="code"
                    name="code"
                    placeholder="Enter your code"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success  form-control my-3"
                >
                  Submit
                </button>
              </Form>
            </div>
          </Formik>
        </div>
      ) : (
        <div className="container vh-100 d-flex justify-content-center align-items-center ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <div className="container  w-50 bg-body-tertiary rounded-3 shadow-lg border-2 p-5">
              <h2>Forgot Password</h2>

              <Toaster position="top-center" reverseOrder={false} />
              <Form>
                <div className="form-group ">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success  form-control my-3"
                >
                  Submit
                </button>
              </Form>
            </div>
          </Formik>
        </div>
      )}{" "}
    </>
  );
};

export default ForgotPasswordForm;
