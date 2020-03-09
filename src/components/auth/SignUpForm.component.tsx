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
import {
  EmailIconFill,
  EyeOffIconFill,
  PersonIconFill,
  PhoneIconFill,
} from '../../assets/icons';
import {
  EmailValidator,
  NameValidator,
  PhoneNumberValidator,
  PasswordValidator,
  ConfirmPasswordValidator,
} from '../../utils/validators';
import { SignUpFormData } from './types';
import { hp } from '../../utils/utility';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignUpFormData | undefined) => void;
}

export type SignUpFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  phone: string | undefined;
  confirmPassword: string | undefined;
}

class SignUpFormComponent extends React.Component<SignUpFormProps, State> {

  public state: State = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    confirmPassword: undefined,
  };

  public componentDidUpdate(prevProps: SignUpFormProps, prevState: State) {

    if (!this.props.onDataChange) {
      return;
    }

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

  private onFirstnameInputTextChange = (firstName: string) => {
    this.setState({ firstName });
  };

  private onLastnameInputTextChange = (lastName: string) => {
    this.setState({ lastName });
  };

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email });
  };

  private onPhoneInputTextChange = (phone: string) => {
    this.setState({ phone });
  };

  private onPasswordInputValidationResult = (password: string) => {
    this.setState({ password });
  };

  private onConfirmPasswordInputValidationResult = (confirmPassword: string) => {
    this.setState({ confirmPassword });
  };

  private isValid = (value: SignUpFormData): boolean => {
    const { firstName, lastName, password, confirmPassword, email, phone } = value;

    return firstName !== undefined
      && lastName !== undefined
      && email !== undefined
      && phone !== undefined
      && password !== undefined
      && confirmPassword !== undefined
      && password === confirmPassword;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <View style={themedStyle.formContainer}>
          <Text
            style={themedStyle.inputLabel}
            category='label'
          >
            NAME
          </Text>
          <View style={themedStyle.nameContainer}>
            <ValidationInput
              style={themedStyle.usernameInput}
              textStyle={textStyle.paragraph}
              autoCapitalize='none'
              placeholder='First Name'
              validator={NameValidator}
              onChangeText={this.onFirstnameInputTextChange}
            />
            <ValidationInput
              style={themedStyle.usernameInput}
              textStyle={textStyle.paragraph}
              autoCapitalize='none'
              placeholder='Last Name'
              validator={NameValidator}
              onChangeText={this.onLastnameInputTextChange}
            />
          </View>
          <Text
            style={themedStyle.inputLabel}
            category='label'
          >
            EMAIL
          </Text>
          <ValidationInput
            style={themedStyle.emailInput}
            textStyle={textStyle.paragraph}
            autoCapitalize='none'
            placeholder='Email'
            icon={EmailIconFill}
            validator={EmailValidator}
            onChangeText={this.onEmailInputTextChange}
          />
          <Text
            style={themedStyle.inputLabel}
            category='label'
          >
            MOBILE PHONE
          </Text>
          <ValidationInput
            style={themedStyle.emailInput}
            textStyle={textStyle.paragraph}
            autoCapitalize='none'
            placeholder='Phone'
            icon={PhoneIconFill}
            validator={PhoneNumberValidator}
            onChangeText={this.onPhoneInputTextChange}
          />
          <Text
            style={themedStyle.inputLabel}
            category='label'
          >
            PASSWORD
          </Text>
          <ValidationInput
            style={themedStyle.passwordInput}
            textStyle={textStyle.paragraph}
            autoCapitalize='none'
            secureTextEntry={true}
            placeholder=''
            icon={EyeOffIconFill}
            validator={PasswordValidator}
            onChangeText={this.onPasswordInputValidationResult}
          />
          <Text
            style={themedStyle.inputLabel}
            category='label'
          >
            CONFIRM PASSWORD
          </Text>
          <ValidationInput
            style={themedStyle.passwordInput}
            textStyle={textStyle.paragraph}
            autoCapitalize='none'
            secureTextEntry={true}
            placeholder=''
            icon={EyeOffIconFill}
            validator={ConfirmPasswordValidator(this.state.password)}
            onChangeText={this.onConfirmPasswordInputValidationResult}
          />
        </View>
      </View>
    );
  }
}

export const SignUpForm = withStyles(SignUpFormComponent, (theme: ThemeType) => ({
  container: {},
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: hp(0.75),
    marginTop: hp(1.5),
  },
  usernameInput: {
    width: '49%',
    height: hp(6),
  },
  emailInput: {
    width: '100%',
    height: hp(6),
  },
  passwordInput: {
    width: '100%',
    height: hp(6),
  },
  termsCheckBox: {
    marginTop: hp(3),
  },
  termsCheckBoxText: {
    color: theme['text-hint-color'],
    ...textStyle.subtitle,
  },
}));
