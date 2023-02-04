import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import HomeStrings from "../home/i18n";
import { english as HomeEnglish } from "../home/i18n/en";
import { spanish as HomeSpanish } from "../home/i18n/es";

import ProfileStrings from "../profile/i18n";
import { english as ProfileEnglish } from "../profile/i18n/en";
import { spanish as ProfileSpanish } from "../profile/i18n/es";

import RankStrings from "../rank/i18n";
import { english as RankEnglish } from "../rank/i18n/en";
import { spanish as RankSpanish } from "../rank/i18n/es";

import UserStrings from "../user/i18n";
import { english as UserEnglish } from "../user/i18n/en";
import { spanish as Userpanish } from "../user/i18n/es";

const translations = {
    en: { ...HomeEnglish, ...ProfileEnglish, ...RankEnglish, ...UserEnglish },
    es: { ...HomeSpanish, ...ProfileSpanish, ...RankSpanish, ...Userpanish },
};
const i18n = new I18n(translations);


i18n.locale = Localization.locale;
i18n.enableFallback = true;


const translate = (obj_from: object, obj_to: object) => {
    Object.keys(obj_from).forEach(child => {
        if (typeof obj_from[child as keyof typeof obj_from] === "string") {
            Object.defineProperty(obj_to, child, {
                get: () => i18n.t(obj_from[child as keyof typeof obj_from]),
            });
        } else {
            // eslint-disable-next-line no-param-reassign
            obj_to[child as keyof typeof obj_to] = {} as never;
            translate(
                obj_from[child as keyof typeof obj_from],
                obj_to[child as keyof typeof obj_to],
            );
        }
    }, obj_to);
};

const S = {} as typeof HomeStrings & typeof ProfileStrings & typeof RankStrings & typeof UserStrings;
translate({ ...UserStrings, ...HomeStrings, ...ProfileStrings, ...RankStrings }, S);


export default S;