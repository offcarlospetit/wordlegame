import {
  SpacingProps,
  createRestyleComponent,
  VariantProps,
  createVariant,
  useTheme,
  spacing,
} from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ThemeType } from '../../theme';
import { Text } from '../../index';

export const BaseButton = createRestyleComponent<
  VariantProps<ThemeType, 'buttonVariants'> &
  SpacingProps<ThemeType> &
  React.ComponentProps<typeof TouchableOpacity>,
  ThemeType
>([createVariant({ themeKey: 'buttonVariants' }), spacing], TouchableOpacity);

type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label, variant, ...rest }) => {
  const theme = useTheme<ThemeType>();

  return (
    <BaseButton variant={variant} {...rest}>
      <Text variant={variant}>{label}</Text>
    </BaseButton>
  );
};

export default Button;
