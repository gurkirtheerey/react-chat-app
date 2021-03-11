import React from "react";
import RoomType from "../types/RoomType";

interface RoomProps {
  room: RoomType;
  join: (room: RoomType) => void;
}

export const Room: React.FC<RoomProps> = ({ room, join }) => {
  return (
    <span
      key={String(room._id)}
      onClick={() => join(room)}
      className="truncate ... cursor-pointer hover:bg-gray-600 align-middle pt-10"
    >
      {room.name}
    </span>
  );
};
