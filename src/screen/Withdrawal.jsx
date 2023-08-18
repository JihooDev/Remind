import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import CustomCenterView from '../components/CustomCenterView'
import CustomText from '../components/CustomText'
import PinCodeModal from '../components/modal/PinCodeModal'
import CustomButton from '../components/CustomButton'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { useRecoilState } from 'recoil'
import { pinCodeState } from '../recoil/control'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userData } from '../recoil/user'

const Withdrawal = ({ navigation: { reset } }) => {

    const [modalStatus, setModalStatus] = useRecoilState(pinCodeState);
    const [userDataBox, setUserDataBox] = useRecoilState(userData);

    // 핀코드 입력 이후 진행되야할 함수
    const actionWithdrawal = async () => {
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('pincode');

        setUserDataBox([]);

        reset({ routes: [{ name: 'Splash' }] })
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <PinCodeModal
                type={'confirm'}
                actionFuc={actionWithdrawal}
            />
            <CustomStatusBar
                back={true}
                title={'회원 탈퇴'}
            />
            <MainTextView>
                <CustomText
                    text={"탈퇴하시면 이 계정은 사용할 수 없습니다."}
                    color={COLORS.gray}
                />
            </MainTextView>
            <ButtonView>
                <CustomButton
                    title={'탈퇴하기'}
                    onPress={() => setModalStatus(true)}
                />
            </ButtonView>
        </CustomSafeAreaView>
    )
}

const MainTextView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const ButtonView = styled.View`
    width: 100%;
    height: ${ht(400)}px;
    justify-content: center;
    align-items: center;
    padding: 0 ${wt(80)}px;
`

export default Withdrawal