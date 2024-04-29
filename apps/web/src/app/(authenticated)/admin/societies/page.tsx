'use client';
import { SearchIcon } from '@/components/icons/search';
import { PageTitle } from '@/components/shared/page-title';
import { useDebounce } from '@/hooks/use-debounce';
import { useSocieties, type Society } from '@/hooks/use-societies';
import {
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
  Button,
  Text,
} from 'frosted-ui';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import { Pagination } from '@/components/shared/pagination';
import { Empty } from '@/components/shared/empty';
import { Sad32 } from '@frosted-ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const SocietyRow = ({ society }: { society: Society }) => {
  const router = useRouter();

  const handleInvestigate = useCallback(() => {
    localStorage.setItem('society_id', society.id.toString());
    router.push('/home');
  }, []);
  const handleManage = useCallback(() => {
    localStorage.setItem('society_id', society.id.toString());
  }, []);

  return (
    <TableRow>
      <TableCell>
        <Text weight="bold">{society.id}</Text>
      </TableCell>
      <TableCell>
        <Text color="gray">{society.name}</Text>
      </TableCell>
      <TableCell className="flex h-full w-full gap-x-2">
        <Button onClick={handleInvestigate}>Investigate Society</Button>
        <Link href={`/admin/societies/${society.id}`}>
          <Button onClick={handleManage}>Manage Society</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default function Page() {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const debouncedQuery = useDebounce(query, 200);
  const {
    data: societies,
    totalCount,
    isLoading,
  } = useSocieties({
    search: debouncedQuery,
    page: searchParams.get('page') || '1',
  });

  return (
    <div className="flex min-h-screen flex-col gap-5 pt-6">
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
        {!isLoading && !societies?.length && (
          <Empty
            title="No societies"
            subtitle={
              debouncedQuery.length
                ? 'Looks like no societies were found that match your query. Try adjusting your search.'
                : "Looks like there aren't any societies."
            }
            icon={Sad32}
          />
        )}

        {Boolean(societies?.length) && (
          <>
            <Table>
              <TableHeader>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead />
              </TableHeader>
              <TableBody>
                {societies?.map((s) => <SocietyRow key={s.id} society={s} />)}
              </TableBody>
            </Table>

            <Pagination totalCount={totalCount} resource="society" />
          </>
        )}
      </div>
    </div>
  );
}
