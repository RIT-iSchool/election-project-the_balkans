'use client';
import { Button, Card, Input, Text } from '@geist-ui/core';
import CardContent from '@geist-ui/core/esm/card/card-content';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();
      
      if (responseData.error) {
        actions.setErrors({
          password: 'Invalid account details.'
        })
        return;
      }

      Cookies.set('session', responseData.token);
      router.push('/home');
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Please enter a valid email').required('Please enter an email'),
      password: yup.string().required('Please enter a password')
    }),
    validateOnChange: false,
    validateOnBlur: false,
  })

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[300px]">
        <Card>
          <CardContent className="flex flex-col gap-2">
            <Text className="font-semibold text-xl m-0">Login</Text>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Email</label>
                <Input type="default" placeholder="elon@tesla.com" width="100%" crossOrigin  {...getFieldProps('email')}  />
                {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Password</label>
                <Input type="default" placeholder="hunter2" width="100%" crossOrigin {...getFieldProps('password')}  />
                {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
              </div>
            </div>

            <Button color="black" type="secondary" placeholder="" onClick={submitForm}>Login</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
