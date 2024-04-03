import { NavLink } from './nav-link';

type Route = {
  title: string;
  href: string;
};

export const routes: Route[] = [
  {
    title: 'Home',
    href: '/home',
  },
  {
    title: 'Aircraft',
    href: '/aircraft',
  },
  {
    title: 'Airlines',
    href: '/airlines',
  },
  {
    title: 'Airports',
    href: '/airports',
  },
  {
    title: 'Saved Routes',
    href: '/saved-routes',
  },
] as const;

export const adminRoutes = [
  {
    title: 'Feedback',
    href: '/admin/feedback',
  },
  {
    title: 'Airlines',
    href: '/admin/airlines',
  },
] as const;

const Navbar = async () => {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="px-4 text-sm font-medium flex flex-col h-full">
        {routes.map((r) => (
          <NavLink key={r.href} href={r.href} title={r.title} />
        ))}
        <div>
            <div className="text-sm font-medium my-1 text-gray-9">
              Admin
            </div>
            {adminRoutes.map((r) => (
              <NavLink
                key={r.href}
                href={r.href}
                title={r.title}
              />
            ))}
          </div>
      </nav>
    </div>
  );
};

export { Navbar };
