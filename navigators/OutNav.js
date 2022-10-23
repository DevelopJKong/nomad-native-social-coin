import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BLACK_COLOR } from '../color';
import Detail from '../screens/Detail';
import Home from '../screens/Home';

const Nav = createNativeStackNavigator();

const OutNav = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: `${BLACK_COLOR}`,
        },
        headerTintColor: '#fff',
      }}>
      <Nav.Screen name='Home' component={Home} />
      <Nav.Screen name='Detail' component={Detail} />
    </Nav.Navigator>
  );
};

export default OutNav;
