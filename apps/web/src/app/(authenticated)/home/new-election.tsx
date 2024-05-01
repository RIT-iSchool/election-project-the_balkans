import FileUploader from '@/components/shared/file-uploader';
import { useCreateElection } from '@/hooks/mutations/use-create-election';
import { Document32, Plus16 } from '@frosted-ui/icons';
import { useFormik } from 'formik';
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTrigger,
  Flex,
  Text,
  TextFieldInput,
  TextFieldRoot,
  DateField,
  DialogClose,
} from 'frosted-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

const initialValues = {
  name: '',
  startDate: new Date(),
  endDate: new Date(),
};

export const NewElection = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState('');

  const { mutateAsync: createElection, isLoading } = useCreateElection({
    onSuccess: (data) => {
      const electionId = (data as { id: string }).id;

      router.push(`/elections/${electionId}`);
    },
  });

  const { getFieldProps, submitForm, errors, isValid } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      await createElection({
        ...values,
        startDate: values.startDate.toString(),
        endDate: values.endDate.toString(),
        photoUrl: fileName,
      });
      actions.resetForm();
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Please enter a title'),
      startDate: yup.date().required('Please enter a start date'),
      endDate: yup.date().required('Please enter an end date'),
    }),
    validateOnChange: false,
    isInitialValid: false,
  });

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button size="3" variant="classic" color="iris">
          New election <Plus16 />
        </Button>
      </DialogTrigger>
      <DialogContent size="3" className="max-w-[500px]">
        <Flex direction="column">
          <Text weight="bold" size="5">
            New Election
          </Text>
          <DialogDescription>
            <Text color="gray">Create a new election for your society</Text>
          </DialogDescription>
        </Flex>

        <div className="space-y-3">
          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-medium">Name</label>
              <TextFieldRoot>
                <TextFieldInput
                  placeholder="2016 Election"
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
              <div className="bg-gray-a3 text-gray-8 border-gray-a5 hover:bg-gray-a4 flex size-20 items-center justify-center rounded border">
                {!fileName && (
                  <FileUploader type="election" onUploadComplete={setFileName}>
                    <Document32 />
                  </FileUploader>
                )}
                {fileName && (
                  <img
                    src={`/ajax/uploads/election/${fileName}`}
                    className="size-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex w-1/2 flex-col">
              <label className="text-sm font-medium">Start date</label>
              <DateField />
            </div>
            <div className="flex w-1/2 flex-col">
              <label className="text-sm font-medium">End date</label>
              <DateField />
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
