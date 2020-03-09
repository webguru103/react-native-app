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
import { EyeOffIconFill } from '../../assets/icons';
import { PasswordValidator, ConfirmPasswordValidator } from '../../utils/validators';
import { NewPasswordFormData } from './types';
import { hp } from '../../utils/utility';


interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: NewPasswordFormData | undefined) => void;
}


export type NewPasswordFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  password: string | undefined;
  confirmPassword: string | undefined;
}

class NewPasswordFormComponent extends React.Component<NewPasswordFormProps, State> {

  public state: State = {
    password: undefined,
    confirmPassword: undefined
  };

  public componentDidUpdate(prevProps: NewPasswordFormProps, prevState: State) {
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

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password });
  };

  private onConfirmPasswordInputTextChange = (confirmPassword: string) => {
    this.setState({ confirmPassword });
  };

  private isValid = (value: NewPasswordFormData): boolean => {
    const { password, confirmPassword } = value;

    return password !== undefined
           && confirmPassword !== undefined
           && password === confirmPassword;
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
          PASSWORD
        </Text>
        <ValidationInput
          style={themedStyle.InputField}
          textStyle={textStyle.paragraph}
          placeholder=''
          secureTextEntry={true}
          icon={EyeOffIconFill}
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
        <Text
          style={themedStyle.inputLabel}
          category='label'
        >
          CONFIRM PASSWORD
        </Text>
        <ValidationInput
          style={themedStyle.InputField}
          textStyle={textStyle.paragraph}
          placeholder=''
          secureTextEntry={true}
          icon={EyeOffIconFill}
          validator={ConfirmPasswordValidator(this.state.password)}
          onChangeText={this.onConfirmPasswordInputTextChange}
        />
      </View>
    );
  }
}

export const NewPasswordForm = withStyles(NewPasswordFormComponent, (theme: ThemeType) => ({
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
