import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screen/Home';
import BottomNavigation from './BottomNavigation';
import Splash from '../screen/Splash';
import SignUp from '../screen/SignUp';
import { loadingControl, pinCodeState } from '../recoil/control';
import { useRecoilValue } from 'recoil';
import Loading from '../components/Loading';
import AddFolder from '../screen/AddFolder';
import FolderDetail from '../screen/FolderDetail';
import PinCodeModal from '../components/modal/PinCodeModal';
import AddNote from '../screen/AddNote';
import MemoDetail from '../screen/MemoDetail';
import Planer from '../screen/Planer';
import Setting from '../screen/Setting';
import ChangeNicName from '../screen/ChangeNicName'
import FolderSetting from '../screen/FolderSetting';

const StackNavigation = () => {

    const Stack = createNativeStackNavigator();
    const loading = useRecoilValue(loadingControl);


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                screenOptions={{
                    headerShown: false
                }}
            >
                {/* Stack default */}
                {/* 스플래시 */}
                <Stack.Screen name="Splash" component={Splash} />
                {/* 홈화면 */}
                <Stack.Screen name="Home" component={Home} />
                {/* 회원가입 */}
                <Stack.Screen name="SignUp" component={SignUp} />
                {/* 폴더 추가 */}
                <Stack.Screen name="AddFolder" component={AddFolder} />
                {/* 폴더 디테일 */}
                <Stack.Screen name="FolderDetail" component={FolderDetail} />
                {/* 메모 추가 */}
                <Stack.Screen name="AddNote" component={AddNote} />
                {/* 메모 디테일 */}
                <Stack.Screen name="MemoDetail" component={MemoDetail} />
                {/* 플래너 */}
                <Stack.Screen name="Planer" component={Planer} />
                {/* 세팅 */}
                <Stack.Screen name="Setting" component={Setting} />
                {/* 폴더 관리 */}
                <Stack.Screen name="FolderSetting" component={FolderSetting} />
                {/* Bottom Navigation */}
                {/* <Stack.Screen name="Home" component={BottomNavigation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation