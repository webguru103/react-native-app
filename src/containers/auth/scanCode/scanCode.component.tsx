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
  imageScanCode,
  ImageSource,
} from '../../../assets/images';
import { hp } from '../../../utils/utility';

interface ComponentProps {
  onScanCode: (formData: any) => void;
}

export type ScanCodeProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: any | undefined;
}

class ScanCodeComponent extends React.Component<ScanCodeProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageScanCodeBg;

  private scanCodeImage: ImageSource = imageScanCode;

  private onScanToActivate = () => {
    this.props.onScanCode(this.state.formData);
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ImageOverlay
        style={themedStyle.container}
        imageStyle={themedStyle.bgImage}
        source={this.backgroundImage.imageSource}>
        <View style={themedStyle.headerContainer}>
          <Text
            style={themedStyle.title}
            appearance='alternative'
            category='h1'
          >
            Find your
          </Text>
          <Text
            style={themedStyle.title}
            appearance='alternative'
            category='h1'
          >
            home's KeyCode
          </Text>
          <Image
            style={themedStyle.codeImage}
            source={this.scanCodeImage.imageSource}
          />
        </View>
        <Button
          style={themedStyle.activateButton}
          textStyle={themedStyle.buttonText}
          size='giant'
          onPress={this.onScanToActivate}>
          Scan To Activate It
        </Button>
      </ImageOverlay>
    );
  }
}

export const ScanCode = withStyles(ScanCodeComponent, (theme: ThemeType) => ({
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
  headerContainer: {
    marginTop: hp(12.4),
    width: '100%',
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
  codeImage: {
    marginTop: hp(3.9),
    width: '100%',
    resizeMode: 'cover',
  },
  activateButton: {
    marginTop: hp(2.8),
    backgroundColor: 'white',
    width: '100%',
    height: 48,
  },
  buttonText: {
    color: '#0E446D',
    fontSize: 14,
    lineHeight: 16,
    ...textStyle.button,
  },
}));
