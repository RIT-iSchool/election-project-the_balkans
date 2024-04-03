'use client';
import { useUser } from '@/hooks/use-user';

export default function Page() {
  const { data: user } = useUser();

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
