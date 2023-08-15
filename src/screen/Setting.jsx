import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { settingMenu } from '../menu/menu_data'
import SettingList from '../components/SettingList'
import { styled } from 'styled-components'
import { wt } from '../../responsive/responsive'

const Setting = () => {
  return (
    <CustomSafeAreaView backColor={COLORS.black}>
      <CustomStatusBar
        back={true}
        title={'설정'}
      />
      <ContainerView>
        {
          settingMenu?.map(item => (
            <SettingList {...item} key={item.id} />
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