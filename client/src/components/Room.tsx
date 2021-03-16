import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import RoomType from "../types/RoomType";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

interface RoomProps {
  roomValue: RoomType;
  join: (room: RoomType) => void;
}

export const Room: React.FC<RoomProps> = ({ roomValue, join }) => {
  const { room } = useSelector((state: RootState) => state.auth);
  return (
    <button
      key={String(roomValue._id)}
      onClick={() => join(roomValue)}
      className={` text-text bg-purple hover:bg-background-hover hover:text-text-hover border-b-2 border-gray focus:outline-none w-5/6 cursor-pointer py-2 text-xs font-bold text-center md:flex lg:flex 
         md:align-middle lg:align-middle md:py-4 lg:py-4 md:px-2 lg:px-2
        w-full md:text-gray-300 lg:text-gray-300 md:text-sm lg:text-sm ${
          room?._id === roomValue?._id
            ? "bg-purple-dark text-text-hover"
            : "bg-purple-light"
        }`}
    >
      <FontAwesomeIcon icon={faSpinner} size="sm" style={{ margin: "4px" }} />
      <span className="truncate ...">{roomValue.name}</span>
    </button>
  );
};
