import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten/theme';
import { Text, Input } from 'react-native-ui-kitten/ui';
import { textStyle } from '../common';
import { PhoneCodeFormData } from './types';
import { hp } from '../../utils/utility';


interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: PhoneCodeFormData | undefined) => void;
}


export type PhoneCodeFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  code: string | undefined;
}

class PhoneCodeFormComponent extends React.Component<PhoneCodeFormProps, State> {

  public state: State = {
    code: undefined,
  };

  public componentDidUpdate(prevProps: PhoneCodeFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onPhoneCodeInputTextChange = (code: string) => {
    this.setState({ code });
  };

  private isValid = (value: PhoneCodeFormData): boolean => {
    const { code } = value;

    return code !== undefined;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <Text
          style={themedStyle.inputLabel}
          category='label'
        >
          6-DIGIT VERIFICATION CODE
        </Text>
        <Input
          style={themedStyle.InputField}
          textStyle={textStyle.paragraph}
          placeholder=''
          onChangeText={this.onPhoneCodeInputTextChange}
        />
      </View>
    );
  }
}

export const PhoneCodeForm = withStyles(PhoneCodeFormComponent, (theme: ThemeType) => ({
  container: {},
  inputLabel: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: hp(0.75),
  },
  InputField: {
    marginHorizontal: 0,
    width: '100%',
    height: hp(6),
  },
}));
