import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CreateRoom } from "../components/CreateRoom";
import { Form } from "../components/Form";
import { Message } from "../components/Message";
import { Room } from "../components/Room";
import { getRoomMessages, setRoom, logout } from "../features/auth/authSlice";
import { getRooms, createRoom } from "../features/room/roomSlice";
import socket from "../socket";
import RoomType from "../types/RoomType";

export const Home = () => {
  const [text, setText] = useState<string>("");
  const [roomText, setRoomText] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { room } = useSelector((state: RootState) => state.auth);
  const { rooms } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    dispatch(getRooms());
    socket.on("update-messages", (updatedMessages: RoomType) =>
      dispatch(setRoom(updatedMessages))
    );
    socket.on("new-user-joined", (id: RoomType, name: String) =>
      console.log(`${id} has joined ${name}!`)
    );
    socket.on("user-left", (id: RoomType, name: String) => {
      console.log(`${id} has left ${name}!`);
    });
  }, [dispatch]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    socket.emit("new-message", room, text);
  };

  const joinRoom = (newRoom: RoomType) => {
    if (room !== undefined && room !== newRoom) {
      socket.emit("leave-room", room);
    }
    if (room !== newRoom) {
      dispatch(getRoomMessages(newRoom));
      socket.emit("join-room", newRoom);
    } else {
      dispatch(setRoom(undefined));
      socket.emit("leave-room", room);
    }
  };

  const create = () => {
    if (roomText.length) {
      dispatch(createRoom(roomText));
      setToggle(!toggle);
    } else {
      alert("Please enter a name");
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="bg-gray-700 h-screen text-white flex flex-col justify-center">
        <button
          className="focus:outline-none bg-gray-600 font-semibold w-20 py-2 self-end text-xs rounded hover:bg-gray-800 mb-4 mr-4"
          onClick={logoutUser}
        >
          Logout
        </button>
        <button
          className="focus:outline-none bg-blue-400 w-40 py-2 self-start text-sm rounded hover:bg-blue-500 mb-4 ml-4"
          onClick={() => setToggle(!toggle)}
        >
          Create Room
        </button>
        {toggle && (
          <CreateRoom
            roomText={roomText}
            setRoomText={setRoomText}
            create={create}
          />
        )}
        <div className="h-1/6 grid grid-cols-3 flex text-center align-middle">
          {rooms && rooms.length
            ? rooms.map((room: any, i: any) => (
                <Room key={room._id} room={room} join={joinRoom} />
              ))
            : null}
        </div>
        <div className="box-border h-3/5 overflow-scroll p-4 border-4 border-gray-500 rounded-xl">
          {room && room.messages
            ? room.messages.map(({ _id, userId, message }) => (
                <ul key={_id}>
                  <Message message={message} userId={userId} />
                </ul>
              ))
            : null}
        </div>
        {room && (
          <Form sendMessage={sendMessage} setText={setText} text={text} />
        )}
      </div>
    </>
  );
};
