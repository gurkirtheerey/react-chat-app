import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { createRoom } from "../features/room/roomSlice";

interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({ modal, setModal }) => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const [roomText, setRoomText] = useState<string>("");
  const dispatch = useDispatch();

  const create = () => {
    if (roomText.length && userId) {
      dispatch(createRoom(roomText, userId));
      setModal(false);
    } else {
      alert("Error saving room... did you enter a username?");
    }
  };
  return (
    <>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background-light outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Room</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  Create a room, send the name to your friends, and start
                  chatting!
                  <input
                    value={roomText}
                    onChange={(e) => setRoomText(e.target.value)}
                    className="mt-4 bg-background rounded w-full py-2 px-3 font-serif text-white font-semibold focus:outline-none"
                    placeholder="Enter name..."
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => create()}
                    disabled={!roomText}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
