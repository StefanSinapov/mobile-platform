// import type {
//   ColorProps,
//   OpacityProps,
//   SpacingProps,
//   TextShadowProps,
//   TypographyProps,
//   VariantProps,
//   VisibleProps,
// } from '@shopify/restyle';
import { createBox, createText } from '@shopify/restyle';
// import type { ComponentProps } from 'react';

import type { Theme } from '../theme';

// type RestyleProps = ColorProps<Theme> &
//   OpacityProps<Theme> &
//   VisibleProps<Theme> &
//   TypographyProps<Theme> &
//   SpacingProps<Theme> &
//   TextShadowProps<Theme> &
//   VariantProps<Theme, 'textVariants'>;

// type Props = ComponentProps<typeof Text> & RestyleProps;

export const Text = createText<Theme>();

export default Text;
