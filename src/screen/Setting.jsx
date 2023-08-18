import React, { useRef } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { settingMenu } from '../menu/menu_data'
import SettingList from '../components/SettingList'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { pinCodeState } from '../recoil/control'
import { useRecoilState } from 'recoil'
import PinCodeModal from '../components/modal/PinCodeModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resetPinCode } from '../functions/firebase'
import RBSheet from 'react-native-raw-bottom-sheet'
import ResetNicNameForm from '../components/ResetNickNameForm'
import { userData } from '../recoil/user'

const Setting = ({ navigation: { push, reset } }) => {
  const [modalState, setModalState] = useRecoilState(pinCodeState);
  const nicNameModalRef = useRef(null);
  const [userDataBox, setUserDataBox] = useRecoilState(userData);

  // 메뉴마다 액션 호출하는 함수
  const onPressMenu = type => {
    switch (type) {
      case "nicname":
        return nicNameModalRef.current.open();
      case "pincode":
        return setModalState(true);
      case "folder":
        return push('FolderSetting');
      case "signout":
        return onLogOut();
      case "withdrawal":
        return withdrawalFuc();
    }
  }

  // 로그아웃 함수
  const onLogOut = async () => {
    // console.log(await AsyncStorage.getAllKeys());
    await AsyncStorage.removeItem('uid');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('pincode');

    setUserDataBox([]);

    reset({ routes: [{ name: 'Splash' }] })
  }

  // 핀코드 재 설정 후 실행 함수
  const pinCodeResetting = async (pincode) => {

    const pincodeServerData = await resetPinCode(pincode);

    if (pincodeServerData['status']) {
      setModalState(false);
      await AsyncStorage.setItem('pincode', pincode);
    }
  }

  // 회원 탈퇴 함수
  const withdrawalFuc = async () => {
    push('Withdrawal');
  }

  return (
    <CustomSafeAreaView backColor={COLORS.black}>
      <RBSheet
        ref={nicNameModalRef}
        closeOnDragDown={true}
        height={ht(1500)}
        customStyles={{
          draggableIcon: {
            backgroundColor: COLORS.white
          },
          container: {
            backgroundColor: COLORS.black,
            borderRadius: wt(80),
            paddingHorizontal: wt(50),
            paddingVertical: ht(50)
          }
        }}
      >
        <ResetNicNameForm
          closeModal={() => nicNameModalRef.current.close()}
        />
      </RBSheet>
      <PinCodeModal type={'resetting'} actionFuc={pinCodeResetting} />
      <CustomStatusBar
        back={true}
        title={'설정'}
      />
      <ContainerView>
        {
          settingMenu?.map(item => (
            <SettingList {...item} key={item.id} onPressMenu={onPressMenu} />
          ))
        }
      </ContainerView>
    </CustomSafeAreaView>
  )
}

const ContainerView = styled.View`
  flex: 1;
  padding: 0 ${wt(50)}px;
`

export default Setting