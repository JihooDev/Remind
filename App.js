import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import StackNavigation from './src/navigator/StackNavigation'
import { RecoilRoot } from 'recoil'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000)
  }, [])

  return (
    <RecoilRoot>
      <StackNavigation />
    </RecoilRoot>
  )
}

export default App