import {
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  Button,
  AlertDialogAction,
} from 'frosted-ui';

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
  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete initiative</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this election initiative?
        </AlertDialogDescription>
        delete for {electionId} {initiativeId}
        <div className="flex justify-end gap-3">
          <AlertDialogCancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button color="red" variant="classic">
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
