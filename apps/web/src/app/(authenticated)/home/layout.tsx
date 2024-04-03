import { Navbar } from '@/components/navigation/navbar';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
        <div className="border-gray-6 bg-gray-1 hidden border-r lg:block">
          <div className="fixed flex h-screen w-[250px] flex-col gap-2">
            <div className="border-gray-6 flex h-[60px] items-center border-b px-6">
              <Link
                className="flex cursor-default items-center text-lg font-semibold"
                href="#"
              >
                American Dream
              </Link>
            </div>
            <Navbar />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
