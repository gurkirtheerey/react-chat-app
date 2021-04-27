import React from "react";
import { useSelector } from "react-redux";
import po from "../images/po.png";

interface MessageProps {
  message: string;
  userId: string;
  user: string;
  date: string;
}

export const Message: React.FC<MessageProps> = ({
  message,
  userId,
  user,
  date,
}) => {
  const { username } = useSelector((state: any) => state.auth);

  return (
    <div
      className={`flex items-center px-2 py-2 text-sm cursor-pointer bg-background-semilight hover:bg-background-hover
      border-b border-background`}
    >
      <img
        className="rounded-full shadow self-start"
        height={35}
        width={35}
        src={po}
        alt="avatar"
      />
      <div className="ml-2 md:ml-4 lg:ml-4">
        <div className="flex items-center">
          <h2
            className={`text-xs md:text-sm lg:text-sm font-bold ${
              username === user ? "text-message-me" : "text-message-other"
            }`}
          >
            {user}
          </h2>
          <p className="text-xs ml-4">{date}</p>
        </div>
        <span className="text-message-text text-xs">{message}</span>
      </div>
    </div>
  );
};
