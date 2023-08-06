import React, { useEffect, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import { useRecoilState } from 'recoil'
import { detailData } from '../recoil/user'
import HeaderBar from '../components/HeaderBar'
import CustomStatusBar from '../components/CustomStatusBar'
import { styled } from 'styled-components'
import CustomText from '../components/CustomText'
import { MotiView } from 'moti'
import { ht, wt } from '../../responsive/responsive'
import { ICON } from '../asset/asset'
import { Image } from 'react-native'

const FolderDetail = ({ navigation: { push } }) => {

    const [pageData, setPageData] = useRecoilState(detailData);
    const [contentList, setContentList] = useState(pageData?.content);

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                title={pageData?.name}
                back={true}
            />
            {
                contentList?.length > 0
                    ? null
                    :
                    <NoContentView>
                        <MotiView
                            from={{ opacity: 0, translateY: -50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={500}
                        >
                            <CustomText
                                text={'내용을 추가해보세요!'}
                                color={COLORS.gray}
                                size={17}
                            />
                        </MotiView>
                        <MotiView
                            from={{ opacity: 0, translateY: 50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={1000}
                            style={{
                                marginTop: ht(80)
                            }}
                        >
                            <PlusButton
                                activeOpacity={.9}
                                onPress={() => push('AddNote')}
                            >
                                <Image
                                    source={ICON.plus}
                                    style={{
                                        tintColor: COLORS.white,
                                        width: wt(100),
                                        height: ht(100)
                                    }}
                                />
                            </PlusButton>
                        </MotiView>
                    </NoContentView>
            }
        </CustomSafeAreaView>
    )
}

const NoContentView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const PlusButton = styled.TouchableOpacity`
    width: ${wt(300)}px;
    height: ${ht(300)}px;
    background-color: #CC4F4F;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`

export default FolderDetail