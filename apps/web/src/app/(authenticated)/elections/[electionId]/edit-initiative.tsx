import { ElectionInitiative } from '@/hooks/use-election-initiative';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from 'frosted-ui';

type EditInitiativeProps = {
  initiative: ElectionInitiative;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditInitiative = ({
  initiative,
  open,
  setOpen,
}: EditInitiativeProps) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle weight="medium">Edit initiative</DialogTitle>
        <DialogDescription>
          Update details for this initiative
        </DialogDescription>
        edit for <pre>{JSON.stringify(initiative, null, 2)}</pre>
      </DialogContent>
    </DialogRoot>
  );
};
