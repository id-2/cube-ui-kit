import { forwardRef } from 'react';
import styled from 'styled-components';
import { useButton } from '@react-aria/button';
import { useFocusableRef } from '@react-spectrum/utils';
import { FocusableRef } from '@react-types/shared';

import { CubeButtonProps } from '../../actions';
import { cubeToAriaButtonProps } from '../../../utils/react/mapProps';

const Button = styled.button((props) => {
  return `
    appearance: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    width: 159px;
    height: 26px;
    border: none;
    background: none;
    cursor: ${props.isLink ? 'pointer' : 'default'};
    outline: none;
  `;
});

function CloudLogo(
  props: CubeButtonProps,
  ref: FocusableRef<HTMLButtonElement>,
) {
  let domRef = useFocusableRef(ref);
  let { buttonProps } = useButton(cubeToAriaButtonProps(props), domRef);

  return (
    <Button
      data-qa="HeaderCubeCloudLogo"
      {...buttonProps}
      ref={domRef}
      isLink={!!props.onPress}
      label="Logo"
    >
      <svg
        width="159"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.533 6.535L11.27 0v4.522l11.264 6.507V6.535z"
          fill="#FF6492"
          data-type="primary"
        />
        <path
          d="M22.533 11.029L19.154 13l-7.887-4.567-4.507 2.6-3.38-1.827 7.889-4.684 11.264 6.507z"
          fill="#141446"
          data-type="primary"
        />
        <path
          d="M6.76 11.033L3.38 9.206V13l3.38-1.967z"
          fill="#A14474"
          data-type="primary"
        />
        <path
          d="M0 19.465L11.267 13l11.266 6.465L11.267 26 0 19.465z"
          fill="#141446"
          data-type="primary"
        />
        <path
          d="M22.533 14.978L11.267 8.362V13l11.266 6.465v-4.487z"
          fill="#FF6492"
          data-type="primary"
        />
        <path
          d="M3.38 13V9.205l7.889-4.683V0L0 6.535v12.93L11.267 13V8.362L3.38 13z"
          fill="#7A77FF"
          data-type="primary"
        />
        <path
          d="M36.594 21.099c2.446 0 4.36-1.21 5.503-3.067l-1.967-1.534c-.878 1.21-1.967 1.991-3.509 1.991-2.392 0-4.093-1.856-4.093-4.305 0-2.394 1.7-4.278 4.093-4.278 1.568 0 2.658.807 3.509 2.018l1.967-1.56c-1.117-1.857-3.03-3.067-5.503-3.067-3.854 0-6.91 3.013-6.91 6.887 0 3.902 3.056 6.915 6.91 6.915zM50.224 21.099c3.19 0 5.662-2.26 5.662-5.838V7.593h-2.791v7.883c0 1.856-1.276 3.013-2.871 3.013-1.648 0-2.95-1.157-2.95-3.013V7.593h-2.765v7.668c0 3.578 2.472 5.838 5.715 5.838zM66.42 7.297c-1.807 0-3.376.7-4.36 1.91V.624h-2.79v20.18h2.605v-1.83c.983 1.345 2.658 2.125 4.572 2.125 3.694 0 6.38-2.96 6.38-6.888S70.14 7.297 66.42 7.297zm-.452 11.22c-1.94 0-3.934-1.292-3.934-4.306 0-2.986 1.967-4.332 3.934-4.332 2.233 0 3.987 1.75 3.987 4.305 0 2.556-1.727 4.332-3.987 4.332zM87.469 13.35c0-3.47-2.552-6.053-6.034-6.053-3.801 0-6.752 3.04-6.752 6.914 0 3.902 2.977 6.888 7.018 6.888 2.073 0 3.827-.807 5.21-2.125l-1.33-1.938c-1.09.969-2.286 1.56-3.8 1.56-2.234 0-3.882-1.29-4.254-3.47h9.729c.08-.35.213-1.05.213-1.776zm-6.14-3.659c1.78 0 3.296 1.157 3.349 3.229H77.58c.425-1.964 1.913-3.229 3.747-3.229zM101.014 21.099c2.445 0 4.359-1.21 5.502-3.067l-1.967-1.534c-.877 1.21-1.967 1.991-3.508 1.991-2.393 0-4.094-1.856-4.094-4.305 0-2.394 1.701-4.278 4.094-4.278 1.568 0 2.658.807 3.508 2.018l1.967-1.56c-1.116-1.857-3.03-3.067-5.502-3.067-3.854 0-6.911 3.013-6.911 6.887 0 3.902 3.057 6.915 6.911 6.915zM109.062 20.803h2.791V.624h-2.791v20.18zM121.417 21.099c3.881 0 6.938-3.067 6.938-6.915 0-3.847-3.057-6.887-6.938-6.887-3.854 0-6.884 3.013-6.884 6.887 0 3.848 3.03 6.915 6.884 6.915zm0-2.61c-2.312 0-4.04-1.83-4.04-4.278 0-2.475 1.728-4.332 4.067-4.332 2.286 0 4.04 1.857 4.04 4.332 0 2.422-1.754 4.278-4.067 4.278zM136.605 21.099c3.19 0 5.662-2.26 5.662-5.838V7.593h-2.791v7.883c0 1.856-1.276 3.013-2.871 3.013-1.648 0-2.95-1.157-2.95-3.013V7.593h-2.765v7.668c0 3.578 2.472 5.838 5.715 5.838zM155.566.624v8.583c-.984-1.21-2.552-1.91-4.36-1.91-3.694 0-6.379 2.986-6.379 6.914 0 3.928 2.658 6.888 6.379 6.888 1.941 0 3.615-.807 4.572-2.18v1.884h2.605V.624h-2.817zm-3.881 17.892c-2.286 0-4.014-1.776-4.014-4.332s1.754-4.305 4.014-4.305c1.94 0 3.934 1.346 3.934 4.332 0 3.014-1.994 4.305-3.934 4.305z"
          fill="#141446"
        />
      </svg>
    </Button>
  );
}

const _CloudLogo = forwardRef(CloudLogo);
export { _CloudLogo as CloudLogo };
