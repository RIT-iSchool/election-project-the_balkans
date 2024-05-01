'use client';
import { Empty } from '@/components/shared/empty';
import { PageTitle } from '@/components/shared/page-title';
import { useElections } from '@/hooks/use-elections';
import { useSession } from '@/hooks/use-session';
import { Pencil20, Sad32 } from '@frosted-ui/icons';
import { Card, Flex, IconButton, Inset, Text } from 'frosted-ui';
import dayjs from 'dayjs';
import { NewElection } from './new-election';
import { MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { data: user } = useSession();
  const { data: elections, isLoading } = useElections();

  const handleVote = useCallback((electionId: number) => {
    return function (e: MouseEvent<HTMLDivElement>) {
      e.preventDefault();
      e.stopPropagation();

      router.push(`/vote/${electionId}`);
    };
  }, []);

  const handleEdit = useCallback((electionId: number) => {
    return function (e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      e.stopPropagation();

      router.push(`/elections/${electionId}`);
    };
  }, []);

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
        {(user?.role === 'admin' || user?.role === 'employee') && (
          <NewElection />
        )}
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
              <div
                onClick={(ev) => handleVote(e.id)(ev)}
                key={e.id}
                className="group"
              >
                <Card className="transition-all group-hover:shadow-md">
                  <Inset className="border-gray-a6 mb-3 max-h-[200px] rounded-none rounded-t-md border-b object-cover object-center">
                    <img
                      src={
                        e.photoUrl
                          ? `/ajax/uploads/election/${e.photoUrl}`
                          : '/placeholder.png'
                      }
                    />
                  </Inset>

                  <div className="flex flex-row justify-between">
                    <Flex direction="column">
                      <Text weight="bold">{e.name}</Text>
                      <Text color="gray">
                        {dayjs(e.startDate).format('MMMM D, YYYY')}
                      </Text>
                    </Flex>
                    {user?.role !== 'member' && (
                      <IconButton onClick={(ev) => handleEdit(e.id)(ev)}>
                        <Pencil20 />
                      </IconButton>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
