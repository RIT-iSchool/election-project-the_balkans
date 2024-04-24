'use client';
import { useBallot } from '@/hooks/use-ballot';
import { useElection } from '@/hooks/use-election';
import { PageTitle } from '@/components/shared/page-title';
import { Button, Text } from 'frosted-ui';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import dayjs from 'dayjs';

type PageProps = {
  params: {
    electionId: string;
  };
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

      <div className="w-screen overflow-auto md:w-full">
        {Boolean(ballot) && (
          <>
            <Table>
              <TableHeader>
                <TableHead className="w-20">Offices</TableHead>
                <TableHead>Add Office</TableHead>
                <TableHead />
              </TableHeader>
              <TableHeader className="bg-white">
                <TableHead className="w-20">Position</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead />
              </TableHeader>
              <TableBody>
                {ballot?.offices?.map((o) => (
                  <TableRow>
                    <TableCell>
                      <Text color="gray">{o.officeName}</Text>
                    </TableCell>
                    <TableCell>
                      <Text color="gray">{o.candidates.length}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableHead className="w-20">Candidates</TableHead>
                <TableHead>Add Candidate</TableHead>
                <TableHead />
              </TableHeader>
              <TableHeader className="bg-white">
                <TableHead className="w-20">Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead />
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
                        <Button>Edit</Button>
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableHead className="w-20">Initiatives</TableHead>
                <TableHead>Add Initiative</TableHead>
                <TableHead />
              </TableHeader>
              <TableHeader className="bg-white">
                <TableHead className="w-20">Title</TableHead>
                <TableHead>Options</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead />
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
                      <Button>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}
