import React from 'react';

import { ScrollView, Text, View } from '@/ui';

import { ButtonVariants } from './button-variants';
import { ColorVariants } from './color-variants';
import { InputVariants } from './input-variants';
import { TextVariants } from './text-variants';

export const Style = () => {
  return (
    <ScrollView>
      <View className="flex-1  px-4 pt-10">
        <Text>This is Sometext and it actually look quite nice</Text>
        <TextVariants />
        <ColorVariants />
        <InputVariants />
        <ButtonVariants />
      </View>
    </ScrollView>
  );
};
