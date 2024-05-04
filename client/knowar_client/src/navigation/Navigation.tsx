import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {DrawerNavigator} from './DrawerNavigator';
import SplashScreen from '../screens/SplashScreen';
import {useRetrieveCredentials} from '../hooks/useRetrieveCredentials';
import {AuthContext} from '../store/auth-context';

const Stack = createNativeStackNavigator();

export function Navigation() {
  const authCtx = useContext(AuthContext);
  const isLoading = useRetrieveCredentials();

  if (isLoading) {
    return <LoadingScreen text="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {authCtx.isAuthenticated ? (
          <>
            <Stack.Screen
              name="AuthenticatedStack"
              component={DrawerNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
