import React from "react";
import { useSelector } from "react-redux";

interface MessageProps {
  message: string;
  userId: string;
}

const myTexts = "text-right bg-blue-500";
const otherTexts = "tex-left bg-red-500";

export const Message: React.FC<MessageProps> = ({ message, userId }) => {
  const { socketId } = useSelector((state: any) => state.auth);
  return (
    <div
      className={`border-b-2 border-gray px-4 py-2 ${
        socketId !== userId ? otherTexts : myTexts
      }`}
    >
      {message}
    </div>
  );
};
