import React, { forwardRef } from 'react';
import { Base } from '../../components/Base';
import {
  BLOCK_STYLES,
  COLOR_STYLES,
  DIMENSION_STYLES,
  FLOW_STYLES,
  POSITION_STYLES,
} from '../../styles/list';
import { extractStyles } from '../../utils/styles.js';

const DEFAULT_STYLES = {
  display: 'block',
  fill: '#dark.10',
  height: '2x',
  opacity: '.35',
};

const STYLE_LIST = [
  ...BLOCK_STYLES,
  ...COLOR_STYLES,
  ...DIMENSION_STYLES,
  ...POSITION_STYLES,
  ...FLOW_STYLES,
];

const CSS = `
  --placeholder-animation-time: 1.4s;
  --placeholder-animation-size: calc((180rem + 100vw) / 3);  
  background-image: linear-gradient(135deg, rgba(var(--dark-color-rgb), .15) 0%, rgba(var(--dark-color-rgb), .15) 5%, rgba(var(--dark-color-rgb), 0) 35%, rgba(var(--dark-03-color-rgb), .2) 50%, rgba(var(--dark-03-color-rgb), 0) 65%, rgba(var(--dark-color-rgb), .15) 95%, rgba(var(--dark-color-rgb), .15) 100%);
  background-repeat: repeat;
  background-size: var(--placeholder-animation-size);
  animation: placeholder-animation var(--placeholder-animation-time) linear infinite;

  @keyframes placeholder-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: var(--placeholder-animation-size) 0;
    }
  }
`;

export const Placeholder = forwardRef(
  ({ size = '2x', circle, ...props }, ref) => {
    const { styles, otherProps } = extractStyles(props, STYLE_LIST, {
      ...DEFAULT_STYLES,
      height: size,
      width: circle ? size : false,
      radius: circle ? '9999rem' : '1r',
    });

    return (
      <Base role="region" css={CSS} {...otherProps} styles={styles} ref={ref} />
    );
  },
);
