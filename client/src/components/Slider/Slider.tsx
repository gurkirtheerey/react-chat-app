import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import RoomType from "../../types/RoomType";
import { Room } from "../Room";
import styles from "./Slider.module.css";

interface SliderProps {
  toggle: boolean;
  rooms: RoomType[];
  joinRoom: (room: RoomType) => any;
}

export const Slider: React.FC<SliderProps> = ({ toggle, rooms, joinRoom }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.Slider} ${
        toggle ? styles.slideIn : styles.slideOut
      } flex flex-col pt-12 font-bold text-white text-lg justify-between`}
    >
      <div>
        {rooms && rooms.length
          ? rooms.map((room: any, i: any) => (
              <Room key={room._id} room={room} join={joinRoom} />
            ))
          : null}
      </div>
      <button
        className="md:pt-6 lg:pt-6 md:hover:text-gray-300 lg:hover:text-gray-300 md:focus:outline-none lg:focus:outline-none bg-indigo-800 p-6 font-bold text-sm"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
};
