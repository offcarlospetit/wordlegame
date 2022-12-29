import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import {ThemeType} from '../../theme';
import Box from '../Box/Box';

const Card = createRestyleComponent<
  VariantProps<ThemeType, 'cardVariants'> & React.ComponentProps<typeof Box>,
  ThemeType
>([createVariant({themeKey: 'cardVariants'})], Box);

export default Card;
