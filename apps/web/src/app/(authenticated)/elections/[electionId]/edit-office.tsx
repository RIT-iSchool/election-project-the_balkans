import type { ElectionOffice } from '@/hooks/use-election-office';
import {
  DialogRoot,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'frosted-ui';

type EditOfficeProps = {
  office: ElectionOffice;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditOffice = ({ office, open, setOpen }: EditOfficeProps) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Edit office</DialogTitle>
        <DialogDescription>Update details for this office</DialogDescription>
        edit for <pre>{JSON.stringify(office, null, 2)}</pre>
      </DialogContent>
    </DialogRoot>
  );
};
