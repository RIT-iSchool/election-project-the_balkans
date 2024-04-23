import useSWR from 'swr';

type ResultsReport = {
  startDate: {
    startDate: string;
  };
  endDate: {
    endData: string;
  };
  totalVotes: number;
  votingMembers: {
    firstName: string;
    lastName: string;
  }[];
  nonVotingMembers: {
    firstName: string;
    lastName: string;
  }[];
  votingMemberPercentage: number;
  officeResults: {
    election: {
      id: number;
      name: string;
      societyId: number;
      startDate: string;
      endDate: string;
      photoURL: string | null;
    };
    electionOffice: {
      id: number;
      societyId: number;
      electionId: number;
      officeName: string;
      maxVotes: number;
    };
    electionCandidate: {
      id: number;
      name: string;
      description: string;
      societyId: number;
      photoURL: string | null;
      electionOfficeId: number;
    };
    candidateVote: {
      id: number;
      memberId: number;
      electionCandidateId: number;
    };
  }[];
  initiativeResults: {
    election: {
      id: number;
      name: string;
      societyId: number;
      startDate: string;
      endDate: string;
      photoURL: string | null;
    };
    electionInitiative: {
      id: number;
      description: string;
      societyId: number;
      electionId: number;
      initiativeName: string;
    };
    initiativeOption: {
      id: number;
      electionId: number;
      initiativeName: string;
      description: string;
    };
    initiativeVote: {
      id: number;
      memberId: number;
      electionInitiativeId: number;
      electionInitiativeOptionId: number;
    };
  }[];
};

export const useResultsReport = (election_id: string) => {
  const { data, error, isLoading } = useSWR<ResultsReport>(
    `/api/v1/report/results/${election_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
