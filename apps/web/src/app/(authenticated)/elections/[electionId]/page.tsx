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

type PageProps = {
  params: {
    electionId: string;
  };
};

const Row = ({ office }: { office: Ballot['offices'][number] }) => {
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

      <div className="w-screen space-y-4 overflow-auto px-6 md:w-full">
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
                      <Row office={office} key={office.id} />
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
                    <Button color="gray" variant="classic">
                      <Plus16 />
                      Add candidate
                    </Button>
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
                          <TableRow>
                            <TableCell>
                              <Text color="gray">{c.name}</Text>
                            </TableCell>
                            <TableCell>
                              <Text color="gray">{o.officeName}</Text>
                            </TableCell>
                            <TableCell>
                              <IconButton>
                                <ThreeDotsHorizontal20 />
                              </IconButton>
                            </TableCell>
                          </TableRow>
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
                    <Button color="gray" variant="classic">
                      <Plus16 />
                      Add initiative
                    </Button>
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
                        <TableRow>
                          <TableCell>
                            <Text color="gray">{i.initiativeName}</Text>
                          </TableCell>
                          <TableCell>
                            <Text color="gray">{i.options.length}</Text>
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <ThreeDotsHorizontal20 />
                            </IconButton>
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
