"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../components/Message";
import { db } from "@/firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {

  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden hide-scrollbar
    ">
      {messages?.empty && (
        <>
        <p className="mt-10 text-center">Type a promt below to get started!</p>
        <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce "/>
        </>
      )}
      {messages?.docs.map((message) => (
        <Message  key={message.id} message={message.data()}/>
      ))}
    </div>
  );
}

export default Chat;
