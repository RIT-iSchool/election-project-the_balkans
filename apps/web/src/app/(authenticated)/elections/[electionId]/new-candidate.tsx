import { Plus16 } from '@frosted-ui/icons';
import { DialogRoot, DialogTrigger, Button, DialogContent } from 'frosted-ui';

type NewCandidateProps = {
  electionId: string;
};

export const NewCandidate = ({ electionId }: NewCandidateProps) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add candidate
        </Button>
      </DialogTrigger>
      <DialogContent>new candidate for {electionId}</DialogContent>
    </DialogRoot>
  );
};
