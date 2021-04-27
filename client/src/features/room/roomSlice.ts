import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

export const createRoom = (name: String, userId: String): AppThunk => async (
  dispatch
) => {
  try {
    const { data } = await instance.post("/room", { name, userId });
    toast.dark(`Room: ${name} created!`);
    dispatch(setRooms(data));
  } catch (err) {
    toast.dark(err.message);
    console.log(err);
  }
};

export const deleteRoom = (room: RoomType): AppThunk => async (dispatch) => {
  try {
    await instance.post("/room/delete-room", { room });
    toast.dark(`Room: ${room.name} deleted!`);
    try {
      const { data } = await instance.get("/room");
      dispatch(setRooms(data));
    } catch (err) {
      console.log(err.message);
      toast.dark(err);
    }
  } catch (err) {
    console.log(err.message);
    toast.dark(err);
  }
};

export default roomSlice.reducer;
