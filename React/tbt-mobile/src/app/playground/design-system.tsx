import { Stack } from 'expo-router';
import type { ReactNode } from 'react';
import React from 'react';
import { ScrollView } from 'react-native';

import type { ShadowVariants, TextVariants, Theme } from '@/ui';
import { Text, View, getKeys, useTheme } from '@/ui';

export default function PlaygroundScreen() {
  const { theme } = useTheme();

  const colors = getKeys(theme.colors) as (keyof Theme['colors'])[];
  const colorComponents = colors.map(color => <ColorBlock key={color} color={color} />);

  const textVariants = getKeys(theme.textVariants) as TextVariants[];
  const fontWeights = getKeys(theme.typography.fontWeight);

  const textVariantComponents = [];

  for (const textVariant of textVariants.slice(1)) {
    for (const fontWeight of fontWeights) {
      textVariantComponents.push(
        <TypographyBlock key={textVariant + fontWeight}>
          <Text variant={textVariant} fontWeight={fontWeight}>
            {textVariant} {fontWeight}
          </Text>
        </TypographyBlock>,
      );
    }
  }

  const radii = getKeys(theme.borderRadii);
  const radiiComponents = radii.map(radius => <RadiiBlock key={radius} radius={radius} />);

  const spacing = getKeys(theme.spacing);
  const spacingComponents = spacing.map(space => (
    <SpacingBlock key={space} spaceValue={theme.spacing[space]} space={space} />
  ));

  const shadows = getKeys(theme.shadowVariants) as ShadowVariants[];

  const shadowComponents = shadows
    .slice(1)
    .map(shadow => <ShadowBlock key={shadow} shadow={shadow} />);

  return (
    <ScrollView>
      <View padding="m">
        <Stack.Screen options={{ title: 'Design system', headerBackTitleVisible: false }} />
        <Title title="Colors" />
        <View flexDirection="row" flexWrap="wrap" paddingHorizontal="s" marginBottom="s">
          {colorComponents}
        </View>
        <Title title="Typography" />
        {textVariantComponents}
        <Title title="Radii" />
        <View flexDirection="row" flexWrap="wrap" paddingHorizontal="s">
          {radiiComponents}
        </View>
        <Title title="Shadows" />
        <View flexDirection="row" flexWrap="wrap" paddingHorizontal="s">
          {shadowComponents}
        </View>
        <Title title="Spacing" />
        <View marginLeft="s">{spacingComponents}</View>
      </View>
    </ScrollView>
  );
}

function ColorBlock({ color }: { color: keyof Theme['colors'] }) {
  return (
    <View flexDirection="column" margin="s" alignItems="center">
      <View backgroundColor={color} width={100} height={100} />
      <Text variant="l">{color}</Text>
    </View>
  );
}

function Title({ title }: { title: string }) {
  return (
    <Text variant="xl" fontWeight="semiBold">
      {title}
    </Text>
  );
}

function TypographyBlock({ children }: { children: ReactNode }) {
  return (
    <View padding="s" borderRadius="10" borderWidth={1} borderColor="border" margin="xs">
      {children}
    </View>
  );
}

function RadiiBlock({ radius }: { radius: keyof Theme['borderRadii'] }) {
  return (
    <View
      borderRadius={radius}
      width={100}
      height={100}
      borderColor="border"
      borderWidth={1}
      alignItems="center"
      justifyContent="center"
      margin="s">
      <Text variant="l">{radius}</Text>
    </View>
  );
}

function SpacingBlock({
  space,
  spaceValue,
}: {
  space: keyof Theme['spacing'];
  spaceValue: number;
}) {
  return (
    <View flexDirection="row" marginVertical="xs">
      <View minWidth={30}>
        <Text variant="s" fontWeight="semiBold">
          {space}
        </Text>
      </View>
      <View
        height={24}
        borderWidth={1}
        borderRadius="2"
        borderColor="border"
        marginRight="s"
        width={spaceValue}
      />
      <Text variant="s" fontWeight="regular">
        {spaceValue} px
      </Text>
    </View>
  );
}

function ShadowBlock({ shadow }: { shadow: ShadowVariants }) {
  return (
    <View
      variant={shadow}
      width={100}
      height={100}
      alignItems="center"
      justifyContent="center"
      backgroundColor="background"
      margin="s">
      <Text variant="l">{shadow}</Text>
    </View>
  );
}
