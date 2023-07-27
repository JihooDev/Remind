import React, { useState } from 'react'
import { styled } from 'styled-components'
import { font, ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import { Image } from 'react-native'
import CustomImage from './CustomImage'
import { APPTEXT, ICON } from '../asset/asset'
import SearchBar from './SearchBar'

const HeaderBar = ({
    back = false
}) => {

    const [searchState, setSearchState] = useState(false);

    return (
        <>
            {
                searchState
                    ? <SearchBar />
                    : <Header>

                        <CustomText
                            text={APPTEXT.app_name}
                            color={COLORS.app}
                            type={"Bold"}
                            size={font(23)}
                        />
                        <SearchButton
                        >
                            <Image
                                source={ICON.search}
                                style={{ width: "100%", height: "100%", tintColor: COLORS.text }}
                                resizeMode='cover'
                            />
                        </SearchButton>
                    </Header>
            }

        </>
    )
}

const Header = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${wt(50)}px;
    background-color: ${COLORS.white};
`

const SearchButton = styled.TouchableOpacity`
    width: ${wt(120)}px;
    height: ${ht(120)}px;
`

const LeftView = styled.View`
    width: 50%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

export default HeaderBar