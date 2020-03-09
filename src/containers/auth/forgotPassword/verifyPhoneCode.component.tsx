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
  PhoneCodeForm,
  PhoneCodeFormData,
} from '../../../components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '../../../components/common';
import {
  imageSignInBg as imagePhoneCodeBg,
  imageSmallLogo,
  ImageSource,
} from '../../../assets/images';
import { hp, wp } from '../../../utils/utility';

interface ComponentProps {
  onResetPress: (formData: PhoneCodeFormData) => void;
}

export type ForgotPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: PhoneCodeFormData | undefined;
}

class VerifyPhoneCodeComponent extends React.Component<ForgotPasswordProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imagePhoneCodeBg;

  private logoImage: ImageSource = imageSmallLogo;

  private onFormDataChange = (formData: PhoneCodeFormData) => {
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
              SMS Text
            </Text>
            <Text
              style={themedStyle.title}
              appearance='alternative'
              category='h1'>
              verification code.
            </Text>
            <Text
              style={themedStyle.detailLabel}
              appearance='alternative'
              category='s1'
            >
              Please enter the 6-digit verification code that
              was sent to your mobile phone.
            </Text>
          </View>
          <PhoneCodeForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.resetButton}
            textStyle={themedStyle.buttonText}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onVerifyButtonPress}>
            Verify My Account
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const VerifyPhoneCode = withStyles(VerifyPhoneCodeComponent, (theme: ThemeType) => ({
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
    color: 'white',
    fontWeight: 'bold',
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
    marginTop: hp(5),
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
