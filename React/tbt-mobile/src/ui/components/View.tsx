import type { BoxProps, VariantProps } from '@shopify/restyle';
import { createBox, createRestyleComponent, createVariant } from '@shopify/restyle';

import type { Theme } from '../theme';

const RestyleView = createBox<Theme>();

type Props = BoxProps<Theme> &
  VariantProps<Theme, 'shadowVariants'> & { children?: React.ReactNode };

const shadowVariants = createVariant({ themeKey: 'shadowVariants' });

const View = createRestyleComponent<Props, Theme>([shadowVariants as any], RestyleView);

export default View;
