"use client";

import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import axios from "axios";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  //useSWR model to get model
  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //toast notification

    const notification = toast.loading("Chat GPT is thinking ...");

    try {
      const res = await axios.post(
        "/api/askQuestion",
        {
          prompt: input,
          chatId,
          model,
          session,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res && res.data) {
        console.log(res);
        toast.success("GPT has responded", {
          id: notification,
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="mx-5 my-3  bg-gray-700/50 text-gray-400 rounded-lg text-sm focus:outline-none ">
        <form onSubmit={sendMessage} className="p-5 flex space-x-5 flex-1">
          <input
            className=" bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 "
            disabled={!session}
            value={prompt}
            type="text"
            placeholder="type your message here ... "
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <button
            className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300"
            type="submit"
            disabled={!prompt || !session}
          >
            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
          </button>
        </form>
      </div>
      <p className="text-white text-xs text-center m-2 ">
        Free Research Preview. ChatGPT may produce inaccurate information about
        people, places, or facts. ChatGPT August 3 Version
      </p>
    </>
  );
}

export default ChatInput;

/*   await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "appliction/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then((res) => {
      console.log(res, "responce chat input");
      toast.success("GPT has responded", {
        id: notification,
      });
    }); */
