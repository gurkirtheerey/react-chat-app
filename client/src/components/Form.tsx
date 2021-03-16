import React, { FormEvent } from "react";
import RoomType from "../types/RoomType";

interface FormProps {
  sendMessage: (e: FormEvent<HTMLFormElement>) => void;
  text: string;
  setText: (e: any) => void;
  room: RoomType | undefined;
}

export const Form: React.FC<FormProps> = ({
  sendMessage,
  text,
  setText,
  room,
}) => {
  return (
    <form
      onSubmit={(e) => sendMessage(e)}
      className="md:relative lg:relative flex md:items-center lg:items-center p-2 md:p-4 lg:p-4 md:justify-center 
        lg:justify-center"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="py-2 px-4 bg-gray-light rounded-2xl w-full md:p-4 
          lg:px-4 lg:py-2 mx-2 md:rounded-lg lg:rounded-lg md:outline-none lg:outline-none md:border-0 lg:border-0"
        type="text"
        placeholder="Message..."
      />
      <button
        className="ml-2 mr-2 font-semibold md:p-4 lg:hidden md:hidden lg:bg-gray-400 md:rounded-lg lg:rounded-lg md:ml-4 lg:ml-4 
        md:focus:outline-none lg:focus:outline-none md:hover:bg-gray-500 lg:hover:bg-gray-500
        md:text-gray-700 lg:text-gray-700 md:hover:text-gray-300 lg:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!room || !text}
      >
        Send
      </button>
    </form>
  );
};
