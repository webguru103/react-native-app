import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ScanCode } from './scanCode.component';
import { AsyncStorage } from 'react-native';
import AuthService from '../../../utils/services/auth';

export class ScanCodeContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'ScanCodeContainer';

  private onScanCode = async (data: any) => {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: 'Confirmed',
      });
    }
  };

  public render(): React.ReactNode {
    return (
      <ScanCode
        onScanCode={this.onScanCode}
      />
    );
  }
}
