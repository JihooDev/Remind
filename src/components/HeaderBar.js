import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { font, ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import { Image } from 'react-native'
import CustomImage from './CustomImage'
import { APPTEXT, ICON } from '../asset/asset'
import SearchBar from './SearchBar'
import { useRecoilValue } from 'recoil'
import { userData } from '../recoil/user'

const HeaderBar = ({
    back = false
}) => {

    const [searchState, setSearchState] = useState(false);
    const userDataBox = useRecoilValue(userData);

    useEffect(() => {
        console.log(userDataBox)
    }, [])

    return (
        <Header>
            <CustomText
                text={`${userDataBox.user_name}님의 폴더`}
                color={'#FDFDFD'}
                type={"Bold"}
                size={font(20)}
            />
            <LeftView>
                <MenuButton
                >
                    <Image
                        source={ICON.calandar}
                        style={{ width: "90%", height: "90%", tintColor: '#FDFDFD' }}
                        resizeMode='cover'
                    />
                </MenuButton>
                <MenuButton
                >
                    <Image
                        source={ICON.setting}
                        style={{ width: "90%", height: "90%", tintColor: '#FDFDFD' }}
                        resizeMode='cover'
                    />
                </MenuButton>
            </LeftView>
        </Header>
    )
}

const Header = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${wt(50)}px;
`

const MenuButton = styled.TouchableOpacity`
    width: ${wt(120)}px;
    height: ${ht(120)}px;
    justify-content: center;
    align-items: center;
    margin: 0 ${wt(30)}px;
`

const LeftView = styled.View`
    width: 50%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

export default HeaderBar