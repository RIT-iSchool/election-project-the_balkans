import { useUpdateElectionOffice } from '@/hooks/mutations/use-update-election-office';
import { useBallot } from '@/hooks/use-ballot';
import { ElectionOffice } from '@/hooks/use-election-office';
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
import * as yup from 'yup';

type EditOfficeProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  office: ElectionOffice;
};

export const EditOffice = ({ open, setOpen, office }: EditOfficeProps) => {
  const { mutate: refetch } = useBallot({
    electionId: office.electionId.toString(),
  });

  const { mutateAsync: updateElectionOffice, isLoading } =
    useUpdateElectionOffice({
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });

  const initialValues = {
    maxVotes: office.maxVotes,
    officeName: office.officeName,
  };

  const { getFieldProps, submitForm, errors, isValid, dirty } = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      await updateElectionOffice({
        ...values,
        officeId: office.id,
        electionId: office.electionId,
        maxVotes: +values.maxVotes,
      });
      actions.resetForm();
    },
    validationSchema: yup.object().shape({
      maxVotes: yup.number().required('Please enter a number of max votes'),
      officeName: yup.string().required('Please enter an office name'),
    }),
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            Edit office
          </DialogTitle>
          <DialogDescription color="gray">
            Edit an existing office
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
