'use client';

import { SearchIcon } from '@/components/icons/search';
import { PageTitle } from '@/components/shared/page-title';
import { useDebounce } from '@/hooks/use-debounce';
import { useSocieties } from '@/hooks/use-societies';
import {
  TableRoot,
  TableRow,
  TableHeader,
  TableColumnHeaderCell,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
  TableBody,
  TableCell,
  Button,
} from 'frosted-ui';
import { useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const { data: societies } = useSocieties({ search: debouncedQuery });

  return (
    <div className="flex min-h-screen flex-col gap-5 p-8 py-6">
      <PageTitle
        title="Societies"
        description="Manage all societies from one place."
      />

      <TextFieldRoot>
        <TextFieldSlot className="text-gray-9 flex h-full flex-col justify-center">
          <SearchIcon className="size-5" />
        </TextFieldSlot>
        <TextFieldInput
          size="3"
          placeholder="Search for a society..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </TextFieldRoot>

      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell className="w-20">ID</TableColumnHeaderCell>
            <TableColumnHeaderCell>Name</TableColumnHeaderCell>
            <TableColumnHeaderCell></TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {societies?.map((s) => (
            <TableRow key={s.id}>
              <TableColumnHeaderCell>{s.id}</TableColumnHeaderCell>
              <TableCell>{s.name}</TableCell>
              <TableCell className="flex h-full w-full">
                <Button>Investigate Society</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
}
