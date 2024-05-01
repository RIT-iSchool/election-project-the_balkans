import { useCreateInitiativeOption } from '@/hooks/mutations/use-create-initiative-option';
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

type NewOptionProps = {
  electionId: string;
  initiativeId: string;
  refetch: () => void;
};

const initialValues = {
  title: '',
};

export const NewOption = ({
  electionId,
  initiativeId,
  refetch,
}: NewOptionProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createInitiativeOption, isLoading } =
    useCreateInitiativeOption({
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });

  const { getFieldProps, submitForm, errors, isValid } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      await createInitiativeOption({
        ...values,
        initiativeId,
        electionId,
      });
      actions.resetForm();
    },
    validationSchema: yup.object().shape({
      title: yup.string().required('Please enter a title'),
    }),
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add option
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            New option
          </DialogTitle>
          <DialogDescription color="gray">
            Add an option to this initiative
          </DialogDescription>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <label className="text-sm font-medium">Title</label>
              <TextFieldRoot>
                <TextFieldInput
                  placeholder="Yes, we should increase the budget"
                  size="3"
                  {...getFieldProps('title')}
                />
              </TextFieldRoot>
              {errors.title && (
                <Text color="red" size="2" className="mt-0.5">
                  {errors.title}
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
