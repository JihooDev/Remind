import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import { Image } from 'react-native'
import { ICON } from '../asset/asset'
import { MotiPressable } from 'moti/interactions'
import { useNavigation } from '@react-navigation/native'

const FolderList = ({
    item
}) => {

    const data = item.item;
    const navigation = useNavigation();

    const openFolder = () => {
        if (data.security) {

        } else {
            navigation.navigate('FolderDetail');
        }
    }

    return (
        <MotiPressable
            onPress={openFolder}
            style={{
                width: "100%",
                height: ht(500),
                backgroundColor: COLORS.white,
                borderRadius: 10,
                overflow: "hidden"
            }}
            from={{ opacity: 0, translateY: -500 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 1000 }}
        >
            <TopView>
                <CustomText
                    color={COLORS.black}
                    text={data.name}
                    size={20}
                    type={'Bold'}
                />
                <Image
                    source={ICON.right}
                    style={{
                        width: wt(80),
                        height: ht(80)
                    }}
                />
            </TopView>
            <BottomView>
                <CustomText
                    size={50}
                    text={data.content.length}
                    type={'ExtraBold'}
                />
                {/* <CustomText
                    size={20}
                    text={'개의 내용'}
                /> */}
            </BottomView>
        </MotiPressable>
    )
}

const FolderView = styled.TouchableOpacity`
    width: 100%;
    height: ${ht(500)}px;
    background-color: ${COLORS.white};
    border-radius: 10px;
    overflow: hidden;
`

const TopView = styled.View`
    width: 100%;
    height: ${ht(200)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${wt(80)}px;
`

const BottomView = styled.View`
    flex: 1;
    padding: 0 ${wt(80)}px;
    align-items: center;
    flex-direction : row;
`

export default FolderList