import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import StackNavigation from './src/navigator/StackNavigation'
import { RecoilRoot, useRecoilValue } from 'recoil'
import SplashScreen from 'react-native-splash-screen'
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { firebase } from '@react-native-firebase/auth'
import { initConfig } from './src/functions/init'
import { loadingControl } from './src/recoil/control'


const App = () => {


  useEffect(() => {
    initFirebase();
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000)
  }, [])

  // firebase init
  const initFirebase = async () => {
    if (firebase.apps?.length === 0) {
      await firebase.initializeApp(initConfig);
    }
  }

  return (
    <RecoilRoot>
      <StackNavigation />
    </RecoilRoot>
  )
}

export default App