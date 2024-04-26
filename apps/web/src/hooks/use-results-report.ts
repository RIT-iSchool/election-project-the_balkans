import useSWR from 'swr';

export type ResultsReport = {
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

type UseResultsReportOptions = {
  electionId: string;
};

export const useResultsReport = ({ electionId }: UseResultsReportOptions) => {
  const { data, error, isLoading } = useSWR<ResultsReport>(
    `/api/v1/report/results/${electionId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
