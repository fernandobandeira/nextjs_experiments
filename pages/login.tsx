import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

import useUser from "../lib/useUser";
import { login } from "../lib/auth";

export default function App() {
  const { user, mutate } = useUser();

  // if logged in, redirect to the protected route
  useEffect(() => {
    if (user) {
      Router.replace("/protected");
    }
  }, [user]);

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.indexOf('authorization=') > -1) {
            location.replace('/protected')
          }`,
          }}
        />
      </Head>
      <div className="homepage">
        <main>
          <h1>ACME!</h1>
          <p>Build Something Brilliant</p>
          <br />
          <button
            onClick={() => {
              login();
              mutate(); // after logging in, we revalidate the SWR
            }}
          >
            Login To Continue
          </button>
        </main>
      </div>
    </>
  );
}
