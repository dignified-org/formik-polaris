import React, { ReactNode, useMemo, useState } from 'react';
import { FormikValues, FormikProvider, Form, FormikContextType } from 'formik';
import {
  Layout,
  PageActions,
  ContextualSaveBar,
  ContextualSaveBarProps,
  PageActionsProps,
  Loading,
  ComplexAction,
  Modal,
} from '@shopify/polaris';

export type ContextualSaveBarOptions = Omit<
  ContextualSaveBarProps,
  'saveAction' | 'discardAction'
> & {
  /** Force the ContextualSaveBar to show or hide */
  open?: boolean;
};

export type DiscardAction = ContextualSaveBarProps['discardAction'] & {
  /** When discard is pressed on a new resource */
  onBack?: () => void;
};

export type DeleteAction = ComplexAction & {
  /** Modal title */
  confirmationModalTitle: ReactNode;
  /** Modal message */
  confirmationModalMessage: ReactNode;
};

export interface PageFormProps<Values extends FormikValues = FormikValues> {
  /**
   * A formik instance, likely created with `useFormik`
   */
  formik: FormikContextType<Values>;

  /**
   * Component tree to render into the main body of the form
   */
  children: ReactNode;

  /**
   * If the internal layout is sectioned
   */
  sectioned?: boolean;

  /**
   * If the form is being to edit an existing resource
   *
   * When editing existing resource, modifies behavior of discard action and enables deletion
   */
  existingResource?: boolean;

  /**
   * Override the default ContextualSaveBar
   */
  contextualSaveBar?: ContextualSaveBarOptions;

  /**
   * Override default save action in ContextualSaveBar and page actions
   */
  saveAction?: ContextualSaveBarProps['saveAction'];

  /**
   * Override default discard action in ContextualSaveBar
   */
  discardAction?: DiscardAction;

  /**
   * Adds a destructive button and confirmation to the page
   */
  deleteAction?: DeleteAction;

  /**
   * Pass through a secondary page action to the form
   */
  secondaryPageActions?: PageActionsProps['secondaryActions'];
}

export function PageForm<Values extends FormikValues = FormikValues>(
  props: PageFormProps<Values>,
) {
  const {
    children,
    formik,
    existingResource = false,
    sectioned = false,
    contextualSaveBar = {},
    saveAction = {},
    discardAction = {},
    deleteAction,
    secondaryPageActions = [],
  } = props;

  const handleSubmit = () => {
    formik.submitForm();
  };

  const handleDiscard = () => {
    if (existingResource) {
      formik.resetForm();
    } else if (discardAction.onBack) {
      discardAction.onBack();
    }
  };

  const polarisSaveAction: ContextualSaveBarProps['saveAction'] = {
    content: 'Save',
    disabled: !formik.dirty,
    loading: formik.isSubmitting,
    onAction: handleSubmit,
    ...saveAction,
  };

  const polarisDiscardAction: ContextualSaveBarProps['discardAction'] = {
    content: 'Discard',
    disabled: (!formik.dirty || formik.isSubmitting) && existingResource,
    onAction: handleDiscard,
    discardConfirmationModal: formik.dirty,
    ...discardAction,
  };

  const loading = formik.isSubmitting;

  const contextualSaveBarMarkup = useMemo(() => {
    const shouldBeHidden =
      (existingResource && !formik.dirty && !formik.isSubmitting) ||
      contextualSaveBar.open === false;
    if (contextualSaveBar.open !== true && shouldBeHidden) {
      return null;
    }

    return (
      <ContextualSaveBar
        {...contextualSaveBar}
        saveAction={polarisSaveAction}
        discardAction={polarisDiscardAction}
      />
    );
  }, [
    contextualSaveBar,
    existingResource,
    formik.dirty,
    formik.isSubmitting,
    polarisDiscardAction,
    polarisSaveAction,
  ]);

  const [
    deleteConfirmationModalOpen,
    setDeleteConfirmationModalOpen,
  ] = useState(false);
  const handleRequestDelete = () => {
    setDeleteConfirmationModalOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const secondaryActions = useMemo(() => {
    if (!deleteAction || !existingResource) {
      return secondaryPageActions;
    }

    const polarisDeleteAction: ComplexAction = {
      content: 'Delete',
      destructive: true,
      ...deleteAction,
      onAction: handleRequestDelete,
    };

    return [polarisDeleteAction, ...secondaryPageActions];
  }, [deleteAction, existingResource, secondaryPageActions]);

  const deleteConfirmationModalMarkup = useMemo(() => {
    if (!deleteAction) {
      return null;
    }

    const {
      content,
      confirmationModalTitle,
      confirmationModalMessage,
    } = deleteAction;

    const deleting = deleteAction.loading ?? false;

    return (
      <Modal
        open={deleteConfirmationModalOpen}
        sectioned
        title={confirmationModalTitle}
        primaryAction={{
          content: content ?? 'Delete',
          destructive: true,
          disabled: deleting,
          loading: deleting,
          onAction: deleteAction.onAction,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleCancelDelete,
            disabled: deleting,
          },
        ]}
        onClose={handleCancelDelete}
      >
        {confirmationModalMessage}
      </Modal>
    );
  }, [deleteAction, deleteConfirmationModalOpen]);

  return (
    <FormikProvider value={formik}>
      <Form>
        {loading && <Loading />}
        {contextualSaveBarMarkup}
        {deleteConfirmationModalMarkup}
        <Layout>
          {sectioned ? (
            <Layout.Section key="children-section">{children}</Layout.Section>
          ) : (
            children
          )}
          <Layout.Section key="page-actions-section">
            <PageActions
              primaryAction={polarisSaveAction}
              secondaryActions={secondaryActions}
            />
          </Layout.Section>
        </Layout>
      </Form>
    </FormikProvider>
  );
}

PageForm.Section = Layout.Section;
PageForm.AnnotatedSection = Layout.AnnotatedSection;