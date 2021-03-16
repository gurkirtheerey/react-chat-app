import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../app/store";
import { Loader } from "../components/Loader";
import { registerUser } from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .max(30, "Email must be 30 characters or less")
        .required("Required"),
      username: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { email, username, password } = values;
      const res = await dispatch(registerUser(email, username, password));
      if (res !== undefined) {
        history.push("/");
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    } else {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.focus();
    }
  }, [isLoggedIn, history]);

  if (loading) return <Loader loading={loading} />;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray h-screen flex flex-col justify-center items-center text-sm md:text-md lg:text-lg"
    >
      <h1 className="w-1/3 text-white lg:text-4xl font-mono font-bold text-white mb-12">
        Create an accoount
      </h1>
      <div className="shadow-md rounded w-full md:px-8 lg:px-8 md:pt-6 lg:pt-6 pb-8 mb-4 flex flex-col md:w-1/2 lg:w-1/3 shadow-xl">
        <div className="mb-4">
          {formik.touched.email && formik.errors.email ? (
            <span className="text-error font-bold">{formik.errors.email}!</span>
          ) : null}
          <label className="block text-text text-sm font-bold mb-2 pt-4">
            Email
          </label>
          <input
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="shadow bg-input appearance-none rounded w-full py-2 px-3 font-serif text-text focus:outline-none"
            id="email"
            type="text"
            placeholder="Email"
          />
          {formik.touched.username && formik.errors.username ? (
            <span className="text-error font-bold">
              {formik.errors.username}
            </span>
          ) : null}
          <label className="block text-text text-sm font-bold mb-2 pt-4">
            Username
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="shadow bg-input appearance-none rounded w-full py-2 px-3 font-serif text-text focus:outline-none"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          {formik.touched.password && formik.errors.password ? (
            <span className="text-error font-bold">
              {formik.errors.password}
            </span>
          ) : null}
          <label className="block text-text text-sm font-bold mb-2 pt-4">
            Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="shadow bg-input appearance-none rounded w-full py-2 px-3 font-serif text-text focus:outline-none"
            id="password"
            type="password"
            placeholder="**********"
          />
        </div>
        <div className="flex flex-col h-24 items-center justify-between md:flex-row lg:flex-row">
          <button
            className="w-1/2 md:w-1/3 lg:w-1/3 bg-button text-text font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Sign up
          </button>

          <span
            onClick={() => history.push("/login")}
            className="font-bold text-sm cursor-pointer text-text-button"
          >
            Have an account?
          </span>
        </div>
      </div>
    </form>
  );
};
