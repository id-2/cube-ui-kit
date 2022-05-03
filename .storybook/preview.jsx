import isChromatic from 'chromatic/isChromatic';
import { config } from 'react-transition-group';
import { DocsContainer } from '@storybook/addon-docs';
import { Root } from '../src';

if (isChromatic()) {
  // disabling transitions
  config.disabled = true;
}

export const parameters = {
  docs: {
    container: ({ children, context }) => (
      <DocsContainer context={context}>
        <Root>{children}</Root>
      </DocsContainer>
    ),
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <Root>
      <Story />
    </Root>
  ),
];
