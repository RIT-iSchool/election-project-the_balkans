import useSWR from 'swr';

export type ResultsReport = {
  officeResults: {
    candidate: {
      name: string;
      office: string;
      voteCount: number;
    };
  }[];
  initiativeResults: {
    option: {
      title: string;
      initiative: string;
      voteCount: number;
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
