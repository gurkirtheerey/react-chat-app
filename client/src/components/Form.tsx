import React, { FormEvent } from "react";

interface FormProps {
  sendMessage: (e: FormEvent<HTMLFormElement>) => void;
  text: string;
  setText: (e: any) => void;
}

export const Form: React.FC<FormProps> = ({ sendMessage, text, setText }) => {
  return (
    <form
      onSubmit={(e) => sendMessage(e)}
      className="flex items-center justify-center pt-4"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-1/2 p-4 rounded-lg outline-none border-0 text-gray-600"
        type="text"
        placeholder="Send message"
      />
      <button className="p-4 bg-gray-400 rounded-lg ml-4 focus:outline-none hover:bg-gray-500 text-gray-700 hover:text-gray-300">
        Send message
      </button>
    </form>
  );
};
