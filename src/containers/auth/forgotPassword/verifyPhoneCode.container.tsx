import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { PhoneCodeFormData } from '../../../components/auth';
import { VerifyPhoneCode } from './verifyPhoneCode.component';
import { AsyncStorage } from 'react-native';

export class VerifyPhoneCodeContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'VerifyPhoneCodeContainer';

  private onResetPress = async (data: PhoneCodeFormData) => {
    const code = await AsyncStorage.getItem('code');
    if (!code) {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: 'Forgot Password',
      });
    } else if (code === data.code) {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: 'New Password',
      });
    }
  };

  public render(): React.ReactNode {
    return (
      <VerifyPhoneCode onResetPress={this.onResetPress}/>
    );
  }
}
