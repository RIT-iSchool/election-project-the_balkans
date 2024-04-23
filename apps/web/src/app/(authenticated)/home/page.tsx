'use client';
import { Empty } from '@/components/shared/empty';
import { PageTitle } from '@/components/shared/page-title';
import { useElections } from '@/hooks/use-elections';
import { useSession } from '@/hooks/use-session';
import { Sad32 } from '@frosted-ui/icons';
import { Card, Flex, Text } from 'frosted-ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import { NewElection } from './new-election';

export default function Page() {
  const { data: user } = useSession();
  const { data: elections, isLoading } = useElections();

  return (
    <div className="flex min-h-screen flex-col gap-5 py-6">
      <div className="flex justify-between px-6">
        <PageTitle
          title="Elections"
          description={
            user?.role === 'admin' || user?.role === 'employee'
              ? 'View current and past elections'
              : 'View elections'
          }
        />
        {/* TODO: Render only if allowed */}
        <NewElection />
      </div>

      <div className="w-screen overflow-auto md:w-full">
        {!isLoading && !elections?.length && (
          <Empty
            title="No elections"
            subtitle={
              "Looks like there aren't any elections to look at right now."
            }
            icon={Sad32}
          />
        )}

        {Boolean(elections?.length) && (
          <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
            {elections?.map((e) => (
              <Link href={`/elections/${e.id}`} key={e.id} className="group">
                <Card className="transition-all group-hover:shadow-md">
                  <img src={e.photoURL} />

                  <Flex direction="column">
                    <Text weight="bold">{e.name}</Text>
                    <Text color="gray">
                      {dayjs(e.startDate).format('MMMM D, YYYY')}
                    </Text>
                  </Flex>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
