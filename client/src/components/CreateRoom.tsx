import React from "react";

interface CreateRoomProps {
  roomText: string;
  setRoomText: (e: any) => void;
  create: () => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({
  roomText,
  setRoomText,
  create,
}) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        value={roomText}
        onChange={(e) => setRoomText(e.target.value)}
        className="px-4 py-2 rounded focus:outline-none text-gray-600 bg-gray-100"
        type="text"
        placeholder="Room name"
      />
      <button
        className="ml-4 bg-red-600 px-2 w-28 rounded focus:outline-none hover:bg-red-700"
        onClick={create}
      >
        Enter
      </button>
    </div>
  );
};
