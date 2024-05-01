'use client';
import { Ballot, useBallot } from '@/hooks/use-ballot';
import { useElection } from '@/hooks/use-election';
import { PageTitle } from '@/components/shared/page-title';
import {
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
  Happy32,
  Pencil16,
  Sad32,
  ThreeDotsHorizontal20,
  Trash16,
} from '@frosted-ui/icons';
import { NewOffice } from './new-office';
import { MouseEventHandler, useCallback, useState } from 'react';
import { DeleteOffice } from './delete-office';
import { EditInitiative } from './edit-initiative';
import { DeleteInitiative } from './delete-initiative';
import { NewInitiative } from './new-initiative';
import { useStatusReport } from '@/hooks/use-status-report';
import { StatsCard } from '@/components/shared/stats-card';
import { useResultsReport } from '@/hooks/use-results-report';
import { useRouter } from 'next/navigation';
import { EditOffice } from './edit-office';
import { Empty } from '@/components/shared/empty';

type PageProps = {
  params: {
    electionId: string;
  };
};

const OfficeRow = ({
  office,
  hasntStarted,
}: {
  office: Ballot['offices'][number];
  hasntStarted: boolean | undefined;
}) => {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpenEdit: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setEditOpen(true);
  }, []);

  const handleOpenDelete: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setDeleteOpen(true);
  }, []);

  const handleNavigate = useCallback(() => {
    router.push(`/elections/${office.electionId}/offices/${office.id}`);
  }, [office]);

  return (
    <>
      <TableRow onClick={handleNavigate}>
        <TableCell>
          <Text color="gray">{office.officeName}</Text>
        </TableCell>
        <TableCell>
          <Text color="gray">{office.candidates.length}</Text>
        </TableCell>
        {!hasntStarted && (
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
        )}
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

const InitiativeRow = ({
  initiative,
  hasntStarted,
}: {
  initiative: Ballot['initiatives'][number];
  hasntStarted: boolean | undefined;
}) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpenEdit: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    setEditOpen(true);
  }, []);
  const handleOpenDelete: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    setDeleteOpen(true);
  }, []);

  const handleNavigate = useCallback(() => {
    router.push(
      `/elections/${initiative.electionId}/initiatives/${initiative.id}`,
    );
  }, []);

  return (
    <>
      <TableRow onClick={handleNavigate}>
        <TableCell>
          <Text color="gray">{initiative.initiativeName}</Text>
        </TableCell>
        <TableCell>
          <Text color="gray">{initiative.options.length}</Text>
        </TableCell>
        {!hasntStarted && (
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
        )}
      </TableRow>

      {editOpen && (
        <EditInitiative
          open={editOpen}
          setOpen={setEditOpen}
          electionId={initiative.electionId}
          initiativeId={initiative.id}
        />
      )}
      {deleteOpen && (
        <DeleteInitiative
          open={deleteOpen}
          setOpen={setDeleteOpen}
          electionId={initiative.electionId}
          initiativeId={initiative.id}
        />
      )}
    </>
  );
};

export default function Page({ params }: PageProps) {
  const { data: election } = useElection(params);
  const { data: ballot, mutate: refetchBallot } = useBallot(params);
  const { data: status } = useStatusReport(params);
  const { data: results } = useResultsReport(params);

  const electionStarted =
    ballot?.startDate && new Date(ballot?.startDate) < new Date();

  if (!election || !status) return null;

  const description = `${dayjs(election.startDate).format('MMMM DD, YYYY')} - ${dayjs(election.endDate).format('MMMM DD, YYYY')}`;

  return (
    <div className="flex min-h-screen grid-cols-1 flex-col gap-5 pt-6">
      <div className="flex justify-between space-y-5 px-6">
        <PageTitle title={election.name} description={description} />
      </div>
      {electionStarted && (
        <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="Total Votes" count={status?.totalVotes} />

          <StatsCard
            label="Voting Member Percentage"
            count={status?.votingMemberPercentage || '0'}
            unit="%"
          />

          <StatsCard
            label="Voting Members"
            count={status?.votingMembers.length}
          />

          <StatsCard
            label="Non-Voting Members"
            count={status?.nonVotingMembers.length}
          />
        </div>
      )}
      <div className="w-screen space-y-4 overflow-auto pb-6 md:w-full">
        {Boolean(ballot) && (
          <>
            <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <Inset pb="0" side="top">
                  <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                    <Text size="4" weight="medium">
                      Offices
                    </Text>
                    {!electionStarted && (
                      <NewOffice
                        electionId={params.electionId}
                        refetch={refetchBallot}
                      />
                    )}
                  </div>
                </Inset>
                <Inset clip="border-box" side="bottom">
                  <Table>
                    <TableHeader className="bg-white">
                      <TableHead className="!border-t-0">Position</TableHead>
                      <TableHead className="!border-t-0">Candidates</TableHead>
                      {!electionStarted && (
                        <TableHead className="!border-t-0">Actions</TableHead>
                      )}
                    </TableHeader>
                    <TableBody>
                      {ballot?.offices?.map((office) => (
                        <OfficeRow
                          office={office}
                          key={office.id}
                          hasntStarted={electionStarted}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </Inset>
              </Card>
              <Card>
                <Inset pb="0" side="top">
                  <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                    <Text size="4" weight="medium">
                      Initiatives
                    </Text>
                    {!electionStarted && (
                      <NewInitiative
                        electionId={params.electionId}
                        refetch={refetchBallot}
                      />
                    )}
                  </div>
                </Inset>
                <Inset clip="border-box" side="bottom">
                  <Table>
                    <TableHeader className="bg-white">
                      <TableHead className="!border-t-0">Title</TableHead>
                      <TableHead className="!border-t-0">Options</TableHead>
                      {!electionStarted && (
                        <TableHead className="!border-t-0">Actions</TableHead>
                      )}
                    </TableHeader>
                    <TableBody>
                      {ballot?.initiatives.map((i) => (
                        <InitiativeRow
                          key={i.id}
                          initiative={i}
                          hasntStarted={electionStarted}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </Inset>
              </Card>
            </div>
          </>
        )}
        {electionStarted && (
          <>
            <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <Inset pb="0" side="top">
                  <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                    <Text size="4" weight="medium">
                      Voting Members
                    </Text>
                  </div>
                </Inset>
                <Inset clip="border-box" side="bottom">
                  <Table>
                    <TableHeader className="bg-white">
                      <TableHead className="!border-t-0">Name</TableHead>
                    </TableHeader>
                    {!status.votingMembers.length && (
                      <Empty
                        title="No voting members, yet"
                        subtitle="Nobody has voted in this election yet. Check back later."
                        icon={Sad32}
                        ghost
                      />
                    )}
                    <TableBody>
                      {status?.votingMembers.map((member, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Text color="gray">
                              {member.votingUser.firstName}{' '}
                              {member.votingUser.lastName}
                            </Text>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Inset>
              </Card>
              <Card>
                <Inset pb="0" side="top">
                  <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                    <Text size="4" weight="medium">
                      Non-Voting Members
                    </Text>
                  </div>
                </Inset>
                <Inset clip="border-box" side="bottom">
                  <Table>
                    <TableHeader className="bg-white">
                      <TableHead className="!border-t-0">Name</TableHead>
                    </TableHeader>
                    <TableBody>
                      {!status.nonVotingMembers.length && (
                        <Empty
                          title="No nonvoting members"
                          subtitle="Everyone has voted in this election."
                          icon={Happy32}
                          ghost
                        />
                      )}
                      {status?.nonVotingMembers.map((member, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Text color="gray">
                              {member.nonVotingUser.firstName}{' '}
                              {member.nonVotingUser.lastName}
                            </Text>
                          </TableCell>
                        </TableRow>
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
