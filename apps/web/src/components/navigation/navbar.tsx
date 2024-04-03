'use client';
import { useUser } from '@/hooks/use-user';
import { NavLink } from './nav-link';
import { Text } from 'frosted-ui';

type Route = {
  title: string;
  href: string;
};

export const routes: Route[] = [
  {
    title: 'Testing',
    href: '/testing',
  },
  {
    title: 'Testing',
    href: '/testing',
  },
  {
    title: 'Testing',
    href: '/testing',
  },
  {
    title: 'Testing',
    href: '/testing',
  },
  {
    title: 'Testing',
    href: '/testing',
  },
] as const;

export const adminRoutes = [
  {
    title: 'Testing',
    href: '/testing',
  },
  {
    title: 'Testing',
    href: '/testing',
  },
] as const;

const Navbar = () => {
  const { data: user } = useUser();

  console.log(user)

  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="px-4 pb-2 text-sm font-medium flex flex-col h-full justify-between">
        <div>
          {routes.map((r) => (
            <NavLink key={r.href} href={r.href} title={r.title} />
          ))}
          <div>
            <Text size="2" weight="medium" className="my-1 text-gray-11">
              Admin
            </Text>
            {adminRoutes.map((r) => (
              <NavLink
                key={r.href}
                href={r.href}
                title={r.title}
              />
            ))}
          </div>
        </div>
        {user && <div className="flex items-center self-start gap-2">
          <div className="rounded bg-iris-a4 size-6 flex items-center justify-center border border-iris-6">
            <Text size="1" weight="medium" color="iris">
              {user?.firstName.slice(0, 1)}
              {user?.lastName.slice(0, 1)}
            </Text>
          </div>
          <Text size="2">
              Welcome back, {user.firstName}
          </Text>
        </div>}
      </nav>
    </div>
  );
};

export { Navbar };
