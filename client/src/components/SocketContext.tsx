import React, { createContext, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { getBaskets, onClearTrash, onPutTrash } from "../redux/baskets.slice";
import { AppDispatch, RootState } from "../redux/store";

export const SocketContext = createContext<unknown>();
const SOCKET_SERVER_URL = "ws://127.0.0.1:3000";

interface Props {
  children?: React.ReactNode;
}

const SocketContextProvider: FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log("🚀 ~ file: SocketContext.tsx:11 ~ user:", user);

  const dispatch = useDispatch<AppDispatch>();
  const PUT_TRASH = "put_trash:" + user?._id;
  const REMOVE_TRASH = "remove_trash:" + user?._id;
  const CLEAR_TRASH = "clear_trash:" + user?._id;

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.on(PUT_TRASH, (message) => dispatch(onPutTrash(message)));
      socket.on(REMOVE_TRASH, (message) =>
        dispatch(getBaskets(message.userId))
      );
      socket.on(CLEAR_TRASH, (message) => dispatch(onClearTrash(message)));
    }
  }, [socket, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
