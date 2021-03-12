import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../api";
import { AppThunk } from "../../app/store";
import RoomType from "../../types/RoomType";

interface AuthState {
  isLoggedIn: boolean;
  userId: string | undefined;
  username: string | undefined;
  socketId: string;
  room: RoomType | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userId: undefined,
  username: undefined,
  socketId: "",
  room: undefined,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload;
    },

    setRoom: (state, action: PayloadAction<RoomType | undefined>) => {
      state.room = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    login: (state, action: PayloadAction<any>) => {
      const { userId, username, token } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.username = username;
      state.loading = false;
      localStorage.setItem("token", token);
    },

    register: (state, action: PayloadAction<any>) => {
      const { userId, username, token } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.username = username;
      state.loading = false;
      localStorage.setItem("token", token);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = undefined;
      state.username = undefined;
      localStorage.removeItem("token");
      toast.success("Successfully logged out!");
    },

    resetUser: (state) => {
      state.isLoggedIn = false;
      state.userId = undefined;
      state.username = undefined;
      localStorage.removeItem("token");
    },

    verify: (state, action: PayloadAction<any>) => {
      const { _id, username } = action.payload;
      state.isLoggedIn = true;
      state.userId = _id;
      state.username = username;
      state.loading = false;
    },
  },
});

export const loginUser = (
  username: string,
  password: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await instance.post("/auth/login", { username, password });
    dispatch(login(data));
    return data;
  } catch (err) {
    dispatch(setLoading(false));
    toast.error("Invalid username/password combination.");
    dispatch(resetUser());
    console.log(err);
  }
};

export const registerUser = (
  email: string,
  username: string,
  password: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await instance.post("/auth/register", {
      email,
      username,
      password,
    });
    dispatch(register(data));
    return data;
  } catch (err) {
    dispatch(setLoading(false));
    toast.error(err.response.data);
    dispatch(resetUser());
  }
};

export const verifyUser = (token: string): AppThunk => async (dispatch) => {
  try {
    const { data } = await instance.get("/auth/verify", {
      headers: { Authorization: `${token}` },
    });
    if (data) {
      dispatch(verify(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const getRoomMessages = (room: RoomType): AppThunk => async (
  dispatch
) => {
  try {
    const { _id } = room;
    const { data } = await instance.get("/room/get-room", {
      params: { _id },
    });
    dispatch(setRoom(data));
  } catch (err) {
    console.log(err);
  }
};

export const {
  saveUser,
  setRoom,
  setLoading,
  login,
  register,
  logout,
  verify,
  resetUser,
} = authSlice.actions;

export default authSlice.reducer;
