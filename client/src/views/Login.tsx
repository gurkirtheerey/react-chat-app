import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../app/store";
import { Loader } from "../components/Loader";
import { loginUser } from "../features/auth/authSlice";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const login = async () => {
    await dispatch(loginUser(username, password));
    history.push("/");
  };

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="h-screen bg-red-100 flex justify-center items-center text-gray-500">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-1/2 shadow-xl">
        <div className="mb-4">
          <h1 className="text-center font-semibold text-gray-700 text-xl mb-12">
            Login
          </h1>
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Username
          </label>
          <input
            ref={inputRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={login}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
          <span
            onClick={() => history.push("/register")}
            className="font-bold text-sm cursor-pointer text-gray-400 hover:text-gray-500"
          >
            Don't have an account?
          </span>
        </div>
      </div>
    </div>
  );
};
