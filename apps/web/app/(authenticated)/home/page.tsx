'use client';
import Cookies from "js-cookie";

export default function Page() {
  return (
    <div>
      Congrats! you have logged in and been granted the session token: {Cookies.get('session')}
    </div>
  )
}