import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { NewPasswordFormData } from '../../../components/auth';
import { NewPassword } from './newPassword.component';
import { AsyncStorage } from 'react-native';
import AuthService from '../../../utils/services/auth';

export class NewPasswordContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'NewPasswordContainer';

  private onResetPress = async (data: NewPasswordFormData) => {
    const user = await AsyncStorage.getItem('user');
    const status = await AuthService.resetPassword({
      params: null,
      data: {
        newPassowrd: data.password,
        passwordConfirmation: data.confirmPassword,
        user: JSON.parse(user)
      }
    });
    if (status.error) {
      Alert.alert('Request Error', status.error, [{ text: 'Ok', style: 'cancel' }]);
    } else {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: 'Sign In',
      });
    }
  };

  public render(): React.ReactNode {
    return (
      <NewPassword onResetPress={this.onResetPress}/>
    );
  }
}
