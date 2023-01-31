import { createTheme, shadow } from '@shopify/restyle';
import { TextInputProps } from 'react-native';

export const palette = {
    purpleLight: '#8C6FF7',
    purplePrimary: '#5A31F4',
    purpleDark: '#3F22AB',

    greenLight: '#56DCBA',
    greenPrimary: '#0ECD9D',
    greenDark: '#0A906E',

    black: '#0B0B0B',
    white: '#F0F2F3',
    pureWhite: '#FFFFFF',

    grayColor: '#9B9898',
    headerBackGround: '#CFD6FF',

    mainBlue: '#334FFA',
    baseBackground: '#f8f8f8',
    mainGreen: '#00B833',
    mainRed: '#FF0000',

    // new colors
    FireOpal: '#EE6352',
    Emmerald: '#59CD90',
    CeruleanCrayola: '#3FA7D6',
    MaximunYellowRoad: '#FAC05E',
    VividTangerine: '#F79D84',


    blackVariant: "#121214",
    darkgrey: "#3A3A3D",
    grey: "#818384",
    lightgrey: "#D7DADC",
    primary: "#538D4E",
    secondary: "#B59F3B",
    transparentGray: "rgba(0, 0, 0, 0.5)",
};

const elevatedStyle = {
    shadowColor: 'mainBlack',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    elevation: 5,
};

const baseButtonVariant = {
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
};

const buttonVariants = {
    defaults: {
        ...baseButtonVariant,
        backgroundColor: 'primaryButton',
    },
    primary: {
        ...baseButtonVariant,
        backgroundColor: 'primaryButton',
    },
    primaryElevated: {
        ...baseButtonVariant,
        backgroundColor: 'primaryButton',
        ...elevatedStyle,
    },
    danger: {
        backgroundColor: 'errorButton',
        ...baseButtonVariant,
    },
    dangerElevated: {
        ...baseButtonVariant,
        backgroundColor: 'errorButton',
        ...elevatedStyle,
    },
    success: {
        backgroundColor: 'successButton',
        ...baseButtonVariant,
    },
    successElevated: {
        ...baseButtonVariant,
        backgroundColor: 'successButton',
        ...elevatedStyle,
    },
    warning: {
        backgroundColor: 'warningButton',
        ...baseButtonVariant,
    },
    warningElevated: {
        backgroundColor: 'warningButton',
        ...baseButtonVariant,
        ...elevatedStyle,
    },
    loginButton: {
        backgroundColor: 'primaryButton',
        ...baseButtonVariant,
    },
    loginButtonElevated: {
        backgroundColor: 'primaryButton',
        ...baseButtonVariant,
        ...elevatedStyle,
    },
    signUpButton: {
        backgroundColor: 'white',
        borderColor: 'primaryButton',
        borderWidth: 1,
        ...baseButtonVariant,
    },
    signUpButtonElevated: {
        backgroundColor: 'white',
        borderColor: 'primaryButton',
        borderWidth: 1,
        ...baseButtonVariant,
        ...elevatedStyle,
    },
};

const theme = createTheme({
    colors: {
        mainBackground: palette.baseBackground,
        cardPrimaryBackground: palette.purplePrimary,
        mainBlackText: palette.black,
        buttonPrimary: palette.mainBlue,
        buttonSecondary: palette.mainBlue,
        mainBlack: palette.black,
        mainCardBackground: palette.mainBlue,

        // new colors
        primaryButton: palette.CeruleanCrayola,
        successButton: palette.Emmerald,
        errorButton: palette.FireOpal,
        warningButton: palette.MaximunYellowRoad,
        ...palette
    },
    spacing: {
        xs: 4,
        s: 12,
        m: 16,
        l: 20,
        xl: 24,
        auto: 'auto',
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        defaults: {
            fontWeight: "400",
            fontSize: 12,
            lineHeight: 16,
            color: 'mainBlackText',
        },
        itemTitle: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.2,
            color: 'mainBlackText',
        },
        pointAmount: {
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
            color: 'mainBlackText',
        },
        itemDate: {
            fontWeight: "400",
            fontSize: 12,
            lineHeight: 16,
            color: 'mainBlackText',
        },
        movementsResumeTitle: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.12,
            color: 'grayColor',
        },
        mainAmount: {
            fontWeight: "800",
            fontSize: 32,
            lineHeight: 43.71,
            color: 'pureWhite',
        },
        monthMainAmount: {
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
            color: 'pureWhite',
        },
        myPointsTitle: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.12,
            color: 'grayColor',
        },
        welcomeTitle: {
            fontWeight: "800",
            fontSize: 20,
            lineHeight: 27.32,
            color: 'mainBlackText',
        },
        welcomeSubtitle: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 21.86,
            color: 'mainBlackText',
        },
        detailHeaderTitle: {
            fontWeight: "800",
            fontSize: 24,
            lineHeight: 24,
        },
        detailTitle: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.12,
            color: 'grayColor',
        },
        detailTextDescription: {
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
        },
        detailResumeText: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.12,
            color: 'grayColor',
        },
        detailResumeAmount: {
            fontWeight: "800",
            fontSize: 24,
            lineHeight: 32.78,
        },
        buttonLargeText: {
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
            color: 'pureWhite',
        },
        buttonMediumText: {
            fontWeight: "800",
            fontSize: 12,
            lineHeight: 16.39,
            color: 'pureWhite',
        },
        iconPlus: {
            color: "mainGreen",
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
        },
        iconMinus: {
            color: "mainRed",
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
        },
        loginButton: {
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
            color: 'white',
        },
        signUpButton: {
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 21.86,
            color: 'black',
        },
        primary: {},
        primaryElevated: {},
        danger: {},
        dangerElevated: {},
        success: {},
        successElevated: {},
        warning: {},
        warningElevated: {},
        loginButtonElevated: {},
        signUpButtonElevated: {},
        winTextVariant: {
            fontSize: 32,
            lineHeight: 43.71,
            color: 'Emmerald',
            textAlign: 'center',
            marginBottom: 'm',
            fontWeight: 'bold',
        },
        winTextResultVarian: {
            fontSize: 32,
            lineHeight: 43.71,
            color: 'Emmerald',
        },
        profileName: {
            fontSize: 16,
            lineHeight: 24,
        },
        logOutText: {
            fontSize: 24,
            lineHeight: 32,
            color: 'MaximunYellowRoad',
        },
        textKeyCell: {
            color: "lightgrey",
            fontWeight: 'bold',
        },
        cellText: {
            color: "black",
            fontWeight: "bold",
            fontSize: 28,
            lineHeight: 28,
        },
        cellTextBlocked: {
            color: "lightgrey",
            fontWeight: "bold",
            fontSize: 28,
            lineHeight: 28,
        },
        alertTitle: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.2,
            color: 'mainBlackText',
        },
        alertBody: {
            fontWeight: "800",
            fontSize: 14,
            lineHeight: 19.2,
            color: 'mainBlackText',
        },
    },
    buttonVariants: {
        ...buttonVariants
    },
    cardVariants: {
        defaults: {

        },
        regular: {
            // We can refer to other values in the theme here, and use responsive props

        },
        rankItem: {
            backgroundColor: 'baseBackground',
            padding: 's',
            borderRadius: 10,
            width: '100%',
            marginVertical: 's',
            shadowColor: 'mainBlack',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
            elevation: 1,
        },
        roundedAvatar: {
            backgroundColor: 'white',
            borderRadius: 60 / 2,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'grayColor',
            borderWidth: 0.5,
            shadowColor: 'mainBlack',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 4,
            elevation: 5,
        },
        roundedAvatarSelected: {
            backgroundColor: 'white',
            borderRadius: 60 / 2,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'mainGreen',
            borderWidth: 2,
            shadowColor: 'mainBlack',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 4,
            elevation: 5,
        },
        alertVariant: {
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: 'grayColor',
            borderWidth: 0.5,
            padding: 'xl',
            height: 200,
        },
        bigPlainCard: {

        },
        elevated: {
        },
    },
    textInputVariants: {
        defaults: {
        },
        regular: {
            borderColor: 'grayColor',
            borderBottomWidth: 1,
            color: 'mainBlack',
            paddingTop: 'xs',
            paddingBottom: 'xs',
            paddingHorizontal: 'xs',
        } as TextInputProps,
    }
});

export type ThemeType = typeof theme;
export default theme;