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
import { useUpdateElectionCandidate } from '@/hooks/mutations/use-update-election-candidate';
import { useElectionCandidate } from '@/hooks/use-election-candidate';

type EditCandidateProps = {
  electionId: number;
  officeId: number;
  candidateId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditCandidate = ({
  electionId,
  officeId,
  candidateId,
  open,
  setOpen,
}: EditCandidateProps) => {
  const { data: candidate } = useElectionCandidate({
    electionId,
    officeId,
    candidateId,
  });

  const { mutate: refetchCandidates } = useElectionCandidate({
    electionId,
    officeId,
    candidateId,
  });

  const initialValues = {
    name: candidate?.name || '',
    description: candidate?.description || '',
  };

  const { mutateAsync: updateElectionCandidate, isLoading } =
    useUpdateElectionCandidate({
      onSuccess: () => {
        refetchCandidates();
        setOpen(false);
      },
    });

  const { getFieldProps, submitForm, errors, isValid } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      await updateElectionCandidate({
        ...values,
        candidateId,
        electionId,
        officeId,
      });
      actions.resetForm();
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Please enter a name'),
      description: yup.string().required('Please enter a description'),
    }),
    enableReinitialize: true,
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            Edit candidate
          </DialogTitle>
          <DialogDescription color="gray">
            Update properties of this candidate
          </DialogDescription>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-6">
              <div className="flex flex-1 flex-col">
                <label className="text-sm font-medium">Name</label>
                <TextFieldRoot>
                  <TextFieldInput
                    placeholder="Vermin Supreme"
                    className="w-full"
                    size="3"
                    {...getFieldProps('name')}
                  />
                </TextFieldRoot>
                {errors.name && (
                  <Text color="red" size="2" className="mt-0.5">
                    {errors.name}
                  </Text>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium">Description</label>
              <TextArea
                placeholder="Write something about your candidate here..."
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
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
