'use client';
import { useSession } from '@/hooks/use-session';

export default function Page() {
  const { data: user } = useSession();

  if (!user) return null;

  return (
    <>
      <div>
        Congrats! you have logged in and been granted the session token:{' '}
        {document.cookie}
      </div>
      User data:
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
