import React from 'react';
import { enableScreens } from 'react-native-screens';
import {
  createAppContainer,
  NavigationContainer,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  AuthContainer,
  ForgotPasswordContainer,
  SignInContainer,
  SignUpContainer,
  ScanCodeContainer,
  VerifyPhoneCodeContainer,
  NewPasswordContainer,
  ConfirmedContainer,
} from './containers/auth';

import {
  MyHomeContainer,
  DashboardNav,
} from './containers/dashboard';

const AuthNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Sign In']: SignInContainer,
  ['Forgot Password']: ForgotPasswordContainer,
  ['Sign Up']: SignUpContainer,
  ['Scan Code']: ScanCodeContainer,
  ['Phone Code']: VerifyPhoneCodeContainer,
  ['New Password']: NewPasswordContainer,
  ['Confirmed']: ConfirmedContainer,
};

const DashboardNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Home']: DashboardNav,
};

const AppNavigator: NavigationContainer = createStackNavigator({
  ...AuthNavigationMap,
  ...DashboardNavigationMap,
}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null,
    // gesturesEnabled: false
  },
});

const createAppRouter = (container: NavigationContainer): NavigationContainer => {
  enableScreens();
  return createAppContainer(container);
};


export const Router: NavigationContainer = createAppRouter(AppNavigator);
