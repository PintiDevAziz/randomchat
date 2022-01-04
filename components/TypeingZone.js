import React, { useEffect, useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const TypeingZone = () => {
  const [input, setInput] = useState("");
  const [user, userLoading, userError] = useAuthState(auth);
  const createMessage = async () => {
    //create random uniqe id
    const id = Math.random().toString(36).substr(2, 9);
    const docRef = doc(db, "chat", id);
    setInput("");

    await setDoc(docRef, {
      id: id,
      message: input,
      time: Timestamp.now(),
      author: user.displayName || user.email.replace("@gmail.com", ""),
    });
  };
  return (
    <div>
      <div className="w-full bg-themeBlack px-20 bottom-0 h-[4rem] absolute pb-2  flex p-1 text-white">
        {user ? (
          <>
            {" "}
            <input
              placeholder="Type some messages"
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  createMessage();
                }
              }}
              value={input}
              className=" bg-transparent border h-full px-4 w-full  outline-none rounded-full"
            />
            <button
              className="px-6 h-full border rounded-xl ml-4"
              onClick={createMessage}
            >
              Send
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            Please Login first
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeingZone;
