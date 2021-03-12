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
      className="flex items-center px-4 md:px-0 lg:px-0 md:justify-center lg:justify-center pt-4"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="py-2 px-4 bg-gray-800 rounded-2xl w-full md:w-1/2 lg:w-1/2 md:p-4 lg:p-4 md:rounded-lg lg:rounded-lg md:outline-none lg:outline-none md:border-0 lg:border-0 md:text-gray-600 lg:text-gray-600"
        type="text"
        placeholder="Message..."
      />
      <button
        className="ml-4 font-semibold md:p-4 lg:p-4 md:bg-gray-400 lg:bg-gray-400 md:rounded-lg lg:rounded-lg md:ml-4 lg:ml-4 
        md:focus:outline-none lg:focus:outline-none md:hover:bg-gray-500 lg:hover:bg-gray-500
        md:text-gray-700 lg:text-gray-700 md:hover:text-gray-300 lg:hover:text-gray-300"
      >
        Send
      </button>
    </form>
  );
};
