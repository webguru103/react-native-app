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
  NewPasswordForm,
  NewPasswordFormData,
} from '../../../components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '../../../components/common';
import {
  imageSignInBg as imageNewPasswordBg,
  imageSmallLogo,
  ImageSource,
} from '../../../assets/images';
import { hp, wp } from '../../../utils/utility';

interface ComponentProps {
  onResetPress: (formData: NewPasswordFormData) => void;
}

export type NewPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: NewPasswordFormData | undefined;
}

class NewPasswordComponent extends React.Component<NewPasswordProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageNewPasswordBg;

  private logoImage: ImageSource = imageSmallLogo;

  private onFormDataChange = (formData: NewPasswordFormData) => {
    this.setState({ formData });
  };

  private onVerifyButtonPress = () => {
    this.props.onResetPress(this.state.formData);
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
              style={themedStyle.title}
              appearance='alternative'
              category='h1'>
              Enter a new
            </Text>
            <Text
              style={themedStyle.title}
              appearance='alternative'
              category='h1'>
              password
            </Text>
            <Text
              style={themedStyle.detailLabel}
              appearance='alternative'
              category='s1'
            >
              Please enter a new password for
              your account below.
            </Text>
          </View>
          <NewPasswordForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.resetButton}
            textStyle={themedStyle.buttonText}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onVerifyButtonPress}>
            Sign In
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const NewPassword = withStyles(NewPasswordComponent, (theme: ThemeType) => ({
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
    marginBottom: hp(4.8),
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    ...textStyle.subtitle,
  },
  detailLabel: {
    marginTop: hp(2.8),
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 500,
    ...textStyle.subtitle,
  },
  infoLabel: {
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 500,
    ...textStyle.subtitle,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  forgotPasswordLabel: {
    alignSelf: 'center',
    marginTop: hp(3),
    color: 'white',
    ...textStyle.headline,
  },
  enterEmailLabel: {
    alignSelf: 'center',
    marginTop: hp(8),
    color: 'white',
    ...textStyle.subtitle,
  },
  resetButton: {
    marginTop: hp(2),
    backgroundColor: 'white',
    width: '100%',
    height: hp(6),
  },
  buttonText: {
    color: '#0E446D',
    fontSize: 14,
    lineHeight: 16,
    ...textStyle.button,
  },
}));
