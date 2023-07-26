import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Main from '../screen/Main';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Main" component={Main} />
        </Tab.Navigator>
    )
}

export default BottomNavigation