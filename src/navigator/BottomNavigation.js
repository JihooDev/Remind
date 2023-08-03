import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Main from '../screen/Main';
import Note from '../screen/Note'
import AddNote from '../screen/AddNote'
import Social from '../screen/Social'
import Setting from '../screen/Setting'
import CustomBottomTab from './CustomBottomTab';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <CustomBottomTab {...props} />}
        >
            <Tab.Screen name="Main" component={Main} />
            <Tab.Screen name="Note" component={Note} />
            <Tab.Screen name="AddNote" component={AddNote} />
            <Tab.Screen name="Social" component={Social} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    )
}

export default BottomNavigation