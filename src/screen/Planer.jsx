import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import CalendarView from '../components/CalendarView'
import { styled } from 'styled-components'
import { wt } from '../../responsive/responsive'

const Planer = () => {
    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                back={true}
                title={'계획 관리'}
            />
            <Container>
                <CalendarView />
            </Container>
        </CustomSafeAreaView>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 0 ${wt(80)}px;
`

export default Planer