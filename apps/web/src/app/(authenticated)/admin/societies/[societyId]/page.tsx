'use client';
import { PageTitle } from '@/components/shared/page-title';
import { useSociety } from '@/hooks/use-society';
import { useSocietyMembers } from '@/hooks/use-society-members';
import {
  TableRoot,
  TableRow,
  TableHeader,
  TableColumnHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Text,
} from 'frosted-ui';

type PageProps = {
  params: {
    societyId: string;
  };
};

export default function Page({ params }: PageProps) {
  const { data: society } = useSociety(params);
  const { data: societyMembers } = useSocietyMembers(params.societyId);

  if (!society) return null;

  console.log(societyMembers);

  return (
    <div className="flex min-h-screen flex-col gap-5 p-8 py-6">
      <PageTitle title={society.name} description="Placeholder." />

      <pre>{JSON.stringify(society, null, 2)}</pre>

      <div className="flex flex-col gap-2">
        <Text size="5" weight="medium">
          Society Members
        </Text>

        <TableRoot variant="surface">
          <table className="table-fixed">
            <TableHeader>
              <TableRow className="table-row">
                <TableColumnHeaderCell className="w-20">
                  ID
                </TableColumnHeaderCell>
                <TableColumnHeaderCell>Name</TableColumnHeaderCell>
                <TableColumnHeaderCell>Role</TableColumnHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {societyMembers?.map((m) => (
                <TableRow key={m.id} className="table-row">
                  <TableColumnHeaderCell>{m.id}</TableColumnHeaderCell>
                  <TableCell>
                    {m.user?.firstName} {m.user?.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge>
                      {m.role.slice(0, 1).toUpperCase()}
                      {m.role.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </TableRoot>
      </div>
    </div>
  );
}
