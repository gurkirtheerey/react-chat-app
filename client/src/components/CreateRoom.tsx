import React from "react";
import { Modal } from "./Modal";

interface CreateRoomProps {
  roomText: string;
  setRoomText: (e: any) => void;
  create: () => void;
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({
  roomText,
  setRoomText,
  create,
  modal,
  setModal,
}) => {
  return <Modal modal={modal} setModal={setModal} />;
};
