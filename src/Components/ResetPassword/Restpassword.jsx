import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";

const ResetPasswordForm = () => {
  let { setIsLogin } = useContext(UserToken);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    newpassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email not valid"),
    newpassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not match")
      .required("password is required"),
  });

  //put  reset password
  async function resetpassword(valEmail, valnewPassword) {
    return await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: `${valEmail}`,
        newPassword: `${valnewPassword}`,
      })
      .then((result) => {
        console.log(result.token);
        toast.success("seucss");
        localStorage.setItem("userToken", result.token);
        navigate("/login");

        setIsLogin(result.token);


      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  //Submit function
  const onSubmit = async (values) => {
    await resetpassword(values.email, values.newpassword);
  };

  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <div className="container  w-50 bg-body-tertiary rounded-3 shadow-lg border-2 p-5">
            <h2> Reset Password</h2>

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
                  name="newpassword"
                  component="div"
                  className="text-danger"
                />
                <label htmlFor="newpassword">New password</label>
                <Field
                  type="password"
                  id="newpassword"
                  name="newpassword"
                  placeholder="Enter your new password"
                  className="form-control"
                />
                <ErrorMessage
                  name="newpassword"
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
    </>
  );
};

export default ResetPasswordForm;
