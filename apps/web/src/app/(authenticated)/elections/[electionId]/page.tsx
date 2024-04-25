'use client';
import { Ballot, useBallot } from '@/hooks/use-ballot';
import { useElection } from '@/hooks/use-election';
import { PageTitle } from '@/components/shared/page-title';
import {
  Button,
  Text,
  Card,
  Inset,
  IconButton,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'frosted-ui';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import dayjs from 'dayjs';
import {
  Pencil16,
  Plus16,
  ThreeDotsHorizontal20,
  Trash16,
} from '@frosted-ui/icons';
import { NewOffice } from './new-office';
import { useCallback, useState } from 'react';
import { DeleteOffice } from './delete-office';
import { EditOffice } from './edit-office';
import { NewCandidate } from './new-candidate';
import { EditCandidate } from './update-candidate';
import { DeleteCandidate } from './delete-candidate';
import { EditInitiative } from './update-initiative';
import { DeleteInitiative } from './delete-initiative';
import { NewInitiative } from './new-initiative';

type PageProps = {
  params: {
    electionId: string;
  };
};

const OfficeRow = ({ office }: { office: Ballot['offices'][number] }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpenEdit = useCallback(() => setEditOpen(true), []);
  const handleOpenDelete = useCallback(() => setDeleteOpen(true), []);

  return (
    <>
      <TableRow>
        <TableCell>
          <Text color="gray">{office.officeName}</Text>
        </TableCell>
        <TableCell>
          <Text color="gray">{office.candidates.length}</Text>
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

      <EditOffice open={editOpen} setOpen={setEditOpen} office={office} />
      <DeleteOffice
        open={deleteOpen}
        setOpen={setDeleteOpen}
        electionId={office.electionId}
        officeId={office.id}
      />
    </>
  );
};

const CandidateRow = ({
  candidate,
  office,
}: {
  candidate: Ballot['offices'][number]['candidates'][number];
  office: Ballot['offices'][number];
}) => {
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
          <Text color="gray">{office.officeName}</Text>
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

      <EditCandidate
        open={editOpen}
        setOpen={setEditOpen}
        candidate={candidate}
      />
      <DeleteCandidate
        open={deleteOpen}
        setOpen={setDeleteOpen}
        electionId={office.electionId}
        candidateId={candidate.id}
      />
    </>
  );
};

const InitiativeRow = ({
  initiative,
}: {
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
          <Text color="gray">{initiative.initiativeName}</Text>
        </TableCell>
        <TableCell>
          <Text color="gray">{initiative.options.length}</Text>
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

      <EditInitiative
        open={editOpen}
        setOpen={setEditOpen}
        initiative={initiative}
      />
      <DeleteInitiative
        open={deleteOpen}
        setOpen={setDeleteOpen}
        electionId={initiative.electionId}
        initiativeId={initiative.id}
      />
    </>
  );
};

export default function Page({ params }: PageProps) {
  const { data: election } = useElection(params);
  const { data: ballot } = useBallot(params);

  if (!election) return null;

  const description = `${dayjs(election.startDate).format('MMMM DD, YYYY')} - ${dayjs(election.endDate).format('MMMM DD, YYYY')}`;

  return (
    <div className="flex min-h-screen flex-col gap-5 pt-6">
      <div className="flex justify-between space-y-5 px-6">
        <PageTitle title={election.name} description={description} />
      </div>

      <div className="w-screen space-y-4 overflow-auto px-6 pb-6 md:w-full">
        {Boolean(ballot) && (
          <>
            <Card>
              <Inset pb="0" side="top">
                <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                  <Text size="4" weight="medium">
                    Offices
                  </Text>
                  <NewOffice electionId={params.electionId} />
                </div>
              </Inset>
              <Inset clip="border-box" side="bottom">
                <Table>
                  <TableHeader className="bg-white">
                    <TableHead className="!border-t-0">Position</TableHead>
                    <TableHead className="!border-t-0">Candidates</TableHead>
                    <TableHead className="!border-t-0">Actions</TableHead>
                  </TableHeader>
                  <TableBody>
                    {ballot?.offices?.map((office) => (
                      <OfficeRow office={office} key={office.id} />
                    ))}
                  </TableBody>
                </Table>
              </Inset>
            </Card>

            <div className="flex justify-between gap-4">
              <Card className="flex-grow">
                <Inset pb="0" side="top">
                  <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                    <Text size="4" weight="medium">
                      Candidates
                    </Text>
                    <NewCandidate electionId={params.electionId} />
                  </div>
                </Inset>
                <Inset clip="border-box" side="bottom">
                  <Table>
                    <TableHeader className="bg-white">
                      <TableHead className="!border-t-0">Name</TableHead>
                      <TableHead className="!border-t-0">Position</TableHead>
                      <TableHead className="!border-t-0">Actions</TableHead>
                    </TableHeader>
                    <TableBody>
                      {ballot?.offices.map((o) =>
                        o.candidates.map((c) => (
                          <CandidateRow key={c.id} candidate={c} office={o} />
                        )),
                      )}
                    </TableBody>
                  </Table>
                </Inset>
              </Card>
              <Card className="flex-grow">
                <Inset pb="0" side="top">
                  <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                    <Text size="4" weight="medium">
                      Initiatives
                    </Text>
                    <NewInitiative electionId={params.electionId} />
                  </div>
                </Inset>
                <Inset clip="border-box" side="bottom">
                  <Table>
                    <TableHeader className="bg-white">
                      <TableHead className="!border-t-0">Title</TableHead>
                      <TableHead className="!border-t-0">Options</TableHead>
                      <TableHead className="!border-t-0">Actions</TableHead>
                    </TableHeader>
                    <TableBody>
                      {ballot?.initiatives.map((i) => (
                        <InitiativeRow key={i.id} initiative={i} />
                      ))}
                    </TableBody>
                  </Table>
                </Inset>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
