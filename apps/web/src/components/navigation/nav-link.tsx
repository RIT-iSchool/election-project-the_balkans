'use client';
import { cn } from '@/lib/cn';
import { Text } from 'frosted-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  title: string;
};

const NavLink = ({ href, title }: NavLinkProps) => {
  const pathName = usePathname();
  const active = href === pathName;

  return (
    <Link
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-11 hover:text-gray-12 hover:bg-gray-3 active:bg-gray-3 cursor-default',
        {
          'bg-gray-3 text-gray-12 dark:bg-zinc-800 dark:text-zinc-300':
            active,
        },
      )}
      href={href}
    >
      <Text size="2">
        {title}
      </Text>
    </Link>
  );
};

export { NavLink };
