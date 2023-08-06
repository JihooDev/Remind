import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import { Image } from 'react-native'
import { ICON } from '../asset/asset'
import { MotiPressable } from 'moti/interactions'
import { useNavigation } from '@react-navigation/native'
import PinCodeModal from './modal/PinCodeModal'
import { pinCodeState } from '../recoil/control'
import { useRecoilState } from 'recoil'
import { detailData } from '../recoil/user'

const FolderList = ({
    item
}) => {

    const data = item.item;
    const navigation = useNavigation();
    const [modalState, setModalState] = useRecoilState(pinCodeState);
    const [detailState, setDetailState] = useRecoilState(detailData);

    const openFolder = () => {
        setDetailState(data);
        if (data.security) {
            setModalState(true);
        } else {
            navigation.navigate('FolderDetail', { data: detailState });
        }
    }

    const modalActionFuc = () => {
        setModalState(false);

        console.log(data, '넘어가는 값');

        setTimeout(() => {
            navigation.navigate('FolderDetail', { data: detailState });
        }, 200)
    }

    return (
        <>
            <PinCodeModal type={'confirm'} actionFuc={modalActionFuc} />
            <MotiPressable
                onPress={openFolder}
                style={{
                    width: "100%",
                    height: ht(500),
                    backgroundColor: COLORS.white,
                    borderRadius: 10,
                    overflow: "hidden",
                    marginTop: ht(80)
                }}
                from={{ opacity: 0, translateY: -500 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 500 }}
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
        </>
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