'use client';
import { PageTitle } from '@/components/shared/page-title';
import {
  Card,
  Inset,
  Text,
  DropdownMenuRoot,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  IconButton,
  BreadcrumbsRoot,
  BreadcrumbsItem,
  Link,
} from 'frosted-ui';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/shared/table';
import { useElectionCandidates } from '@/hooks/use-election-candidates';
import { useCallback, useState } from 'react';
import { Ballot, useBallot } from '@/hooks/use-ballot';
import { Pencil16, ThreeDotsHorizontal20, Trash16 } from '@frosted-ui/icons';
import { useElectionOffice } from '@/hooks/use-election-office';
import { NewOption } from './new-option';
import { EditOption } from './edit-option';
import { DeleteOption } from './delete-option';
import { useElection } from '@/hooks/use-election';
import { useElectionInitiatives } from '@/hooks/use-election-initiatives';
import { useInitiativeOptions } from '@/hooks/use-initiative-options';
import { useElectionInitiative } from '@/hooks/use-election-initiative';

type PageProps = {
  params: {
    electionId: string;
    initiativeId: string;
  };
};

const OptionRow = ({
  option,
  initiative,
}: {
  option: Ballot['initiatives'][number]['options'][number];
  initiative: Ballot['initiatives'][number];
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpenEdit = useCallback(() => setEditOpen(true), []);
  const handleOpenDelete = useCallback(() => setDeleteOpen(true), []);

  return (
    <>
      <TableRow>
        <TableCell>
          <Text color="gray">{option.title}</Text>
        </TableCell>
        <TableCell>
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <IconButton>
                <ThreeDotsHorizontal20 />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="w-32" onClick={handleOpenEdit}>
                <Pencil16 />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-32"
                color="red"
                onClick={handleOpenDelete}
              >
                <Trash16 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </TableCell>
      </TableRow>

      <EditOption open={editOpen} setOpen={setEditOpen} option={option} />

      <DeleteOption
        open={deleteOpen}
        setOpen={setDeleteOpen}
        electionId={initiative.electionId}
        initiativeId={initiative.id}
        optionId={option.id}
      />
    </>
  );
};

export default function Page({ params }: PageProps) {
  const { data: initiative } = useElectionInitiative(params);
  const { data: election } = useElection(params);
  const { data: options, mutate: refetch } = useInitiativeOptions(params);

  if (!initiative) return null;

  return (
    <div className="flex min-h-screen grid-cols-1 flex-col gap-5 pt-4">
      <div className="px-6">
        <BreadcrumbsRoot color="gray">
          <BreadcrumbsItem asChild>
            <a href="/home">Home</a>
          </BreadcrumbsItem>
          <BreadcrumbsItem asChild>
            <a href={`/elections/${params.electionId}`}>{election?.name}</a>
          </BreadcrumbsItem>
          <BreadcrumbsItem>
            <a
              href={`/elections/${params.electionId}/initiatives/${params.initiativeId}`}
            >
              {initiative?.initiativeName}
            </a>
          </BreadcrumbsItem>
        </BreadcrumbsRoot>
      </div>

      <div className="flex justify-between space-y-5 px-6">
        <PageTitle
          title={initiative?.initiativeName}
          description="Options for this initiative."
        />
      </div>

      <div className="w-screen space-y-4 overflow-auto px-6 pb-6 md:w-full">
        <Card>
          <Inset pb="0" side="top">
            <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
              <Text size="4" weight="medium">
                Options
              </Text>
              <NewOption
                electionId={params.electionId}
                initiativeId={params.initiativeId}
                refetch={refetch}
              />
            </div>
          </Inset>
          <Inset clip="border-box" side="bottom">
            <Table>
              <TableHeader className="bg-white">
                <TableHead className="!border-t-0">Name</TableHead>
                <TableHead className="!border-t-0">Actions</TableHead>
              </TableHeader>
              <TableBody>
                {initiative &&
                  options?.map((option) => (
                    <OptionRow option={option} initiative={initiative} />
                  ))}
              </TableBody>
            </Table>
          </Inset>
        </Card>
      </div>
    </div>
  );
}
