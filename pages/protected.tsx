import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

import useUser from "../lib/useUser";
import { logout } from "../lib/auth";

export default function Dashboard() {
  const { user, loading, loggedOut, mutate } = useUser();

  // if logged out, redirect to the homepage
  useEffect(() => {
    if (loggedOut) {
      Router.replace("/login");
    }
  }, [loggedOut]);
  if (loggedOut) return "redirecting...";

  return (
    <div>
      <main>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          if (!document.cookie || document.cookie.indexOf('authorization=') === -1) {
            location.replace('/login')
          }`,
            }}
          />
        </Head>
        {loading || !user ? (
          "loading..."
        ) : (
          <>
            <h1>Welcome, {user.name}</h1>
            <p>This is your dashboard.</p>
            <button
              onClick={() => {
                logout();
                mutate(null); // optimistically update the data and revalidate
                Router.replace("/login");
              }}
            >
              Logout
            </button>
          </>
        )}
      </main>
    </div>
  );
}
