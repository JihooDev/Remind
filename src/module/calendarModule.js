import { font } from "../../responsive/responsive";
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
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'fr';

export const calandarTheme = {
    backgroundColor: COLORS.black,
    calendarBackground: COLORS.black,
    textSectionTitleColor: COLORS.white,
    selectedDayBackgroundColor: COLORS.white,
    selectedDayTextColor: COLORS.black,
    todayTextColor: COLORS.border,
    monthTextColor: COLORS.white,
    textDisabledColor: COLORS.gray,
    dayTextColor: COLORS.white,
    arrowColor: COLORS.border,
    selectedDotColor: COLORS.border,
    textDayFontFamily: 'Pretendard-Bold',
    textMonthFontFamily: 'Pretendard-Bold',
    textDayHeaderFontFamily: 'Pretendard-Bold',
    textMonthFontWeight: 'bold',
    textDayFontWeight: '600',
    textDayFontSize: font(15),
    textMonthFontSize: font(18),
}