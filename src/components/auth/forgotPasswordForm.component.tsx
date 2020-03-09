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
import { Text } from 'react-native-ui-kitten/ui';
import {
  textStyle,
  ValidationInput,
} from '../common';
import { PhoneIconFill } from '../../assets/icons';
import { PhoneNumberValidator } from '../../utils/validators';
import { ForgotPasswordFormData } from './types';
import { hp, wp } from '../../utils/utility';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: ForgotPasswordFormData | undefined) => void;
}


export type ForgotPasswordFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  phone: string | undefined;
}

class ForgotPasswordFormComponent extends React.Component<ForgotPasswordFormProps, State> {

  public state: State = {
    phone: undefined,
  };

  public componentDidUpdate(prevProps: ForgotPasswordFormProps, prevState: State) {
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

  private onPhoneNumberInputTextChange = (phone: string) => {
    this.setState({ phone });
  };

  private isValid = (value: ForgotPasswordFormData): boolean => {
    const { phone } = value;

    return phone !== undefined;
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
          MOBILE NUMBER
        </Text>
        <ValidationInput
          style={themedStyle.InputField}
          textStyle={textStyle.paragraph}
          placeholder=''
          icon={PhoneIconFill}
          validator={PhoneNumberValidator}
          onChangeText={this.onPhoneNumberInputTextChange}
        />
      </View>
    );
  }
}

export const ForgotPasswordForm = withStyles(ForgotPasswordFormComponent, (theme: ThemeType) => ({
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
