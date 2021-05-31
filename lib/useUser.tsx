import useSWR from "swr";
import { logout } from "./auth";

type User = {
  name: string;
};

// mock the user api
const userFetcher = async (): Promise<User | null> => {
  // sleep 500
  await new Promise((res) => setTimeout(res, 500));

  if (document.cookie.includes("authorization=swr")) {
    // authorized
    return {
      name: "Fernando",
    };
  }

  // not authorized
  logout();
  throw new Error("not authorized");
};

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", userFetcher);

  const loading = !data && !error;
  const loggedOut = !!error;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
