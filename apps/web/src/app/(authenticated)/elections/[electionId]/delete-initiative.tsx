import { useDeleteElectionInitiative } from '@/hooks/mutations/use-delete-election-initiative';
import { useBallot } from '@/hooks/use-ballot';
import {
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  Button,
  AlertDialogAction,
} from 'frosted-ui';
import { useCallback } from 'react';

type DeleteInitiativeProps = {
  electionId: number;
  initiativeId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteInitiative = ({
  electionId,
  initiativeId,
  open,
  setOpen,
}: DeleteInitiativeProps) => {
  const { mutate: refetch } = useBallot({ electionId: electionId.toString() });

  const { mutateAsync: deleteInitiative } = useDeleteElectionInitiative({
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const handleDelete = useCallback(() => {
    deleteInitiative({
      initiativeId,
      electionId,
    });
  }, []);

  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete initiative</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this election initiative?
        </AlertDialogDescription>
        <div className="flex justify-end gap-3">
          <AlertDialogCancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            <Button color="red" variant="classic">
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
