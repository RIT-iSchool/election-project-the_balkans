import {
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  Button,
  AlertDialogAction,
} from 'frosted-ui';

type DeleteCandidateProps = {
  electionId: number;
  candidateId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteCandidate = ({
  electionId,
  candidateId,
  open,
  setOpen,
}: DeleteCandidateProps) => {
  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete candidate</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this election candidate?
        </AlertDialogDescription>
        delete for {electionId} {candidateId}
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
