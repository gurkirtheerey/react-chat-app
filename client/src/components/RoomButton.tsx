import React from "react";

interface RoomButtonProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  isDevice: boolean;
  modal: boolean;
  setModal: (modal: boolean) => void;
  toggleSlider: boolean;
  setToggleSlider: (modal: boolean) => void;
}

export const RoomButton: React.FC<RoomButtonProps> = ({
  setToggle,
  toggle,
  isDevice,
  modal,
  setModal,
  toggleSlider,
  setToggleSlider,
}) => {
  const toggleProps = () => {
    setToggle(!toggle);
    setModal(!modal);
    console.log("IS DEVICE", isDevice);
    if (isDevice) {
      setToggleSlider(!toggleSlider);
    }
  };

  return (
    <button
      className={`focus:outline-none bg-button-light hover:bg-button-hover ${
        isDevice ? "w-full" : "w-32"
      } self-center py-4 self-start text-xs rounded mb-4 text-white font-bold`}
      onClick={() => toggleProps()}
    >
      Create Room
    </button>
  );
};
