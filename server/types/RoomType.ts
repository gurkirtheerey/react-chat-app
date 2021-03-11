import MessageType from "./MessageType";

type RoomType = {
  _id: String | undefined;
  name: String | undefined;
  messages: MessageType[] | undefined;
};

export default RoomType;
