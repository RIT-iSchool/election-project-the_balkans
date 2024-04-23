'use client';
import { PageTitle } from '@/components/shared/page-title';
import { Button, Text } from 'frosted-ui';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import { useUsers } from '@/hooks/use-users';
import { Plus16 } from '@frosted-ui/icons';
import { Pagination } from '@/components/shared/pagination';
import { useSearchParams } from 'next/navigation';
import { NewUser } from './new-user';

export default function Page() {
  const searchParams = useSearchParams();
  const { data: users, totalCount } = useUsers({
    page: searchParams.get('page') || '1',
  });

  return (
    <div className="flex min-h-screen flex-col gap-5 pt-6">
      <div className="flex justify-between space-y-5 px-6">
        <PageTitle
          title="Users"
          description="Manage all users from one place."
        />

        <NewUser />
      </div>

      <div className="w-screen overflow-auto md:w-full">
        {Boolean(users?.length) && (
          <>
            <Table>
              <TableHeader>
                <TableHead className="w-20">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead />
              </TableHeader>
              <TableBody>
                {users?.map((u) => (
                  <TableRow>
                    <TableCell>
                      <Text color="gray">
                        {u.firstName} {u.lastName}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text color="gray">{u.email}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination totalCount={totalCount} resource="user" />
          </>
        )}
      </div>
    </div>
  );
}
