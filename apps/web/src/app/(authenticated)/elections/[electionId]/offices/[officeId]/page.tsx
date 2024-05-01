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
import { Ballot } from '@/hooks/use-ballot';
import { Pencil16, ThreeDotsHorizontal20, Trash16 } from '@frosted-ui/icons';
import { useElectionOffice } from '@/hooks/use-election-office';
import { NewCandidate } from './new-candidate';
import { EditCandidate } from './edit-candidate';
import { DeleteCandidate } from './delete-candidate';
import { useElection } from '@/hooks/use-election';

type PageProps = {
  params: {
    electionId: string;
    officeId: string;
  };
};

const CandidateRow = ({
  electionId,
  candidate,
}: {
  electionId: string;
  candidate: Ballot['offices'][number]['candidates'][number];
}) => {
  const { mutate: refetch } = useElectionCandidates({
    electionId,
    officeId: candidate.electionOfficeId,
  });
  const { data: office } = useElectionOffice({
    electionId,
    officeId: candidate.electionOfficeId,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpenEdit = useCallback(() => setEditOpen(true), []);
  const handleOpenDelete = useCallback(() => setDeleteOpen(true), []);

  return (
    <>
      <TableRow>
        <TableCell>
          <Text color="gray">{candidate.name}</Text>
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

      {office && editOpen && (
        <EditCandidate
          open={editOpen}
          setOpen={setEditOpen}
          electionId={office.electionId}
          officeId={office.id}
          candidateId={candidate.id}
        />
      )}
      {office && deleteOpen && (
        <DeleteCandidate
          open={deleteOpen}
          setOpen={setDeleteOpen}
          electionId={office.electionId}
          officeId={office.id}
          candidateId={candidate.id}
        />
      )}
    </>
  );
};

export default function Page({ params }: PageProps) {
  const { data: candidates, mutate } = useElectionCandidates(params);
  const { data: office } = useElectionOffice(params);
  const { data: election } = useElection(params);

  if (!office) return null;

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
              href={`/elections/${params.electionId}/offices/${params.officeId}`}
            >
              {office?.officeName}
            </a>
          </BreadcrumbsItem>
        </BreadcrumbsRoot>
      </div>

      <div className="flex justify-between space-y-5 px-6">
        <PageTitle
          title={office?.officeName}
          description="Candidates for this office."
        />
      </div>

      <div className="w-screen space-y-4 overflow-auto px-6 pb-6 md:w-full">
        {!!candidates?.length && (
          <Card>
            <Inset pb="0" side="top">
              <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                <Text size="4" weight="medium">
                  Candidates
                </Text>
                <NewCandidate
                  electionId={params.electionId}
                  officeId={params.officeId}
                  refetch={mutate}
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
                  {candidates?.map((candidate) => (
                    <CandidateRow
                      candidate={candidate}
                      electionId={params.electionId}
                      key={candidate.id}
                    />
                  ))}
                </TableBody>
              </Table>
            </Inset>
          </Card>
        )}
      </div>
    </div>
  );
}
