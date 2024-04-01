'use client';
import { useUser } from "@/src/hooks/use-user";
import Cookies from "js-cookie";

export default function Page() {
  const { data: user } = useUser();

  return (
    <div>
      Congrats! you have logged in and been granted the session token: {Cookies.get('session')}
      User data: {JSON.stringify(user)}
    </div>
  )
}