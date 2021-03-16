import React from "react";

interface RoomButtonProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  isDevice: boolean;
}

export const RoomButton: React.FC<RoomButtonProps> = ({
  setToggle,
  toggle,
  isDevice,
}) => {
  return (
    <button
      className={`focus:outline-none bg-button hover:bg-button-hover ${
        isDevice ? "w-full" : "w-32"
      } self-center py-4 self-start text-xs rounded mb-4 text-text font-bold`}
      onClick={() => setToggle(!toggle)}
    >
      Create Room
    </button>
  );
};
