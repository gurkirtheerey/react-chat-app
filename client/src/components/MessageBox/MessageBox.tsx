import React, { useEffect, useState } from "react";
import RoomType from "../../types/RoomType";
import MessageType from "../../types/MessageType";
import { Message } from "../Message";
import styles from "./MessageBox.module.css";

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
      className={`${styles.main} border-2 border-gray-800 overflow-scroll  md:box-border lg:box-border md:h-3/5 lg:h-3/5
        md:p-4 lg:p-4 md:border-4 lg:border-4 md:border-gray-500
        lg:border-gray-500 md:rounded lg:rounded md:ml-4 lg:ml-4`}
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
