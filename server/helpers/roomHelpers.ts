import Room from "../src/models/RoomSchema";

export const addMessage = async (room, message, userId) => {
  try {
    const newMessage = { message, userId };
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
