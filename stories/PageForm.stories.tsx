import React, { useMemo } from 'react';
import { Meta, Story } from '@storybook/react';
import { useFormik } from 'formik';
import { AppProvider, Card, FormLayout, Frame, Page, TopBar } from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';

import { PageForm, PageFormProps, TextField } from '../src';

const meta: Meta = {
  title: 'PageForm',
  component: PageForm,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const ExistingResource: Story<PageFormProps> = args => {
  const formik = useFormik({
    initialValues: { title: 'T-Shirt' },
    onSubmit: () => {},
  });

  const topBar = useMemo(() => {
    return (
      <TopBar  />
    )
  }, []);

  return (
    <AppProvider i18n={en} theme={{
      logo: {
        width: 124,
        topBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        url: '#',
        accessibilityLabel: 'Jaded Pixel',
      },
    }}>
      <Frame topBar={topBar}>
        <Page title="T-Shirt">
          <PageForm 
            {...args}
            formik={formik}
            existingResource
            deleteAction={{
              confirmationModalTitle: 'Delete T-Shirt',
              confirmationModalMessage: 'Are you sure you want do delete T-Shirt? This action cannot be undone',
              onAction: () => { alert('Deleted') }
            }}
          >
            <PageForm.Section>
              <Card sectioned>
                <FormLayout>
                  <TextField name="title" label="Title" placeholder="T-Shirt" />
                  <TextField name="description" label="Description" multiline={6} />
                </FormLayout>
              </Card>
            </PageForm.Section>
            <PageForm.Section oneThird>
              <Card sectioned>
                <FormLayout>
                  todo
                </FormLayout>
              </Card>
            </PageForm.Section>
          </PageForm>
        </Page>
      </Frame>
    </AppProvider>
  );
};
