import React, { useCallback } from 'react';
import {
  TextField as PolarisTextField,
  TextFieldProps as NativePolarisTextFieldProps,
} from '@shopify/polaris';
import { useField, FieldValidator } from 'formik';

/**
 * Polaris TextFieldProps that get passed directly
 * to the Polaris TextField component. Some props
 * have been omitted such as `value` and `onChange`
 */
export interface PolarisTextFieldProps {
  /** Text to display before value */
  prefix?: NativePolarisTextFieldProps['prefix'];
  /** Text to display after value */
  suffix?: NativePolarisTextFieldProps['suffix'];
  /** Hint text to display */
  placeholder?: NativePolarisTextFieldProps['placeholder'];
  /** Additional hint text to display */
  helpText?: NativePolarisTextFieldProps['helpText'];
  /** Label for the input */
  label: NativePolarisTextFieldProps['label'];
  /** Adds an action to the label */
  labelAction?: NativePolarisTextFieldProps['labelAction'];
  /** Visually hide the label */
  labelHidden?: NativePolarisTextFieldProps['labelHidden'];
  /** Disable the input */
  disabled?: NativePolarisTextFieldProps['disabled'];
  /** Show a clear text button in the input */
  clearButton?: NativePolarisTextFieldProps['clearButton'];
  /** Disable editing of the input */
  readOnly?: NativePolarisTextFieldProps['readOnly'];
  /** Automatically focus the input */
  autoFocus?: NativePolarisTextFieldProps['autoFocus'];
  /** Force the focus state on the input */
  focused?: NativePolarisTextFieldProps['focused'];
  /** Allow for multiple lines of input */
  multiline?: NativePolarisTextFieldProps['multiline'];
  /** Error to display beneath the label */
  error?: NativePolarisTextFieldProps['error'];
  /** An element connected to the right of the input */
  connectedRight?: NativePolarisTextFieldProps['connectedRight'];
  /** An element connected to the left of the input */
  connectedLeft?: NativePolarisTextFieldProps['connectedLeft'];
  /** Determine type of input */
  type?: NativePolarisTextFieldProps['type'];
  /** ID for the input */
  id?: NativePolarisTextFieldProps['id'];
  /** Defines a specific role attribute for the input */
  role?: NativePolarisTextFieldProps['role'];
  /** Limit increment value for numeric and date-time inputs */
  step?: NativePolarisTextFieldProps['step'];
  /** Enable automatic completion by the browser */
  autoComplete?: NativePolarisTextFieldProps['autoComplete'];
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: NativePolarisTextFieldProps['max'];
  /** Maximum character length for an input */
  maxLength?: NativePolarisTextFieldProps['maxLength'];
  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  min?: NativePolarisTextFieldProps['min'];
  /** Minimum character length for an input */
  minLength?: NativePolarisTextFieldProps['minLength'];
  /** A regular expression to check the value against */
  pattern?: NativePolarisTextFieldProps['pattern'];
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: NativePolarisTextFieldProps['inputMode'];
  /** Indicate whether value should have spelling checked */
  spellCheck?: NativePolarisTextFieldProps['spellCheck'];
  /** Indicates the id of a component owned by the input */
  ariaOwns?: NativePolarisTextFieldProps['ariaOwns'];
  /** Indicates whether or not a Popover is displayed */
  ariaExpanded?: NativePolarisTextFieldProps['ariaExpanded'];
  /** Indicates the id of a component controlled by the input */
  ariaControls?: NativePolarisTextFieldProps['ariaControls'];
  /** Indicates the id of a related component’s visually focused element to the input */
  ariaActiveDescendant?: NativePolarisTextFieldProps['ariaActiveDescendant'];
  /** Indicates what kind of user input completion suggestions are provided */
  ariaAutocomplete?: NativePolarisTextFieldProps['ariaAutocomplete'];
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: NativePolarisTextFieldProps['showCharacterCount'];
  /** Determines the alignment of the text in the input */
  align?: NativePolarisTextFieldProps['align'];
}

/**
 * TextField props including formik bindings
 */
export interface TextFieldProps extends PolarisTextFieldProps {
  /**
   * Formik field name
   */
  name: string;
  /**
   * Validate a single field value independently
   */
  validate?: FieldValidator;
  /**
   * Name of the input
   * Passed to Polaris TextField as `name`
   */
  inputName?: string;
};

export function TextField(props: TextFieldProps) {
  const { name, validate, inputName, ...polarisProps } = props;

  const [input, , helper] = useField<string>({ name, validate });

  const handleFocus = useCallback(() => {
    helper.setError('');
  }, []);

  const handleBlur = useCallback(() => {
    input.onBlur({ target: { name } });
  }, [name]);

  const handleChange = useCallback((value: string) => {
    helper.setValue(value);
  }, []);

  return (
    <PolarisTextField
      {...polarisProps}
      value={input.value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}