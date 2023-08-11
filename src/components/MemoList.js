import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import { MotiView } from 'moti'
import CustomText from './CustomText'
import moment from 'moment'
import { sliceText } from '../functions/utils'
import { useNavigation } from '@react-navigation/native'

const MemoList = ({ item, selectStatus, selectMemoAction }) => {

    const navigation = useNavigation();

    // selectStatus에 따라 클릭 시 동작하는 함수
    const selectItemAction = () => {
        if (!selectStatus) {
            navigation.navigate('MemoDetail', { data: item })
        } else {
            selectMemoAction(item);
        }
    }

    return (
        <MotiView
            style={{
                width: "100%",
                height: ht(450),
                marginBottom: ht(80)
            }}
            from={{ opacity: 0, translateY: -200 }}
            animate={{ opacity: 1, translateY: 0 }}
            delay={500}
        >
            <MemoListView
                activeOpacity={.9}
                onPress={selectItemAction}
            >
                <MemoHeader>
                    <CustomText
                        text={item.name}
                        type={'Bold'}
                        size={20}
                    />
                    <CustomText
                        text={item.time}
                        size={13}
                        color={COLORS.gray}
                    />
                </MemoHeader>
                <ContentView>
                    <CustomText
                        text={sliceText(item.content)}
                        size={13}
                        color={COLORS.gray}
                    />
                </ContentView>
            </MemoListView>
        </MotiView>
    )
}

const MemoListView = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: ${COLORS.white};
    padding: ${wt(50)}px;
`

const MemoHeader = styled.View`
    width: 100%;
    height: ${ht(150)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ContentView = styled.View`
    flex: 1;
    justify-content: center;
`

export default MemoList