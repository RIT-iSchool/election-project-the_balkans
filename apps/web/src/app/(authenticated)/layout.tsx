'use client';
import { Navbar } from '@/components/navigation/navbar';
import { useSession } from '@/hooks/use-session';
import { Skeleton, Text, Tooltip } from 'frosted-ui';
import Link from 'next/link';
import { useMemo } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { data: session, isLoading } = useSession();

  const societyName = useMemo(() => session?.society.name, [session]);

  return (
    <main>
      <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
        <div className="border-gray-6 bg-gray-1 hidden border-r lg:block">
          <div className="fixed flex h-screen w-[250px] flex-col gap-2">
            <div className="border-gray-6 flex h-[60px] items-center border-b px-6">
              <Link className="flex cursor-default items-center" href="#">
                {!isLoading && (
                  <Tooltip content={societyName || ''}>
                    <Text
                      size="3"
                      weight="medium"
                      className="line-clamp-1 text-ellipsis"
                    >
                      {societyName}
                    </Text>
                  </Tooltip>
                )}
                {session?.society.name === undefined && (
                  <Skeleton.Text className="h-10 w-full" />
                )}
              </Link>
            </div>
            <Navbar />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-1 flex-col gap-4 md:gap-8 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
