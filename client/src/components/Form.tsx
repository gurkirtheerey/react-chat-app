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
      className="px-4 py-2 md:p-0 lg:p flex md:items-center lg:items-center md:py-4 lg:py-4 md:justify-center
        lg:justify-center"
    >
      <input
        disabled={!room}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="font-bold py-2 px-4 bg-background-light md:bg-background-light lg:bg-background-light rounded-2xl w-full disabled:cursor-not-allowed
          lg:py-2 mx-2 md:rounded-lg lg:rounded-lg md:outline-none lg:outline-none md:border-0 lg:border-0"
        type="text"
        placeholder="Message..."
      />
      <button
        className="ml-2 mr-2 font-semibold md:p-4 lg:hidden md:hidden md:rounded-lg lg:rounded-lg md:ml-4
        lg:ml-4 md:focus:outline-none lg:focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!room || !text}
      >
        Send
      </button>
    </form>
  );
};
