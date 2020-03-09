import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { SignInFormData } from '../../components/auth';
import { SignIn } from './signIn.component';
import AuthService from '../../utils/services/auth';

interface State {
  loading: boolean;
}

export class SignInContainer extends React.Component<NavigationStackScreenProps, State> {

  public state = {
    loading: false
  }

  private navigationKey: string = 'SignInContainer';

  private onSignInPress = (data: SignInFormData) => {
    this.setState({ loading: true });
    AuthService.login({
      params: null,
      data: {
        email: data.email,
        password: data.password
      }
    }).then(result => {
      this.setState({ loading: false });
      if (result.error) {
        //Alert.alert('Request Error', result.error, [{ text: 'Ok', style: 'cancel' }]);
        Alert.alert('Login Failed', 'Incorrect username or password!', [{ text: 'Ok', style: 'cancel' }]);
      } else {
        this.props.navigation.navigate({
          key: this.navigationKey,
          routeName: 'Confirmed',
        });
      }
    });
  };

  private onSignUpPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Sign Up',
    });
  };

  private onForgotPasswordPress = () => {
    this.props.navigation.push('Forgot Password');
  };

  public render(): React.ReactNode {
    return (
      <SignIn
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
        onForgotPasswordPress={this.onForgotPasswordPress}
        loading={this.state.loading}
      />
    );
  }
}
