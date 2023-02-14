import { forwardRef, useRef } from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useSearchField } from '@react-aria/searchfield';

import {
  CubeTextInputBaseProps,
  TextInputBase,
} from '../TextInput/TextInputBase';
import { useProviderProps } from '../../../provider';
import { Button } from '../../actions';
import { ariaToCubeButtonProps } from '../../../utils/react/mapProps';
import {
  castNullableStringValue,
  WithNullableValue,
} from '../../../utils/react/nullableValue';
import { tasty } from '../../../tasty';

export interface CubeSearchInputProps extends CubeTextInputBaseProps {
  /** Whether the search input is clearable using ESC keyboard button or clear button inside the input */
  isClearable?: boolean;
}

const ClearButton = tasty(Button, {
  icon: <CloseOutlined />,
  styles: {
    radius: 'right (1r - 1bw)',
    width: '4x',
    height: 'auto',
    placeSelf: 'stretch',
  },
});

export const SearchInput = forwardRef(function SearchInput(
  props: WithNullableValue<CubeSearchInputProps>,
  ref,
) {
  props = castNullableStringValue(props);
  props = useProviderProps(props);

  let { isClearable, validationState } = props;

  let inputRef = useRef(null);

  let state = useSearchFieldState(props);
  let { inputProps, clearButtonProps } = useSearchField(props, state, inputRef);

  return (
    <TextInputBase
      ref={ref}
      inputProps={inputProps}
      inputRef={inputRef}
      type="search"
      icon={<SearchOutlined />}
      suffixPosition="after"
      suffix={
        isClearable &&
        state.value !== '' &&
        !props.isReadOnly && (
          <ClearButton
            type={validationState === 'invalid' ? 'clear' : 'neutral'}
            theme={validationState === 'invalid' ? 'danger' : undefined}
            {...ariaToCubeButtonProps(clearButtonProps)}
          />
        )
      }
      {...props}
    />
  );
});
