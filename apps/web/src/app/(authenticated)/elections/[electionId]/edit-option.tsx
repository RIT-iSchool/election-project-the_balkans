import { InitiativeOption } from '@/hooks/use-initiative-option';
import {
  DialogRoot,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'frosted-ui';

type EditOptionProps = {
  option: InitiativeOption;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const EditOption = ({ option, open, setOpen }: EditOptionProps) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Edit option</DialogTitle>
        <DialogDescription>
          Update details for this election option
        </DialogDescription>
        edit for <pre>{JSON.stringify(option, null, 2)}</pre>
      </DialogContent>
    </DialogRoot>
  );
};
