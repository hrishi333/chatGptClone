"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
function Login() {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src={"/chatgpt-icon.png"}
        alt="LOGO CHATGPT"
        width={300}
        height={300}
      />
      <button
        type="button"
        onClick={() => signIn("google")}
        className="p-2 font-bold text-3xl rounded-lg
          text-white hover:bg-[#0d2e26] animate-pulse"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
