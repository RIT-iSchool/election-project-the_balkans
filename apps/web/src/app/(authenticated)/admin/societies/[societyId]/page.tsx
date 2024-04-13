'use client';
import { PageTitle } from '@/components/shared/page-title';
import { useSociety } from '@/hooks/use-society';
import { useSocietyMembers } from '@/hooks/use-society-members';
import {
  Badge,
  IconButton,
  Card,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Inset,
  Text,
} from 'frosted-ui';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import { useMemo } from 'react';

type PageProps = {
  params: {
    societyId: string;
  };
};

const RoleBadge = ({ role }: { role: 'member' | 'officer' | 'employee' }) => {
  const color = useMemo(() => {
    if (role === 'employee') return 'red';
    if (role === 'officer') return 'orange';
    return 'green';
  }, [role]);

  return (
    <Badge color={color}>
      {role.slice(0, 1).toUpperCase()}
      {role.slice(1)}
    </Badge>
  );
};

export default function Page({ params }: PageProps) {
  const { data: society } = useSociety(params);
  const { data: societyMembers } = useSocietyMembers(params.societyId);

  if (!society) return null;

  return (
    <div className="flex min-h-screen flex-col gap-5 p-8 py-6">
      <PageTitle title={society.name} description="Placeholder." />

      <pre>{JSON.stringify(society, null, 2)}</pre>

      <div className="flex flex-col gap-2">
        <Text size="5" weight="medium">
          Society Members
        </Text>
        2
        <Card className="inset-0">
          <Inset>
            <Table>
              <TableHeader>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead />
              </TableHeader>
              <TableBody>
                {societyMembers?.map((m) => (
                  <TableRow key={m.id} className="table-row">
                    <TableCell>
                      <Text weight="bold">{m.id}</Text>
                    </TableCell>
                    <TableCell>
                      <Text color="gray">
                        {m.user?.firstName} {m.user?.lastName}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={m.role} />
                    </TableCell>
                    <TableCell className="flex w-full justify-end">
                      <DropdownMenuRoot>
                        <DropdownMenuTrigger>
                          <IconButton>...</IconButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>yo</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuRoot>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Inset>
        </Card>
      </div>
    </div>
  );
}
