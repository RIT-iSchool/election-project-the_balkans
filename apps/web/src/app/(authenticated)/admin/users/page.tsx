'use client';
import { SearchIcon } from '@/components/icons/search';
import { PageTitle } from '@/components/shared/page-title';
import { useDebounce } from '@/hooks/use-debounce';
import {
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
  Button,
  Text,
} from 'frosted-ui';
import Link from 'next/link';
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import { Empty } from '@/components/shared/empty';
import { Sad32 } from '@frosted-ui/icons';
import { useSearchParams } from 'next/navigation';
import { useUsers } from '@/hooks/use-users';

export default function Page() {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const debouncedQuery = useDebounce(query, 200);
  const { data: users, error, isLoading } = useUsers();

  return (
    <div className="flex min-h-screen flex-col gap-5 pt-6">
      <div className="space-y-5 px-6">
        <PageTitle
          title="Users"
          description="Manage all users from one place."
        />

        <Button>Add User</Button>

        {/* <TextFieldRoot>
          <TextFieldSlot className="text-gray-9 flex flex-col justify-center">
            <SearchIcon className="-mt-0.5 size-5" />
          </TextFieldSlot>
          <TextFieldInput
            size="3"
            placeholder="Search for a user..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </TextFieldRoot>
      </div>

      <div className="w-screen overflow-auto md:w-full">
        {!isLoading && !users?.length && (
          <Empty
            title="No users"
            subtitle={
              debouncedQuery.length
                ? 'Looks like no users were found that match your query. Try adjusting your search.'
                : "Looks like there aren't any users."
            }
            icon={Sad32}
          //
        )} */}

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
          </>
        )}
      </div>
    </div>
  );
}
