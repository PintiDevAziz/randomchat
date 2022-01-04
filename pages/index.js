import React, { useEffect, useRef, useState } from "react";
import TypeingZone from "../components/TypeingZone";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { AiOutlineStar } from "react-icons/ai";
const Index = () => {
  const [messages, setMessages] = useState([]);
  const [user, userLoading, userError] = useAuthState(auth);
  const colRef = collection(db, "chat");
  const q = query(colRef, orderBy("time"));
  const containerRef = useRef();
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setMessages([...snapshot.docs.map((doc) => doc.data())]);
    });
  }, []);
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);
  return (
    <div>
      <div
        className="bg-themeBlack h-[calc(100vh-4rem)]  overflow-auto"
        ref={containerRef}
      >
        <div className="p-8 pb-20 ">
          {messages.map((m, id) => (
            <div
              key={id}
              className={` ${
                m?.author === user?.email.replace("@gmail.com", "")
                  ? " items-end ml-auto"
                  : null
              } relative rounded-full m-3 px-4 py-2 text-white  max-w-lg  flex flex-col  h-auto `}
            >
              <p
                className={`flex items-center  border rounded-lg px-6 py-3   ${
                  m.author === user?.displayName ? "justify-end " : null
                }`}
              >
                {m.message}
              </p>
              <p className="text-[12px] absolute  bottom-2 right-2 px-4">
                {m.author}
              </p>
              <p className="text-[12px] absolute  bottom-[0.65rem] right-8 px-4">
                {m?.author === user?.email.replace("@gmail.com", "") ? (
                  <AiOutlineStar />
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
      <TypeingZone />
    </div>
  );
};

export default Index;
