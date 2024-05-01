import { useDeleteInitiativeOption } from '@/hooks/mutations/use-delete-initiative-option';
import { useInitiativeOptions } from '@/hooks/use-initiative-options';
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
  initiativeId: number;
  optionId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteOption = ({
  electionId,
  initiativeId,
  optionId,
  open,
  setOpen,
}: DeleteCandidateProps) => {
  const { mutate: refetch } = useInitiativeOptions({
    electionId,
    initiativeId,
  });
  const { mutateAsync: deleteOption, isLoading } = useDeleteInitiativeOption({
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const handleDelete = useCallback(() => {
    deleteOption({ electionId, initiativeId, optionId });
  }, []);

  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete option</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this initiative option?
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
