import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../app/store";
import { Loader } from "../components/Loader";
import { loginUser } from "../features/auth/authSlice";

export const Login = () => {
  const [username, setUsername] = useState("gurkirt");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const login = async () => {
    await dispatch(loginUser(username, password));
    history.push("/");
  };

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2">
          Username
        </label>
        <input
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
        <p className="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={login}
          className="bg-blue hover:bg-blue-dark text-gray-600 font-bold py-2 px-4 rounded"
          type="button"
        >
          Sign In
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
          Forgot Password?
        </a>
      </div>
    </div>
  );
};
