import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { settingMenu } from '../menu/menu_data'
import SettingList from '../components/SettingList'
import { styled } from 'styled-components'
import { wt } from '../../responsive/responsive'

const Setting = ({ navigation: { push } }) => {

  // 메뉴마다 액션 호출하는 함수
  const onPressMenu = type => {
    switch (type) {
      case "nicname":
        return
      case "pincode":
        return
      case "folder":
        return push('FolderSetting');
      case "signout":
        return
    }
  }

  return (
    <CustomSafeAreaView backColor={COLORS.black}>
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