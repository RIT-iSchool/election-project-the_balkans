'use client';
import { SearchIcon } from '@/components/icons/search';
import { PageTitle } from '@/components/shared/page-title';
import { useDebounce } from '@/hooks/use-debounce';
import { useSocieties } from '@/hooks/use-societies';
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

export default function Page() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const { data: societies } = useSocieties({ search: debouncedQuery });

  return (
    <div className="flex min-h-screen flex-col gap-5 py-6">
      <div className="space-y-5 px-6">
        <PageTitle
          title="Societies"
          description="Manage all societies from one place."
        />

        <TextFieldRoot>
          <TextFieldSlot className="text-gray-9 flex flex-col justify-center">
            <SearchIcon className="-mt-0.5 size-5" />
          </TextFieldSlot>
          <TextFieldInput
            size="3"
            placeholder="Search for a society..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </TextFieldRoot>
      </div>

      <div className="w-screen overflow-auto md:w-full">
        <Table>
          <TableHeader>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead />
          </TableHeader>
          <TableBody>
            {societies?.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <Text weight="bold">{s.id}</Text>
                </TableCell>
                <TableCell>
                  <Text color="gray">{s.name}</Text>
                </TableCell>
                <TableCell className="flex h-full w-full gap-x-2">
                  <Button>Investigate Society</Button>
                  <Link href={`/admin/societies/${s.id}`}>
                    <Button>Manage Society</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
