import * as React from 'react';
import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';
import { ThemeProvider } from '@/ui';

it(`renders correctly`, () => {
  // TODO: Fix this
  const tree = renderer
    .create(
      <ThemeProvider>
        <MonoText>Snapshot test!</MonoText>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
