import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import StackNavigation from './src/navigator/StackNavigation'
import { RecoilRoot } from 'recoil'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <RecoilRoot>
      <StackNavigation />
    </RecoilRoot>
  )
}

export default App