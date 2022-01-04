import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";
import { useRouter } from "next/router";
const index = () => {
  //! Providers

  //! rotuer
  const rotuer = useRouter();
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  //! push to home page
  // !currentuser

  const [user, userLoading, userError] = useAuthState(auth);

  if (user) {
    rotuer.push("/");
  }

  useEffect(() => {
    if (focused) {
      if (
        !password ||
        !email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
        )
      ) {
        setError("Please Fill Correct");
        setFormValid(false);
      } else {
        setError(null);
        setFormValid(true);
      }
    }
  }, [password, email]);
  //! email and password login

  const handleNormalLogin = (e) => {
    //! Deactive form submit

    e.preventDefault();

    if (formValid) {
      signInWithEmailAndPassword(auth, email, password).catch((err) => {
        setError(err.code);
      });
    }
  };
  //! Login with Google


  return (
    <div className="flex items-center justify-center h-screen w-full bg-themeBlack">
      <div className="w-[30rem] border-2 border-slate-400 h-[27rem] rounded flex flex-col items-center p-6">
        <h1 className="text-slate-300 text-3xl italic capitalize mb-10">
          Login to your chat account{" "}
        </h1>
        <form
          className="flex flex-col w-full gap-y-6"
          onFocus={(e) => {
            setFocused(true);
          }}
        >
          <label className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="w-full h-14 transition-all focus-within:border-slate-400  bg-transparent outline-none border-2 border-slate-500 text-white px-3"
            />
          </label>
          <label className="flex-1 relative">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-14  transition-all focus-within:border-slate-400 bg-transparent outline-none border-2 border-slate-500 text-white px-3"
            />
            <div
              className="text-white cursor-pointer text-xl  transition-all absolute top-1/2 right-5 -translate-y-1/2 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </label>
          <div
            className={`text-red-500 text-[15px]  mx-auto   ${
              error ? "visible" : "hidden"
            }`}
          >
            {error}
          </div>
          <button
            onClick={handleNormalLogin}
            disabled={formValid ? false : true}
            className="h-14 border-2 disabled:opacity-70 disabled:hover:text-slate-400 disabled:cursor-not-allowed  text-slate-400 hover:text-white hover:border-slate-400 font-bold border-slate-400 tracking-wider"
          >
            Login
          </button>
        </form>
        
        <Link href={"/login/signup"}>
          <a className="text-slate-400 hover:text-slate-300 mt-6">
            Don't have chat account ?
          </a>
        </Link>
      </div>
    </div>
  );
};

export default index;
