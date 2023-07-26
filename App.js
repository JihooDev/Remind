import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import StackNavigation from './src/navigator/StackNavigation'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <StackNavigation />
    </RecoilRoot>
  )
}

export default App