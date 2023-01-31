import { Pressable, Dimensions, TouchableOpacity } from "react-native";
import Box from "../Box/Box";
import Text from "../Text/Text";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConstValues from "../../constants/ConstValues";
import { palette } from "../../theme";
const { BACK_ICON, ENTER_ICON } = ConstValues;
export const colors = {
  black: "#121214",
  darkgrey: "#3A3A3D",
  grey: "#818384",
  lightgrey: "#D7DADC",
  primary: "#538D4E",
  secondary: "#B59F3B",
};

export const colorsToEmoji = {
  [colors.darkgrey]: "⬛",
  [colors.primary]: "🟩",
  [colors.secondary]: "🟧",
};

export const ENTER = "ENTER";
export const CLEAR = "CLEAR";


export const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [ENTER, "z", "x", "c", "v", "b", "n", "m", CLEAR],
];

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / keys[0].length;
const keyHeight = keyWidth * 1.3;


export interface KeyboardProps {
  onKeyPressed: (letter: string) => void;
  greenCaps: string[];
  yellowCaps: string[];
  greyCaps: string[];
}


const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPressed = (letter: string) => { },
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}) => {
  const isLongButton = (key: string) => {
    return key === ENTER || key === CLEAR;
  };

  const getKeyBGColor = (key: string) => {
    if (greenCaps.includes(key)) {
      return colors.primary;
    }
    if (yellowCaps.includes(key)) {
      return colors.secondary;
    }
    if (greyCaps.includes(key)) {
      return colors.darkgrey;
    }
    return colors.grey;
  };

  const returnIcon = () => <Ionicons name={BACK_ICON} size={18} color={palette.black} />;


  return (
    <Box alignSelf="stretch" marginTop="auto">
      {keys.map((keyRow, i) => (
        <Box alignSelf='stretch' flexDirection="row" justifyContent="center" key={`row-${i}`}>
          {keyRow.map((key) => (
            <TouchableOpacity
              onPress={() => onKeyPressed(key)}
              disabled={greyCaps.includes(key)}
              key={key}
              style={[
                {
                  width: keyWidth - 4,
                  height: keyHeight - 4,
                  margin: 2,
                  borderRadius: 5,
                  backgroundColor: colors.grey,
                  justifyContent: "center",
                  alignItems: "center",
                },
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
              ]}
            >
              {key === CLEAR ? (
                returnIcon()
              ) : (
                <Text variant="textKeyCell">{key.toUpperCase()}</Text>
              )}
            </TouchableOpacity>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Keyboard;