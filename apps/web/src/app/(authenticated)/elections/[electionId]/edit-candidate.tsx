import { ElectionCandidate } from '@/hooks/use-election-candidate';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from 'frosted-ui';

type EditCandidateProps = {
  candidate: ElectionCandidate;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditCandidate = ({
  candidate,
  open,
  setOpen,
}: EditCandidateProps) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Edit candidate</DialogTitle>
        <DialogDescription>Update details for this candidate</DialogDescription>
        edit for <pre>{JSON.stringify(candidate, null, 2)}</pre>
      </DialogContent>
    </DialogRoot>
  );
};
