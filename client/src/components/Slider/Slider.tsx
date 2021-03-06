import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import RoomType from "../../types/RoomType";
import { Room } from "../Room";
import { RoomButton } from "../RoomButton";
import styles from "./Slider.module.css";

interface SliderProps {
  toggleSlider: boolean;
  toggle: boolean;
  rooms: RoomType[];
  joinRoom: (room: RoomType) => void;
  setToggle: (toggle: boolean) => void;
  modal: boolean;
  setModal: (modal: boolean) => void;
  setToggleSlider: (toggle: boolean) => void;
}

export const Slider: React.FC<SliderProps> = ({
  toggleSlider,
  rooms,
  joinRoom,
  setToggle,
  toggle,
  modal,
  setModal,
  setToggleSlider,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.Slider} ${
        toggleSlider ? styles.slideIn : styles.slideOut
      } flex flex-col pt-12 font-bold text-white text-lg justify-between`}
    >
      <div>
        {rooms && rooms.length
          ? rooms.map((room: any, i: any) => (
              <Room key={room._id} roomValue={room} join={joinRoom} />
            ))
          : null}
      </div>
      <div className="flex flex-col w-full">
        <RoomButton
          toggle={toggle}
          setToggle={setToggle}
          isDevice={true}
          modal={modal}
          setModal={setModal}
          toggleSlider={toggleSlider}
          setToggleSlider={setToggleSlider}
        />
        <button
          className="md:pt-6 lg:pt-6 md:focus:outline-none lg:focus:outline-none p-4 font-semibold text-sm"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
