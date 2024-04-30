import {
  useCreateSocietyMember,
  type SocietyMemberData,
} from '@/hooks/mutations/use-create-society-member';
import { useCreateUser } from '@/hooks/mutations/use-create-user';
import { Plus16 } from '@frosted-ui/icons';
import { useFormik } from 'formik';
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from 'frosted-ui';
import { useState } from 'react';
import * as yup from 'yup';

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  societyId: '',
  role: 'member',
};

export const NewUser = () => {
  const societyId = parseInt(localStorage.getItem('society_id') || '');
  const [open, setOpen] = useState(false);

  const { mutateAsync: createUser } = useCreateUser({
    onSuccess: async () => {},
  });

  const { mutateAsync: createSocietyMember, isLoading } =
    useCreateSocietyMember({
      onSuccess: () => {
        setOpen(false);
      },
    });

  const { getFieldProps, submitForm, errors, isValid, values, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        console.log('before creating user:', values.role);

        const user = await createUser({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        if (!user) {
          return;
        }

        await createSocietyMember({
          societyId: societyId,
          userId: user.id,
          role: values.role as SocietyMemberData['role'],
        });
      },
      validationSchema: yup.object().shape({
        email: yup.string().required('Please enter a valid email'),
        password: yup.string().required('Please enter a password'),
        firstName: yup.string().required('Please enter first name'),
        lastName: yup.string().required('Please enter last name'),
        role: yup.string().required('Please pick Role'),
      }),
    });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="3" variant="classic" color="iris">
          <Plus16 />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogTitle>Add user</DialogTitle>
        <DialogDescription>
          <Text color="gray">Create a new user for a society</Text>
        </DialogDescription>
        <div className="flex flex-1 flex-col">
          <label className="text-sm font-medium">First Name</label>
          <TextFieldRoot>
            <TextFieldInput
              placeholder="Dean"
              className="w-full"
              size="3"
              {...getFieldProps('firstName')}
            />
          </TextFieldRoot>
          {errors.firstName && (
            <Text color="red" size="2" className="mt-0.5">
              {errors.firstName}
            </Text>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-sm font-medium">Last Name</label>
          <TextFieldRoot>
            <TextFieldInput
              placeholder="Ganskop"
              className="w-full"
              size="3"
              {...getFieldProps('lastName')}
            />
          </TextFieldRoot>
          {errors.lastName && (
            <Text color="red" size="2" className="mt-0.5">
              {errors.lastName}
            </Text>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-sm font-medium">Email</label>
          <TextFieldRoot>
            <TextFieldInput
              placeholder="dean@ganskop@rit.edu"
              className="w-full"
              size="3"
              {...getFieldProps('email')}
            />
          </TextFieldRoot>
          {errors.email && (
            <Text color="red" size="2" className="mt-0.5">
              {errors.email}
            </Text>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-sm font-medium">Password</label>
          <TextFieldRoot>
            <TextFieldInput
              placeholder="deanbestprofessor"
              className="w-full"
              type="password"
              size="3"
              {...getFieldProps('password')}
            />
          </TextFieldRoot>
          {errors.password && (
            <Text color="red" size="2" className="mt-0.5">
              {errors.password}
            </Text>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Select Role</label>
          <select
            className="w-full rounded-md border border-gray-300 p-3"
            style={{ borderColor: 'rgba(209, 213, 219, 0.5)' }}
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
            loading={isLoading}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
