'use client';
import { useSession } from '@/hooks/use-session';
import { NavLink } from './nav-link';
import { Text } from 'frosted-ui';

type Route = {
  title: string;
  href: string;
};

export const routes: Route[] = [
  {
    title: 'Home',
    href: '/home',
  },
  // TODO: only show for admins
  {
    title: 'Members',
    href: '/members',
  },
] as const;

export const adminRoutes = [
  {
    title: 'Societies',
    href: '/admin/societies',
  },
  {
    title: 'System',
    href: '/admin/system',
  },
] as const;

const Navbar = () => {
  const { data: user } = useSession();

  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="flex h-full flex-col justify-between px-4 pb-2 text-sm font-medium">
        <div>
          {routes.map((r) => (
            <NavLink key={r.href} href={r.href} title={r.title} />
          ))}
          {user?.admin && (
            <div className="mt-2">
              <Text size="2" weight="medium" className="text-gray-11 my-1">
                Admin
              </Text>
              {adminRoutes.map((r) => (
                <NavLink key={r.href} href={r.href} title={r.title} />
              ))}
            </div>
          )}
        </div>
        {user && (
          <div className="flex items-center gap-2 self-start">
            <div className="bg-iris-a4 border-iris-6 flex size-6 items-center justify-center rounded border">
              <Text size="1" weight="medium" color="iris">
                {user?.firstName.slice(0, 1)}
                {user?.lastName.slice(0, 1)}
              </Text>
            </div>
            <Text size="2">Welcome back, {user?.firstName}</Text>
          </div>
        )}
      </nav>
    </div>
  );
};

export { Navbar };
