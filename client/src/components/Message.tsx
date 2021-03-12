import React from "react";
import { useSelector } from "react-redux";

interface MessageProps {
  message: string;
  userId: string;
  user: string;
}

export const Message: React.FC<MessageProps> = ({ message, userId, user }) => {
  const { username } = useSelector((state: any) => state.auth);

  return (
    <div id="test" className={`px-4 py-2`}>
      <h2
        className={`font-bold ${
          username === user ? "text-red-400" : "text-blue-200"
        }`}
      >
        {user}
      </h2>
      <span className="text-gray-400">{message}</span>
    </div>
  );
};
