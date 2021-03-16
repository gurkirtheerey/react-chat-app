import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CreateRoom } from "../components/CreateRoom";
import { Form } from "../components/Form";
import { MessageBox } from "../components/MessageBox/MessageBox";
import { Room } from "../components/Room";
import { getRoomMessages, setRoom } from "../features/auth/authSlice";
import { getRooms, createRoom } from "../features/room/roomSlice";
import socket from "../socket";
import RoomType from "../types/RoomType";
import { toast } from "react-toastify";
import { Slider } from "../components/Slider/Slider";
import { RoomButton } from "../components/RoomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  };

  const create = () => {
    if (roomText.length) {
      dispatch(createRoom(roomText));
      setToggle(!toggle);
    } else {
      alert("Please enter a name");
    }
  };

  return (
    <div className="bg-gray flex flex-col md:flex-row lg:flex-row h-screen overflow-scroll">
      {toggleSlider ? (
        <Slider
          toggle={toggle}
          rooms={rooms}
          joinRoom={joinRoom}
          toggleSlider={toggleSlider}
          setToggle={setToggle}
        />
      ) : null}
      <div className="bg-gray-light w-1/6 hidden md:flex md:flex-col lg:flex lg:flex-col text-center align-middle relative overflow-hidden">
        <div className="h-full flex flex-col items-center">
          {rooms && rooms.length
            ? rooms.map((room: any, i: any) => (
                <Room key={room._id} roomValue={room} join={joinRoom} />
              ))
            : null}
        </div>

        <RoomButton toggle={toggle} setToggle={setToggle} isDevice={false} />
      </div>
      <div className="min-h-screen bg-gray-700 text-white flex flex-col justify-center flex-1">
        <div className="md:hidden lg:hidden w-full flex justify-end bg-indigo-700 focus:outline-none p-2 focus:outline-none">
          {/* <Hamburger
            duration={0.5}
            toggled={toggleSlider}
            size={24}
            onToggle={(toggled) => {
              if (toggled) {
                setToggleSlider(!toggleSlider);
              } else {
                return;
              }
            }}
          /> */}
          <FontAwesomeIcon
            size="1x"
            style={{ margin: "10px" }}
            icon={faBars}
            onClick={() => setToggleSlider(!toggleSlider)}
          />
        </div>
        {toggle && (
          <CreateRoom
            roomText={roomText}
            setRoomText={setRoomText}
            create={create}
          />
        )}
        <MessageBox room={room} setToggleSlider={setToggleSlider} />
        <Form
          sendMessage={sendMessage}
          setText={setText}
          text={text}
          room={room}
        />
      </div>
    </div>
  );
};
