import { useCreateElectionOffice } from '@/hooks/mutations/use-create-election-office';
import { Plus16 } from '@frosted-ui/icons';
import { useFormik } from 'formik';
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  TextFieldRoot,
  TextFieldInput,
  Text,
} from 'frosted-ui';
import { useState } from 'react';
import * as yup from 'yup';

type NewOfficeProps = {
  electionId: string;
  refetch: () => void;
};

const initialValues = {
  maxVotes: 1,
  officeName: '',
};

export const NewOffice = ({ electionId, refetch }: NewOfficeProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createElectionOffice, isLoading } =
    useCreateElectionOffice({
      onSuccess: () => {
        // toast here
        refetch();
        setOpen(false);
      },
    });

  const { getFieldProps, submitForm, errors, isValid } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      createElectionOffice({
        electionId: parseInt(electionId, 10),
        ...values,
      });
    },
    validationSchema: yup.object().shape({
      maxVotes: yup.number().required('Please enter a number of max votes'),
      officeName: yup.string().required('Please enter an office name'),
    }),
    validateOnChange: false,
    isInitialValid: false,
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add office
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle className="mb-0">New office</DialogTitle>
          <DialogDescription color="gray">
            Add an office to this election
          </DialogDescription>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <label className="text-sm font-medium">Position</label>
              <TextFieldRoot className="w-1/2">
                <TextFieldInput
                  placeholder="Vice President"
                  size="3"
                  {...getFieldProps('officeName')}
                />
              </TextFieldRoot>
              {errors.officeName && (
                <Text color="red" size="2" className="mt-0.5">
                  {errors.officeName}
                </Text>
              )}
            </div>

            <div className="w-full">
              <label className="text-sm font-medium">Max Votes</label>
              <TextFieldRoot className="w-1/2">
                <TextFieldInput
                  placeholder="Vice President"
                  size="3"
                  {...getFieldProps('maxVotes')}
                />
              </TextFieldRoot>
              {errors.maxVotes && (
                <Text color="red" size="2" className="mt-0.5">
                  {errors.maxVotes}
                </Text>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-end gap-2">
            <DialogClose>
              <Button>Cancel</Button>
            </DialogClose>
            <Button
              color="iris"
              variant="classic"
              disabled={!isValid}
              onClick={submitForm}
              loading={isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
