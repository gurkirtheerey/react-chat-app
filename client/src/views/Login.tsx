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
        .required("Required"),
      password: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Required"),
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
      className="h-screen bg-gray-800 flex justify-center items-center text-gray-500"
    >
      <div className="w-full shadow-md rounded md:px-8 lg:px-8 md:pt-6 lg:pt-6 pb-8 mb-4 flex flex-col lg:w-1/3 md:w-1/2 shadow-2xl">
        <div className="mb-4">
          <h1 className="text-center md:font-semibold lg:font-semibold text-white lg:text-xl mb-12">
            Login
          </h1>

          {formik.touched.username && formik.errors.username ? (
            <span className="text-red-500">{formik.errors.username}</span>
          ) : null}
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Username
          </label>
          <input
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="shadow bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6 w-full">
          {formik.touched.password && formik.errors.password ? (
            <span className="text-red-500">{formik.errors.password}</span>
          ) : null}
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="shadow bg-gray-200 appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="**********"
          />
        </div>
        <div className="flex flex-col h-24 items-center justify-between md:flex-row lg:flex-row">
          <button
            className="bg-blue-500 w-1/2 md:w-1/3 lg:w-1/3 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Sign in
          </button>

          <span
            onClick={() => history.push("/register")}
            className="font-bold text-sm cursor-pointer text-gray-400 hover:text-gray-500"
          >
            Don't have an account?
          </span>
        </div>
      </div>
    </form>
  );
};
