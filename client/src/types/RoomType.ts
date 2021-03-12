import MessageType from "./MessageType";
import UserType from "./UserType";

type RoomType = {
  _id: String | undefined;
  name: String | undefined;
  messages: MessageType[] | undefined;
  users: UserType[] | undefined;
};

export default RoomType;
