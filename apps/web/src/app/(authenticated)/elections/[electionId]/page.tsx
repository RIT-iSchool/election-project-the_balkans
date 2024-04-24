'use client';
import { useBallot } from '@/hooks/use-ballot';
import { useElection } from '@/hooks/use-election';
import { PageTitle } from '@/components/shared/page-title';
import { Button, Text, Card, Inset } from 'frosted-ui';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/shared/table';
import dayjs from 'dayjs';
import { Plus16 } from '@frosted-ui/icons';

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

      <div className="w-screen space-y-4 overflow-auto px-6 md:w-full">
        {Boolean(ballot) && (
          <>
            <Card>
              <Inset pb="0" side="top">
                <div className="bg-gray-a2 border-gray-a5 flex h-12 items-center justify-between border-b pl-4 pr-2">
                  <Text size="4" weight="medium">
                    Offices
                  </Text>
                  <Button color="gray" variant="classic">
                    <Plus16 />
                    Add office
                  </Button>
                </div>
              </Inset>
              <Inset clip="border-box" side="bottom">
                <Table>
                  <TableHeader className="bg-white">
                    <TableHead className="w-20 !border-t-0">Position</TableHead>
                    <TableHead className="!border-t-0">Candidates</TableHead>
                    <TableHead className="!border-t-0" />
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
                        <TableCell />
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
                    <TableHead className="w-20 !border-t-0">Name</TableHead>
                    <TableHead className="!border-t-0">Position</TableHead>
                    <TableHead className="!border-t-0">Actions</TableHead>
                    <TableHead className="!border-t-0" />
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
              </Inset>
            </Card>

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
