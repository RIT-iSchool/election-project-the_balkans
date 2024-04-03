import { Navbar } from '@/components/navigation/navbar';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
        <div className="hidden border-r border-gray-6 bg-gray-1 lg:block">
          <div className="flex fixed w-[250px] h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b border-gray-6 px-6">
              <Link
                className="flex text-lg items-center font-semibold cursor-default"
                href="#"
              >
                American Dream
              </Link>
            </div>
            <Navbar />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-1 flex-col gap-4 md:gap-8 p-4 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
