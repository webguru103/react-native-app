import React from 'react';
import {
  ButtonProps,
  ImageProps,
  View,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten/theme';
import {
  Button,
  Text,
} from 'react-native-ui-kitten/ui';
import {
  SignUpForm,
  SignUpFormData,
} from '../../components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '../../components/common';
import {
  IconSource,
  PlusIconFill,
} from '../../assets/icons';
import {
  imageSignInBg as imageSignUpBg,
  ImageSource,
} from '../../assets/images';
import {
  wp,
  hp
} from '../../utils/utility';

interface ComponentProps {
  onSignUpPress: (formData: SignUpFormData) => void;
  onSignInPress: () => void;
  onPhotoPress: () => void;
}

export type SignUpProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignUpFormData | undefined;
}

class SignUpComponent extends React.Component<SignUpProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageSignUpBg;

  private onFormDataChange = (formData: SignUpFormData) => {
    this.setState({ formData });
  };

  private onPhotoButtonPress = () => {
    this.props.onPhotoPress();
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress(this.state.formData);
  };

  private renderPhotoButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return PlusIconFill({ ...style, ...themedStyle.photoButtonIcon });
  };

  private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.photoButton}
        icon={this.renderPhotoButtonIcon}
        onPress={this.onPhotoButtonPress}
      />
    );
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
            <Text
              style={themedStyle.headerLabel}
              category='h1'>
              Sign up and
            </Text>
            <Text
              style={themedStyle.headerLabel}
              category='h1'>
              activate your
            </Text>
            <Text
              style={themedStyle.headerLabel}
              category='h1'>
              home's KeyCode
            </Text>
          </View>
          <SignUpForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.buttonText}
            size='giant'
            onPress={this.onSignUpButtonPress}>
            Next
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignUp = withStyles(SignUpComponent, (theme: ThemeType) => ({
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
  headerContainer: {
    paddingTop: hp(7.2),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    ...textStyle.subtitle,
  },
  formContainer: {
    marginTop: hp(2),
    width: '100%',
    justifyContent: 'space-between',
  },
  signUpButton: {
    marginTop: hp(2),
    backgroundColor: 'white',
    width: '100%',
    height: hp(6),
  },
  signInButton: {
    marginVertical: hp(1.5),
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

