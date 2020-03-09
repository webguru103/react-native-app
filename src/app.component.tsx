import React from 'react';
import { ImageRequireSource, View } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Text } from 'react-native-ui-kitten';
import { IconRegistry } from 'react-native-ui-kitten/ui';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import HomeList from './components/HomeList';
import { Router } from './routes';
import {
  getCurrentStateName,
  RouteState,
} from './utils/navigation';
import SplashScreen from 'react-native-splash-screen';

import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
  ThemeStore,
} from './themes';


interface State {
  theme: ThemeKey;
}

export default class App extends React.Component<{}, State> {

  public state: State = {
    theme: 'Eva Light',
  };

  public componentDidMount() {
    SplashScreen.hide();
  }

  private onTransitionTrackError = (error: any): void => {
    console.warn('Analytics error: ', error.message);
  };

  private onNavigationStateChange = (prevState: RouteState, currentState: RouteState) => {
    const prevStateName: string = getCurrentStateName(prevState);
    const currentStateName: string = getCurrentStateName(currentState);
  };

  private onSwitchTheme = (theme: ThemeKey) => {
    ThemeStore.setTheme(theme).then(() => {
      this.setState({ theme });
    });
  };

  public render(): React.ReactNode {
    const contextValue: ThemeContextType = {
      currentTheme: this.state.theme,
      toggleTheme: this.onSwitchTheme,
    };

    return (
      <ApplicationProvider
            mapping={mapping}
            theme={themes[this.state.theme]}>
        <IconRegistry icons={EvaIconsPack}/>
        <ThemeContext.Provider value={contextValue}>
          
            {/* <HomeList /> */}
            <Router />
          
        </ThemeContext.Provider>
      </ApplicationProvider>
    );
  }

}
