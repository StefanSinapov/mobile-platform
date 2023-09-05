import type { TextProps } from '@shopify/restyle';
import { createRestyleComponent, createRestyleFunction, createText } from '@shopify/restyle';

import type { FontWeight, Theme } from '../theme';

const fontWeightFunction = createRestyleFunction({
  property: 'fontWeight',
  transform: ({ theme, value }: { theme: Theme; value: FontWeight }) => {
    return theme.typography.fontWeight[value];
  },
});

const RestyleText = createText<Theme>();
type Props = Omit<TextProps<Theme>, 'fontWeight'> & {
  children: React.ReactNode;
  fontWeight?: FontWeight;
};

const Text = createRestyleComponent<Props, Theme>([fontWeightFunction], RestyleText);

export default Text;
