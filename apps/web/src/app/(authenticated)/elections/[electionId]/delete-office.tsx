import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Button,
} from 'frosted-ui';

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
  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete office</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this election office?
        </AlertDialogDescription>
        delete for {electionId} {officeId}
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
