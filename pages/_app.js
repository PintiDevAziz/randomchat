import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.asPath);
  const [show, setShow] = useState("");
  useEffect(() => {
    if (router.pathname === "/login") {
      setShow(false);
    } else if (router.pathname === "/login/signup") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  return (
    <>
      {show ? <Header /> : null}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
