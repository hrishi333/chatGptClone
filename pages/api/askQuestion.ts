//Next js api route support : https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "please provide a valid chatId !" });
    return;
  }

  const response: any = await query(prompt, chatId, model);

  //console.log(response.data,"from queryApi");

  const message: Message = {
    text: response.data.Falcon || "Chat GPT was unable to find answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://icons.iconarchive.com/icons/iconarchive/robot-avatar/256/White-4-Robot-Avatar-icon.png",
    },      
  };



  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json(response.data);

  //  { answer: message.text }
}
