import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountsScreen from './screens/AccountsScreen';
import AccountAddScreen from './screens/AccountAddScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accounts" component={AccountsScreen} />
        <Stack.Screen name="Add Account" component={AccountAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
