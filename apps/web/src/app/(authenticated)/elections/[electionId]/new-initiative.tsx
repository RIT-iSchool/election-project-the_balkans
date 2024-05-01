import { useCreateElectionInitiative } from '@/hooks/mutations/use-create-election-initiative';
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
  TextArea,
} from 'frosted-ui';
import { useState } from 'react';
import * as yup from 'yup';

type NewInitiativeProps = {
  electionId: string;
  refetch: () => void;
};

const initialValues = {
  initiativeName: '',
  description: '',
};

export const NewInitiative = ({ electionId, refetch }: NewInitiativeProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createElectionInitiative, isLoading } =
    useCreateElectionInitiative({
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });

  const { getFieldProps, submitForm, errors, isValid } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      await createElectionInitiative({
        ...values,
        electionId: parseInt(electionId, 10),
      });
      actions.resetForm();
    },
    validationSchema: yup.object().shape({
      initiativeName: yup.string().required('Please enter a name'),
      description: yup.string().required('Please enter a description'),
    }),
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add initiative
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            New initiative
          </DialogTitle>
          <DialogDescription color="gray">
            Add an initiative to this election
          </DialogDescription>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <label className="text-sm font-medium">Name</label>
              <TextFieldRoot>
                <TextFieldInput
                  placeholder="Should we increase the budget?"
                  size="3"
                  {...getFieldProps('initiativeName')}
                />
              </TextFieldRoot>
              {errors.initiativeName && (
                <Text color="red" size="2" className="mt-0.5">
                  {errors.initiativeName}
                </Text>
              )}
            </div>

            <div className="w-full">
              <label className="text-sm font-medium">Description</label>
              <TextArea
                placeholder="Write something about your initiative here..."
                size="3"
                rows={5}
                {...getFieldProps('description')}
              />
              {errors.description && (
                <Text color="red" size="2" className="mt-0.5">
                  {errors.description}
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
