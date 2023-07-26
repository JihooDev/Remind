import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screen/Home';
import BottomNavigation from './BottomNavigation';

const StackNavigation = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false
                }}
            >
                {/* Stack default */}
                <Stack.Screen name="Home" component={Home} />

                {/* Bottom Navigation */}
                {/* <Stack.Screen name="Home" component={BottomNavigation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation