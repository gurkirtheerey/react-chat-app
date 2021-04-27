import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../app/store";
import { Loader } from "../components/Loader";
import { loginUser } from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Username is required"),
      password: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      const res = await dispatch(loginUser(username, password));
      if (res !== undefined) {
        history.push("/");
      }
    },
  });

  if (loading) return <Loader loading={loading} />;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-screen bg-background flex flex-col justify-center items-center"
    >
      <div className="w-full rounded md:px-8 lg:px-8 md:pt-6 lg:pt-6 pb-8 mb-4 flex flex-col lg:w-1/3 md:w-1/2 shadow">
        <div className="mb-4">
          {formik.touched.username && formik.errors.username ? (
            <span className="text-error font-bold">
              {formik.errors.username}
            </span>
          ) : null}
          <label className="block text-text text-sm font-bold mb-2 pt-4">
            Username
          </label>
          <input
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="bg-background-light rounded w-full py-2 px-3 font-serif text-white font-semibold focus:outline-none"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6 w-full">
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
            className="bg-background-light rounded w-full py-2 px-3 text-white font-semibold focus:outline-none"
            id="password"
            type="password"
            placeholder="**********"
          />
        </div>
        <div className="flex flex-col h-24 items-center justify-between md:flex-row lg:flex-row">
          <button
            className="w-1/2 md:w-1/3 lg:w-1/3 bg-button hover:bg-button-hover text-white font-semibold py-2 px-4 rounded focus:outline-none"
            type="submit"
          >
            Sign in
          </button>

          <span
            onClick={() => history.push("/register")}
            className="font-bold text-sm cursor-pointer text-text p-4"
          >
            Don't have an account?
          </span>
        </div>
      </div>
    </form>
  );
};
