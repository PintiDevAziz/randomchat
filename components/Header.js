import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { AiOutlineCaretDown, AiOutlineLogin } from "react-icons/ai";
import { BsFillAspectRatioFill, BsGear } from "react-icons/bs";
import { signOut } from "firebase/auth";
const Header = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [disabled, setDisabled] = useState(true);
  return (
    <div className="w-full h-16 bg-themeBlack  border-b-2 border-slate-400 text-white flex items-center px-24 justify-between">
      <div className="text-xl font-semibold">Global Chat</div>

      <div>
        {user ? (
          <div className="flex gap-x-8 items-center">
            <div className="flex-shrink-0 flex items-center gap-x-2">
              <img
                className="w-10 h-10 rounded-full"
                src={
                  user?.photoURL ||
                  "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif"
                }
                alt={user?.displayName}
              />
              <p>{user?.displayName || user?.email}</p>
            </div>
            <button
              onClick={() => {
                signOut(auth);
              }}
              className="flex  h-full w-full items-center gap-x-2 hover:text-red-600 text-red-500"
            >
              {" "}
              Log Out <AiOutlineLogin />
            </button>
          </div>
        ) : (
          <Link href={"/login"}>
            <a className="flex items-center justify-center px-6 border-2 py-2 rounded  hover:border-indigo-500 hover:text-indigo-400">
              Login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
