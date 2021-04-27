import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleCarry,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import RoomType from "../types/RoomType";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../features/room/roomSlice";

interface RoomProps {
  roomValue: RoomType;
  join: (room: RoomType) => void;
}

export const Room: React.FC<RoomProps> = ({ roomValue, join }) => {
  const { room, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const delRoom = (roomValue: RoomType) => {
    if (roomValue) {
      let id = roomValue.userId;
      if (id === userId) {
        dispatch(deleteRoom(roomValue));
      }
    }
  };

  return (
    <button
      key={String(roomValue._id)}
      className={`text-text-light hover:text-text-hover focus:outline-none w-5/6 cursor-pointer py-2 text-xs font-bold text-center md:flex lg:flex
         md:align-middle lg:align-middle md:py-4 lg:py-4 md:px-2 lg:px-2
        w-full md:text-sm lg:text-sm ${
          room?._id === roomValue?._id
            ? "text-text-hover bg-background-light"
            : ""
        }`}
    >
      <div className="flex justify-around md:justify-between lg:justify-between md:items-center lg:items-center w-full">
        <FontAwesomeIcon icon={faSpinner} size="sm" style={{ margin: "4px" }} />
        <span onClick={() => join(roomValue)} className="truncate ... w-full">
          {roomValue.name}
        </span>
        {userId === roomValue.userId ? (
          <FontAwesomeIcon
            color="red"
            icon={faTrash}
            size="1x"
            onClick={() => delRoom(roomValue)}
          />
        ) : (
          <FontAwesomeIcon icon={faPeopleCarry} size="1x" />
        )}
      </div>
    </button>
  );
};
