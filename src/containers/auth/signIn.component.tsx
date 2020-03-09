import React from 'react';
import { View, Image } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten/theme';
import {
  Button,
  Text,
  Spinner
} from 'react-native-ui-kitten/ui';
import {
  SignInForm,
  SignInFormData,
} from '../../components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '../../components/common';
import {
  imageSignInBg,
  imageSmallLogo,
  ImageSource,
} from '../../assets/images';
import {
  wp,
  hp
} from '../../utils/utility';

interface ComponentProps {
  onForgotPasswordPress: () => void;
  onSignInPress: (formData: SignInFormData) => void;
  onSignUpPress: () => void;
  loading: boolean;
}

export type SignInProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignInFormData;
}

class SignInComponent extends React.Component<SignInProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageSignInBg;

  private logoImage: ImageSource = imageSmallLogo;

  private onSignInButtonPress = () => {
    this.props.onSignInPress(this.state.formData);
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private onFormDataChange = (formData: SignInFormData) => {
    this.setState({ formData });
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay
          style={themedStyle.container}
          imageStyle={themedStyle.bgImage}
          source={this.backgroundImage.imageSource}>
          <View style={themedStyle.headerContainer}>
            <Image
              style={themedStyle.logoImage}
              source={this.logoImage.imageSource}
            />
            <Text
              style={themedStyle.helloLabel}
              category='h1'>
              Welcome.
            </Text>
            <Text
              style={themedStyle.signInLabel}
              category='h1'>
              Please sign in.
            </Text>
          </View>
          <SignInForm
            style={themedStyle.formContainer}
            onForgotPasswordPress={this.onForgotPasswordButtonPress}
            onDataChange={this.onFormDataChange}
          />
          {this.props.loading ?
            <View style={themedStyle.signInSpinnerContainer}>
              <Spinner />
            </View>
            :
            <Button
            
              style={themedStyle.signInButton}
              textStyle={[themedStyle.buttonText, !this.state.formData ? themedStyle.buttonTextDisabled : null]}
              size='giant'
              disabled={!this.state.formData}
              onPress={this.onSignInButtonPress}>
              SIGN IN
          </Button>}

          <View style={themedStyle.labelContainer}>
            <Text
              style={themedStyle.signUpLabel}
              category='s1'>
              Don't have an account?
            </Text>
            <Text
              style={themedStyle.signUpLabel}
              category='s1'>
              Sign up and activate your KeyCode.
            </Text>
          </View>
          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.buttonText}
            size='giant'
            appearance='outline'
            onPress={this.onSignUpButtonPress}>
            Sign up
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignIn = withStyles(SignInComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: wp(13.3),
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overlayColor: 'transparent',
  },
  bgImage: {
    resizeMode: 'stretch',
  },
  logoImage: {
    marginTop: hp(7.4),
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  labelContainer: {
    marginTop: hp(4.8),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  formContainer: {
    marginTop: hp(5.2),
    width: '100%',
    justifyContent: 'space-between',
  },
  helloLabel: {
    marginTop: hp(4.4),
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 36,
    color: 'white',
    textAlign: 'left',
    ...textStyle.subtitle,
  },
  signInLabel: {
    fontSize: 30,
    lineHeight: 36,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    ...textStyle.subtitle,
  },
  signUpLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: '#0E446D',
    textAlign: 'left',
    ...textStyle.subtitle,
  },
  signInButton: {
    marginTop: hp(2),
    backgroundColor: 'white',
    width: '100%',
    height: hp(6),
  },
  signInSpinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: hp(6),
  },
  signInSpinner: {
    color: 'white'
  },
  signUpButton: {
    marginTop: hp(1),
    backgroundColor: 'transparent',
    borderColor: '#0E446D',
    width: '100%',
    height: hp(6),
  },
  buttonText: {
    color: '#0E446D',
    fontSize: 14,
    lineHeight: 16,
    ...textStyle.button,
  },
  buttonTextDisabled: {
    color: theme['color-basic-500']
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));
