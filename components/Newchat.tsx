import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react';
import {db} from '../firebase';
import {useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import { addDoc,collection, serverTimestamp } from 'firebase/firestore';

function Newchat() {
  const router = useRouter();
  const {data:session}= useSession();

  const createNewChat =async()=>{
      const doc = await addDoc(
        collection(db,"users",session?.user?.email!,"chats"),{
          messages:[],
          userId:session?.user?.email!,
          createdAt:serverTimestamp()
        });

        router.push(`/chat/${doc.id}`)
  }
  return (
    <div onClick={createNewChat} className='flex chatRow border border-gray-400'>
        <PlusIcon className='h-4 w-4 '/>
        <p className=''>New Chat</p>
    </div>
  )
}

export default Newchat