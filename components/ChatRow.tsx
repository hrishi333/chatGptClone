import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, collection, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};
function ChatRow({ id }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  useEffect(() => {
    if (!pathName) {
      return;
    }
    setActive(pathName.includes(id));
  }, [pathName]);

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-between items-center 
    ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="w-5 h-5 text-gray-700 hover:text-red-900"
      />
    </Link>
  );
}

export default ChatRow;
