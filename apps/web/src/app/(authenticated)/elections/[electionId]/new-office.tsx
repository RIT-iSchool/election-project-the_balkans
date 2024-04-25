import { Plus16 } from '@frosted-ui/icons';
import { Button, DialogContent, DialogRoot, DialogTrigger } from 'frosted-ui';

type NewOfficeProps = {
  electionId: string;
};

export const NewOffice = ({ electionId }: NewOfficeProps) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add office
        </Button>
      </DialogTrigger>
      <DialogContent>new office for {electionId}</DialogContent>
    </DialogRoot>
  );
};
