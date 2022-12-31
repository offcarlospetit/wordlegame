import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import {ThemeType} from '../../theme';
import {TextInput as RNTextInput} from 'react-native';

const TextInput = createRestyleComponent<
  VariantProps<ThemeType, 'textInputVariants'> &
    React.ComponentProps<typeof RNTextInput>,
  ThemeType
>([createVariant({themeKey: 'textInputVariants'})], RNTextInput);

export default TextInput;
