import useSWR from 'swr';
import { user } from '../../models/user';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const User = () => {
  const { data: userData, error } = useSWR<user | null>(
    '/api/v1/users',
    fetcher,
  );

  if (error) return <div>error</div>;

  return (
    <>
      <h1>{userData && userData.email}</h1>
    </>
  );
};
