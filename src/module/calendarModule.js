import { COLORS } from "../asset/colors";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['fr'] = {
    monthNames: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

export const calandarTheme = {
    backgroundColor: COLORS.black,
    calendarBackground: COLORS.black,
    textSectionTitleColor: COLORS.white,
    selectedDayBackgroundColor: COLORS.white,
    selectedDayTextColor: COLORS.success,
    todayTextColor: COLORS.border,
    monthTextColor: COLORS.white,
    textDisabledColor: COLORS.gray,
    dayTextColor: COLORS.white,
    textMonthFontFamily: "Pretendard-Bold",
    arrowColor: COLORS.border
}