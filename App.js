import React from 'react';
import {UserProvider} from './store/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OtpVerificationScreen from './screens/signup/OtpVerificationScreen';
import PersonalDetailsScreen from './screens/signup/PersonalDetailsScreen';
import DocumentUploadScreen from './screens/signup/DocumentUploadScreen';
import MpinSetupScreen from './screens/signup/MPinSetupScreen';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import ServiceBotScreen from './screens/servicebot/ServiceBotScreen';
import SignupMobileScreen from './screens/signup/SignUpMobileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignupMobile" component={SignupMobileScreen} />
          <Stack.Screen
            name="OtpVerification"
            component={OtpVerificationScreen}
          />
          <Stack.Screen
            name="PersonalDetails"
            component={PersonalDetailsScreen}
          />
          <Stack.Screen
            name="DocumentUpload"
            component={DocumentUploadScreen}
          />
          <Stack.Screen name="MpinSetup" component={MpinSetupScreen} />
          <Stack.Screen name="ServiceBot" component={ServiceBotScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
