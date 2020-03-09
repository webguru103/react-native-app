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
  ImageOverlay,
  textStyle,
} from '../../../components/common';
import {
  imageSignInBg as imageScanCodeBg,
  imageConfirmedLogo,
  ImageSource,
} from '../../../assets/images';
import { hp, wp } from '../../../utils/utility';

interface ComponentProps {
  onStart: () => void;
}

export type ScanCodeProps = ThemedComponentProps & ComponentProps;

class ConfirmedComponent extends React.Component<ScanCodeProps, {}> {

  private backgroundImage: ImageSource = imageScanCodeBg;

  private confirmedImage: ImageSource = imageConfirmedLogo;

  private onStart = () => {
    this.props.onStart();
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ImageOverlay
        style={themedStyle.container}
        imageStyle={themedStyle.bgImage}
        source={this.backgroundImage.imageSource}>
        <View style={themedStyle.headerContainer}>
          <Image
            style={themedStyle.confirmedImage}
            source={this.confirmedImage.imageSource}
          />
          <Text
            style={themedStyle.title}
            appearance='alternative'
            category='h1'
          >
            Excellent!
          </Text>
          <Text
            style={themedStyle.detailTop}
            appearance='alternative'
            category='s1'
          >
            Your home located at
          </Text>
          <Text
            style={themedStyle.detail}
            appearance='alternative'
            category='s1'
          >
            1105 E  Yonge St
          </Text>
          <Text
            style={themedStyle.detail}
            appearance='alternative'
            category='s1'
          >
            has been activated.
          </Text>
        </View>
        <Button
          style={themedStyle.activateButton}
          textStyle={themedStyle.buttonText}
          size='giant'
          onPress={this.onStart}>
          Let's Get Started
        </Button>
      </ImageOverlay>
    );
  }
}

export const Confirmed = withStyles(ConfirmedComponent, (theme: ThemeType) => ({
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
    marginTop: hp(16.2),
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    ...textStyle.subtitle,
  },
  detailTop: {
    marginTop: hp(2.5),
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: '#0E446D',
  },
  detail: {
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: '#0E446D',
  },
  confirmedImage: {
    marginBottom: hp(2.5)
  },
  activateButton: {
    marginTop: hp(2.8),
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
