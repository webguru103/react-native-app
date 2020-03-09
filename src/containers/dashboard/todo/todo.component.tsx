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
} from 'react-native-ui-kitten/ui';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '../../../components/common';
import {
  imageSignInBg,
  imageSmallLogo,
  ImageSource,
} from '../../../assets/images';
import {
  wp,
  hp
} from '../../../utils/utility';

interface ComponentProps {
  onForgotPasswordPress: () => void;
  onSignUpPress: () => void;
}

export type SignInProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: any;
}

class ToDoComponent extends React.Component<SignInProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageSignInBg;
  
  private logoImage: ImageSource = imageSmallLogo;

  private onSignInButtonPress = () => {
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private onFormDataChange = (formData: any) => {
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
          <Button
            style={themedStyle.signInButton}
            textStyle={themedStyle.buttonText}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onSignInButtonPress}>
            SIGN IN
          </Button>
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

export const ToDo = withStyles(ToDoComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 50,
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
    marginTop: 16,
    backgroundColor: 'white',
    width: '100%',
    height: 48,
  },
  signUpButton: {
    marginTop: 6,
    backgroundColor: 'transparent',
    borderColor: '#0E446D',
    width: '100%',
    height: 48,
  },
  buttonText: {
    color: '#0E446D',
    fontSize: 14,
    lineHeight: 16,
    ...textStyle.button,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));
