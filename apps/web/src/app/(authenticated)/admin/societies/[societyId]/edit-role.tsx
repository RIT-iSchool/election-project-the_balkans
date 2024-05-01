import {
  MemberData,
  useUpdateSocietyMember,
} from '@/hooks/mutations/use-update-society-member';
import { Pencil16, Pencil20 } from '@frosted-ui/icons';
import { useFormik } from 'formik';

import {
  Button,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  IconButton,
} from 'frosted-ui';
import { useState } from 'react';
type EditRoleProps = {
  societyMemberId: number;
  role: 'member' | 'officer' | 'employee';
  refetch: () => void;
};

export const EditRole = ({ societyMemberId, refetch, role }: EditRoleProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateSocietyMember } = useUpdateSocietyMember({
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  const initialValues = {
    role,
  };

  const { submitForm, isValid, setFieldValue, values } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      await updateSocietyMember(societyMemberId, {
        role: values.role as MemberData['role'],
      });
    },
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <IconButton size="2">
          <Pencil16 />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogTitle weight="medium">Change Role</DialogTitle>
        <div>
          <label className="text-sm font-medium">Select Role</label>
          <select
            className="w-full rounded-md border border-gray-300 p-3"
            style={{ borderColor: 'rgba(209, 213, 219, 0.5)' }}
            value={values.role}
            onChange={(e) => setFieldValue('role', e.target.value)}
          >
            <option value="member">Member</option>
            <option value="officer">Officer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="mt-2 flex flex-row justify-end gap-2">
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Button
            color="iris"
            variant="classic"
            disabled={!isValid}
            onClick={submitForm}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
