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
  const [scroll, setScroll] = useState(0);
  let messages: MessageType[] | undefined;
  if (room !== undefined) {
    messages = room.messages;
  }
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // console.log(vh);

  useEffect(() => {
    const messageBox = document.getElementById("message-box");
    if (messageBox) {
      setScroll(messageBox.scrollHeight);
      messageBox.scrollTop = scroll;
    }
  }, [room, scroll]);

  return (
    <div
      onClick={() => setToggleSlider(false)}
      id="message-box"
      className={`flex-grow bg-gray-800 md:bg-gray-700 lg:bg-gray-700 md:border-none lg:border-none overflow-scroll`}
    >
      {messages && messages.length ? (
        messages.map(({ _id, userId, message, username, date }) => (
          <ul key={_id}>
            <Message
              message={message}
              userId={userId}
              user={username}
              date={date}
            />
          </ul>
        ))
      ) : room ? (
        <Skeleton header="This room seems to be empty... start a conversation!" />
      ) : (
        <Skeleton header="Please select a chat-room" />
      )}
    </div>
  );
};
