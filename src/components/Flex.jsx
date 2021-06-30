import React, { forwardRef } from 'react';
import { Base } from './Base';
import {
  BASE_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
  DIMENSION_STYLES,
  FLOW_STYLES,
  POSITION_STYLES,
} from '../styles/list';
import { extractStyles } from '../utils/styles.js';
import { filterBaseProps } from '../utils/filterBaseProps';

const DEFAULT_STYLES = {
  display: 'flex',
  flow: 'row',
  gap: '@(column-gap, 0)',
};

const STYLE_PROPS = [
  ...BASE_STYLES,
  ...BLOCK_STYLES,
  ...COLOR_STYLES,
  ...DIMENSION_STYLES,
  ...FLOW_STYLES,
  ...POSITION_STYLES,
];

export const Flex = forwardRef((props, ref) => {
  const styles = extractStyles(props, STYLE_PROPS, DEFAULT_STYLES);

  return (
    <Base
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  );
});
