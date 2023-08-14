import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { MotiView } from 'moti'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const PlanList = ({
    item
}) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <MotiView
            from={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 700 }}
        >
            <PlanListView
                activeOpacity={.9}
            >
                <CustomText
                    text={item.plan_name}
                    type={'Bold'}
                    size={18}
                />
                <CustomText
                    text={item.date}
                    size={14}
                    color={COLORS.gray}
                />
            </PlanListView>
        </MotiView>
    )
}

const PlanListView = styled.TouchableOpacity`
    width: 100%;
    height: ${ht(250)}px;
    background-color: ${COLORS.white};
    border-radius: 5px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${wt(80)}px;
`

export default PlanList