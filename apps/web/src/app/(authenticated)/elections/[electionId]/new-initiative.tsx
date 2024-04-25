import { Plus16 } from '@frosted-ui/icons';
import { DialogRoot, DialogTrigger, Button, DialogContent } from 'frosted-ui';

type NewInitiativeProps = {
  electionId: string;
};

export const NewInitiative = ({ electionId }: NewInitiativeProps) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add initiative
        </Button>
      </DialogTrigger>
      <DialogContent>new initiative for {electionId}</DialogContent>
    </DialogRoot>
  );
};
