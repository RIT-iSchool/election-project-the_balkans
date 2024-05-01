'use client';

import { PageTitle } from '@/components/shared/page-title';
import { useSubmitBallot } from '@/hooks/mutations/use-submit-ballot';
import { Ballot, useBallot } from '@/hooks/use-ballot';
import { cn } from '@/lib/cn';
import { Plus16, XMark16 } from '@frosted-ui/icons';
import dayjs from 'dayjs';
import {
  Button,
  IconButton,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from 'frosted-ui';
import { useRouter } from 'next/navigation';
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

type PageProps = {
  params: {
    electionId: string;
  };
};

type BallotState = {
  officeVotes: {
    [key: number]: {
      writeIn?: {};
      candidates: number[];
    };
  };
  initiativeVotes: {
    [key: number]: number;
  };
};

const Office = ({
  office,
  ballot,
  ballotData,
  setBallotData,
}: {
  office: Ballot['offices'][number];
  ballot: Ballot;
  ballotData: BallotState;
  setBallotData: Dispatch<SetStateAction<BallotState>>;
}) => {
  const [writingIn, setWritingIn] = useState(false);
  const [writeIn, setWriteIn] = useState('');

  const handleToggleCandidate = useCallback(
    (officeId: number, candidateId: number) => {
      const maxVotesForThisOffice = ballot?.offices.find(
        (o) => o.id === officeId,
      )?.maxVotes;
      if (maxVotesForThisOffice === undefined) return;

      let copiedArray = ballotData.officeVotes[officeId]
        ? [...ballotData.officeVotes[officeId].candidates]
        : [];
      copiedArray.push(candidateId);
      copiedArray = Array.from(new Set(copiedArray));

      if (copiedArray.length >= maxVotesForThisOffice) {
        if (writingIn) {
          setWritingIn(false);
          setWriteIn('');
        }

        copiedArray = copiedArray.slice(
          copiedArray.length - maxVotesForThisOffice,
        );
      }

      setBallotData({
        ...ballotData,
        officeVotes: {
          ...ballotData.officeVotes,
          [officeId]: {
            candidates: copiedArray,
          },
        },
      });
    },
    [ballotData],
  );

  const handleToggleWritingIn = useCallback(() => {
    const maxVotesForThisOffice = ballot?.offices.find(
      (o) => o.id === office.id,
    )?.maxVotes;
    if (maxVotesForThisOffice === undefined) return;

    let copiedArray = ballotData.officeVotes[office.id]
      ? [...ballotData.officeVotes[office.id].candidates]
      : [];

    if (copiedArray.length >= maxVotesForThisOffice - 1) {
      copiedArray = copiedArray.slice(
        copiedArray.length - maxVotesForThisOffice + 1,
      );
    }

    setBallotData({
      ...ballotData,
      officeVotes: {
        ...ballotData.officeVotes,
        [office.id]: {
          candidates: copiedArray,
          writeIn: {
            officeId: office.id,
            name: writeIn,
          },
        },
      },
    });
    setWritingIn(true);
  }, []);

  const handleCancelWriteIn = useCallback(() => {
    setWritingIn(false);
  }, []);

  const handleSetWriteIn: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setBallotData({
        ...ballotData,
        officeVotes: {
          ...ballotData.officeVotes,
          [office.id]: {
            ...ballotData.officeVotes[office.id],
            writeIn: {
              officeId: office.id,
              name: e.target.value,
            },
          },
        },
      });
      setWriteIn(e.target.value);
    },
    [ballotData],
  );

  return (
    <div key={office.id} className="space-y-5">
      <div className="flex flex-col">
        <Text size="6" weight="bold">
          Office: {office.officeName}
        </Text>
        <Text size="4" weight="medium" className="text-gray-a9">
          Max Votes: {office.maxVotes}
        </Text>
      </div>
      <div className="space-y-3">
        {office.candidates.map((candidate) => {
          return (
            <div
              key={candidate.id}
              onClick={() => handleToggleCandidate(office.id, candidate.id)}
              className={cn(
                'border-gray-a5 group flex w-full flex-col overflow-hidden rounded-md border md:flex-row',
                {
                  'border-iris-6 ring-iris-8 ring-2': ballotData.officeVotes[
                    office.id
                  ]?.candidates.includes(candidate.id),
                },
              )}
            >
              {candidate.photoURL && (
                <div className="h-[200px] overflow-hidden">
                  <img
                    src={`/ajax/uploads/candidate/${candidate.photoURL}`}
                    className="w-full object-cover transition group-hover:opacity-90 md:max-w-[300px]"
                  />
                </div>
              )}
              <div className="bg-gray-a2 group-hover:bg-gray-a3 border-gray-a5 flex w-full flex-col border-t p-4 transition md:border-none">
                <Text size="6" weight="medium">
                  {candidate.name}
                </Text>
                <Text size="3" color="gray">
                  {candidate.description}
                </Text>
              </div>
            </div>
          );
        })}

        {!writingIn && (
          <Button size="3" className="w-full" onClick={handleToggleWritingIn}>
            <Plus16 />
            Add write-in
          </Button>
        )}
        {writingIn && (
          <div>
            <Text as="label" size="3" weight="medium">
              Write-in
            </Text>
            <div className="flex w-full gap-2">
              <TextFieldRoot className="w-full">
                <TextFieldInput
                  size="3"
                  placeholder="Write-in candidate"
                  onChange={handleSetWriteIn}
                />
              </TextFieldRoot>
              <IconButton size="3" onClick={handleCancelWriteIn}>
                <XMark16 />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page({ params }: PageProps) {
  const { data: ballot } = useBallot(params);
  const router = useRouter();

  const [ballotData, setBallotData] = useState<BallotState>({
    officeVotes: {},
    initiativeVotes: {},
  });

  const handleToggleInitiative = useCallback(
    (initiativeId: number, optionId: number) => {
      setBallotData({
        ...ballotData,
        initiativeVotes: {
          ...ballotData.initiativeVotes,
          [initiativeId]: optionId,
        },
      });
    },
    [ballotData],
  );

  const { mutateAsync: submitBallot } = useSubmitBallot({
    onSuccess: () => {
      router.push('/home');
    },
  });

  const handleSubmit = useCallback(() => {
    submitBallot({
      ...ballotData,
      electionId: params.electionId,
    });
  }, [ballotData]);

  if (!ballot) return null;

  return (
    <div className="flex min-h-screen grid-cols-1 flex-col gap-5 py-6">
      <div className="flex justify-between space-y-5 px-6">
        <PageTitle
          title={ballot.name}
          description={`You must submit your vote by ${dayjs(ballot.endDate).format('MMMM DD YYYY, h:ma')}`}
        />
      </div>

      <div className="space-y-7 px-6">
        {ballot.offices.map((office) => {
          return (
            <Office
              office={office}
              ballot={ballot}
              ballotData={ballotData}
              setBallotData={setBallotData}
              key={office.id}
            />
          );
        })}

        {ballot.initiatives.map((initiative) => {
          return (
            <div key={initiative.id} className="space-y-5">
              <div className="flex flex-col">
                <Text size="6" weight="bold">
                  Initiative: {initiative.initiativeName}
                </Text>
                <Text size="3" color="gray">
                  {initiative.description}
                </Text>
              </div>
              <div className="space-y-3">
                {initiative.options.map((option) => {
                  return (
                    <div
                      key={option.id}
                      onClick={() =>
                        handleToggleInitiative(initiative.id, option.id)
                      }
                      className={cn(
                        'border-gray-a5 group flex w-full overflow-hidden rounded-md border',
                        {
                          'border-iris-6 ring-iris-8 ring-2':
                            ballotData.initiativeVotes[initiative.id] ===
                            option.id,
                        },
                      )}
                    >
                      <div className="bg-gray-a2 group-hover:bg-gray-a3 flex w-full flex-col p-4 transition">
                        <Text size="6" weight="medium">
                          {option.title}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Button
          size="4"
          className="w-full"
          color="iris"
          variant="classic"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
