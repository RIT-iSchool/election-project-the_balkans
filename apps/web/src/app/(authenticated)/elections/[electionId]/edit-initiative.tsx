import { useUpdateElectionInitiative } from '@/hooks/mutations/use-update-election-initiative';
import { useBallot } from '@/hooks/use-ballot';
import { useElectionInitiative } from '@/hooks/use-election-initiative';
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
  TextArea,
} from 'frosted-ui';
import * as yup from 'yup';

type EditInitiativeProps = {
  electionId: number;
  initiativeId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditInitiative = ({
  electionId,
  initiativeId,
  open,
  setOpen,
}: EditInitiativeProps) => {
  const { mutate: refetch } = useBallot({ electionId: electionId.toString() });

  const { data: initiative } = useElectionInitiative({
    electionId,
    initiativeId,
  });

  const { mutateAsync: updateElectionInitiative, isLoading } =
    useUpdateElectionInitiative({
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });

  const initialValues = {
    initiativeName: initiative?.initiativeName || '',
    description: initiative?.description || '',
  };

  const { getFieldProps, submitForm, errors, isValid, dirty } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      await updateElectionInitiative({
        ...values,
        electionId,
        initiativeId,
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
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            Edit initiative
          </DialogTitle>
          <DialogDescription color="gray">
            Edit details for this initiative
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
