import React from "react";
import RoomType from "../types/RoomType";

interface RoomProps {
  room: RoomType;
  join: (room: RoomType) => void;
}

export const Room: React.FC<RoomProps> = ({ room, join }) => {
  return (
    <div
      key={String(room._id)}
      onClick={() => join(room)}
      className="flex cursor-pointer hover:bg-gray-800 align-middle py-4 px-2 w-40 text-gray-300 text-sm"
    >
      <span className="truncate ...">{room.name}</span>
    </div>
  );
};
