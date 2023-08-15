import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import ToggleSwitch from 'toggle-switch-react-native'
import { useRecoilState } from 'recoil'
import { loadingControl, pinCodeState } from '../recoil/control'
import PinCodeModal from './modal/PinCodeModal'
import { deleteFolder } from '../functions/firebase'

const SettingFolderList = ({
    item,
    folderLockFuc,
    getFolderList
}) => {

    const [modalState, setModalState] = useRecoilState(pinCodeState);
    const [loading, setLoading] = useRecoilState(loadingControl);

    // 폴더를 삭제하는 함수
    const deleteFolderFuc = async () => {
        const deleteServer = await deleteFolder(item, setLoading);

        if (deleteServer['status']) {
            setModalState(false);
            getFolderList();
        }
    }

    return (
        <ListView>
            <PinCodeModal
                type={'confirm'}
                actionFuc={deleteFolderFuc}
            />
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
                <DeleteButton
                    activeOpacity={.9}
                    onPress={() => setModalState(true)}
                >
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