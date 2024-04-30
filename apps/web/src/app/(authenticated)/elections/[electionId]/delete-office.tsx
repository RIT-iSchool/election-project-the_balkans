import { useDeleteElectionOffice } from '@/hooks/mutations/use-delete-election-office';
import { useBallot } from '@/hooks/use-ballot';
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

type DeleteOfficeProps = {
  electionId: number;
  officeId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteOffice = ({
  electionId,
  officeId,
  open,
  setOpen,
}: DeleteOfficeProps) => {
  const { mutate: refetch } = useBallot({ electionId: electionId.toString() });

  const { mutateAsync: deleteOffice, isLoading } = useDeleteElectionOffice({
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const handleDelete = useCallback(() => {
    deleteOffice({ electionId, officeId });
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
