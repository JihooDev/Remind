import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { COLORS } from '../asset/colors'
import { calandarTheme } from '../module/calendarModule'
import moment from 'moment'

const CalendarView = ({
    selected,
    setSelected
}) => {

    return (
        <Calendar
            theme={calandarTheme}
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: { selected: true, disableTouchEvent: true }
            }}
            minDate={moment().format('YYYY-MM-DD')}
        />
    )
}

export default CalendarView