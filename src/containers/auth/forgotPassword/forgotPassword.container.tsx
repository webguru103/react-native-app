import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ForgotPasswordFormData } from '../../../components/auth';
import { ForgotPassword } from './forgotPassword.component';
import AuthService from '../../../utils/services/auth';

export class ForgotPasswordContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'ForgotPasswordContainer';

  private onResetPress = async (data: ForgotPasswordFormData) => {
    const result = await AuthService.requestPassword({
      data: {
        phoneNumber: '+' + data.phone
      }
    });
    if (result.error) {
      Alert.alert('ERROR!', 'This number does not exist in our database.', [{ text: 'Ok', style: 'cancel' }]);
    } else if (result.code) {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: 'Phone Code',
      });
    }
  };

  private onBackPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Sign In',
    });
  }

  public render(): React.ReactNode {
    return (
      <ForgotPassword onResetPress={this.onResetPress} onBackPress={this.onBackPress}/>
    );
  }
}
