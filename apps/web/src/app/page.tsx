'use client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { Button, Card, Text, TextFieldRoot, TextFieldInput } from 'frosted-ui';

const initialValues = {
  email: '',
  password: '',
};

export default function Home() {
  const router = useRouter();

  const { getFieldProps, submitForm, errors } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      const response = await fetch('/ajax/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status > 299) {
        actions.setErrors({
          password: 'Invalid account details.',
        });
        return;
      }

      router.push('/home');
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Please enter a valid email')
        .required('Please enter an email'),
      password: yup.string().required('Please enter a password'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[300px]">
        <Card size="2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Text size="5" className="m-0 font-semibold">
                Welcome back
              </Text>
              <Text color="gray">Log in with email and password</Text>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Email</label>
                <TextFieldRoot>
                  <TextFieldInput
                    placeholder="elon@tesla.com"
                    className="w-full"
                    {...getFieldProps('email')}
                  />
                </TextFieldRoot>
                {errors.email && (
                  <div className="text-sm text-red-500">{errors.email}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Password</label>
                <TextFieldRoot>
                  <TextFieldInput
                    placeholder="hunter2"
                    className="w-full"
                    type="password"
                    {...getFieldProps('password')}
                  />
                </TextFieldRoot>
                {errors.password && (
                  <div className="text-sm text-red-500">{errors.password}</div>
                )}
              </div>
            </div>

            <Button variant="surface" onClick={submitForm}>
              Log in
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
