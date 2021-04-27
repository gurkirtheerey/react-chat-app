import React, { useEffect, useState } from "react";
import RoomType from "../../types/RoomType";
import MessageType from "../../types/MessageType";
import { Message } from "../Message";
import { Skeleton } from "../Skeleton";

interface MessageBoxProps {
  room: RoomType | undefined;
  setToggleSlider: (toggle: boolean) => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  room,
  setToggleSlider,
}) => {
  const [msgs, setMsgs] = useState<MessageType[] | undefined>([]);

  useEffect(() => {
    if (room !== undefined) {
      setMsgs(room.messages);
    }
    setTimeout(function () {
      const messageBox = document.getElementById("message-box");
      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    }, 0);
  }, [room]);

  return (
    <div
      onClick={() => setToggleSlider(false)}
      id="message-box"
      className={`h-screen bg-background-light md:border-none lg:border-none overflow-scroll`}
    >
      {msgs && msgs.length
        ? msgs.map(({ _id, userId, message, username, date }) => (
            <ul key={_id}>
              <Message
                message={message}
                userId={userId}
                user={username}
                date={date}
              />
            </ul>
          ))
        : room && (
            <Skeleton header="This room seems to be empty... start a conversation!" />
          )}
    </div>
  );
};
