import ChatInput from "../../../components/ChatInput";
import Chat from "../../../components/Chat";

type Props = {
  params:{
    id: string;
  }
}

function ChatPage({params:{id}}:Props) {
  return (
    <div className="flex flex-col h-screen text-white overflow-hidden">
      {/*chat */}
        <Chat chatId={id}/>
        
      {/*chat input */}
        <ChatInput  chatId={id}/>
    </div>
  )
}

export default ChatPage;