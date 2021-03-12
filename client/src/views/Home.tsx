import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CreateRoom } from "../components/CreateRoom";
import { Form } from "../components/Form";
import { MessageBox } from "../components/MessageBox";
import { Room } from "../components/Room";
import { getRoomMessages, setRoom, logout } from "../features/auth/authSlice";
import { getRooms, createRoom } from "../features/room/roomSlice";
import socket from "../socket";
import RoomType from "../types/RoomType";
import { toast } from "react-toastify";
import { Slider } from "../components/Slider/Slider";
import { Twirl as Hamburger, Twirl } from "hamburger-react";

export const Home = () => {
  const [text, setText] = useState<string>("");
  const [roomText, setRoomText] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleSlider, setToggleSlider] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { room, userId, username } = useSelector(
    (state: RootState) => state.auth
  );
  const { rooms } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    dispatch(getRooms());
    socket.on("update-messages", (updatedMessages: RoomType) =>
      dispatch(setRoom(updatedMessages))
    );
    socket.on(
      "new-user-joined",
      async (newUser: string, name: string, updatedUsers: RoomType) => {
        console.log(`${newUser} has joined ${name}!`);
        toast.success(`${newUser} has joined ${name}!`);
        if (updatedUsers !== null) {
          await dispatch(setRoom(updatedUsers));
        }
      }
    );
    socket.on("user-left", (name: String, newUser: string) => {
      console.log(`${newUser} has left ${name}...`);
      toast.error(`${newUser} has left ${name}...`);
    });
  }, [dispatch]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    socket.emit("new-message", room, text, userId, username);
  };

  const joinRoom = (newRoom: RoomType) => {
    if (room !== undefined && room.name !== newRoom.name) {
      socket.emit("leave-room", room, username);
    }
    if (room?.name !== newRoom.name) {
      dispatch(getRoomMessages(newRoom));
      socket.emit("join-room", newRoom, username);
    }

    setToggleSlider(false);
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
    <div className="bg-gray-700 flex h-screen overflow-hidden">
      {toggleSlider && (
        <Slider toggle={toggleSlider} rooms={rooms} joinRoom={joinRoom} />
      )}
      <div className="hidden  md:flex md:flex-col lg:flex lg:flex-col text-center align-middle relative overflow-hidden  border-r-2 border-black">
        <div className="h-full">
          {rooms && rooms.length
            ? rooms.map((room: any, i: any) => (
                <Room key={room._id} room={room} join={joinRoom} />
              ))
            : null}
        </div>

        <button
          className="focus:outline-none bg-gray-600 w-32 self-center py-4 self-start text-xs rounded hover:bg-gray-800 mb-12 text-white font-bold"
          onClick={() => setToggle(!toggle)}
        >
          Create Room
        </button>
      </div>
      <button
        className="hidden md:block lg:block focus:outline-none bg-gray-600 font-semibold w-20 py-2 absolute right-0 top-0 text-xs rounded hover:bg-gray-800 mb-4 m-4"
        onClick={logoutUser}
      >
        Logout
      </button>
      <div className="bg-gray-700 h-screen text-white flex flex-col justify-center flex-1">
        <div className="md:hidden lg:hidden h-auto absolute right-0 top-0 focus:outline-none p-2 focus:outline-none">
          <Hamburger
            duration={0.8}
            toggled={toggleSlider}
            size={24}
            hideOutline={true}
            onToggle={() => setToggleSlider(!toggleSlider)}
          />
        </div>
        {toggle && (
          <CreateRoom
            roomText={roomText}
            setRoomText={setRoomText}
            create={create}
          />
        )}
        <MessageBox room={room} />
        {room && (
          <Form sendMessage={sendMessage} setText={setText} text={text} />
        )}
      </div>
    </div>
  );
};
