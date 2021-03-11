import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../api";
import { AppThunk } from "../../app/store";
import RoomType from "../../types/RoomType";

interface RoomState {
  rooms: RoomType[];
}

const initialState: RoomState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<any>) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomSlice.actions;

export const getRooms = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await instance.get("/room");
    dispatch(setRooms(data));
  } catch (err) {
    console.log(err);
  }
};

export const createRoom = (name: String): AppThunk => async (dispatch) => {
  try {
    const { data } = await instance.post("/room", { name });
    dispatch(setRooms(data));
  } catch (err) {
    console.log(err);
  }
};

export default roomSlice.reducer;
