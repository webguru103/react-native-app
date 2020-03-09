import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { SignUpFormData } from '../../components/auth';
import { SignUp } from './signUp.component';
import AuthService from '../../utils/services/auth';

export class SignUpContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'SignUpContainer';

  private onSignUpPress = async (data: SignUpFormData) => {
    const user = await AuthService.register({
      params: null,
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
        admin: false,
        phone: '+' + data.phone
      }
    });
    if (user.error) {
      Alert.alert('Request Error', user.error, [{ text: 'Ok', style: 'cancel' }]);
    } else if (user.token) {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: 'Scan Code',
      });
    }
  };

  private onSignInPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Scan Code',
    });
  };

  private onPhotoPress = () => {

  };

  public render(): React.ReactNode {
    return (
      <SignUp
        onSignUpPress={this.onSignUpPress}
        onSignInPress={this.onSignInPress}
        onPhotoPress={this.onPhotoPress}
      />
    );
  }
}
