import { useSafeAreaInsets } from "react-native-safe-area-context";

// simple custom hook to get the uikit instance
const useUikit = () => {
    const { top, bottom, left, right } = useSafeAreaInsets();
    return {
        top,
        bottom,
        left,
        right,
    };
};

export default useUikit;