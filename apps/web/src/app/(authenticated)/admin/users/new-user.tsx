import { Plus16 } from '@frosted-ui/icons';
import {
  Button,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'frosted-ui';

export const NewUser = () => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button size="3" variant="classic" color="iris">
          <Plus16 />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogTitle>Add user</DialogTitle>
        Shpend, do your thing
      </DialogContent>
    </DialogRoot>
  );
};
