import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import ToggleSwitch from 'toggle-switch-react-native'

const SettingFolderList = ({
    item,
    folderLockFuc
}) => {
    return (
        <ListView>
            <TabView>
                <CustomText
                    text={item.name}
                    type={'Bold'}
                    size={18}
                />
            </TabView>
            <TabView right={true}>
                <PinCodeView>
                    <CustomText
                        text={'잠금'}
                        size={13}
                        style={{
                            marginBottom: ht(10)
                        }}
                    />
                    <ToggleSwitch
                        isOn={item.security}
                        size='small'
                        onToggle={isOn => folderLockFuc(isOn, item.id)}
                    />
                </PinCodeView>
                <DeleteButton>
                    <CustomText
                        text={'삭제'}
                        size={14}
                        color={COLORS.white}
                    />
                </DeleteButton>
            </TabView>
        </ListView>
    )
}

const ListView = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    margin-top: ${ht(80)}px;
    background-color: ${COLORS.white};
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${wt(50)}px;
    border-radius: 5px;
`

const PinCodeView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const TabView = styled.View`
    width: 50%;
    height: 100%;
    flex-direction: row;
    justify-content: ${props => props.right ? 'flex-end' : 'flex-start'};
    align-items: center;
`

const DeleteButton = styled.TouchableOpacity`
    width: ${wt(250)}px;
    height: ${ht(160)}px;
    background-color: ${COLORS.red};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`

export default SettingFolderList