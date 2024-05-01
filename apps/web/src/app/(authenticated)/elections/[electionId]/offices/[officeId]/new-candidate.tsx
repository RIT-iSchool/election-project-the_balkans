import { Document32, Plus16 } from '@frosted-ui/icons';
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
import FileUploader from '@/components/shared/file-uploader';
import { useCreateElectionCandidate } from '@/hooks/mutations/use-create-election-candidate';
import { cn } from '@/lib/cn';

type NewCandidateProps = {
  electionId: string;
  officeId: string;
  refetch: () => void;
};

const initialValues = {
  name: '',
  description: '',
  photoURL: '',
};

export const NewCandidate = ({
  electionId,
  officeId,
  refetch,
}: NewCandidateProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createElectionCandidate, isLoading } =
    useCreateElectionCandidate({
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });

  const { getFieldProps, submitForm, errors, isValid, values, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values, actions) => {
        await createElectionCandidate({
          ...values,
          electionId,
          officeId,
        });
        actions.resetForm();
      },
      validationSchema: yup.object().shape({
        name: yup.string().required('Please enter a name'),
        description: yup.string().required('Please enter a description'),
        photoURL: yup.string().required('Please upload a picture'),
      }),
    });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button color="gray" variant="classic">
          <Plus16 />
          Add candidate
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col">
          <DialogTitle weight="medium" className="mb-0">
            New candidate
          </DialogTitle>
          <DialogDescription color="gray">
            Create a new candidate for this election
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

              <div>
                <div className="flex flex-1 flex-col">
                  <label className="text-sm font-medium">Photo</label>
                </div>
                <div
                  className={cn(
                    'bg-gray-a3 text-gray-8 border-gray-a5 hover:bg-gray-a4 flex size-20 items-center justify-center rounded border',
                    {
                      'border-red-a8 bg-red-a3': errors.photoURL,
                    },
                  )}
                >
                  {!values.photoURL && (
                    <FileUploader
                      type="candidate"
                      onUploadComplete={(fileName) =>
                        setFieldValue('photoURL', fileName)
                      }
                    >
                      <Document32 />
                    </FileUploader>
                  )}
                  {values.photoURL && (
                    <img
                      src={`/ajax/uploads/candidate/${values.photoURL}`}
                      className="size-full object-cover"
                    />
                  )}
                </div>
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
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
