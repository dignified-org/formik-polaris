import React, { ReactNode } from 'react';
import { Meta, Story } from '@storybook/react';
import { TextField, TextFieldProps } from '../src';
import { Form, FormikProvider, useFormik } from 'formik';
import { AppProvider, Card, FormLayout } from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';

interface BasicFormProps {
  children: ReactNode;
}

function BasicForm({ children }: BasicFormProps) {
  const formik = useFormik({
    initialValues: { value: '' },
    onSubmit: () => {},
  });

  return (
    <AppProvider i18n={en}>
      <FormikProvider value={formik}>
        <Form>
          <Card sectioned>
            <FormLayout>
              {children}
            </FormLayout>
          </Card>
        </Form>
      </FormikProvider>
    </AppProvider>
  );
}

const meta: Meta = {
  title: 'TextField',
  component: TextField,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Simple: Story<TextFieldProps> = args => (<BasicForm><TextField {...args} /></BasicForm>);
Simple.args = {
  name: 'value',
  label: 'Text field',
  placeholder: 'Type here',
};
