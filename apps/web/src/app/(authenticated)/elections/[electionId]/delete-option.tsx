import {
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  Button,
  AlertDialogAction,
} from 'frosted-ui';

type DeleteOptionProps = {
  electionId: number;
  optionId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteOption = ({
  electionId,
  optionId,
  open,
  setOpen,
}: DeleteOptionProps) => {
  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete option</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this election option?
        </AlertDialogDescription>
        delete for {electionId} {optionId}
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
