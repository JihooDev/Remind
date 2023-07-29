import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screen/Home';
import BottomNavigation from './BottomNavigation';
import Splash from '../screen/Splash';

const StackNavigation = () => {

    const Stack = createNativeStackNavigator();

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
                <Stack.Screen name="Home" component={Home} />

                {/* Bottom Navigation */}
                {/* <Stack.Screen name="Home" component={BottomNavigation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation