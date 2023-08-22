"use client";

import React from "react";
import Newchat from "./Newchat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import ChatRow from "./ChatRow";

function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session?.user?.email!, "chats")
  );

  console.log(chats, "chats");
  return (
    <div className="p-2 h-screen flex flex-col  text-white">
      <div className="h-screen">
        {/*New Chat*/}
        <Newchat />
        <div>{/*Model selection */}</div>

        {/*map through the chat rows */}
        {chats?.docs?.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} />
        ))}
      </div>

      {session && (
        <img
          onClick={() => {
            signOut();
          }}
          className="w-12 h-12 rounded-full mx-auto mb-2 cursor-poiter hover:opacity-50"
          src={session.user?.image!}
          alt="profile_pic"
          title="Log out ?"
        />
      )}
    </div>
  );
}

export default Sidebar;
