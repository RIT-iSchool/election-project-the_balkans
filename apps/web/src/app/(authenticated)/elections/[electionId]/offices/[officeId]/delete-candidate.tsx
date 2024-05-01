import { useDeleteElectionCandidate } from '@/hooks/mutations/use-delete-election-candidate';
import { useDeleteElectionOffice } from '@/hooks/mutations/use-delete-election-office';
import { useBallot } from '@/hooks/use-ballot';
import { useElectionCandidates } from '@/hooks/use-election-candidates';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Button,
} from 'frosted-ui';
import { useCallback } from 'react';

type DeleteCandidateProps = {
  electionId: number;
  officeId: number;
  candidateId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteCandidate = ({
  electionId,
  officeId,
  candidateId,
  open,
  setOpen,
}: DeleteCandidateProps) => {
  const { mutate: refetchCandidates } = useElectionCandidates({
    electionId,
    officeId,
  });
  const { mutate: refetch } = useBallot({ electionId: electionId.toString() });

  const { mutateAsync: deleteCandidate, isLoading } =
    useDeleteElectionCandidate({
      onSuccess: () => {
        refetch();
        refetchCandidates();
        setOpen(false);
      },
    });

  const handleDelete = useCallback(() => {
    deleteCandidate({ electionId, candidateId, officeId });
  }, []);

  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete office</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this election office?
        </AlertDialogDescription>
        <div className="flex justify-end gap-3">
          <AlertDialogCancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              color="red"
              variant="classic"
              loading={isLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
