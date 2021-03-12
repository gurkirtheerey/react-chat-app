import Room from "../src/models/RoomSchema";
import User from "../src/models/UserSchema";

export const addMessage = async (room, message, userId, username) => {
  try {
    const newMessage = { message, userId, username };
    const r = await Room.findByIdAndUpdate(
      room._id,
      {
        $push: { messages: newMessage },
      },
      { new: true }
    );
    return r;
  } catch (err) {
    console.log(err);
  }
};

export const addUser = async (room, name) => {
  try {
    const user: any = await User.findOne({ username: name });
    if (user) {
      const { _id, username } = user;

      const newUser = { userId: _id, username };

      const isUserInRoom = await Room.find({
        users: { $elemMatch: { username } },
      });
      console.log("is user in this room", isUserInRoom);

      if (isUserInRoom && isUserInRoom.length) {
        return null;
      } else {
        const r: any = await Room.findByIdAndUpdate(
          room._id,
          {
            $push: { users: newUser },
          },
          { new: true }
        );
        return r;
      }
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeUser = async (room, username) => {
  try {
    const user = await User.findOne({ username });
    const r = await Room.findByIdAndUpdate(
      room._id,
      {
        $push: { users: user },
      },
      { new: true }
    );
    return r;
  } catch (err) {
    console.log(err);
  }
};
