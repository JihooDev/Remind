import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { settingMenu } from '../menu/menu_data'
import SettingList from '../components/SettingList'
import { styled } from 'styled-components'
import { wt } from '../../responsive/responsive'
import { pinCodeState } from '../recoil/control'
import { useRecoilState } from 'recoil'
import PinCodeModal from '../components/modal/PinCodeModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resetPinCode } from '../functions/firebase'

const Setting = ({ navigation: { push } }) => {
  const [modalState, setModalState] = useRecoilState(pinCodeState);

  // 메뉴마다 액션 호출하는 함수
  const onPressMenu = type => {
    switch (type) {
      case "nicname":
        return
      case "pincode":
        return setModalState(true);
      case "folder":
        return push('FolderSetting');
      case "signout":
        return
    }
  }

  // 핀코드 재 설정 후 실행 함수
  const pinCodeResetting = async (pincode) => {

    const pincodeServerData = await resetPinCode(pincode);

    if (pincodeServerData['status']) {
      setModalState(false);
      await AsyncStorage.setItem('pincode', pincode);
    }
  }

  return (
    <CustomSafeAreaView backColor={COLORS.black}>
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