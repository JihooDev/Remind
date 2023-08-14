import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { COLORS } from '../asset/colors'
import { calandarTheme } from '../module/calendarModule'

const CalendarView = () => {
    const [selected, setSelected] = useState('');

    return (
        <Calendar
            theme={calandarTheme}
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
            }}
        />
    )
}

export default CalendarView