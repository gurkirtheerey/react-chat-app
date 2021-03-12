import React, { useEffect, useState } from "react";
import RoomType from "../types/RoomType";
import MessageType from "../types/MessageType";
import { Message } from "./Message";

interface MessageBoxProps {
  room: RoomType | undefined;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ room }) => {
  const [scroll, setScroll] = useState(0);
  let messages: MessageType[] | undefined;
  if (room !== undefined) {
    messages = room.messages;
  }

  useEffect(() => {
    const messageBox = document.getElementById("message-box");
    if (messageBox) {
      setScroll(messageBox.scrollHeight);
      messageBox.scrollTop = scroll;
    }
  }, [room, scroll]);

  return (
    <div
      id="message-box"
      className="box-border h-3/5 overflow-scroll p-4 border-4 border-gray-500 rounded ml-4"
    >
      {messages && messages.length
        ? messages.map(({ _id, userId, message, username }) => (
            <ul key={_id}>
              <Message message={message} userId={userId} user={username} />
            </ul>
          ))
        : null}
    </div>
  );
};
