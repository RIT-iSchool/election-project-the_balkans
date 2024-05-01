import { useUpdateInitiativeOption } from '@/hooks/mutations/use-update-initiative-option';
import { useBallot } from '@/hooks/use-ballot';
import { useInitiativeOption } from '@/hooks/use-initiative-option';
import { useInitiativeOptions } from '@/hooks/use-initiative-options';
import { useFormik } from 'formik';
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogClose,
  TextFieldRoot,
  TextFieldInput,
  Text,
} from 'frosted-ui';
import * as yup from 'yup';

type NewOptionProps = {
  electionId: number;
  initiativeId: number;
  optionId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditOption = ({
  electionId,
  initiativeId,
  optionId,
  open,
  setOpen,
}: NewOptionProps) => {
  const { mutate: refetch } = useInitiativeOptions({
    electionId,
    initiativeId,
  });
  const { data: option } = useInitiativeOption({
    electionId,
    initiativeId,
    optionId,
  });

  const { mutateAsync: updateInitiativeOption, isLoading } =
    useUpdateInitiativeOption({
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });

  const initialValues = {
    title: option?.title || '',
  };

  const { getFieldProps, submitForm, errors, isValid, dirty } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      await updateInitiativeOption({
        ...values,
        optionId,
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
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            Edit option
          </DialogTitle>
          <DialogDescription color="gray">
            Update details for this existing option
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
              disabled={!isValid || !dirty}
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
