import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import StackNavigation from './src/navigator/StackNavigation'
import { RecoilRoot } from 'recoil'
import SplashScreen from 'react-native-splash-screen'
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { firebase } from '@react-native-firebase/auth'
import { initConfig } from './src/functions/init'


const App = () => {

  useEffect(() => {
    initFirebase();
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000)
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