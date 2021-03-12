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
      className="bg-indigo-700 w-full my-1 py-6 text-xs capitalize font-bold text-center md:flex lg:flex cursor-pointer hover:bg-gray-800 md:align-middle lg:align-middle md:py-4 lg:py-4 md:px-2 lg:px-2 md:w-40 lg:w-40 md:text-gray-300 lg:text-gray-300 md:text-sm lg:text-sm"
    >
      <span className="truncate ...">{room.name}</span>
    </div>
  );
};
