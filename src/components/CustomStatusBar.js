import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import CustomText from './CustomText'
import { COLORS } from '../asset/colors'
import { Image } from 'react-native'
import { ICON } from '../asset/asset'
import { useNavigation } from '@react-navigation/native'

const CustomStatusBar = ({
    back = false,
    title,
    type,
    closeFuc
}) => {

    const navigation = useNavigation();

    return (
        <HeaderView>
            <SideView type={'left'}>
                {
                    back &&
                    <BackButton
                        onPress={() => {
                            if (type === 'modal') {
                                closeFuc();
                            } else {
                                navigation.pop()
                            }
                        }}
                        activeOpacity={.9}
                    >
                        <Image
                            source={ICON.back}
                            style={{
                                width: "70%",
                                height: "70%",
                                tintColor: COLORS.white
                            }}
                        />
                    </BackButton>
                }
            </SideView>
            <CenterView>
                <CustomText
                    text={title}
                    size={19}
                    type={'Bold'}
                    color={COLORS.white}
                />
            </CenterView>
            <SideView></SideView>
        </HeaderView>
    )
}

const HeaderView = styled.View`
    width: 100%;
    height: ${ht(200)}px;
    flex-direction: row;
    padding: 0 ${wt(70)}px;
`

const SideView = styled.View`
    width: 25%;
    height: 100%;
    justify-content: center;
    align-items: ${props => props.type === 'left' ? 'flex-start' : 'flex-end'};
`

const CenterView = styled.View`
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const BackButton = styled.TouchableOpacity`
    width: ${wt(140)}px;
    height: ${ht(140)}px;
    background-color: ${COLORS.gray};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`

export default CustomStatusBar