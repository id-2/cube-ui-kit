import { forwardRef } from 'react';
import { useDOMRef } from '@react-spectrum/utils';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { useProviderProps } from '../../../provider';
import { FormContext, useFieldProps, useFormProps } from '../Form';
import {
  BaseProps,
  BLOCK_STYLES,
  extractStyles,
  OUTER_STYLES,
  Styles,
  tasty,
} from '../../../tasty';
import { FieldBaseProps } from '../../../shared';
import {
  castNullableStringValue,
  WithNullableValue,
} from '../../../utils/react/nullableValue';
import { mergeProps } from '../../../utils/react';
import { wrapWithField } from '../wrapper';

import { RadioContext } from './context';

import type { AriaRadioGroupProps } from '@react-types/radio';

export interface CubeRadioGroupProps
  extends BaseProps,
    AriaRadioGroupProps,
    FieldBaseProps {
  groupStyles?: Styles;
  isSolid?: boolean;
}

const RadioGroupElement = tasty({
  qa: 'RadioGroup',
  styles: {
    display: 'flex',
    placeItems: 'start',
    placeContent: 'start',
    flow: {
      '': 'column',
      horizontal: 'row wrap',
      'horizontal & solid': 'row',
    },
    gap: {
      '': '1x',
      solid: 0,
    },
    whiteSpace: 'nowrap',
  },
});

function RadioGroup(props: WithNullableValue<CubeRadioGroupProps>, ref) {
  props = castNullableStringValue(props);
  props = useProviderProps(props);
  props = useFormProps(props);
  props = useFieldProps(props, { defaultValidationTrigger: 'onChange' });

  let {
    isDisabled,
    isRequired,
    labelPosition = 'top',
    validationState,
    children,
    orientation,
    styles,
    groupStyles,
    insideForm,
    labelProps: baseLabelProps,
    isSolid,
    ...otherProps
  } = props;
  let domRef = useDOMRef(ref);

  styles = extractStyles(otherProps, OUTER_STYLES, styles);
  groupStyles = extractStyles(otherProps, BLOCK_STYLES, groupStyles);

  let state = useRadioGroupState(props);

  if (orientation == null) {
    orientation = isSolid ? 'horizontal' : 'vertical';
  }

  let { radioGroupProps: fieldProps, labelProps } = useRadioGroup(props, state);

  let radioGroup = (
    <RadioGroupElement
      styles={groupStyles}
      mods={{
        horizontal: orientation === 'horizontal',
        'inside-form': insideForm,
        'side-label': labelPosition === 'side',
        solid: !!isSolid,
      }}
    >
      <FormContext.Provider
        value={{
          isRequired,
          validationState,
          isDisabled,
        }}
      >
        <RadioContext.Provider value={{ state, name: props.name, isSolid }}>
          {children}
        </RadioContext.Provider>
      </FormContext.Provider>
    </RadioGroupElement>
  );

  return wrapWithField(radioGroup, domRef, {
    ...props,
    children: null,
    fieldProps,
    labelProps: mergeProps(baseLabelProps, labelProps),
    styles,
  });
}

/**
 * Radio groups allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _RadioGroup = forwardRef(RadioGroup);

(_RadioGroup as any).cubeInputType = 'RadioGroup';

export { _RadioGroup as RadioGroup };
